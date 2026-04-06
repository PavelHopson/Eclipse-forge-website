import { motion } from 'framer-motion';
import { contactDetails, contactFlow, telegramChannel } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function CtaSection() {
  return (
    <motion.section
      id="contact"
      className="section-shell py-32 sm:py-40 relative overflow-hidden"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-accent/[0.03] blur-[200px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta text-accent/40 mb-8">
          Контакт
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-2xl mb-6">
          Есть задача — давайте разберём.
        </motion.h2>
        <motion.p variants={revealUp} className="type-body text-[15px] text-white/25 max-w-lg mb-12">
          Опишите задачу, желаемый результат и сроки. Ответим в течение нескольких часов.
        </motion.p>

        <motion.div variants={revealUp} className="mb-20">
          <GlowButton
            href={contactDetails.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-10 py-5 text-[14px]"
          >
            {contactFlow.primaryCta}
          </GlowButton>
        </motion.div>

        {/* Contact grid */}
        <motion.div variants={revealUp} className="grid sm:grid-cols-3 gap-px bg-white/[0.03]">
          <a
            href={`mailto:${contactDetails.email}`}
            className="bg-[#030303] p-8 group hover:bg-white/[0.01] transition-colors duration-400"
          >
            <p className="type-meta text-white/15 mb-4">Email</p>
            <p className="font-display text-[15px] text-white/40 group-hover:text-white/60 transition-colors">{contactDetails.email}</p>
          </a>

          <a
            href={contactDetails.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#030303] p-8 group hover:bg-white/[0.01] transition-colors duration-400"
          >
            <p className="type-meta text-white/15 mb-4">Telegram</p>
            <p className="font-display text-[15px] text-white/40 group-hover:text-accent/60 transition-colors">{contactDetails.telegramHandle}</p>
          </a>

          <a
            href={telegramChannel.url}
            target="_blank"
            rel="noreferrer"
            className="bg-[#030303] p-8 group hover:bg-white/[0.01] transition-colors duration-400"
          >
            <div className="flex items-center gap-2 mb-4">
              <p className="type-meta text-white/15">Канал</p>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/50 animate-pulse-soft" />
            </div>
            <p className="font-display text-[15px] text-white/40 group-hover:text-white/60 transition-colors">{telegramChannel.username}</p>
          </a>
        </motion.div>

        <motion.div variants={revealUp} className="mt-12 text-center">
          <p className="text-[12px] text-white/10">{contactDetails.cityTimezone}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
