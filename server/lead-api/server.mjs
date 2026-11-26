// Приём заявок с формы eclipse-forge.ru.
// Без зависимостей: node >= 20. Слушает только 127.0.0.1, наружу отдаёт Caddy (`/api/lead`).
// Заявка сначала пишется в файл, затем уходит в Telegram: если Telegram недоступен, заявка не теряется.
import { createServer } from 'node:http';
import { appendFile, mkdir } from 'node:fs/promises';
import { connect as netConnect } from 'node:net';
import { connect as tlsConnect } from 'node:tls';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const LIMITS = { name: 80, contact: 120, message: 1500, pkg: 80, body: 8 * 1024 };
const RATE = { windowMs: 10 * 60 * 1000, max: 5 };

export function readConfig(env = process.env) {
  return {
    port: Number(env.PORT || 8790),
    host: '127.0.0.1',
    allowedOrigins: (env.ALLOWED_ORIGINS || 'https://eclipse-forge.ru').split(',').map((s) => s.trim()).filter(Boolean),
    dataFile: env.LEADS_FILE || '/var/lib/ef-lead-api/leads.jsonl',
    botToken: env.TELEGRAM_BOT_TOKEN || '',
    chatId: env.TELEGRAM_CHAT_ID || '',
    // Например socks5h://127.0.0.1:10808 — с сервера Telegram напрямую недоступен.
    proxy: env.TELEGRAM_PROXY || '',
  };
}

const clean = (value, max) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max)
    : '';

/** Проверяет тело заявки. Возвращает { lead } или { error }. */
export function validateLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'bad_request' };
  // Поле-ловушка: человек его не видит, бот заполняет.
  if (typeof input.website === 'string' && input.website.trim() !== '') return { error: 'spam' };

  const lead = {
    name: clean(input.name, LIMITS.name),
    contact: clean(input.contact, LIMITS.contact),
    message: clean(input.message, LIMITS.message),
    pkg: clean(input.pkg, LIMITS.pkg),
    locale: input.locale === 'en' ? 'en' : 'ru',
  };
  if (lead.name.length < 2) return { error: 'name' };
  if (lead.contact.length < 5) return { error: 'contact' };
  if (input.consent !== true) return { error: 'consent' };
  return { lead };
}

export function formatLead(lead, meta) {
  return [
    'Заявка с eclipse-forge.ru',
    '',
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    lead.pkg ? `Тариф: ${lead.pkg}` : null,
    lead.message ? `\nЧто нужно:\n${lead.message}` : null,
    '',
    `Время: ${meta.receivedAt}`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export function createRateLimiter({ windowMs, max }, now = () => Date.now()) {
  const hits = new Map();
  return (key) => {
    const t = now();
    const recent = (hits.get(key) || []).filter((stamp) => t - stamp < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    recent.push(t);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, stamps] of hits) if (stamps.every((stamp) => t - stamp >= windowMs)) hits.delete(k);
    }
    return true;
  };
}

// Минимальный SOCKS5 CONNECT без авторизации: достаточно для локального прокси.
function socksConnect(proxyUrl, host, port, timeoutMs) {
  return new Promise((resolve, reject) => {
    const proxy = new URL(proxyUrl);
    const socket = netConnect({ host: proxy.hostname, port: Number(proxy.port || 1080) });
    const fail = (error) => {
      socket.destroy();
      reject(error);
    };
    socket.setTimeout(timeoutMs, () => fail(new Error('proxy timeout')));
    socket.once('error', fail);
    let stage = 0;
    let buffer = Buffer.alloc(0);
    socket.on('data', function onData(chunk) {
      buffer = Buffer.concat([buffer, chunk]);
      if (stage === 0 && buffer.length >= 2) {
        if (buffer[0] !== 5 || buffer[1] !== 0) return fail(new Error('proxy refused method'));
        buffer = buffer.subarray(2);
        stage = 1;
        const name = Buffer.from(host);
        socket.write(Buffer.concat([Buffer.from([5, 1, 0, 3, name.length]), name, Buffer.from([port >> 8, port & 255])]));
      }
      if (stage === 1 && buffer.length >= 5) {
        if (buffer[1] !== 0) return fail(new Error(`proxy connect failed: ${buffer[1]}`));
        const addrLen = buffer[3] === 1 ? 4 : buffer[3] === 4 ? 16 : buffer[4] + 1;
        if (buffer.length < 4 + addrLen + 2) return;
        socket.off('data', onData);
        socket.setTimeout(0);
        socket.off('error', fail);
        resolve(socket);
      }
    });
    socket.once('connect', () => socket.write(Buffer.from([5, 1, 0])));
  });
}

/** Отправляет текст в Telegram. Без parse_mode: текст заявки не интерпретируется как разметка. */
export async function sendTelegram(config, text, timeoutMs = 10000) {
  if (!config.botToken || !config.chatId) return { ok: false, reason: 'not_configured' };
  const host = 'api.telegram.org';
  const body = JSON.stringify({ chat_id: config.chatId, text, disable_web_page_preview: true });
  const raw = config.proxy ? await socksConnect(config.proxy, host, 443, timeoutMs) : undefined;

  return new Promise((resolve) => {
    const socket = tlsConnect({ host, port: 443, servername: host, socket: raw });
    const done = (result) => {
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(timeoutMs, () => done({ ok: false, reason: 'timeout' }));
    socket.once('error', (error) => done({ ok: false, reason: error.code || 'network' }));
    socket.once('secureConnect', () => {
      socket.write(
        `POST /bot${config.botToken}/sendMessage HTTP/1.1\r\nHost: ${host}\r\nContent-Type: application/json\r\n` +
          `Content-Length: ${Buffer.byteLength(body)}\r\nConnection: close\r\n\r\n${body}`,
      );
    });
    let head = '';
    socket.on('data', (chunk) => {
      if (head.length > 64) return;
      head += chunk.toString('latin1');
      const match = head.match(/^HTTP\/1\.[01] (\d{3})/);
      if (match) done(match[1] === '200' ? { ok: true } : { ok: false, reason: `http_${match[1]}` });
    });
    socket.once('end', () => done({ ok: false, reason: 'closed' }));
  });
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let tooLarge = false;
    const chunks = [];
    req.on('data', (chunk) => {
      if (tooLarge) return; // остаток не храним, просто дочитываем, чтобы успеть ответить 413
      size += chunk.length;
      if (size > limit) {
        tooLarge = true;
        chunks.length = 0;
        reject(new Error('too_large'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export function createApp(config, deps = {}) {
  const allow = createRateLimiter(RATE, deps.now);
  const send = deps.sendTelegram || sendTelegram;
  const store =
    deps.store ||
    (async (record) => {
      await mkdir(path.dirname(config.dataFile), { recursive: true, mode: 0o700 });
      await appendFile(config.dataFile, `${JSON.stringify(record)}\n`, { mode: 0o600 });
    });
  const log = deps.log || ((...args) => console.log(new Date().toISOString(), ...args));

  const reply = (res, status, payload) => {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(JSON.stringify(payload));
  };

  return async (req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    if (url.pathname === '/api/lead/health' && req.method === 'GET') return reply(res, 200, { ok: true });
    if (url.pathname !== '/api/lead') return reply(res, 404, { ok: false, error: 'not_found' });
    if (req.method !== 'POST') return reply(res, 405, { ok: false, error: 'method' });

    // Форма шлёт запрос со своего же адреса; чужие сайты и запросы без Origin не принимаем.
    const origin = req.headers.origin || '';
    if (!config.allowedOrigins.includes(origin)) return reply(res, 403, { ok: false, error: 'origin' });
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      return reply(res, 415, { ok: false, error: 'content_type' });
    }

    // Сервис слушает только 127.0.0.1, адрес посетителя приходит от Caddy последним в X-Forwarded-For.
    const forwarded = String(req.headers['x-forwarded-for'] || '').split(',').map((s) => s.trim()).filter(Boolean);
    const ip = forwarded[forwarded.length - 1] || req.socket.remoteAddress || 'unknown';
    if (!allow(ip)) return reply(res, 429, { ok: false, error: 'rate' });

    let input;
    try {
      input = JSON.parse(await readBody(req, LIMITS.body));
    } catch (error) {
      if (error.message === 'too_large') {
        res.setHeader('Connection', 'close');
        return reply(res, 413, { ok: false, error: 'too_large' });
      }
      return reply(res, 400, { ok: false, error: 'bad_request' });
    }

    const { lead, error } = validateLead(input);
    // Ботам отвечаем «принято», чтобы не подсказывать, что ловушка сработала.
    if (error === 'spam') return reply(res, 200, { ok: true });
    if (error) return reply(res, 422, { ok: false, error });

    const receivedAt = new Date(deps.now ? deps.now() : Date.now()).toISOString();
    try {
      await store({ receivedAt, ...lead, consent: true });
    } catch (storeError) {
      log('store failed', storeError.code || storeError.message);
      return reply(res, 500, { ok: false, error: 'server' });
    }

    try {
      const sent = await send(config, formatLead(lead, { receivedAt }));
      if (!sent.ok) log('telegram failed', sent.reason);
    } catch (sendError) {
      log('telegram failed', sendError.message);
    }
    return reply(res, 200, { ok: true });
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = readConfig();
  createServer(createApp(config)).listen(config.port, config.host, () => {
    console.log(`ef-lead-api listening on ${config.host}:${config.port}; telegram ${config.botToken && config.chatId ? 'configured' : 'NOT configured'}`);
  });
}
