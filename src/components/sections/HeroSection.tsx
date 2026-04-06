import { motion } from 'framer-motion';
import { contactDetails, metrics } from '../../data/content';
import { GlowButton } from '../ui/GlowButton';
import { useTheme } from '../../lib/theme';

const lineReveal = {
  hidden: { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[5%] w-[800px] h-[800px] rounded-full blur-[200px] animate-float"
          style={{ background: theme === 'dark' ? 'rgba(255,106,0,0.05)' : 'rgba(255,106,0,0.06)' }}
        />
        <div
          className="absolute bottom-[-5%] right-[0%] w-[600px] h-[600px] rounded-full blur-[180px] animate-float-slow"
          style={{ background: theme === 'dark' ? 'rgba(255,106,0,0.03)' : 'rgba(255,106,0,0.04)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-8 py-44 lg:py-52 w-full">
        {/* Badge */}
        <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="mb-12">
          <div className="inline-flex items-center gap-3 border px-5 py-2.5 rounded-full" style={{ borderColor: 'var(--line)' }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--accent)' }} />
            <span className="type-meta text-tertiary">Engineering Studio</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-12">
          <motion.h1 custom={0} variants={lineReveal} initial="hidden" animate="visible" className="type-display text-hero text-gradient">
            Мы проектируем
          </motion.h1>
          <motion.h1 custom={1} variants={lineReveal} initial="hidden" animate="visible" className="type-display text-hero">
            <span className="text-gradient-accent">цифровые системы</span>
          </motion.h1>
          <motion.h1 custom={2} variants={lineReveal} initial="hidden" animate="visible" className="type-display text-hero text-quaternary">
            а не просто сайты.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p custom={0.8} variants={fadeIn} initial="hidden" animate="visible" className="type-body max-w-md text-[15px] text-secondary mb-12">
          AI-автоматизация, SaaS-платформы и digital-продукты,
          которые превращают хаос в управляемый рост бизнеса.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={1.0} variants={fadeIn} initial="hidden" animate="visible" className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="justify-center px-9 py-4">
            Обсудить проект
          </GlowButton>
          <a
            href="#cases"
            className="group inline-flex items-center justify-center gap-3 rounded-full border px-9 py-4 text-[13px] text-tertiary transition-all duration-400 hover:text-secondary font-display"
            style={{ borderColor: 'var(--line)' }}
          >
            Портфолио
            <span className="w-4 h-px transition-all duration-400 group-hover:w-8" style={{ background: 'var(--line)' }} />
          </a>
        </motion.div>

        {/* Metrics */}
        <motion.div custom={1.3} variants={fadeIn} initial="hidden" animate="visible" className="mt-28 grid grid-cols-3 gap-px max-w-md">
          {metrics.map((m) => (
            <div key={m.label} className="pr-8">
              <p className="font-display text-2xl sm:text-3xl font-light tracking-tight" style={{ color: 'var(--text-2)' }}>{m.value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-quaternary">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, var(--line), transparent)` }} />
    </section>
  );
}
