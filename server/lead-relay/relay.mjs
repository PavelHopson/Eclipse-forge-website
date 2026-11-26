// Приёмник заявок с лендинга eclipse-forge.ru.
// Получатель выбирается ОДНОЙ настройкой: LEAD_RECIPIENT = stub | telegram | email.
// Секреты (токен бота, пароль почты) живут только в окружении сервиса на VPS, не в сборке сайта.
// Зависимостей нет; для email нужен пакет nodemailer (ставится на VPS, только если выбрана почта).

import { appendFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

export const RECIPIENTS = ['stub', 'telegram', 'email'];

export const LIMITS = {
  name: 120,
  manual: 1000,
  loss: 1000,
  result: 1000,
  contact: 200,
  page: 300,
  utmValue: 100,
  bodyBytes: 16 * 1024,
};

const TEXT_FIELDS = ['name', 'manual', 'loss', 'result', 'contact'];
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const REQUEST_ID = /^[A-Za-z0-9-]{8,64}$/;

/** Проверка и нормализация тела заявки. Лишние поля отбрасываются. */
export function validateLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false, error: 'invalid_body' };

  // Honeypot: живой человек это поле не видит и не заполняет.
  if (typeof body.website === 'string' && body.website.trim() !== '') return { ok: false, error: 'spam' };
  if (body.consent !== true) return { ok: false, error: 'consent_required' };

  const lead = {};
  for (const key of TEXT_FIELDS) {
    const value = typeof body[key] === 'string' ? body[key].trim() : '';
    if (value.length > LIMITS[key]) return { ok: false, error: `too_long:${key}` };
    lead[key] = value;
  }
  if (lead.contact.length < 3) return { ok: false, error: 'contact_required' };
  if (!lead.manual && !lead.loss && !lead.result) return { ok: false, error: 'empty_request' };

  if (typeof body.requestId !== 'string' || !REQUEST_ID.test(body.requestId)) {
    return { ok: false, error: 'invalid_request_id' };
  }
  lead.requestId = body.requestId;
  lead.locale = body.locale === 'en' ? 'en' : 'ru';
  lead.page = typeof body.page === 'string' ? body.page.slice(0, LIMITS.page) : '';

  lead.utm = {};
  if (body.utm && typeof body.utm === 'object') {
    for (const key of UTM_KEYS) {
      const value = body.utm[key];
      if (typeof value === 'string' && value.trim()) lead.utm[key] = value.trim().slice(0, LIMITS.utmValue);
    }
  }
  return { ok: true, lead };
}

/** Текст сообщения для человека. Без разметки, чтобы ввод клиента не превратился в форматирование или ссылки-кнопки. */
export function formatLead(lead, receivedAt = new Date()) {
  const line = (label, value) => `${label}: ${value || '—'}`;
  const utm = Object.entries(lead.utm).map(([key, value]) => `${key}=${value}`).join(' ');
  return [
    'Новая заявка с eclipse-forge.ru',
    '',
    line('Имя', lead.name),
    line('Контакт', lead.contact),
    '',
    line('Чем занимается', lead.manual),
    line('Что мешает', lead.loss),
    line('Что нужно', lead.result),
    '',
    line('Источник', utm || 'без UTM'),
    line('Страница', lead.page),
    line('Язык', lead.locale),
    line('Получено', receivedAt.toISOString()),
    line('ID', lead.requestId),
  ].join('\n');
}

/** Читает настройки из окружения и падает сразу, если выбранному получателю чего-то не хватает. */
export function readConfig(env = process.env) {
  const recipient = (env.LEAD_RECIPIENT ?? 'stub').trim();
  if (!RECIPIENTS.includes(recipient)) {
    throw new Error(`LEAD_RECIPIENT должен быть одним из: ${RECIPIENTS.join(', ')}`);
  }
  const need = (name) => {
    const value = (env[name] ?? '').trim();
    if (!value) throw new Error(`Для LEAD_RECIPIENT=${recipient} нужна переменная ${name}`);
    return value;
  };
  const config = {
    recipient,
    port: Number(env.LEAD_PORT ?? 8787),
    host: env.LEAD_HOST ?? '127.0.0.1',
    allowedOrigins: (env.LEAD_ALLOWED_ORIGINS ?? 'https://eclipse-forge.ru')
      .split(',').map((item) => item.trim()).filter(Boolean),
    rateLimit: { max: Number(env.LEAD_RATE_MAX ?? 5), windowMs: Number(env.LEAD_RATE_WINDOW_MS ?? 10 * 60 * 1000) },
  };
  if (recipient === 'stub') config.stubFile = env.LEAD_STUB_FILE ?? join(tmpdir(), 'ef-lead-relay-stub.jsonl');
  if (recipient === 'telegram') {
    config.telegram = { token: need('TELEGRAM_BOT_TOKEN'), chatId: need('TELEGRAM_CHAT_ID') };
  }
  if (recipient === 'email') {
    config.email = {
      host: need('SMTP_HOST'),
      port: Number(env.SMTP_PORT ?? 465),
      user: need('SMTP_USER'),
      pass: need('SMTP_PASS'),
      from: env.LEAD_EMAIL_FROM ?? need('SMTP_USER'),
      to: need('LEAD_EMAIL_TO'),
    };
  }
  return config;
}

/** Адаптеры получателей. Каждый либо доставил, либо бросил ошибку — «молча потерять» нельзя. */
export function createDeliver(config, deps = {}) {
  const fetchImpl = deps.fetch ?? globalThis.fetch;

  if (config.recipient === 'stub') {
    return async (lead, text) => {
      await appendFile(config.stubFile, `${JSON.stringify({ receivedAt: new Date().toISOString(), lead, text })}\n`, 'utf8');
    };
  }

  if (config.recipient === 'telegram') {
    const url = `https://api.telegram.org/bot${config.telegram.token}/sendMessage`;
    return async (_lead, text) => {
      const response = await fetchImpl(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: config.telegram.chatId, text, disable_web_page_preview: true }),
        signal: AbortSignal.timeout(10_000),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) throw new Error(`telegram_failed:${response.status}`);
    };
  }

  // email
  let transportPromise;
  const getTransport = async () => {
    if (deps.mailer) return deps.mailer;
    transportPromise ??= import('nodemailer').then(({ default: nodemailer }) => nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: { user: config.email.user, pass: config.email.pass },
    }));
    return transportPromise;
  };
  return async (lead, text) => {
    const transport = await getTransport();
    await transport.sendMail({
      from: config.email.from,
      to: config.email.to,
      subject: `Заявка с eclipse-forge.ru — ${lead.name || lead.contact}`.slice(0, 150),
      text,
    });
  };
}

/** Логика одной заявки без HTTP: проверка, защита от повтора, доставка. */
export function createLeadHandler(config, deps = {}) {
  const deliver = deps.deliver ?? createDeliver(config, deps);
  const now = deps.now ?? (() => Date.now());
  const delivered = new Map(); // requestId → id; повтор той же заявки не уходит второй раз
  const hits = new Map(); // ip → [timestamps]

  return async function handleLead(body, meta = {}) {
    const ip = meta.ip ?? 'unknown';
    const windowStart = now() - config.rateLimit.windowMs;
    const recent = (hits.get(ip) ?? []).filter((time) => time > windowStart);
    if (recent.length >= config.rateLimit.max) return { status: 429, body: { ok: false, error: 'rate_limited' } };
    recent.push(now());
    hits.set(ip, recent);

    const result = validateLead(body);
    if (!result.ok) {
      // Боту отвечаем так же, как человеку при успехе, чтобы не учить его обходить ловушку.
      if (result.error === 'spam') return { status: 201, body: { ok: true, id: randomUUID() } };
      return { status: 400, body: { ok: false, error: result.error } };
    }

    const { lead } = result;
    const known = delivered.get(lead.requestId);
    if (known) return { status: 200, body: { ok: true, id: known, duplicate: true } };

    try {
      await deliver(lead, formatLead(lead, new Date(now())));
    } catch (error) {
      (deps.log ?? console.error)(`[lead-relay] доставка не удалась (${config.recipient}): ${error.message}`);
      return { status: 502, body: { ok: false, error: 'delivery_failed' } };
    }

    const id = randomUUID();
    delivered.set(lead.requestId, id);
    if (delivered.size > 1000) delivered.delete(delivered.keys().next().value);
    return { status: 201, body: { ok: true, id } };
  };
}

/** HTTP-обёртка: POST /api/lead, JSON, лимит тела, проверка Origin. Ставится за Caddy (reverse_proxy). */
export function createLeadServer(config, deps = {}) {
  const handleLead = createLeadHandler(config, deps);

  return createServer(async (req, res) => {
    const origin = req.headers.origin;
    const originAllowed = typeof origin === 'string' && config.allowedOrigins.includes(origin);
    const send = (status, payload) => {
      const headers = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
      if (originAllowed) {
        headers['access-control-allow-origin'] = origin;
        headers.vary = 'Origin';
      }
      res.writeHead(status, headers);
      res.end(payload === undefined ? '' : JSON.stringify(payload));
    };

    const path = (req.url ?? '').split('?')[0];
    if (path !== '/api/lead') return send(404, { ok: false, error: 'not_found' });
    if (!originAllowed) return send(403, { ok: false, error: 'origin_forbidden' });

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'POST',
        'access-control-allow-headers': 'content-type',
        'access-control-max-age': '600',
        vary: 'Origin',
      });
      return res.end();
    }
    if (req.method !== 'POST') return send(405, { ok: false, error: 'method_not_allowed' });
    if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) {
      return send(415, { ok: false, error: 'json_required' });
    }

    let size = 0;
    const chunks = [];
    let tooLarge = false;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > LIMITS.bodyBytes) {
        tooLarge = true;
        break;
      }
      chunks.push(chunk);
    }
    if (tooLarge) return send(413, { ok: false, error: 'too_large' });

    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      return send(400, { ok: false, error: 'invalid_json' });
    }

    // За Caddy реальный IP приходит в X-Forwarded-For; сервис слушает только 127.0.0.1.
    const forwarded = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim();
    const result = await handleLead(body, { ip: forwarded || req.socket.remoteAddress });
    return send(result.status, result.body);
  });
}
