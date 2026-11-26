// Отправка заявки с лендинга в relay (server/lead-relay).
// Включение: адрес relay задаётся при сборке в VITE_LEAD_ENDPOINT (обычно `/api/lead` за Caddy).
// Пусто → форма работает как раньше (копировать ответы + Telegram/почта), ничего никуда не отправляется.
// Куда relay пересылает заявку (Telegram / почта / заглушка) — решается на сервере одной настройкой LEAD_RECIPIENT.

const env = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {});

export const leadEndpoint = (env.VITE_LEAD_ENDPOINT ?? '').trim();
export const leadSendingEnabled = leadEndpoint.length > 0;

export const LEAD_LIMITS = { name: 120, manual: 1000, loss: 1000, result: 1000, contact: 200 } as const;

export type LeadFields = { name: string; manual: string; loss: string; result: string; contact: string };

export type LeadSendResult =
  | { ok: true; id: string }
  | { ok: false; reason: 'invalid' | 'rate_limited' | 'network' | 'server' };

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export function readUtm(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 100);
  }
  return utm;
}

export function newRequestId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Первое поле, превышающее лимит relay, — чтобы не отправлять заведомо отклоняемую заявку. */
export function overLimitField(fields: LeadFields): keyof LeadFields | null {
  for (const key of Object.keys(LEAD_LIMITS) as (keyof LeadFields)[]) {
    if (fields[key].trim().length > LEAD_LIMITS[key]) return key;
  }
  return null;
}

export async function sendLead(
  fields: LeadFields,
  options: { requestId: string; locale: 'ru' | 'en'; website: string },
): Promise<LeadSendResult> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(leadEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...fields,
        consent: true,
        website: options.website,
        requestId: options.requestId,
        locale: options.locale,
        page: `${window.location.pathname}${window.location.hash}`,
        utm: readUtm(window.location.search),
      }),
      signal: controller.signal,
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; id?: string };
    if (response.ok && data.ok === true) return { ok: true, id: data.id ?? '' };
    if (response.status === 429) return { ok: false, reason: 'rate_limited' };
    if (response.status === 400) return { ok: false, reason: 'invalid' };
    return { ok: false, reason: 'server' };
  } catch {
    return { ok: false, reason: 'network' };
  } finally {
    window.clearTimeout(timer);
  }
}
