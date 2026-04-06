import { motion } from 'framer-motion';
import { contactDetails, contactFlow, telegramChannel } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function CtaSection() {
  return (
    <motion.section id="contact" className="section-shell py-32 sm:py-40 relative overflow-hidden" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: 'var(--glow)' }} />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta mb-8" style={{ color: 'var(--accent-text)', opacity: 0.5 }}>Контакт</motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-2xl mb-6">
          Есть задача — давайте разберём.
        </motion.h2>
        <motion.p variants={revealUp} className="type-body text-[15px] text-secondary max-w-lg mb-12">
          Опишите задачу, желаемый результат и сроки. Ответим в течение нескольких часов.
        </motion.p>

        <motion.div variants={revealUp} className="mb-20">
          <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="px-10 py-5 text-[14px]">
            {contactFlow.primaryCta}
          </GlowButton>
        </motion.div>

        <motion.div variants={revealUp} className="grid sm:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
          <a href={`mailto:${contactDetails.email}`} className="p-8 transition-colors duration-400 bg-theme hover:bg-card">
            <p className="type-meta text-quaternary mb-4">Email</p>
            <p className="font-display text-[15px] text-secondary">{contactDetails.email}</p>
          </a>
          <a href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="p-8 transition-colors duration-400 bg-theme hover:bg-card">
            <p className="type-meta text-quaternary mb-4">Telegram</p>
            <p className="font-display text-[15px] text-accent-theme">{contactDetails.telegramHandle}</p>
          </a>
          <a href={telegramChannel.url} target="_blank" rel="noreferrer" className="p-8 transition-colors duration-400 bg-theme hover:bg-card">
            <div className="flex items-center gap-2 mb-4">
              <p className="type-meta text-quaternary">Канал</p>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--accent)' }} />
            </div>
            <p className="font-display text-[15px] text-secondary">{telegramChannel.username}</p>
          </a>
        </motion.div>

        <motion.div variants={revealUp} className="mt-12 text-center">
          <p className="text-[12px] text-quaternary">{contactDetails.cityTimezone}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
