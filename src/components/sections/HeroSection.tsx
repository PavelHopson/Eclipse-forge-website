import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { contactDetails } from '../../data/content';
import { GlowButton } from '../ui/GlowButton';

const wordReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Eclipse ring — center visual */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ scale: ringScale, opacity: ringOpacity }}
      >
        <div className="eclipse-ring" />
        <div className="eclipse-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Fog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[8%] w-[600px] h-[600px] rounded-full blur-[200px] animate-float" style={{ background: 'rgba(107,163,255,0.025)' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full blur-[180px] animate-float-slow" style={{ background: 'rgba(107,163,255,0.015)' }} />
      </div>

      {/* Content — centered */}
      <motion.div className="relative z-10 text-center max-w-[1200px] mx-auto px-5 sm:px-8" style={{ y: textY }}>
        {/* Badge */}
        <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="mb-8">
          <div className="inline-flex items-center gap-3 border border-border/60 px-5 py-2.5 rounded-full bg-white/[0.02]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50 animate-pulse-soft" />
            <span className="type-meta" style={{ color: 'var(--text-3)' }}>Eclipse Forge</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-8 inline-block">
          <h1 className="type-display text-hero">
            {['Система', 'либо', 'работает'].map((w, i) => (
              <motion.span key={i} custom={i} variants={wordReveal} initial="hidden" animate="visible"
                className="inline-block mr-[0.22em]"
                style={{ color: i === 2 ? 'var(--text-1)' : 'var(--text-2)' }}>
                {w}
              </motion.span>
            ))}
            <br />
            {['на', 'тебя.'].map((w, i) => (
              <motion.span key={i+3} custom={i+3} variants={wordReveal} initial="hidden" animate="visible"
                className="inline-block mr-[0.22em] text-gradient-accent">
                {w}
              </motion.span>
            ))}
          </h1>
          <h1 className="type-display text-hero mt-1">
            {['Либо', 'против', 'тебя.'].map((w, i) => (
              <motion.span key={i+5} custom={i+5} variants={wordReveal} initial="hidden" animate="visible"
                className="inline-block mr-[0.22em]"
                style={{ color: 'var(--text-4)' }}>
                {w}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p custom={1.0} variants={fadeIn} initial="hidden" animate="visible"
          className="type-body max-w-lg mx-auto text-[15px] sm:text-base mb-10" style={{ color: 'var(--text-3)' }}>
          Мы перестраиваем цифровые системы — автоматизация, SaaS,
          AI&#8209;продукты — чтобы бизнес масштабировался без хаоса.
        </motion.p>

        {/* CTA */}
        <motion.div custom={1.3} variants={fadeIn} initial="hidden" animate="visible"
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
          <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="justify-center px-9 py-4 text-[14px]">
            Запустить систему
          </GlowButton>
          <a href="#cases"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-border px-9 py-4 text-[14px] font-display transition-all duration-500 hover:border-accent/20 hover:bg-white/[0.02]"
            style={{ color: 'var(--text-3)' }}>
            Портфолио
            <span className="w-4 h-px bg-border group-hover:w-8 group-hover:bg-accent/30 transition-all duration-500" />
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
}
