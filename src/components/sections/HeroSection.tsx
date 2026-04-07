import { motion } from 'framer-motion';
import { contactDetails } from '../../data/content';
import { GlowButton } from '../ui/GlowButton';

const lineReveal = {
  hidden: { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.1, delay: 0.3 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center haze">
      {/* Eclipse orb — center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full animate-eclipse-glow"
          style={{ background: 'radial-gradient(circle, rgba(220,230,242,0.06) 0%, rgba(220,230,242,0.02) 30%, transparent 60%)' }} />
      </div>

      {/* Ambient fog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] rounded-full blur-[200px] animate-float"
          style={{ background: 'rgba(167,180,194,0.03)' }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[180px] animate-float-slow"
          style={{ background: 'rgba(220,230,242,0.02)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32 w-full">
        {/* Badge */}
        <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-3 border border-border px-5 py-2.5 rounded-full bg-white/[0.02]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse-soft" />
            <span className="type-meta" style={{ color: 'var(--text-3)' }}>Eclipse Forge</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-8 lg:mb-12 max-w-5xl">
          <motion.h1 custom={0} variants={lineReveal} initial="hidden" animate="visible"
            className="type-display text-hero" style={{ color: 'var(--text-2)' }}>
            Система либо работает
          </motion.h1>
          <motion.h1 custom={1} variants={lineReveal} initial="hidden" animate="visible"
            className="type-display text-hero text-gradient">
            на тебя.
          </motion.h1>
          <motion.h1 custom={2} variants={lineReveal} initial="hidden" animate="visible"
            className="type-display text-hero" style={{ color: 'var(--text-3)' }}>
            Либо против тебя.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p custom={1.0} variants={fadeIn} initial="hidden" animate="visible"
          className="type-body max-w-md text-[15px] sm:text-base mb-10 lg:mb-14" style={{ color: 'var(--text-3)' }}>
          Мы перестраиваем цифровые системы — автоматизация, SaaS,
          AI-продукты — чтобы бизнес масштабировался без хаоса.
        </motion.p>

        {/* CTA */}
        <motion.div custom={1.3} variants={fadeIn} initial="hidden" animate="visible"
          className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="justify-center px-9 py-4 text-[14px]">
            Запустить систему
          </GlowButton>
          <a href="#cases"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-border px-9 py-4 text-[14px] font-display transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.02]"
            style={{ color: 'var(--text-3)' }}>
            Портфолио
            <span className="w-4 h-px bg-border group-hover:w-8 group-hover:bg-accent/30 transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
}
