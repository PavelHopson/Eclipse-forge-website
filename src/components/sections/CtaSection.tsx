import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { contactDetails, useSiteContent } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { ConstellationField, EclipseSilhouette, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';
import {
  ArrowUpRightIcon,
  BroadcastIcon,
  GitHubIcon,
  InstagramIcon,
  MailIcon,
  TelegramIcon,
} from '../ui/SocialIcons';

type FormField = {
  key: 'name' | 'manual' | 'loss' | 'result' | 'contact';
  label: string;
  placeholder: string;
  multiline?: boolean;
};

type CtaCopy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  telegramHint: string;
  requestChannel: string;
  responseWindow: string;
  responseTime: string;
  cityTimezone: string;
  intakeSignal: string;
  intakeStatusLabel: string;
  consoleLabel: string;
  liveIntake: string;
  signalPacket: string;
  awaitingInput: string;
  readyLabel: string;
  signalCopiedLabel: string;
  emailCardLabel: string;
  channelCardLabel: string;
  githubCardLabel: string;
  instagramCardLabel: string;
  whyTitle: string;
  whyText: string;
  packetHeader: string;
  emptyAnswer: string;
  telegramLabel: string;
  copyPacketLabel: string;
  otherLinksLabel: string;
  fields: FormField[];
};

const ctaCopy: Record<Locale, CtaCopy> = {
  ru: {
    eyebrow: 'Контактная консоль',
    title: 'Опишите задачу.',
    titleAccent: 'Разберём и превратим в систему.',
    description:
      'Опишите процесс, который сейчас делается вручную. Этого достаточно, чтобы я понял, где теряется время, деньги или контроль, и предложил системный контур вместо очередного набора экранов.',
    telegramHint: 'Самый быстрый канал, чтобы запустить разговор по задаче.',
    requestChannel: 'Канал запроса',
    responseWindow: 'Окно ответа',
    responseTime: 'Ответ в течение 24 часов',
    cityTimezone: 'Калининград · UTC+2',
    intakeSignal: 'Входящий сигнал',
    intakeStatusLabel: 'статус',
    consoleLabel: 'eclipse://intake-console',
    liveIntake: 'живой intake',
    signalPacket: 'Сигнальный пакет',
    awaitingInput: 'жду ввод',
    readyLabel: 'готово',
    signalCopiedLabel: 'Сигнал скопирован',
    emailCardLabel: 'Email',
    channelCardLabel: 'Канал',
    githubCardLabel: 'GitHub',
    instagramCardLabel: 'Instagram',
    whyTitle: 'Почему так',
    whyText:
      'Так разговор сразу начинается с процесса и результата. Не с абстрактного “нужен сайт”, а с того, что именно нужно автоматизировать, контролировать и доводить до действия.',
    packetHeader: 'Eclipse Forge / Сигнал запроса',
    emptyAnswer: 'не заполнено',
    telegramLabel: 'Написать в Telegram',
    copyPacketLabel: 'Скопировать пакет',
    otherLinksLabel: 'Другие следы',
    fields: [
      { key: 'name', label: 'Имя', placeholder: 'Как к вам обращаться?' },
      {
        key: 'manual',
        label: 'Что сейчас делаете вручную?',
        placeholder: 'Какой процесс сейчас держится на людях, сообщениях, таблицах, ручных переносах или постоянном контроле...',
        multiline: true,
      },
      {
        key: 'loss',
        label: 'Где теряется время, деньги или контроль?',
        placeholder: 'Где возникают задержки, ошибки, дублирование, пропущенные шаги или непрозрачность...',
        multiline: true,
      },
      {
        key: 'result',
        label: 'Какой результат нужен?',
        placeholder: 'Что система должна делать сама, какой выход давать и что должно стать проще после запуска...',
        multiline: true,
      },
      {
        key: 'contact',
        label: 'Telegram или email',
        placeholder: '@username или email@example.com',
      },
    ],
  },
  en: {
    eyebrow: 'Contact console',
    title: 'Describe the task.',
    titleAccent: "We'll turn it into a system.",
    description:
      'Describe the process that is still done manually. That is enough for me to see where time, money or control is leaking and propose a system instead of another set of screens.',
    telegramHint: 'The fastest channel to start the conversation around the task.',
    requestChannel: 'Request channel',
    responseWindow: 'Response window',
    responseTime: 'Reply within 24 hours',
    cityTimezone: 'Kaliningrad · UTC+2',
    intakeSignal: 'Intake signal',
    intakeStatusLabel: 'status',
    consoleLabel: 'eclipse://intake-console',
    liveIntake: 'live intake',
    signalPacket: 'Signal packet',
    awaitingInput: 'awaiting input',
    readyLabel: 'ready',
    signalCopiedLabel: 'Signal copied',
    emailCardLabel: 'Email',
    channelCardLabel: 'Channel',
    githubCardLabel: 'GitHub',
    instagramCardLabel: 'Instagram',
    whyTitle: 'Why this flow',
    whyText:
      'This makes the conversation start from process and outcome. Not from a vague “we need a website”, but from what actually needs to be automated, controlled and pushed to action.',
    packetHeader: 'Eclipse Forge / Request Signal',
    emptyAnswer: 'not filled',
    telegramLabel: 'Message on Telegram',
    copyPacketLabel: 'Copy packet',
    otherLinksLabel: 'Other traces',
    fields: [
      { key: 'name', label: 'Name', placeholder: 'How should I address you?' },
      {
        key: 'manual',
        label: 'What is still done manually?',
        placeholder: 'Which process still depends on people, messages, spreadsheets, manual transfers or constant supervision...',
        multiline: true,
      },
      {
        key: 'loss',
        label: 'Where are time, money or control being lost?',
        placeholder: 'Where do delays, errors, duplicated work or missing visibility show up...',
        multiline: true,
      },
      {
        key: 'result',
        label: 'What outcome do you need?',
        placeholder: 'What should the system do on its own, what output should it produce and what should become easier after launch...',
        multiline: true,
      },
      {
        key: 'contact',
        label: 'Telegram or email',
        placeholder: '@username or email@example.com',
      },
    ],
  },
};

type FormState = {
  name: string;
  manual: string;
  loss: string;
  result: string;
  contact: string;
};

const emptyForm: FormState = {
  name: '',
  manual: '',
  loss: '',
  result: '',
  contact: '',
};

export function CtaSection() {
  const { locale } = useLocale();
  const copy = ctaCopy[locale];
  const { contactFlow } = useSiteContent();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [copied, setCopied] = useState(false);

  const completion = Math.round((Object.values(form).filter((value) => value.trim().length > 0).length / Object.keys(form).length) * 100);

  const signalPacket = useMemo(() => {
    return [
      copy.packetHeader,
      '',
      ...copy.fields.map((field, index) => `${index + 1}. ${field.label}\n${form[field.key].trim() || copy.emptyAnswer}`),
    ].join('\n\n');
  }, [copy.emptyAnswer, copy.fields, copy.packetHeader, form]);

  const emailHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
    locale === 'ru' ? 'Запрос в Eclipse Forge' : 'Eclipse Forge request',
  )}&body=${encodeURIComponent(signalPacket)}`;

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signalPacket);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleTelegramOpen = async () => {
    if (Object.values(form).some((item) => item.trim())) {
      await handleCopy();
    }

    window.open(contactDetails.telegramDmUrl, '_blank', 'noopener,noreferrer');
  };

  const linkCards = [
    { label: copy.emailCardLabel, value: contactDetails.email, href: emailHref, external: false, Icon: MailIcon },
    { label: copy.channelCardLabel, value: contactDetails.telegramChannel, href: contactDetails.telegramChannelUrl, external: true, Icon: BroadcastIcon },
    { label: copy.githubCardLabel, value: contactDetails.githubHandle, href: contactDetails.githubUrl, external: true, Icon: GitHubIcon },
    { label: copy.instagramCardLabel, value: contactDetails.instagramHandle, href: contactDetails.instagramUrl, external: true, Icon: InstagramIcon },
  ];
  const primaryLinkCards = linkCards.slice(0, 2);
  const traceLinkCards = linkCards.slice(2);

  return (
    <motion.section
      id="contact"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-36"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute inset-0 contact-atmosphere-bg" />
      <div className="absolute inset-0 opacity-45">
        <ConstellationField className="opacity-30" />
        <ParticleField count={18} className="opacity-35" />
      </div>
      <div className="absolute left-[-8%] top-[18%] hidden lg:block opacity-20">
        <OrbitalRing size={360} dotCount={3} duration={38} color="var(--accent)" />
      </div>
      <div className="absolute bottom-[-8%] right-[-6%] hidden lg:block opacity-20">
        <EclipseSilhouette size={420} coronaColor="rgba(117, 140, 255, 0.14)" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--accent)' }}>
            {copy.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(2.3rem,5vw,4.8rem)]">
            {copy.title}
            <span className="block text-gradient-hero">{copy.titleAccent}</span>
          </h2>
          <p className="mt-6 type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
            {copy.description}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:gap-10">
          <motion.div variants={revealUp} className="flex flex-col gap-4">
            <div className="rounded-[2rem] border p-6 sm:p-7 contact-panel">
              <div className="flex items-center justify-between gap-4">
                <p className="type-meta" style={{ color: 'var(--accent)' }}>
                  {copy.requestChannel}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 contact-chip">
                  <span className="h-2 w-2 rounded-full hero-signal-dot" />
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-3)' }}>
                    {contactFlow.status[0]}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTelegramOpen}
                className="mt-6 w-full rounded-[1.7rem] border px-5 py-5 text-left transition-all duration-500 contact-primary-link"
              >
                <span className="flex items-center gap-3 font-display text-xl tracking-tight" style={{ color: 'var(--text-1)' }}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(107,163,255,0.18)' }}>
                    <TelegramIcon size={18} />
                  </span>
                  {copy.telegramLabel}
                  <span className="ml-auto inline-flex items-center justify-center rounded-full border p-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <ArrowUpRightIcon size={14} />
                  </span>
                </span>
                <span className="mt-3 block text-[13px]" style={{ color: 'var(--text-3)' }}>
                  {contactDetails.telegramDm}
                </span>
                <span className="mt-2 block text-[12px] leading-relaxed" style={{ color: 'var(--text-4)' }}>
                  {copy.telegramHint}
                </span>
              </button>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {primaryLinkCards.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="rounded-2xl border px-4 py-4 transition-all duration-300 contact-link-card"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(107,163,255,0.14)' }}>
                        <item.Icon size={15} />
                      </span>
                      <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                        {item.label}
                      </p>
                    </div>
                    <p className="mt-3 text-sm" style={{ color: 'var(--text-2)' }}>
                      {item.value}
                    </p>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border px-4 py-4 contact-panel">
                <p className="type-meta mb-3" style={{ color: 'var(--accent)' }}>
                  {copy.responseWindow}
                </p>
                <div className="space-y-2 text-sm" style={{ color: 'var(--text-3)' }}>
                  <p>{copy.responseTime}</p>
                  <p>{copy.cityTimezone}</p>
                  <p>{contactFlow.status[2]}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--text-4)' }}>
                  {copy.otherLinksLabel}
                </p>
                <div className="flex flex-wrap gap-3">
                  {traceLinkCards.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] transition-all duration-300 contact-reference-link"
                    >
                      <item.Icon size={14} />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border p-6 contact-panel">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="type-meta" style={{ color: 'var(--accent)' }}>
                  {copy.intakeSignal}
                </p>
                <span className="text-[10px] uppercase tracking-[0.24em]" style={{ color: completion === 100 ? 'var(--live)' : 'var(--text-4)' }}>
                  {completion}% {copy.readyLabel}
                </span>
              </div>
              <div className="grid gap-3">
                {contactFlow.status.map((status, index) => (
                  <div key={status} className="flex items-center justify-between rounded-[1.3rem] border px-4 py-3 contact-preview-item">
                    <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                      0{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-2)' }}>
                      <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="overflow-hidden rounded-[2rem] border contact-console-shell">
            <div className="flex items-center gap-2 border-b px-5 py-3 contact-console-topbar">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--text-4)' }}>
                {copy.consoleLabel}
              </span>
              <span
                className="ml-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]"
                style={{ color: completion === 100 ? 'var(--live)' : 'var(--text-4)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                {completion}% {copy.readyLabel}
              </span>
            </div>
            <div className="contact-progress-track">
              <motion.div
                className="contact-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="border-b p-5 sm:p-7 lg:border-b-0 lg:border-r contact-console-body" style={{ borderColor: 'var(--line)' }}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 contact-chip">
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                    {copy.liveIntake}
                  </span>
                  <span className="console-cursor" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {copy.fields.map((field) => (
                    <div
                      key={field.key}
                      className={`rounded-[1.5rem] border p-4 sm:p-5 contact-console-card ${
                        field.key === 'manual' ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <p className="mb-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
                        &gt; {field.label}
                      </p>
                      {field.multiline ? (
                        <textarea
                          value={form[field.key]}
                          onChange={(event) => handleChange(field.key, event.target.value)}
                          rows={field.key === 'manual' ? 5 : 4}
                          placeholder={field.placeholder}
                          className={`w-full resize-none rounded-[1.2rem] border px-4 py-4 text-[14px] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-opacity-30 ${
                            field.key === 'manual' ? 'min-h-[160px]' : 'min-h-[132px]'
                          }`}
                          style={{
                            background: 'var(--input-bg)',
                            color: 'var(--text-1)',
                            borderColor: 'var(--line)',
                            caretColor: 'var(--accent)',
                          }}
                        />
                      ) : (
                        <input
                          value={form[field.key]}
                          onChange={(event) => handleChange(field.key, event.target.value)}
                          placeholder={field.placeholder}
                          className="w-full rounded-[1.2rem] border px-4 py-4 text-[14px] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-opacity-30"
                          style={{
                            background: 'var(--input-bg)',
                            color: 'var(--text-1)',
                            borderColor: 'var(--line)',
                            caretColor: 'var(--accent)',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-7 contact-console-body">
                <div className="rounded-[1.6rem] border p-5 contact-signal-preview">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="type-meta" style={{ color: 'var(--accent)' }}>
                      {copy.signalPacket}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 contact-reference-link"
                    >
                      {copied ? copy.signalCopiedLabel : copy.copyPacketLabel}
                    </button>
                  </div>

                  <div className="grid gap-3">
                    {copy.fields.map((field) => (
                      <div key={field.key} className="rounded-[1.2rem] border px-4 py-4 contact-preview-item">
                        <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
                          {field.label}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed" style={{ color: form[field.key].trim() ? 'var(--text-2)' : 'var(--text-4)' }}>
                          {form[field.key].trim() || copy.emptyAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    onClick={handleTelegramOpen}
                    className="rounded-full border px-5 py-4 text-[12px] font-display uppercase tracking-[0.16em] transition-all duration-300 contact-console-primary"
                  >
                    {contactFlow.primaryCta}
                  </button>
                  <a
                    href={emailHref}
                    className="rounded-full border px-5 py-4 text-[12px] font-display uppercase tracking-[0.16em] transition-all duration-300 contact-console-secondary"
                  >
                    {contactFlow.secondaryCta}
                  </a>
                </div>

                <div className="mt-5 rounded-[1.6rem] border px-4 py-4 contact-signal-preview">
                  <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                    {copy.whyTitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    {copy.whyText}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
