import { motion } from 'framer-motion';
import { contactDetails, contactFlow, telegramChannel } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function CtaSection() {
  return (
    <motion.section id="contact" className="section-shell py-20 sm:py-24 lg:py-28 relative overflow-hidden haze" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 mb-14">
          <div>
            <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--text-3)' }}>Контакт</motion.p>
            <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-xl mb-5">
              Войти в работу.
            </motion.h2>
            <motion.p variants={revealUp} className="type-body text-[15px] sm:text-base max-w-lg mb-8" style={{ color: 'var(--text-3)' }}>
              Опишите задачу и желаемый результат. Ответим в течение нескольких часов.
            </motion.p>
            <motion.div variants={revealUp}>
              <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="px-9 py-4 text-[14px]">
                {contactFlow.primaryCta}
              </GlowButton>
            </motion.div>
          </div>

          <motion.div variants={revealUp} className="flex flex-col justify-center">
            <p className="type-meta mb-5" style={{ color: 'var(--text-4)' }}>Что прислать</p>
            <div className="space-y-4">
              {contactFlow.telegramChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                  <p className="text-[15px]" style={{ color: 'var(--text-2)' }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={revealUp} className="grid sm:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
          <a href={`mailto:${contactDetails.email}`} className="p-6 sm:p-8 transition-colors duration-400 hover:bg-white/[0.015]" style={{ background: 'var(--bg)' }}>
            <p className="type-meta mb-3" style={{ color: 'var(--text-4)' }}>Email</p>
            <p className="font-display text-[15px] sm:text-base" style={{ color: 'var(--text-2)' }}>{contactDetails.email}</p>
          </a>
          <a href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="p-6 sm:p-8 transition-colors duration-400 hover:bg-white/[0.015]" style={{ background: 'var(--bg)' }}>
            <p className="type-meta mb-3" style={{ color: 'var(--text-4)' }}>Telegram</p>
            <p className="font-display text-[15px] sm:text-base" style={{ color: 'var(--accent)' }}>{contactDetails.telegramHandle}</p>
          </a>
          <a href={telegramChannel.url} target="_blank" rel="noreferrer" className="p-6 sm:p-8 transition-colors duration-400 hover:bg-white/[0.015]" style={{ background: 'var(--bg)' }}>
            <div className="flex items-center gap-2 mb-3">
              <p className="type-meta" style={{ color: 'var(--text-4)' }}>Канал</p>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--accent)' }} />
            </div>
            <p className="font-display text-[15px] sm:text-base" style={{ color: 'var(--text-2)' }}>{telegramChannel.username}</p>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
