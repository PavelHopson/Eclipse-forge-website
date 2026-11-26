import assert from 'node:assert/strict';
import { mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createDemoServer, readConfig } from '../server/demo-video/server.mjs';

const TOKEN = 'test-token-0123456789abcdef';

async function start(extra = {}) {
  const dataDir = await mkdtemp(join(tmpdir(), 'demo-video-'));
  const sent = [];
  let clock = Date.parse('2026-11-26T10:00:00Z');
  const config = { ...readConfig({ DEMO_ADMIN_TOKEN: TOKEN, DEMO_DATA_DIR: dataDir, DEMO_MAX_MB: '1' }), ...extra };
  const server = createDemoServer(config, { notify: async (t) => { sent.push(t); }, now: () => clock });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  config.publicBase = base;
  return { base, dataDir, sent, tick: (ms) => { clock += ms; }, close: () => new Promise((r) => server.close(r)) };
}

const auth = { Authorization: `Bearer ${TOKEN}` };
const upload = (base, body, headers = {}) => fetch(`${base}/api/videos`, {
  method: 'POST',
  body,
  headers: { ...auth, 'Content-Type': 'video/mp4', 'X-Demo-Title': encodeURIComponent('Ваш сайт <сейчас>'), 'X-Demo-Client': encodeURIComponent('Дюна'), ...headers },
});

test('readConfig: короткий токен и половина Telegram не запускаются', () => {
  assert.throws(() => readConfig({}), /DEMO_ADMIN_TOKEN/);
  assert.throws(() => readConfig({ DEMO_ADMIN_TOKEN: 'short' }), /DEMO_ADMIN_TOKEN/);
  assert.throws(() => readConfig({ DEMO_ADMIN_TOKEN: TOKEN, TELEGRAM_BOT_TOKEN: 'x' }), /вместе/);
  assert.equal(readConfig({ DEMO_ADMIN_TOKEN: TOKEN }).telegram, null);
});

test('загрузка, страница клиента, отдача с Range и счётчик просмотров', async () => {
  const s = await start();
  try {
    const bytes = Buffer.alloc(5000, 7);
    const r = await upload(s.base, bytes);
    assert.equal(r.status, 201);
    const { id, url } = await r.json();
    assert.match(id, /^[A-Za-z0-9]{12}$/);
    assert.equal(url, `${s.base}/v/${id}`);

    const page = await fetch(url);
    assert.equal(page.status, 200);
    assert.equal(page.headers.get('x-robots-tag'), 'noindex, nofollow');
    const html = await page.text();
    assert.match(html, /Ваш сайт &lt;сейчас&gt;/);
    assert.doesNotMatch(html, /<сейчас>/);
    assert.match(html, /Дюна, этот ролик записан для вас/);
    assert.match(html, new RegExp(`/media/${id}`));

    const part = await fetch(`${s.base}/media/${id}`, { headers: { Range: 'bytes=100-199' } });
    assert.equal(part.status, 206);
    assert.equal(part.headers.get('content-range'), 'bytes 100-199/5000');
    assert.equal((await part.arrayBuffer()).byteLength, 100);
    const full = await fetch(`${s.base}/media/${id}`);
    assert.equal(full.headers.get('content-type'), 'video/mp4');
    assert.equal((await full.arrayBuffer()).byteLength, 5000);

    const v1 = await (await fetch(`${s.base}/api/videos/${id}/view`, { method: 'POST' })).json();
    const v2 = await (await fetch(`${s.base}/api/videos/${id}/view`, { method: 'POST' })).json();
    assert.equal(v1.counted, true);
    assert.equal(v2.counted, false, 'повтор в течение 30 минут не считается');
    s.tick(31 * 60_000);
    const v3 = await (await fetch(`${s.base}/api/videos/${id}/view`, { method: 'POST' })).json();
    assert.equal(v3.counted, true);
    await new Promise((r) => setImmediate(r));
    assert.equal(s.sent.length, 2);
    assert.match(s.sent[0], /Дюна: открыли демо «Ваш сайт <сейчас>» \(просмотр №1\)/);

    const list = await (await fetch(`${s.base}/api/videos`, { headers: auth })).json();
    assert.equal(list.items.length, 1);
    assert.equal(list.items[0].views, 2);

    const del = await fetch(`${s.base}/api/videos/${id}`, { method: 'DELETE', headers: auth });
    assert.equal(del.status, 200);
    assert.equal((await fetch(url)).status, 404);
    assert.equal((await fetch(`${s.base}/media/${id}`)).status, 404);
    assert.deepEqual(await readdir(join(s.dataDir, 'videos')), []);
  } finally { await s.close(); }
});

test('без ключа студии нельзя загрузить, смотреть список и удалять', async () => {
  const s = await start();
  try {
    assert.equal((await fetch(`${s.base}/api/videos`, { method: 'POST', body: 'x', headers: { 'Content-Type': 'video/mp4' } })).status, 401);
    assert.equal((await fetch(`${s.base}/api/videos`, { headers: { Authorization: 'Bearer wrong-token-0123456789abcd' } })).status, 401);
    assert.equal((await fetch(`${s.base}/api/videos/abcdefghijkl`, { method: 'DELETE' })).status, 401);
  } finally { await s.close(); }
});

test('отказы: чужой тип, пустой файл, больше лимита, кривой id', async () => {
  const s = await start();
  try {
    assert.equal((await upload(s.base, 'x', { 'Content-Type': 'text/html' })).status, 415);
    assert.equal((await upload(s.base, Buffer.alloc(0))).status, 400);
    assert.equal((await upload(s.base, Buffer.alloc(1024 * 1024 + 1))).status, 413);
    assert.equal((await fetch(`${s.base}/v/..%2F..%2Fetc`)).status, 404);
    assert.equal((await fetch(`${s.base}/media/../../server.mjs`)).status, 404);
    assert.equal((await fetch(`${s.base}/api/videos/nope/view`, { method: 'POST' })).status, 404);
    let files = [];
    try { files = await readdir(join(s.dataDir, 'videos')); } catch {}
    assert.deepEqual(files, [], 'отклонённые загрузки не оставляют файлов');
  } finally { await s.close(); }
});

test('страница записи открывается и не индексируется', async () => {
  const s = await start();
  try {
    const r = await fetch(`${s.base}/record`);
    assert.equal(r.status, 200);
    assert.match(r.headers.get('content-security-policy'), /frame-ancestors 'none'/);
    assert.match(await r.text(), /Записать демо для клиента/);
  } finally { await s.close(); }
});
