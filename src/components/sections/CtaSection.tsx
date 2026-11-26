import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { PACKAGE_EVENT } from './PackagesSection';
import { contactDetails, directContacts } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { reachGoal, type MetrikaGoal } from '../../lib/metrika';
import { ConstellationField, EclipseSilhouette, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';
import { ArrowUpRightIcon, BroadcastIcon, MailIcon, TelegramIcon } from '../ui/SocialIcons';

const LEAD_ENDPOINT = '/api/lead';
const PRIVACY_URL = '/privacy/';

type FieldKey = 'name' | 'contact' | 'message';
type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = Partial<Record<FieldKey | 'consent', string>>;

type CtaCopy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  telegramHint: string;
  responseTime: string;
  channelsLabel: string;
  formLabel: string;
  formHint: string;
  emailCardLabel: string;
  channelCardLabel: string;
  phoneCardLabel: string;
  whatsappCardLabel: string;
  whatsappCardValue: string;
  maxCardLabel: string;
  maxCardValue: string;
  telegramLabel: string;
  fields: Record<FieldKey, { label: string; placeholder: string }>;
  optional: string;
  packageLabel: string;
  packageRemove: string;
  consentBefore: string;
  consentLink: string;
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
  sendAnother: string;
  errors: { name: string; contact: string; consent: string; rate: string; generic: string };
  fallback: string;
};

const ctaCopy: Record<Locale, CtaCopy> = {
  ru: {
    eyebrow: 'Обсудить проект',
    title: 'Расскажите о бизнесе.',
    titleAccent: 'Отвечу, что подойдёт и сколько стоит.',
    description: 'Оставьте имя и контакт — в течение суток напишу, какой тариф подойдёт, и предложу время созвона на 30 минут.',
    telegramHint: 'Быстрее всего отвечаю в Telegram.',
    responseTime: 'Отвечаю в течение 24 часов',
    channelsLabel: 'Контакты',
    formLabel: 'Заявка',
    formHint: 'Минута времени',
    emailCardLabel: 'Email',
    channelCardLabel: 'Telegram-канал',
    phoneCardLabel: 'Позвонить',
    whatsappCardLabel: 'WhatsApp',
    whatsappCardValue: 'Написать',
    maxCardLabel: 'MAX',
    maxCardValue: 'Написать',
    telegramLabel: 'Написать в Telegram',
    fields: {
      name: { label: 'Как к вам обращаться', placeholder: 'Имя или компания' },
      contact: { label: 'Как с вами связаться', placeholder: 'Телефон, Telegram, почта' },
      message: { label: 'Что нужно', placeholder: 'Например: сайт для гостевого дома с бронированием' },
    },
    optional: 'необязательно',
    packageLabel: 'Тариф',
    packageRemove: 'Убрать тариф из заявки',
    consentBefore: 'Согласен на обработку персональных данных по',
    consentLink: 'политике конфиденциальности',
    submit: 'Отправить заявку',
    sending: 'Отправляю…',
    successTitle: 'Заявка отправлена',
    successText: 'Отвечу в течение суток по контакту, который вы оставили.',
    sendAnother: 'Отправить ещё одну',
    errors: {
      name: 'Напишите, как к вам обращаться',
      contact: 'Оставьте телефон, Telegram или почту',
      consent: 'Без согласия отправить заявку нельзя',
      rate: 'Слишком много заявок подряд. Попробуйте через 10 минут или напишите мне напрямую:',
      generic: 'Не получилось отправить. Проверьте связь и попробуйте ещё раз или напишите мне напрямую:',
    },
    fallback: 'Telegram',
  },
  en: {
    eyebrow: 'Open the channel',
    title: 'Tell me about your business.',
    titleAccent: "I'll reply with what fits and what it costs.",
    description: 'Leave your name and a contact — within a day I will suggest a package and a time for a 30-minute call.',
    telegramHint: 'Fastest replies happen in Telegram.',
    responseTime: 'I reply within 24 hours',
    channelsLabel: 'Channels',
    formLabel: 'Request',
    formHint: 'One minute',
    emailCardLabel: 'Email',
    channelCardLabel: 'Channel',
    phoneCardLabel: 'Call',
    whatsappCardLabel: 'WhatsApp',
    whatsappCardValue: 'Message',
    maxCardLabel: 'MAX',
    maxCardValue: 'Message',
    telegramLabel: 'Message on Telegram',
    fields: {
      name: { label: 'Your name', placeholder: 'Name or company' },
      contact: { label: 'How to reach you', placeholder: 'Phone, @telegram or email' },
      message: { label: 'What you need', placeholder: 'E.g. a guest house site with booking' },
    },
    optional: 'optional',
    packageLabel: 'Package',
    packageRemove: 'Remove the package from the request',
    consentBefore: 'I agree to the processing of personal data under the',
    consentLink: 'privacy policy',
    submit: 'Send request',
    sending: 'Sending…',
    successTitle: 'Request sent',
    successText: 'I will reply within a day using the contact you left.',
    sendAnother: 'Send another',
    errors: {
      name: 'Tell me how to address you',
      contact: 'Leave a phone, Telegram or email',
      consent: 'The request cannot be sent without consent',
      rate: 'Too many requests in a row. Try again in 10 minutes or message me directly:',
      generic: 'Could not send. Check your connection and try again, or message me directly:',
    },
    fallback: 'Telegram',
  },
};

const packageNames: Record<Locale, Record<string, string>> = {
  ru: { site: 'Сайт с заявками', crm: 'Сайт + система заявок', ai: 'AI-обработка заявок' },
  en: { site: 'Site with leads', crm: 'Site + lead system', ai: 'AI lead processing' },
};

const emptyForm: Record<FieldKey, string> = { name: '', contact: '', message: '' };

function PhoneGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function ChatGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.7A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

export function CtaSection() {
  const { locale } = useLocale();
  const copy = ctaCopy[locale];

  const [form, setForm] = useState(emptyForm);
  const [pkg, setPkg] = useState('');
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState(''); // поле-ловушка для ботов, человеку не видно
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onChoose = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (packageNames[locale][id]) setPkg(id);
    };
    window.addEventListener(PACKAGE_EVENT, onChoose);
    return () => window.removeEventListener(PACKAGE_EVENT, onChoose);
  }, [locale]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const emailHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
    locale === 'ru' ? 'Запрос в Eclipse Forge' : 'Eclipse Forge request',
  )}`;

  const handleChange = (key: FieldKey, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const errors: FieldErrors = {};
    if (form.name.trim().length < 2) errors.name = copy.errors.name;
    if (form.contact.trim().length < 5) errors.contact = copy.errors.contact;
    if (!consent) errors.consent = copy.errors.consent;
    setFieldErrors(errors);
    setFormError('');

    const firstInvalid = (['name', 'contact', 'consent'] as const).find((key) => errors[key]);
    if (firstInvalid) {
      setStatus('idle');
      document.getElementById(`cta-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          message: form.message,
          pkg: pkg ? packageNames.ru[pkg] : '',
          consent: true,
          ef_hp: trap,
          locale,
        }),
      });
      if (response.ok) {
        reachGoal('lead_sent');
        setStatus('success');
        setForm(emptyForm);
        setPkg('');
        setConsent(false);
        return;
      }
      setFormError(response.status === 429 ? copy.errors.rate : copy.errors.generic);
      setStatus('error');
    } catch {
      setFormError(copy.errors.generic);
      setStatus('error');
    }
  };

  type ContactLink = { label: string; value: string; href: string; external: boolean; goal?: MetrikaGoal; Icon: typeof MailIcon };
  const socialLinks: ContactLink[] = [
    // Телефон и мессенджеры показываются, только если заданы в directContacts.
    ...(directContacts.phoneHref
      ? [{ label: copy.phoneCardLabel, value: directContacts.phone, href: directContacts.phoneHref, external: false, goal: 'click_phone' as const, Icon: PhoneGlyph }]
      : []),
    ...(directContacts.whatsappUrl
      ? [{ label: copy.whatsappCardLabel, value: copy.whatsappCardValue, href: directContacts.whatsappUrl, external: true, goal: 'click_whatsapp' as const, Icon: ChatGlyph }]
      : []),
    ...(directContacts.maxUrl
      ? [{ label: copy.maxCardLabel, value: copy.maxCardValue, href: directContacts.maxUrl, external: true, goal: 'click_max' as const, Icon: ChatGlyph }]
      : []),
    { label: copy.emailCardLabel, value: contactDetails.email, href: emailHref, external: false, goal: 'click_email', Icon: MailIcon },
    { label: copy.channelCardLabel, value: contactDetails.telegramChannel, href: contactDetails.telegramChannelUrl, external: true, Icon: BroadcastIcon },
  ];

  const fieldClass = 'contact-field w-full rounded-[0.95rem] border px-4 py-3 text-[16px] transition-colors duration-300 sm:text-[14px]';
  const focusName = () => window.setTimeout(() => document.getElementById('cta-name')?.focus(), 0);
  const labelClass = 'flex items-baseline justify-between gap-3 text-[11px] uppercase tracking-[0.22em]';

  return (
    <motion.section
      id="contact"
      className="section-shell relative overflow-hidden py-12 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute inset-0 contact-atmosphere-bg" />
      <div className="absolute inset-0 opacity-40">
        <ConstellationField className="opacity-25" />
        <ParticleField count={14} className="opacity-30" />
      </div>
      <div className="absolute left-[-10%] top-[18%] hidden lg:block opacity-15">
        <OrbitalRing size={360} dotCount={3} duration={38} color="rgba(212,175,55,0.4)" />
      </div>
      <div className="absolute bottom-[-8%] right-[-6%] hidden lg:block opacity-15">
        <EclipseSilhouette size={420} coronaColor="rgba(212,175,55,0.18)" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-8 max-w-2xl sm:mb-12">
          <p className="type-meta mb-5" style={{ color: 'rgba(212,175,55,0.95)' }}>
            {copy.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(2.15rem,4.3vw,4rem)]">
            {copy.title}
            <span className="block" style={{ color: 'var(--gold)' }}>{copy.titleAccent}</span>
          </h2>
          <p className="mt-6 type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
            {copy.description}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:gap-8">
          {/* Форма — первой: это главное действие раздела. */}
          <motion.div id="lead-form" variants={revealUp} className="min-w-0 scroll-mt-28 overflow-hidden rounded-[1.85rem] border contact-panel">
            <div className="flex items-center justify-between gap-4 border-b px-6 py-4 sm:px-7" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="type-meta" style={{ color: 'rgba(212,175,55,0.85)' }}>
                {copy.formLabel}
              </p>
              <span className="hidden text-[11px] uppercase tracking-[0.18em] sm:inline" style={{ color: 'var(--text-4)' }}>
                {copy.formHint}
              </span>
            </div>

            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="px-6 py-10 outline-none sm:px-7 sm:py-12"
              >
                <p className="font-display text-[1.5rem] tracking-tight" style={{ color: 'var(--gold)' }}>
                  {copy.successTitle}
                </p>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {copy.successText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    focusName();
                  }}
                  className="case-link-secondary mt-7 inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em]"
                >
                  {copy.sendAnother}
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="grid gap-5 px-6 py-6 sm:px-7 sm:py-7">
                <div role="status" className={pkg ? 'flex items-center gap-1 text-[13px]' : 'sr-only'} style={{ color: 'var(--text-2)' }}>
                  {pkg ? (
                    <>
                      <span className="min-w-0 flex-1">
                        <span style={{ color: 'var(--text-3)' }}>{copy.packageLabel}: </span>
                        <span style={{ color: 'var(--text-1)' }}>{packageNames[locale][pkg]}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setPkg('');
                          focusName();
                        }}
                        aria-label={copy.packageRemove}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[18px]"
                        style={{ color: 'var(--text-2)' }}
                      >
                        <span aria-hidden>×</span>
                      </button>
                    </>
                  ) : null}
                </div>
                {(['name', 'contact'] as const).map((key) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label htmlFor={`cta-${key}`} className={labelClass} style={{ color: 'var(--text-3)' }}>
                      {copy.fields[key].label}
                    </label>
                    <input
                      id={`cta-${key}`}
                      name={key}
                      value={form[key]}
                      onChange={(event) => handleChange(key, event.target.value)}
                      placeholder={copy.fields[key].placeholder}
                      autoComplete={key === 'name' ? 'name' : undefined}
                      maxLength={key === 'name' ? 80 : 120}
                      required
                      aria-invalid={fieldErrors[key] ? true : undefined}
                      aria-describedby={fieldErrors[key] ? `cta-${key}-error` : undefined}
                      className={fieldClass}
                    />
                    {fieldErrors[key] ? (
                      <p id={`cta-${key}-error`} className="contact-field-error text-[13px]">
                        {fieldErrors[key]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="cta-message" className={labelClass} style={{ color: 'var(--text-3)' }}>
                    {copy.fields.message.label}
                    <span className="normal-case tracking-normal" style={{ color: 'var(--text-3)' }}>{copy.optional}</span>
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    value={form.message}
                    onChange={(event) => handleChange('message', event.target.value)}
                    rows={3}
                    maxLength={1500}
                    placeholder={copy.fields.message.placeholder}
                    className={`${fieldClass} min-h-[96px] resize-none`}
                  />
                </div>

                {/* Ловушка для ботов: скрыта от людей и скринридеров, в Tab не попадает. */}
                <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
                  <input
                    name="ef_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-bwignore
                    data-form-type="other"
                    value={trap}
                    onChange={(event) => setTrap(event.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="cta-consent" className="flex min-h-11 cursor-pointer items-start gap-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    <input
                      id="cta-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => {
                        setConsent(event.target.checked);
                        if (fieldErrors.consent) setFieldErrors((current) => ({ ...current, consent: undefined }));
                      }}
                      required
                      aria-invalid={fieldErrors.consent ? true : undefined}
                      aria-describedby={fieldErrors.consent ? 'cta-consent-error' : undefined}
                      className="contact-consent mt-0.5 h-5 w-5 shrink-0"
                    />
                    <span>
                      {copy.consentBefore}{' '}
                      <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="package-inline-link !whitespace-normal">
                        {copy.consentLink}
                      </a>
                    </span>
                  </label>
                  {fieldErrors.consent ? (
                    <p id="cta-consent-error" className="contact-field-error text-[13px]">
                      {fieldErrors.consent}
                    </p>
                  ) : null}
                </div>

                {status === 'error' ? (
                  <p role="alert" className="contact-field-error text-[14px] leading-relaxed">
                    {formError}{' '}
                    <a href={contactDetails.telegramDmUrl} target="_blank" rel="noopener noreferrer" className="package-inline-link !whitespace-normal">
                      {copy.fallback} {contactDetails.telegramDm}
                    </a>
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className="case-link-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[14px] font-display tracking-[0.04em] transition-colors duration-300 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? copy.sending : copy.submit}
                  {status === 'sending' ? null : <span aria-hidden>→</span>}
                </button>
              </form>
            )}
          </motion.div>

          {/* Контакты — для тех, кому удобнее написать самому. */}
          <motion.div variants={revealUp} className="flex min-w-0 flex-col gap-4">
            <div className="rounded-[1.85rem] border p-6 sm:p-7 contact-panel">
              <p className="type-meta mb-5" style={{ color: 'rgba(212,175,55,0.85)' }}>
                {copy.channelsLabel}
              </p>

              <a
                href={contactDetails.telegramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal('click_telegram')}
                className="group block w-full rounded-[1.4rem] border px-5 py-5 text-left transition-colors duration-400 contact-telegram-cta"
              >
                <span className="flex items-center gap-4">
                  <span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                    style={{ borderColor: 'rgba(212,175,55,0.32)', background: 'rgba(212,175,55,0.06)' }}
                  >
                    <TelegramIcon size={18} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-base tracking-tight sm:text-[1.1rem]" style={{ color: 'var(--text-1)' }}>
                      {copy.telegramLabel}
                    </span>
                    <span className="mt-1 block text-[12px]" style={{ color: 'var(--text-3)' }}>
                      {contactDetails.telegramDm}
                    </span>
                  </span>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ borderColor: 'rgba(212,175,55,0.28)' }}
                  >
                    <ArrowUpRightIcon size={14} />
                  </span>
                </span>
              </a>

              <p className="mt-4 text-[12px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                {copy.telegramHint}
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    onClick={item.goal ? () => reachGoal(item.goal as MetrikaGoal) : undefined}
                    className="flex min-h-11 items-center gap-3 rounded-[1rem] border px-3 py-2.5 transition-colors duration-300 contact-link-card"
                  >
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <item.Icon size={13} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                        {item.label}
                      </span>
                      <span className="block truncate text-[12px]" style={{ color: 'var(--text-2)' }}>
                        {item.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: 'rgba(212,175,55,0.85)', boxShadow: '0 0 12px rgba(212,175,55,0.45)' }}
                />
                <span className="text-[12px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  {copy.responseTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
