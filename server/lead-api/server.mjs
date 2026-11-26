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
const RATE = { windowMs: 10 * 60 * 1000, max: 5, maxKeys: 5000 };
const GLOBAL_RATE = { windowMs: 60 * 60 * 1000, max: 60 };
const TELEGRAM_RETRY_DELAYS_MS = [0, 5000, 30000];
// Поле-ловушка: в форме скрыто от людей. Имя нейтральное, чтобы автозаполнение его не трогало.
export const HONEYPOT_FIELD = 'ef_hp';

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

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
// Невидимые символы и переключатели направления письма: ими подделывают вид текста.
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

const wellFormed = (value) => (typeof value.toWellFormed === 'function' ? value.toWellFormed() : value);

/** Многострочный текст: переводы строк остаются. */
const cleanText = (value, max) =>
  typeof value === 'string'
    ? wellFormed(wellFormed(value).replace(CONTROL, '').replace(INVISIBLE, '').trim().slice(0, max)).replace(/\uFFFD$/, '')
    : '';

/** Однострочное поле: любые пробелы и переводы строк схлопываются, чтобы нельзя было подделать соседнее поле. */
const cleanLine = (value, max) => (typeof value === 'string' ? cleanText(value.replace(/\s+/g, ' '), max) : '');

/** Проверяет тело заявки. Возвращает { lead, spam } или { error }. */
export function validateLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'bad_request' };

  const lead = {
    name: cleanLine(input.name, LIMITS.name),
    contact: cleanLine(input.contact, LIMITS.contact),
    message: cleanText(input.message, LIMITS.message),
    pkg: cleanLine(input.pkg, LIMITS.pkg),
    locale: input.locale === 'en' ? 'en' : 'ru',
  };
  const spam = typeof input[HONEYPOT_FIELD] === 'string' && input[HONEYPOT_FIELD].trim() !== '';
  if (lead.name.length < 2) return { error: 'name', spam };
  if (lead.contact.length < 5) return { error: 'contact', spam };
  if (input.consent !== true) return { error: 'consent', spam };
  return { lead, spam };
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

/** Ключ лимита: IPv4 целиком, IPv6 — по сети /64, иначе лимит обходится перебором адресов. */
export function rateKey(ip) {
  if (!ip.includes(':')) return ip;
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) return mapped[1];
  const [head, tail = ''] = ip.split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const groups = ip.includes('::') ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right] : left;
  return `${groups.slice(0, 4).join(':')}::/64`;
}

export function createRateLimiter({ windowMs, max, maxKeys = Infinity }, now = () => Date.now()) {
  const hits = new Map();
  const prune = () => {
    const t = now();
    for (const [key, stamps] of hits) if (stamps.every((stamp) => t - stamp >= windowMs)) hits.delete(key);
  };
  const allow = (key) => {
    const t = now();
    const recent = (hits.get(key) || []).filter((stamp) => t - stamp < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    if (!hits.has(key) && hits.size >= maxKeys) {
      prune();
      // Таблица заполнена свежими адресами — это поток запросов; новых не принимаем, память не растёт.
      if (hits.size >= maxKeys) return false;
    }
    recent.push(t);
    hits.set(key, recent);
    return true;
  };
  allow.prune = prune;
  return allow;
}

// Минимальный SOCKS5 CONNECT без авторизации: достаточно для локального прокси.
function socksConnect(proxyUrl, host, port, timeoutMs) {
  return new Promise((resolve, reject) => {
    const proxy = new URL(proxyUrl);
    const socket = netConnect({ host: proxy.hostname, port: Number(proxy.port || 1080) });
    let settled = false;
    const fail = (error) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(error);
    };
    const onClose = () => fail(new Error('proxy closed'));
    socket.setTimeout(timeoutMs, () => fail(new Error('proxy timeout')));
    socket.on('error', fail);
    socket.once('close', onClose);
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
        if (settled) return;
        settled = true;
        socket.off('data', onData);
        socket.off('error', fail);
        socket.off('close', onClose);
        socket.setTimeout(0);
        resolve(socket);
      }
    });
    socket.once('connect', () => socket.write(Buffer.from([5, 1, 0])));
  });
}

/** Отправляет текст в Telegram. Без parse_mode: текст заявки не интерпретируется как разметка. */
export function sendTelegram(config, text, timeoutMs = 10000) {
  if (!config.botToken || !config.chatId) return Promise.resolve({ ok: false, reason: 'not_configured' });
  const host = 'api.telegram.org';
  const body = JSON.stringify({ chat_id: config.chatId, text, disable_web_page_preview: true });

  return new Promise((resolve) => {
    let socket;
    let settled = false;
    const done = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadline);
      socket?.destroy();
      resolve(result);
    };
    // Общий срок на всю отправку: прокси, TLS и ответ вместе.
    const deadline = setTimeout(() => done({ ok: false, reason: 'timeout' }), timeoutMs);

    const open = (raw) => {
      if (settled) return raw?.destroy();
      socket = tlsConnect({ host, port: 443, servername: host, socket: raw });
      socket.on('error', (error) => done({ ok: false, reason: error.code || 'network' }));
      socket.once('close', () => done({ ok: false, reason: 'closed' }));
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
    };

    if (config.proxy) {
      socksConnect(config.proxy, host, 443, timeoutMs).then(open, (error) => done({ ok: false, reason: error.message }));
    } else {
      open(undefined);
    }
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
  const now = deps.now || (() => Date.now());
  const allow = createRateLimiter(RATE, now);
  const allowGlobal = createRateLimiter(GLOBAL_RATE, now);
  const send = deps.sendTelegram || sendTelegram;
  const retryDelays = deps.retryDelays || TELEGRAM_RETRY_DELAYS_MS;
  const store =
    deps.store ||
    (async (record) => {
      await mkdir(path.dirname(config.dataFile), { recursive: true, mode: 0o700 });
      await appendFile(config.dataFile, `${JSON.stringify(record)}\n`, { mode: 0o600 });
    });
  const log = deps.log || ((...args) => console.log(new Date().toISOString(), ...args));

  const reply = (res, status, payload) => {
    if (res.headersSent) return;
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(JSON.stringify(payload));
  };

  // Отправка в Telegram идёт в фоне: посетитель получает ответ сразу после записи заявки в файл.
  const notify = async (text) => {
    for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
      if (retryDelays[attempt] > 0) await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt]));
      try {
        const sent = await send(config, text);
        if (sent.ok) return;
        log(`telegram failed (attempt ${attempt + 1}/${retryDelays.length})`, sent.reason);
        if (sent.reason === 'not_configured') return;
      } catch (error) {
        log(`telegram failed (attempt ${attempt + 1}/${retryDelays.length})`, error.message);
      }
    }
    log('telegram gave up: the lead is in the file only');
  };

  const handle = async (req, res) => {
    const pathname = String(req.url || '/').split('?')[0];
    if (pathname === '/api/lead/health' && req.method === 'GET') return reply(res, 200, { ok: true });
    if (pathname !== '/api/lead') return reply(res, 404, { ok: false, error: 'not_found' });
    if (req.method !== 'POST') return reply(res, 405, { ok: false, error: 'method' });

    // Форма шлёт запрос со своего же адреса; чужие сайты и запросы без Origin не принимаем.
    const origin = req.headers.origin || '';
    if (!config.allowedOrigins.includes(origin)) return reply(res, 403, { ok: false, error: 'origin' });
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      return reply(res, 415, { ok: false, error: 'content_type' });
    }

    // Сервис слушает только 127.0.0.1. Caddy отбрасывает X-Forwarded-For клиента и пишет адрес сам,
    // поэтому последний элемент — настоящий адрес посетителя.
    const forwarded = String(req.headers['x-forwarded-for'] || '').split(',').map((s) => s.trim()).filter(Boolean);
    const ip = forwarded[forwarded.length - 1] || req.socket.remoteAddress || 'unknown';
    if (!allow(rateKey(ip))) return reply(res, 429, { ok: false, error: 'rate' });

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

    const { lead, error, spam } = validateLead(input);
    // Сработала ловушка, а заявка неполная: отвечаем «принято», чтобы не подсказывать боту.
    if (error && spam) return reply(res, 200, { ok: true });
    if (error) return reply(res, 422, { ok: false, error });

    // Общий потолок на случай потока заявок с разных адресов: бережёт диск и Telegram.
    if (!allowGlobal('all')) return reply(res, 429, { ok: false, error: 'rate' });

    const receivedAt = new Date(now()).toISOString();
    try {
      // Заявку с заполненной ловушкой сохраняем с пометкой, но не шлём: автозаполнение браузера
      // иногда заполняет скрытые поля, и настоящая заявка не должна пропасть бесследно.
      await store({ receivedAt, ...lead, consent: true, ...(spam ? { spam: true } : {}) });
    } catch (storeError) {
      log('store failed', storeError.code || storeError.message);
      return reply(res, 500, { ok: false, error: 'server' });
    }

    reply(res, 200, { ok: true });
    if (spam) {
      log('honeypot filled: stored with spam flag, not sent');
      return undefined;
    }
    const pending = notify(formatLead(lead, { receivedAt }));
    if (deps.onNotify) deps.onNotify(pending);
    return undefined;
  };

  const app = (req, res) => {
    handle(req, res).catch((error) => {
      log('handler failed', error.message);
      reply(res, 500, { ok: false, error: 'server' });
    });
  };
  app.pruneRateLimits = () => {
    allow.prune();
    allowGlobal.prune();
  };
  return app;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = readConfig();
  const app = createApp(config);
  const server = createServer(app);
  // Медленные и висящие соединения не должны занимать сервис.
  server.headersTimeout = 10_000;
  server.requestTimeout = 15_000;
  server.keepAliveTimeout = 5_000;
  server.maxConnections = 100;
  setInterval(app.pruneRateLimits, 60_000).unref();
  server.listen(config.port, config.host, () => {
    console.log(`ef-lead-api listening on ${config.host}:${config.port}; telegram ${config.botToken && config.chatId ? 'configured' : 'NOT configured'}`);
  });
}
