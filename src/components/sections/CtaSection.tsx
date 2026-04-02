import { motion, useReducedMotion } from 'framer-motion';
import {
  contactDetails,
  contactFlow,
  telegramChannel,
} from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

const quickContacts = [
  {
    label: 'Email',
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
  },
  {
    label: 'Telegram',
    value: contactDetails.telegramHandle,
    href: contactDetails.telegramUrl,
  },
] as const;

export function CtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className="section-shell px-4 pb-20 pt-20 sm:px-6 lg:px-10 lg:pb-28 lg:pt-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div
        variants={revealUp}
        className="monolith-surface mx-auto max-w-7xl rounded-[1.9rem] px-5 py-8 sm:rounded-[2.25rem] sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(255,106,0,0.12),transparent_20%),radial-gradient(circle_at_78%_50%,rgba(118,199,255,0.06),transparent_22%),radial-gradient(circle_at_center,rgba(255,255,255,0.022),transparent_36%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 bg-[radial-gradient(circle,rgba(255,255,255,0.024),rgba(255,255,255,0.006)_42%,rgba(0,0,0,0)_72%)] blur-xl sm:h-[22rem] sm:w-[22rem]" />

        <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
          <div className="max-w-[35rem]">
            <p className="type-meta text-white/34">Start the project</p>
            <h2 className="type-display mt-4 max-w-[12.5ch] text-balance text-[clamp(2.05rem,6.4vw,4rem)] font-medium text-white sm:mt-5">
              Расскажите о задаче. Мы вернёмся с понятным следующим шагом.
            </h2>
            <p className="type-body mt-4 text-[0.98rem] text-white/56 sm:mt-5 sm:text-[1rem]">
              Основной канал связи — Telegram. Отвечаем быстро, обычно в течение нескольких часов.
            </p>

            <div className="mt-8 grid gap-3 sm:mt-9 sm:max-w-[28rem]">
              {quickContacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('https') ? '_blank' : undefined}
                  rel={contact.href.startsWith('https') ? 'noreferrer' : undefined}
                  className="group rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.01))] px-4 py-4 transition duration-200 hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))]"
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                    {contact.label}
                  </p>
                  <p className="mt-2 text-[0.98rem] text-white/82 transition group-hover:text-white">
                    {contact.value}
                  </p>
                </a>
              ))}
              <a
                href={telegramChannel.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.024),rgba(255,255,255,0.012))] px-4 py-4 transition duration-200 hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.034),rgba(255,255,255,0.014))]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                    {telegramChannel.label}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-frost/62">
                    <span className="h-2 w-2 rounded-full bg-frost shadow-[0_0_10px_rgba(118,199,255,0.7)]" />
                    Live
                  </span>
                </div>
                <p className="mt-2 text-[0.98rem] text-white/84 transition group-hover:text-white">
                  {telegramChannel.username}
                </p>
                <p className="mt-2 max-w-[24rem] text-sm leading-6 text-white/46">
                  {telegramChannel.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-3 text-sm tracking-[0.01em] text-white/64 transition group-hover:text-white">
                  Перейти в Telegram
                  <span className="h-px w-8 bg-white/16 transition group-hover:bg-white/28" />
                </span>
              </a>
              <div className="rounded-[1.1rem] border border-frost/10 bg-[linear-gradient(135deg,rgba(118,199,255,0.06),rgba(255,255,255,0.015))] px-4 py-4">
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-frost/54">
                  Время ответа
                </p>
                <p className="mt-2 text-[0.98rem] text-white/82">
                  {contactDetails.responseTime}
                </p>
                <p className="mt-2 text-sm text-white/42">
                  {contactDetails.cityTimezone}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="monolith-surface rounded-[1.5rem] p-5 sm:rounded-[1.8rem] sm:p-6"
          >
            <div className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.07),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.05),transparent_24%)] sm:rounded-[1.8rem]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4 sm:pb-5">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/30 sm:text-[0.68rem]">
                    Direct contact
                  </p>
                  <p className="type-heading mt-2 text-[1.28rem] font-medium text-white sm:text-[1.46rem]">
                    {contactFlow.panelTitle}
                  </p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(255,106,0,0.8)]" />
              </div>

              <p className="type-body mt-5 text-[0.96rem] text-white/56">
                {contactFlow.panelDescription}
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:mt-7 sm:flex-row sm:items-center">
                <GlowButton
                  href={contactDetails.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full justify-center sm:w-auto"
                >
                  {contactFlow.primaryCta}
                </GlowButton>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[0.22em] text-white/50 transition hover:text-white sm:justify-start"
                >
                  <span className="h-px w-10 bg-white/20" />
                  {contactFlow.secondaryCta}
                </a>
              </div>

              <div className="mt-6 rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.01))] px-4 py-4 sm:mt-7">
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                  {contactFlow.telegramPrompt}
                </p>
                <div className="mt-4 space-y-3">
                  {contactFlow.telegramChecklist.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/80 shadow-[0_0_10px_rgba(255,106,0,0.5)]" />
                      <p className="text-sm leading-6 text-white/62">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.008))] px-4 py-4 sm:mt-7">
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                  Status
                </p>
                <p className="mt-3 text-sm leading-6 text-white/54">
                  Для быстрого ответа используйте Telegram. Email оставили как запасной способ связи.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
