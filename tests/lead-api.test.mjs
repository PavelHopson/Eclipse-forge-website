import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import test from 'node:test';
import { createApp, createRateLimiter, formatLead, rateKey, validateLead } from '../server/lead-api/server.mjs';

const valid = { name: 'Анна', contact: '+7 900 000-00-00', message: 'Нужен сайт', pkg: 'Сайт с заявками', consent: true };

async function withApp(deps, run) {
  const stored = [];
  const sent = [];
  const pending = [];
  const app = createApp(
    { allowedOrigins: ['https://eclipse-forge.ru'], dataFile: 'unused', botToken: 't', chatId: 'c', proxy: '' },
    {
      store: async (record) => stored.push(record),
      sendTelegram: async (_config, text) => {
        sent.push(text);
        return { ok: true };
      },
      log: () => {},
      retryDelays: [0, 0],
      onNotify: (promise) => pending.push(promise),
      ...deps,
    },
  );
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  let caller = 0;
  // У каждого запроса свой адрес, чтобы лимит на адрес не мешал остальным проверкам.
  // Telegram шлётся в фоне после ответа, поэтому перед проверками дожидаемся отправки.
  const post = async (body, headers = {}) => {
    const response = await send(body, headers);
    await Promise.all(pending.splice(0));
    return response;
  };
  const send = (body, headers = {}) =>
    fetch(`${base}/api/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://eclipse-forge.ru',
        'X-Forwarded-For': `198.51.100.${(caller += 1)}`,
        ...headers,
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  try {
    await run({ post, base, stored, sent });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('lead validation requires name, contact and consent and trims input', () => {
  assert.equal(validateLead({ ...valid, name: ' ' }).error, 'name');
  assert.equal(validateLead({ ...valid, contact: 'ab' }).error, 'contact');
  assert.equal(validateLead({ ...valid, consent: 'yes' }).error, 'consent');
  assert.equal(validateLead({ ...valid, ef_hp: 'http://spam' }).spam, true);
  assert.equal(validateLead(valid).spam, false);
  assert.equal(validateLead([]).error, 'bad_request');
  const { lead } = validateLead({ ...valid, name: `  ${'я'.repeat(200)}`, message: 'a\u0000b\u0007c' });
  assert.equal(lead.name.length, 80);
  assert.equal(lead.message, 'abc');
});

test('single-line fields cannot fake another field or hide text direction', () => {
  const { lead } = validateLead({ ...valid, name: 'Иван\nКонтакт: +7 000', contact: '\u202E+7 900 000-00-00\u200B', message: 'строка 1\nстрока 2' });
  assert.equal(lead.name, 'Иван Контакт: +7 000');
  assert.equal(lead.contact, '+7 900 000-00-00');
  assert.equal(lead.message, 'строка 1\nстрока 2');
  const cut = validateLead({ ...valid, name: `${'я'.repeat(79)}😀` }).lead.name;
  assert.equal(cut.isWellFormed(), true);
});

test('rate key groups IPv6 addresses by /64 network', () => {
  assert.equal(rateKey('203.0.113.9'), '203.0.113.9');
  assert.equal(rateKey('::ffff:203.0.113.9'), '203.0.113.9');
  assert.equal(rateKey('2001:db8:1:2:aaaa:bbbb:cccc:dddd'), rateKey('2001:db8:1:2::1'));
  assert.notEqual(rateKey('2001:db8:1:2::1'), rateKey('2001:db8:1:3::1'));
});

test('lead message is plain text with every submitted field', () => {
  const text = formatLead(validateLead(valid).lead, { receivedAt: '2026-11-26T10:00:00.000Z' });
  assert.match(text, /Имя: Анна/);
  assert.match(text, /Контакт: \+7 900 000-00-00/);
  assert.match(text, /Тариф: Сайт с заявками/);
  assert.match(text, /Нужен сайт/);
});

test('rate limiter blocks after the limit and recovers after the window', () => {
  let now = 0;
  const allow = createRateLimiter({ windowMs: 1000, max: 2 }, () => now);
  assert.equal(allow('ip'), true);
  assert.equal(allow('ip'), true);
  assert.equal(allow('ip'), false);
  assert.equal(allow('other'), true);
  now = 1500;
  assert.equal(allow('ip'), true);

  const capped = createRateLimiter({ windowMs: 1000, max: 5, maxKeys: 2 }, () => now);
  assert.equal(capped('a'), true);
  assert.equal(capped('b'), true);
  assert.equal(capped('c'), false);
  assert.equal(capped('a'), true);
  now = 3000;
  assert.equal(capped('c'), true);
});

test('lead endpoint stores first, then notifies, and rejects foreign or malformed requests', async () => {
  await withApp({}, async ({ post, base, stored, sent }) => {
    const ok = await post(valid);
    assert.equal(ok.status, 200);
    assert.deepEqual(await ok.json(), { ok: true });
    assert.equal(stored.length, 1);
    assert.equal(stored[0].contact, valid.contact);
    assert.equal(sent.length, 1);

    assert.equal((await post(valid, { Origin: 'https://evil.example' })).status, 403);
    assert.equal((await post(valid, { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await post('{not json')).status, 400);
    assert.equal((await post({ ...valid, consent: false })).status, 422);
    assert.equal((await post({ ...valid, message: 'x'.repeat(20000) })).status, 413);
    assert.equal((await fetch(`${base}/api/lead`)).status, 405);
    assert.equal((await fetch(`${base}/api/other`)).status, 404);
    assert.equal(stored.length, 1);
  });
});

test('a filled honeypot is kept with a spam flag and never sent, so a real lead is not lost silently', async () => {
  await withApp({}, async ({ post, stored, sent }) => {
    const response = await post({ ...valid, ef_hp: 'http://spam.example' });
    assert.equal(response.status, 200);
    assert.equal(stored.length, 1);
    assert.equal(stored[0].spam, true);
    assert.equal(sent.length, 0);

    const incomplete = await post({ name: 'x', ef_hp: 'bot' });
    assert.equal(incomplete.status, 200);
    assert.equal(stored.length, 1);
  });
});

test('a malformed path or a throwing dependency never crashes the handler', async () => {
  await withApp({}, async ({ base }) => {
    assert.equal((await fetch(`${base}//`)).status, 404);
    assert.equal((await fetch(`${base}/api/lead/health`)).status, 200);
  });
});

test('Telegram is retried in the background and the visitor is not kept waiting', async () => {
  let attempts = 0;
  await withApp(
    {
      sendTelegram: async () => {
        attempts += 1;
        return attempts < 2 ? { ok: false, reason: 'timeout' } : { ok: true };
      },
    },
    async ({ post, stored }) => {
      assert.equal((await post(valid)).status, 200);
      assert.equal(stored.length, 1);
      assert.equal(attempts, 2);
    },
  );
});

test('a Telegram failure does not lose the lead, a storage failure is reported', async () => {
  await withApp({ sendTelegram: async () => ({ ok: false, reason: 'timeout' }) }, async ({ post, stored }) => {
    assert.equal((await post(valid)).status, 200);
    assert.equal(stored.length, 1);
  });
  await withApp(
    {
      store: async () => {
        throw new Error('disk');
      },
    },
    async ({ post, sent }) => {
      assert.equal((await post(valid)).status, 500);
      assert.equal(sent.length, 0);
    },
  );
});

test('requests over the per-address limit are refused', async () => {
  await withApp({}, async ({ post }) => {
    const statuses = [];
    for (let i = 0; i < 7; i += 1) statuses.push((await post(valid, { 'X-Forwarded-For': '203.0.113.9' })).status);
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429, 429]);
  });
});
