// Демо-ролики студии Eclipse Forge: запись экрана в браузере → ссылка клиенту → уведомление о просмотре.
// Node 20+, без зависимостей. Настройки — в README.md рядом.
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const ID_RE = /^[A-Za-z0-9]{12}$/;
const TYPES = { 'video/mp4': 'mp4', 'video/webm': 'webm' };
const VIEW_WINDOW_MS = 30 * 60_000;
const NOTIFY_WINDOW_MS = 15 * 60_000;
const MAX_TRACKED = 10_000;
const ASSETS = { 'record.js': 'record.js', 'watch.js': 'watch.js' };
const BASE_CSP = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'none'";

export function readConfig(env = process.env) {
  const token = env.DEMO_ADMIN_TOKEN ?? '';
  if (token.length < 24) throw new Error('DEMO_ADMIN_TOKEN: нужен случайный токен не короче 24 символов');
  const tgToken = env.TELEGRAM_BOT_TOKEN ?? '';
  const tgChat = env.TELEGRAM_CHAT_ID ?? '';
  if (Boolean(tgToken) !== Boolean(tgChat)) throw new Error('TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID задаются вместе');
  const maxMb = Number(env.DEMO_MAX_MB ?? 500);
  if (!Number.isFinite(maxMb) || maxMb <= 0) throw new Error('DEMO_MAX_MB: число мегабайт');
  return {
    adminToken: token,
    dataDir: env.DEMO_DATA_DIR ?? join(HERE, '.data'),
    publicBase: (env.DEMO_PUBLIC_BASE ?? 'http://127.0.0.1:8788').replace(/\/+$/, ''),
    port: Number(env.DEMO_PORT ?? 8788),
    host: env.DEMO_HOST ?? '127.0.0.1',
    maxBytes: Math.floor(maxMb * 1024 * 1024),
    telegram: tgToken ? { token: tgToken, chatId: tgChat } : null,
    contactUrl: env.DEMO_CONTACT_URL ?? 'https://t.me/EclipseHopson',
  };
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const decodeHeader = (v) => { try { return decodeURIComponent(v ?? ''); } catch { return ''; } };

export function createApp(config, { notify = defaultNotify(config), now = () => Date.now() } = {}) {
  const videosDir = join(config.dataDir, 'videos');
  const recentViews = new Map();
  const lastNotified = new Map();
  const queues = new Map();
  // Записи метаданных одного ролика идут строго по очереди: параллельные просмотры не теряют счёт.
  const serial = (id, fn) => {
    const prev = queues.get(id) ?? Promise.resolve();
    const next = prev.then(fn, fn);
    const tail = next.catch(() => {});
    queues.set(id, tail);
    tail.then(() => { if (queues.get(id) === tail) queues.delete(id); });
    return next;
  };
  const prune = (map, windowMs, t) => {
    for (const [k, at] of map) { if (t - at > windowMs) map.delete(k); else break; }
    while (map.size >= MAX_TRACKED) map.delete(map.keys().next().value);
  };
  const pages = {};
  const page = async (name) => (pages[name] ??= await readFile(join(HERE, name), 'utf8'));

  const isAdmin = (req) => {
    const m = /^Bearer (.+)$/.exec(req.headers.authorization ?? '');
    if (!m) return false;
    const a = Buffer.from(m[1]);
    const b = Buffer.from(config.adminToken);
    return a.length === b.length && timingSafeEqual(a, b);
  };
  const metaPath = (id) => join(videosDir, `${id}.json`);
  const readMeta = async (id) => {
    if (!ID_RE.test(id)) return null;
    try { return JSON.parse(await readFile(metaPath(id), 'utf8')); } catch { return null; }
  };
  const writeMeta = async (meta) => {
    const tmp = `${metaPath(meta.id)}.${randomBytes(4).toString('hex')}.tmp`;
    await writeFile(tmp, JSON.stringify(meta, null, 2));
    await rename(tmp, metaPath(meta.id));
  };
  const publicUrl = (id) => `${config.publicBase}/v/${id}`;

  const send = (res, status, body, headers = {}) => {
    const isJson = typeof body !== 'string';
    res.writeHead(status, {
      'Content-Type': isJson ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow',
      'Strict-Transport-Security': 'max-age=31536000',
      ...headers,
    });
    res.end(isJson ? JSON.stringify(body) : body);
  };

  async function upload(req, res) {
    const type = (req.headers['content-type'] ?? '').split(';')[0].trim();
    const ext = TYPES[type];
    if (!ext) return send(res, 415, { error: 'Нужен video/mp4 или video/webm' });
    const declared = Number(req.headers['content-length'] ?? 0);
    if (declared > config.maxBytes) return send(res, 413, { error: 'Ролик больше лимита' });
    const title = clean(decodeHeader(req.headers['x-demo-title']), 120) || 'Демо';
    const client = clean(decodeHeader(req.headers['x-demo-client']), 80);
    const id = randomBytes(9).toString('base64url').replace(/[-_]/g, 'x').slice(0, 12);
    await mkdir(videosDir, { recursive: true });
    const file = join(videosDir, `${id}.${ext}`);
    let size = 0;
    try {
      await pipeline(req, async function* (src) {
        for await (const chunk of src) {
          size += chunk.length;
          if (size > config.maxBytes) throw Object.assign(new Error('too big'), { code: 'TOO_BIG' });
          yield chunk;
        }
      }, createWriteStream(file));
    } catch (err) {
      await rm(file, { force: true });
      if (err.code === 'TOO_BIG') return send(res, 413, { error: 'Ролик больше лимита' });
      throw err;
    }
    if (size === 0) { await rm(file, { force: true }); return send(res, 400, { error: 'Пустой файл' }); }
    const meta = { id, ext, type, title, client, size, createdAt: new Date(now()).toISOString(), views: 0, lastViewAt: null };
    await writeMeta(meta);
    return send(res, 201, { id, url: publicUrl(id) });
  }

  async function list(res) {
    let names = [];
    try { names = await readdir(videosDir); } catch {}
    const items = [];
    for (const n of names.filter((x) => x.endsWith('.json'))) {
      const m = await readMeta(n.slice(0, -5));
      if (m) items.push({ ...m, url: publicUrl(m.id) });
    }
    items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return send(res, 200, { items });
  }

  async function remove(id, res) {
    const m = await readMeta(id);
    if (!m) return send(res, 404, { error: 'Не найдено' });
    await rm(join(videosDir, `${id}.${m.ext}`), { force: true });
    await rm(metaPath(id), { force: true });
    return send(res, 200, { ok: true });
  }

  async function media(id, req, res) {
    const m = await readMeta(id);
    if (!m) return send(res, 404, { error: 'Не найдено' });
    const file = join(videosDir, `${id}.${m.ext}`);
    const { size } = await stat(file);
    const base = { 'Content-Type': m.type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'private, max-age=3600', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex' };
    const r = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
    if (r && (r[1] || r[2])) {
      let start = r[1] ? Number(r[1]) : size - Number(r[2]);
      let end = r[1] && r[2] ? Number(r[2]) : size - 1;
      start = Math.max(0, start); end = Math.min(end, size - 1);
      if (start > end) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); return res.end(); }
      res.writeHead(206, { ...base, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
      if (req.method === 'HEAD') return res.end();
      return pipeline(createReadStream(file, { start, end }), res).catch(() => {});
    }
    res.writeHead(200, { ...base, 'Content-Length': size });
    if (req.method === 'HEAD') return res.end();
    return pipeline(createReadStream(file), res).catch(() => {});
  }

  // Адрес клиента: X-Forwarded-For доверяем только от локального прокси (Caddy на том же сервере).
  const clientIp = (req) => {
    const peer = req.socket.remoteAddress ?? '';
    const fromProxy = peer === '127.0.0.1' || peer === '::1' || peer === '::ffff:127.0.0.1';
    const fwd = fromProxy ? String(req.headers['x-forwarded-for'] ?? '').split(',').pop().trim() : '';
    return fwd || peer;
  };

  async function view(id, req, res) {
    if (!ID_RE.test(id)) return send(res, 404, { error: 'Не найдено' });
    const t = now();
    const key = createHash('sha256').update(`${id}|${clientIp(req)}`).digest('hex');
    prune(recentViews, VIEW_WINDOW_MS, t);
    if (recentViews.has(key)) return send(res, 200, { ok: true, counted: false });
    recentViews.set(key, t); // занимаем сразу, чтобы параллельные запросы не прошли проверку
    const m = await serial(id, async () => {
      const cur = await readMeta(id);
      if (!cur) return null;
      cur.views += 1;
      cur.lastViewAt = new Date(t).toISOString();
      await writeMeta(cur);
      return cur;
    });
    if (!m) { recentViews.delete(key); return send(res, 404, { error: 'Не найдено' }); }
    // В Telegram — не чаще раза в 15 минут на ролик, со сводным счётчиком.
    prune(lastNotified, NOTIFY_WINDOW_MS, t);
    if (!lastNotified.has(id)) {
      lastNotified.set(id, t);
      const who = m.client ? `${m.client}: ` : '';
      notify(`${who}открыли демо «${m.title}» (всего просмотров: ${m.views})\n${publicUrl(id)}`).catch(() => {});
    }
    return send(res, 200, { ok: true, counted: true });
  }

  async function watchPage(id, res) {
    const m = await readMeta(id);
    if (!m) return send(res, 404, '<!doctype html><meta charset="utf-8"><title>Не найдено</title><p style="font-family:sans-serif">Ролик не найден или удалён.</p>');
    const vals = { TITLE: esc(m.title), CLIENT: esc(m.client), HAS_CLIENT: m.client ? '' : 'hidden', ID: m.id, TYPE: m.type, CONTACT: esc(config.contactUrl) };
    const html = (await page('watch.html')).replace(/\{\{([A-Z_]+)\}\}/g, (all, k) => (k in vals ? vals[k] : all));
    return send(res, 200, html, {
      'Content-Security-Policy': `${BASE_CSP}; media-src 'self'`,
      'Permissions-Policy': 'camera=(), microphone=(), display-capture=(), geolocation=()',
    });
  }

  async function asset(name, res) {
    const body = await page(ASSETS[name]);
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(body);
  }

  return async function handler(req, res) {
    const url = new URL(req.url, 'http://x');
    const p = url.pathname;
    try {
      if (req.method === 'GET' && (p === '/' || p === '/record')) return send(res, 200, await page('record.html'), {
        'Content-Security-Policy': `${BASE_CSP}; media-src 'self' blob: mediastream:`,
        'Permissions-Policy': 'camera=(self), microphone=(self), display-capture=(self), geolocation=()',
      });
      if (req.method === 'GET' && p === '/healthz') return send(res, 200, { ok: true });
      let mm;
      if ((mm = /^\/assets\/([a-z]+\.js)$/.exec(p)) && req.method === 'GET' && ASSETS[mm[1]]) return asset(mm[1], res);
      if ((mm = /^\/v\/([^/]+)$/.exec(p)) && req.method === 'GET') return watchPage(mm[1], res);
      if ((mm = /^\/media\/([^/]+)$/.exec(p)) && (req.method === 'GET' || req.method === 'HEAD')) return media(mm[1], req, res);
      if ((mm = /^\/api\/videos\/([^/]+)\/view$/.exec(p)) && req.method === 'POST') return view(mm[1], req, res);
      if (p.startsWith('/api/videos')) {
        if (!isAdmin(req)) return send(res, 401, { error: 'Нужен токен студии' });
        if (p === '/api/videos' && req.method === 'POST') return upload(req, res);
        if (p === '/api/videos' && req.method === 'GET') return list(res);
        if ((mm = /^\/api\/videos\/([^/]+)$/.exec(p)) && req.method === 'DELETE') return remove(mm[1], res);
      }
      return send(res, 404, { error: 'Не найдено' });
    } catch (err) {
      console.error('[demo-video]', err);
      if (!res.headersSent) send(res, 500, { error: 'Ошибка сервера' });
      else res.destroy();
    }
  };
}

function defaultNotify(config) {
  if (!config.telegram) return async (text) => console.log(`[demo-video] ${text}`);
  return async (text) => {
    const r = await fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: config.telegram.chatId, text, disable_web_page_preview: true }),
    });
    if (!r.ok) console.error(`[demo-video] Telegram ответил ${r.status}`);
  };
}

export function createDemoServer(config, opts) {
  const server = createServer(createApp(config, opts));
  server.requestTimeout = 30 * 60_000;
  return server;
}
