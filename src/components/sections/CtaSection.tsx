import { motion } from 'framer-motion';
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
  return (
    <motion.section
      id="contact"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-orange-400/15 bg-[radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div variants={revealUp}>
            <p className="type-meta text-white/35">Contact</p>
            <h2 className="type-display mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.95] text-white">
              Если у вас есть задача, где рост упирается в систему — давайте разберём её.
            </h2>
            <p className="type-body mt-5 max-w-2xl text-base leading-7 text-white/68">
              Основной канал связи — Telegram. Коротко опишите задачу,
              желаемый результат и сроки, если они уже понятны.
            </p>
          </motion.div>

          <motion.div variants={revealUp}>
            <GlowButton
              href={contactDetails.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
            >
              {contactFlow.primaryCta}
            </GlowButton>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={revealUp}
            className="rounded-[1.9rem] border border-white/10 bg-black/20 p-6"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/30">
              Direct contact
            </p>
            <p className="type-heading mt-3 text-[1.55rem] font-medium text-white">
              {contactFlow.panelTitle}
            </p>
            <p className="type-body mt-3 text-sm leading-7 text-white/62">
              {contactFlow.panelDescription}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {quickContacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('https') ? '_blank' : undefined}
                  rel={contact.href.startsWith('https') ? 'noreferrer' : undefined}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-white/20"
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                    {contact.label}
                  </p>
                  <p className="mt-2 text-sm text-white/82">{contact.value}</p>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                {contactFlow.telegramPrompt}
              </p>
              <div className="mt-4 space-y-3">
                {contactFlow.telegramChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.7)]" />
                    <p className="text-sm leading-6 text-white/66">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="grid gap-4">
            <a
              href={telegramChannel.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[1.9rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6 transition hover:border-orange-400/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/30">
                  {telegramChannel.label}
                </p>
                <span className="inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-orange-200">
                  <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.7)]" />
                  Live
                </span>
              </div>
              <p className="mt-4 text-xl font-medium text-white">{telegramChannel.username}</p>
              <p className="mt-3 text-sm leading-6 text-white/66">
                {telegramChannel.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-3 text-sm text-white/72 transition group-hover:text-white">
                Перейти в Telegram
                <span className="h-px w-8 bg-white/18 transition group-hover:bg-orange-300/50" />
              </span>
            </a>

            <div className="rounded-[1.9rem] border border-white/10 bg-black/20 p-6">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/30">
                Response window
              </p>
              <p className="mt-4 text-lg font-medium text-white">{contactDetails.responseTime}</p>
              <p className="mt-2 text-sm text-white/48">{contactDetails.cityTimezone}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
