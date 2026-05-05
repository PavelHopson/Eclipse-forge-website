import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { contactDetails } from '../../data/content';
import { revealUp, stagger, staggerFast, viewport } from '../../lib/animation';
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
  responseTime: string;
  cityTimezone: string;
  channelsLabel: string;
  formLabel: string;
  filledLabel: string;
  fieldsCountLabel: string;
  signalCopiedLabel: string;
  emailCardLabel: string;
  channelCardLabel: string;
  githubCardLabel: string;
  instagramCardLabel: string;
  packetHeader: string;
  emptyAnswer: string;
  telegramLabel: string;
  emailLabel: string;
  bottomNote: string;
  fields: FormField[];
};

const ctaCopy: Record<Locale, CtaCopy> = {
  ru: {
    eyebrow: 'Контакт',
    title: 'Опишите задачу.',
    titleAccent: 'Разберём и превратим в систему.',
    description: 'Опишите ручной процесс — быстро скажу, как превратить его в систему.',
    telegramHint: 'Быстрее всего отвечаю в Telegram.',
    responseTime: 'Ответ в течение 24 часов · Калининград, UTC+2',
    cityTimezone: 'Калининград · UTC+2',
    channelsLabel: 'Каналы',
    formLabel: 'Бриф',
    filledLabel: 'заполнено',
    fieldsCountLabel: 'из 5 полей',
    signalCopiedLabel: 'Скопировано',
    emailCardLabel: 'Email',
    channelCardLabel: 'Канал',
    githubCardLabel: 'GitHub',
    instagramCardLabel: 'Instagram',
    packetHeader: 'Eclipse Forge / Запрос',
    emptyAnswer: 'не заполнено',
    telegramLabel: 'Написать в Telegram',
    emailLabel: 'Открыть email',
    bottomNote: 'Что заполните — то автоматически уйдёт мне в Telegram, когда нажмёте кнопку.',
    fields: [
      { key: 'name', label: 'Имя', placeholder: 'Имя или компания' },
      {
        key: 'manual',
        label: 'Что делаете вручную',
        placeholder: 'Какой процесс уже тормозит работу?',
        multiline: true,
      },
      {
        key: 'loss',
        label: 'Где теряется контроль',
        placeholder: 'Где уходят время, деньги или точность?',
        multiline: true,
      },
      {
        key: 'result',
        label: 'Какой нужен результат',
        placeholder: 'Что система должна начать делать сама?',
        multiline: true,
      },
      {
        key: 'contact',
        label: 'Telegram или email',
        placeholder: '@username или email',
      },
    ],
  },
  en: {
    eyebrow: 'Contact',
    title: 'Describe the task.',
    titleAccent: "We'll turn it into a system.",
    description: 'Describe the manual process — I will quickly show how to turn it into a system.',
    telegramHint: 'Fastest replies happen in Telegram.',
    responseTime: 'Reply within 24 hours · Kaliningrad, UTC+2',
    cityTimezone: 'Kaliningrad · UTC+2',
    channelsLabel: 'Channels',
    formLabel: 'Brief',
    filledLabel: 'filled',
    fieldsCountLabel: 'of 5 fields',
    signalCopiedLabel: 'Copied',
    emailCardLabel: 'Email',
    channelCardLabel: 'Channel',
    githubCardLabel: 'GitHub',
    instagramCardLabel: 'Instagram',
    packetHeader: 'Eclipse Forge / Request',
    emptyAnswer: 'not filled',
    telegramLabel: 'Message on Telegram',
    emailLabel: 'Open email',
    bottomNote: 'Whatever you fill in goes straight to my Telegram when you press the button.',
    fields: [
      { key: 'name', label: 'Name', placeholder: 'Name or company' },
      {
        key: 'manual',
        label: 'What is manual',
        placeholder: 'Which process is already slowing the work down?',
        multiline: true,
      },
      {
        key: 'loss',
        label: 'Where control is lost',
        placeholder: 'Where do time, money or precision leak?',
        multiline: true,
      },
      {
        key: 'result',
        label: 'What outcome is needed',
        placeholder: 'What should the system start doing on its own?',
        multiline: true,
      },
      {
        key: 'contact',
        label: 'Telegram or email',
        placeholder: '@username or email',
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

  const [form, setForm] = useState<FormState>(emptyForm);
  const [copied, setCopied] = useState(false);

  const filledCount = Object.values(form).filter((value) => value.trim().length > 0).length;

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
    if (filledCount > 0) {
      await handleCopy();
    }

    window.open(contactDetails.telegramDmUrl, '_blank', 'noopener,noreferrer');
  };

  const socialLinks = [
    { label: copy.emailCardLabel, value: contactDetails.email, href: emailHref, external: false, Icon: MailIcon },
    { label: copy.channelCardLabel, value: contactDetails.telegramChannel, href: contactDetails.telegramChannelUrl, external: true, Icon: BroadcastIcon },
    { label: copy.githubCardLabel, value: contactDetails.githubHandle, href: contactDetails.githubUrl, external: true, Icon: GitHubIcon },
    { label: copy.instagramCardLabel, value: contactDetails.instagramHandle, href: contactDetails.instagramUrl, external: true, Icon: InstagramIcon },
  ];

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
        <motion.div variants={revealUp} className="mb-12 max-w-2xl">
          <p className="type-meta mb-5" style={{ color: 'rgba(212,175,55,0.95)' }}>
            {copy.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(2.15rem,4.3vw,4rem)]">
            {copy.title}
            <span className="block text-gradient-hero">{copy.titleAccent}</span>
          </h2>
          <p className="mt-6 type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
            {copy.description}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:gap-8">
          {/* LEFT: channels */}
          <motion.div variants={revealUp} className="flex flex-col gap-4">
            <div className="rounded-[1.85rem] border p-6 sm:p-7 contact-panel">
              <p className="type-meta mb-5" style={{ color: 'rgba(212,175,55,0.85)' }}>
                {copy.channelsLabel}
              </p>

              <motion.button
                type="button"
                onClick={handleTelegramOpen}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="group block w-full rounded-[1.4rem] border px-5 py-5 text-left transition-all duration-400 contact-telegram-cta"
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
              </motion.button>

              <p className="mt-4 text-[12px] leading-relaxed" style={{ color: 'var(--text-4)' }}>
                {copy.telegramHint}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="flex items-center gap-3 rounded-[1rem] border px-3 py-2.5 transition-all duration-300 contact-link-card"
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

          {/* RIGHT: form */}
          <motion.div variants={revealUp} className="overflow-hidden rounded-[1.85rem] border contact-panel">
            <div className="flex items-center justify-between gap-4 border-b px-6 py-4 sm:px-7" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="type-meta" style={{ color: 'rgba(212,175,55,0.85)' }}>
                {copy.formLabel}
              </p>
              <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                {filledCount}/{copy.fields.length} {copy.filledLabel}
              </span>
            </div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-5 px-6 py-6 sm:px-7 sm:py-7"
            >
              {copy.fields.map((field) => (
                <motion.div key={field.key} variants={revealUp} className="flex flex-col gap-2">
                  <label
                    htmlFor={`cta-${field.key}`}
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      id={`cta-${field.key}`}
                      value={form[field.key]}
                      onChange={(event) => handleChange(field.key, event.target.value)}
                      rows={field.key === 'manual' ? 3 : 2}
                      placeholder={field.placeholder}
                      className="contact-field min-h-[88px] w-full resize-none rounded-[0.95rem] border px-4 py-3 text-[14px] outline-none transition-all duration-300"
                    />
                  ) : (
                    <input
                      id={`cta-${field.key}`}
                      value={form[field.key]}
                      onChange={(event) => handleChange(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="contact-field w-full rounded-[0.95rem] border px-4 py-3 text-[14px] outline-none transition-all duration-300"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            <div className="border-t px-6 py-6 sm:px-7" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.button
                  type="button"
                  onClick={handleTelegramOpen}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="case-link-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[13px] font-display tracking-[0.04em] transition-all duration-400"
                >
                  <TelegramIcon size={14} />
                  {copy.telegramLabel}
                  <span aria-hidden>→</span>
                </motion.button>
                <motion.a
                  href={emailHref}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="case-link-secondary inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[13px] font-display tracking-[0.04em] transition-all duration-400"
                >
                  <MailIcon size={14} />
                  {copy.emailLabel}
                </motion.a>
                <motion.button
                  type="button"
                  onClick={handleCopy}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 contact-copy-link"
                  aria-live="polite"
                >
                  {copied ? copy.signalCopiedLabel : 'Copy'}
                </motion.button>
              </div>
              <p className="mt-4 text-[12px] leading-relaxed" style={{ color: 'var(--text-4)' }}>
                {copy.bottomNote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
