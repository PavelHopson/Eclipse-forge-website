import { useId, useMemo, useState } from 'react';
import type { Locale } from '../../lib/locale';
import {
  leadSendingEnabled,
  newRequestId,
  overLimitField,
  sendLead,
  type LeadFields,
  type LeadSendResult,
} from '../../lib/leadDelivery';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const copy = {
  ru: {
    send: 'Отправить заявку',
    sending: 'Отправляю…',
    sent: 'Отправлено',
    consent: 'Согласен, что ответы и контакт придут Павлу Хопсону, чтобы ответить на заявку. Не пишите пароли и платёжные данные.',
    needContact: 'Чтобы отправить, укажите Telegram или email и поставьте галочку.',
    needRequest: 'Напишите хотя бы пару слов о задаче.',
    tooLong: 'Один из ответов слишком длинный — сократите до 1000 знаков.',
    success: 'Заявка дошла. Отвечу в течение суток в указанный контакт.',
    errors: {
      invalid: 'Сервер не принял заявку — проверьте контакт и ответы.',
      rate_limited: 'Слишком много заявок подряд. Напишите в Telegram — кнопка ниже.',
      network: 'Не получилось отправить. Ответы сохранены в форме — нажмите ещё раз или напишите в Telegram.',
      server: 'Не получилось отправить. Нажмите ещё раз или напишите в Telegram — кнопка ниже.',
    } satisfies Record<Exclude<LeadSendResult, { ok: true }>['reason'], string>,
    or: 'Или напрямую:',
  },
  en: {
    send: 'Send request',
    sending: 'Sending…',
    sent: 'Sent',
    consent: 'I agree that my answers and contact go to Pavel Hopson to reply to this request. Do not enter passwords or payment data.',
    needContact: 'To send, add your Telegram or email and tick the box.',
    needRequest: 'Write at least a few words about the task.',
    tooLong: 'One of the answers is too long — keep it under 1000 characters.',
    success: 'Request received. I will reply within a day to the contact you gave.',
    errors: {
      invalid: 'The server rejected the request — check the contact and answers.',
      rate_limited: 'Too many requests in a row. Message me on Telegram — button below.',
      network: 'Could not send. Your answers are kept — try again or message me on Telegram.',
      server: 'Could not send. Try again or message me on Telegram — button below.',
    } satisfies Record<Exclude<LeadSendResult, { ok: true }>['reason'], string>,
    or: 'Or directly:',
  },
} as const;

/**
 * Кнопка «Отправить заявку» для формы контакта.
 * Рендерится только когда при сборке задан VITE_LEAD_ENDPOINT; иначе форма остаётся прежней.
 */
export function LeadSubmitPanel({ form, locale }: { form: LeadFields; locale: Locale }) {
  const text = copy[locale];
  const consentId = useId();
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  // Один ID на одну версию ответов: повтор после ошибки не создаёт дубль, изменённые ответы — новая заявка.
  const snapshot = useMemo(() => JSON.stringify(form), [form]);
  const [request, setRequest] = useState<{ snapshot: string; id: string; sent: boolean }>({ snapshot: '', id: '', sent: false });

  if (!leadSendingEnabled) return null;

  const alreadySent = request.sent && request.snapshot === snapshot;
  const hasContact = form.contact.trim().length >= 3;
  const hasRequest = [form.manual, form.loss, form.result].some((value) => value.trim().length > 0);
  const tooLong = overLimitField(form) !== null;
  const canSend = hasContact && hasRequest && consent && !tooLong && status !== 'sending' && !alreadySent;

  const hint = tooLong ? text.tooLong : !hasContact || !consent ? text.needContact : !hasRequest ? text.needRequest : '';

  const handleSend = async () => {
    if (!canSend) return;
    const id = request.snapshot === snapshot && request.id ? request.id : newRequestId();
    setRequest({ snapshot, id, sent: false });
    setStatus('sending');
    setMessage('');
    const result = await sendLead(form, { requestId: id, locale, website });
    if (result.ok) {
      setRequest({ snapshot, id, sent: true });
      setStatus('sent');
      setMessage(text.success);
    } else {
      setStatus('error');
      setMessage(text.errors[result.reason]);
    }
  };

  const shownStatus = alreadySent ? 'sent' : status === 'sent' ? 'idle' : status;

  return (
    <div className="mb-5 flex flex-col gap-4 border-b pb-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      {/* Ловушка для ботов: человек это поле не видит. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor={consentId} className="flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0"
          style={{ accentColor: 'var(--gold)' }}
        />
        <span>{text.consent}</span>
      </label>

      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        aria-disabled={!canSend}
        className="case-link-primary inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[13px] font-display tracking-[0.04em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {shownStatus === 'sending' ? text.sending : shownStatus === 'sent' ? text.sent : text.send}
        {shownStatus === 'idle' || shownStatus === 'error' ? <span aria-hidden>→</span> : null}
      </button>

      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] text-[12px] leading-relaxed"
        style={{ color: shownStatus === 'error' ? 'var(--text-1)' : shownStatus === 'sent' ? 'var(--gold)' : 'var(--text-3)' }}
      >
        {shownStatus === 'sent' || shownStatus === 'error' ? message : hint}
      </p>

      <p className="type-meta" style={{ color: 'var(--text-3)' }}>{text.or}</p>
    </div>
  );
}
