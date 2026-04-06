import { motion } from 'framer-motion';
import { contactDetails, contactFlow, telegramChannel } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function CtaSection() {
  return (
    <motion.section id="contact" className="section-shell py-20 sm:py-24 lg:py-28 relative overflow-hidden" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'var(--glow)' }} />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 mb-14">
          <div>
            <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent-text)', opacity: 0.6 }}>Контакт</motion.p>
            <motion.h2 variants={revealUp} className="type-display text-[clamp(2rem,4vw,3.8rem)] text-gradient max-w-xl mb-5">
              Есть задача — давайте разберём.
            </motion.h2>
            <motion.p variants={revealUp} className="type-body text-base sm:text-[17px] text-secondary max-w-lg mb-8">
              Опишите задачу, желаемый результат и сроки. Ответим в течение нескольких часов.
            </motion.p>
            <motion.div variants={revealUp}>
              <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="px-9 py-4 text-[14px]">
                {contactFlow.primaryCta}
              </GlowButton>
            </motion.div>
          </div>

          {/* Checklist */}
          <motion.div variants={revealUp} className="flex flex-col justify-center">
            <p className="type-meta text-quaternary mb-5">Что прислать</p>
            <div className="space-y-4">
              {contactFlow.telegramChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                  <p className="text-[15px] text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact cards */}
        <motion.div variants={revealUp} className="grid sm:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
          <a href={`mailto:${contactDetails.email}`} className="p-6 sm:p-8 bg-theme hover:bg-card transition-colors duration-400">
            <p className="type-meta text-quaternary mb-3">Email</p>
            <p className="font-display text-[15px] sm:text-base text-primary">{contactDetails.email}</p>
          </a>
          <a href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="p-6 sm:p-8 bg-theme hover:bg-card transition-colors duration-400">
            <p className="type-meta text-quaternary mb-3">Telegram</p>
            <p className="font-display text-[15px] sm:text-base text-accent-theme">{contactDetails.telegramHandle}</p>
          </a>
          <a href={telegramChannel.url} target="_blank" rel="noreferrer" className="p-6 sm:p-8 bg-theme hover:bg-card transition-colors duration-400">
            <div className="flex items-center gap-2 mb-3">
              <p className="type-meta text-quaternary">Канал</p>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--accent)' }} />
            </div>
            <p className="font-display text-[15px] sm:text-base text-primary">{telegramChannel.username}</p>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
