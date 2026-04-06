import { motion } from 'framer-motion';
import { contactDetails, metrics } from '../../data/content';
import { GlowButton } from '../ui/GlowButton';
import { useTheme } from '../../lib/theme';

const lineReveal = {
  hidden: { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[5%] w-[600px] h-[600px] rounded-full blur-[180px] animate-float"
          style={{ background: theme === 'dark' ? 'rgba(255,106,0,0.06)' : 'rgba(255,106,0,0.05)' }} />
        <div className="absolute bottom-[0%] right-[5%] w-[400px] h-[400px] rounded-full blur-[150px] animate-float-slow"
          style={{ background: theme === 'dark' ? 'rgba(255,106,0,0.03)' : 'rgba(255,106,0,0.03)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28">
        {/* Badge */}
        <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-3 border px-4 py-2 rounded-full" style={{ borderColor: 'var(--line)' }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--accent)' }} />
            <span className="type-meta text-tertiary">Engineering Studio</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-8 lg:mb-10">
          <motion.h1 custom={0} variants={lineReveal} initial="hidden" animate="visible"
            className="type-display text-[clamp(2.8rem,7vw,7rem)] text-gradient">
            Мы проектируем
          </motion.h1>
          <motion.h1 custom={1} variants={lineReveal} initial="hidden" animate="visible"
            className="type-display text-[clamp(2.8rem,7vw,7rem)]">
            <span className="text-gradient-accent">цифровые системы</span>
          </motion.h1>
          <motion.h1 custom={2} variants={lineReveal} initial="hidden" animate="visible"
            className="type-display text-[clamp(2.8rem,7vw,7rem)] text-quaternary">
            а не просто сайты.
          </motion.h1>
        </div>

        {/* Two columns: subtitle+CTA | metrics */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">
          <div>
            <motion.p custom={0.7} variants={fadeIn} initial="hidden" animate="visible"
              className="type-body max-w-lg text-base sm:text-lg text-secondary mb-8">
              AI-автоматизация, SaaS-платформы и digital-продукты,
              которые превращают хаос в управляемый рост бизнеса.
            </motion.p>

            <motion.div custom={0.9} variants={fadeIn} initial="hidden" animate="visible"
              className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="justify-center px-8 py-4 text-[14px]">
                Обсудить проект
              </GlowButton>
              <a href="#cases"
                className="group inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 text-[14px] text-tertiary transition-all duration-400 hover:text-secondary font-display"
                style={{ borderColor: 'var(--line)' }}>
                Портфолио
                <span className="w-4 h-px transition-all duration-400 group-hover:w-8" style={{ background: 'var(--text-4)' }} />
              </a>
            </motion.div>
          </div>

          {/* Metrics — right side on desktop */}
          <motion.div custom={1.1} variants={fadeIn} initial="hidden" animate="visible"
            className="flex gap-10 sm:gap-14 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-12" style={{ borderColor: 'var(--line)' }}>
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-3xl sm:text-4xl font-light tracking-tight text-primary">{m.value}</p>
                <p className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-tertiary">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, var(--line), transparent)` }} />
    </section>
  );
}
