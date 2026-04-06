import { motion } from 'framer-motion';
import {
  contactDetails,
  contactFlow,
  telegramChannel,
} from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function CtaSection() {
  return (
    <motion.section
      id="contact"
      className="section-shell px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div variants={revealUp} className="max-w-3xl mb-12">
          <p className="type-meta text-white/25 mb-5">Контакт</p>
          <h2 className="type-display text-[clamp(2rem,4.5vw,3.8rem)] font-semibold leading-[0.96] text-white/90 mb-6">
            Есть задача, где рост
            <br />
            упирается в систему?
          </h2>
          <p className="text-[0.95rem] leading-[1.8] text-white/35 max-w-xl">
            Коротко опишите задачу, желаемый результат и сроки.
            Основной канал связи — Telegram.
          </p>
        </motion.div>

        {/* CTA + Info grid */}
        <div className="grid gap-px bg-white/[0.04] lg:grid-cols-3">
          {/* Primary CTA */}
          <motion.div
            variants={revealUp}
            className="bg-[#060606] p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-accent/40 mb-4">Написать</p>
              <GlowButton
                href={contactDetails.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-4"
              >
                {contactFlow.primaryCta}
              </GlowButton>
            </div>

            <div className="mt-10 space-y-3">
              {contactFlow.telegramChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-accent/50" />
                  <p className="text-[13px] leading-relaxed text-white/30">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div
            variants={revealUp}
            className="bg-[#060606] p-8 sm:p-10 space-y-6"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 mb-2">Контакты</p>

            <a
              href={`mailto:${contactDetails.email}`}
              className="block border border-white/[0.06] p-5 hover:border-white/10 transition-colors group"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2">Email</p>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{contactDetails.email}</p>
            </a>

            <a
              href={contactDetails.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="block border border-white/[0.06] p-5 hover:border-accent/20 transition-colors group"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2">Telegram</p>
              <p className="text-sm text-white/60 group-hover:text-accent/70 transition-colors">{contactDetails.telegramHandle}</p>
            </a>

            <div className="border border-white/[0.06] p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2">Ответ</p>
              <p className="text-sm text-white/50">{contactDetails.responseTime}</p>
              <p className="text-xs text-white/20 mt-1">{contactDetails.cityTimezone}</p>
            </div>
          </motion.div>

          {/* Telegram Channel */}
          <motion.div
            variants={revealUp}
            className="bg-[#060606] p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/20 mb-6">Канал</p>
              <a
                href={telegramChannel.url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-2 w-2 rounded-full bg-accent/60 shadow-[0_0_10px_rgba(255,106,0,0.5)]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent/50">Live</span>
                </div>
                <p className="text-xl font-medium text-white/80 group-hover:text-accent transition-colors mb-3">{telegramChannel.username}</p>
                <p className="text-[13px] leading-relaxed text-white/30 mb-6">
                  {telegramChannel.description}
                </p>
                <span className="inline-flex items-center gap-3 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                  Перейти
                  <span className="h-px w-8 bg-white/10 group-hover:bg-accent/40 transition-colors" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
