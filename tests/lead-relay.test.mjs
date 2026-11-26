import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  createDeliver,
  createLeadHandler,
  createLeadServer,
  formatLead,
  readConfig,
  validateLead,
} from '../server/lead-relay/relay.mjs';

const validBody = () => ({
  name: 'Тест',
  manual: 'Гостевой дом (тестовые данные)',
  loss: 'Заявки теряются в мессенджерах',
  result: 'Сайт с заявками',
  contact: '@test_user',
  consent: true,
  website: '',
  requestId: 'test-request-0001',
  locale: 'ru',
  page: '/#contact',
  utm: { utm_campaign: 'lost-leads-2611', utm_evil: 'x' },
});

const baseConfig = (extra = {}) => ({
  recipient: 'stub',
  allowedOrigins: ['https://eclipse-forge.ru'],
  rateLimit: { max: 5, windowMs: 60_000 },
  ...extra,
});

test('readConfig: переключатель получателя и обязательные секреты', () => {
  assert.equal(readConfig({}).recipient, 'stub');
  assert.throws(() => readConfig({ LEAD_RECIPIENT: 'sms' }), /LEAD_RECIPIENT/);
  assert.throws(() => readConfig({ LEAD_RECIPIENT: 'telegram' }), /TELEGRAM_BOT_TOKEN/);
  assert.throws(() => readConfig({ LEAD_RECIPIENT: 'telegram', TELEGRAM_BOT_TOKEN: 'x' }), /TELEGRAM_CHAT_ID/);
  assert.throws(() => readConfig({ LEAD_RECIPIENT: 'email', SMTP_HOST: 'h' }), /SMTP_USER/);
  const tg = readConfig({ LEAD_RECIPIENT: 'telegram', TELEGRAM_BOT_TOKEN: 'fake', TELEGRAM_CHAT_ID: '1' });
  assert.equal(tg.telegram.chatId, '1');
  const mail = readConfig({
    LEAD_RECIPIENT: 'email', SMTP_HOST: 'smtp.example.test', SMTP_USER: 'u@example.test', SMTP_PASS: 'p', LEAD_EMAIL_TO: 'to@example.test',
  });
  assert.equal(mail.email.port, 465);
  assert.equal(mail.email.from, 'u@example.test');
});

test('validateLead: согласие, контакт, honeypot, лимиты, белый список UTM', () => {
  const ok = validateLead(validBody());
  assert.equal(ok.ok, true);
  assert.deepEqual(ok.lead.utm, { utm_campaign: 'lost-leads-2611' });
  assert.equal('website' in ok.lead, false);

  assert.equal(validateLead({ ...validBody(), consent: false }).error, 'consent_required');
  assert.equal(validateLead({ ...validBody(), contact: ' ' }).error, 'contact_required');
  assert.equal(validateLead({ ...validBody(), website: 'http://spam' }).error, 'spam');
  assert.equal(validateLead({ ...validBody(), manual: 'x'.repeat(1001) }).error, 'too_long:manual');
  assert.equal(validateLead({ ...validBody(), manual: '', loss: '', result: '' }).error, 'empty_request');
  assert.equal(validateLead({ ...validBody(), requestId: 'bad id!' }).error, 'invalid_request_id');
  assert.equal(validateLead([]).error, 'invalid_body');
});

test('formatLead: простой текст без разметки и укладывается в лимит Telegram', () => {
  const body = { ...validBody(), manual: 'м'.repeat(1000), loss: 'л'.repeat(1000), result: 'р'.repeat(1000), name: 'n'.repeat(120), contact: 'c'.repeat(200) };
  const text = formatLead(validateLead(body).lead, new Date('2026-11-25T10:00:00Z'));
  assert.ok(text.length < 4096, `длина ${text.length}`);
  assert.match(text, /utm_campaign=lost-leads-2611|без UTM/);
});

test('stub: заявка дописывается в JSONL, повтор не дублируется', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ef-lead-'));
  const config = baseConfig({ stubFile: join(dir, 'leads.jsonl') });
  const handle = createLeadHandler(config);
  const first = await handle(validBody(), { ip: '1.1.1.1' });
  const retry = await handle(validBody(), { ip: '1.1.1.1' });
  assert.equal(first.status, 201);
  assert.equal(retry.status, 200);
  assert.equal(retry.body.id, first.body.id);
  const lines = (await readFile(config.stubFile, 'utf8')).trim().split('\n');
  assert.equal(lines.length, 1);
  assert.equal(JSON.parse(lines[0]).lead.contact, '@test_user');
});

test('telegram: отправка в sendMessage без parse_mode, ошибка API → 502 и повтор возможен', async () => {
  const calls = [];
  let fail = true;
  const fakeFetch = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    if (fail) return new Response(JSON.stringify({ ok: false }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };
  const config = baseConfig({ recipient: 'telegram', telegram: { token: 'FAKE', chatId: '42' } });
  const handle = createLeadHandler(config, { fetch: fakeFetch, log: () => {} });

  const failed = await handle(validBody(), { ip: '2.2.2.2' });
  assert.equal(failed.status, 502);
  fail = false;
  const ok = await handle(validBody(), { ip: '2.2.2.2' });
  assert.equal(ok.status, 201);

  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://api.telegram.org/botFAKE/sendMessage');
  assert.equal(calls[1].body.chat_id, '42');
  assert.equal('parse_mode' in calls[1].body, false);
  assert.match(calls[1].body.text, /Новая заявка/);
});

test('email: письмо уходит через транспорт с темой и текстом', async () => {
  const sent = [];
  const config = baseConfig({ recipient: 'email', email: { from: 'from@example.test', to: 'to@example.test' } });
  const deliver = createDeliver(config, { mailer: { sendMail: async (mail) => sent.push(mail) } });
  const lead = validateLead(validBody()).lead;
  await deliver(lead, formatLead(lead));
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'to@example.test');
  assert.match(sent[0].subject, /Заявка с eclipse-forge\.ru/);
});

test('honeypot: бот получает «успех», доставки нет', async () => {
  let delivered = 0;
  const handle = createLeadHandler(baseConfig(), { deliver: async () => { delivered += 1; } });
  const result = await handle({ ...validBody(), website: 'spam' }, { ip: '3.3.3.3' });
  assert.equal(result.status, 201);
  assert.equal(delivered, 0);
});

test('лимит частоты: шестая заявка с одного IP за окно → 429', async () => {
  const handle = createLeadHandler(baseConfig(), { deliver: async () => {} });
  for (let index = 0; index < 5; index += 1) {
    const result = await handle({ ...validBody(), requestId: `test-request-${index}000` }, { ip: '4.4.4.4' });
    assert.equal(result.status, 201);
  }
  const blocked = await handle({ ...validBody(), requestId: 'test-request-9999' }, { ip: '4.4.4.4' });
  assert.equal(blocked.status, 429);
});

test('HTTP: чужой Origin → 403, preflight и POST со своего Origin работают', async (t) => {
  const delivered = [];
  const server = createLeadServer(baseConfig(), { deliver: async (lead) => delivered.push(lead) });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const url = `http://127.0.0.1:${server.address().port}/api/lead`;
  const post = (origin, body, type = 'application/json') => fetch(url, {
    method: 'POST', headers: { origin, 'content-type': type }, body,
  });

  assert.equal((await post('https://evil.example', JSON.stringify(validBody()))).status, 403);
  const preflight = await fetch(url, { method: 'OPTIONS', headers: { origin: 'https://eclipse-forge.ru' } });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), 'https://eclipse-forge.ru');

  assert.equal((await post('https://eclipse-forge.ru', 'a=1', 'text/plain')).status, 415);
  assert.equal((await post('https://eclipse-forge.ru', '{bad')).status, 400);
  assert.equal((await post('https://eclipse-forge.ru', JSON.stringify({ ...validBody(), pad: 'x'.repeat(20_000) }))).status, 413);

  const ok = await post('https://eclipse-forge.ru', JSON.stringify(validBody()));
  assert.equal(ok.status, 201);
  const payload = await ok.json();
  assert.equal(payload.ok, true);
  assert.equal(JSON.stringify(payload).includes('test_user'), false, 'ответ не повторяет данные клиента');
  assert.equal(delivered.length, 1);
});
