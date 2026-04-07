import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { contactDetails } from '../../data/content';
import { GlowButton } from '../ui/GlowButton';

const wordReveal = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const headingWords = [
  { text: 'Система', style: 'muted' },
  { text: 'либо', style: 'muted' },
  { text: 'работает', style: 'bright' },
  { text: 'на', style: 'gradient' },
  { text: 'тебя.', style: 'gradient' },
];

const headingLine2 = [
  { text: 'Либо', style: 'dim' },
  { text: 'против', style: 'dim' },
  { text: 'тебя.', style: 'dim' },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax layers
  const fogY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);

  const wordStyle = (s: string) => {
    if (s === 'gradient') return 'text-gradient';
    if (s === 'bright') return '';
    if (s === 'dim') return '';
    return '';
  };
  const wordColor = (s: string) => {
    if (s === 'gradient') return undefined;
    if (s === 'bright') return 'var(--text-1)';
    if (s === 'dim') return 'var(--text-4)';
    return 'var(--text-2)';
  };

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Layer 1: Fog background (slowest) */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: fogY }}>
        <div className="absolute top-[5%] left-[8%] w-[700px] h-[700px] rounded-full blur-[220px] animate-float"
          style={{ background: 'rgba(167,180,194,0.025)' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full blur-[200px] animate-float-slow"
          style={{ background: 'rgba(220,230,242,0.015)' }} />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full blur-[150px]"
          style={{ background: 'rgba(167,180,194,0.01)' }} />
      </motion.div>

      {/* Layer 2: Eclipse glow (medium speed) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ scale: glowScale, opacity: glowOpacity }}
      >
        <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full animate-eclipse-glow"
          style={{ background: 'radial-gradient(circle, rgba(220,230,242,0.07) 0%, rgba(220,230,242,0.02) 35%, transparent 60%)' }} />
      </motion.div>

      {/* Layer 3: Foreground vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{ opacity: vignetteOpacity, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,7,10,0.8) 100%)' }}
      />

      {/* Content (moves slightly up on scroll) */}
      <motion.div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32 w-full"
        style={{ y: textY }}>

        {/* Badge */}
        <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-3 border px-5 py-2.5 rounded-full bg-white/[0.02]"
            style={{ borderColor: 'var(--line)' }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--accent)', opacity: 0.5 }} />
            <span className="type-meta" style={{ color: 'var(--text-3)' }}>Eclipse Forge</span>
          </div>
        </motion.div>

        {/* Headline — word by word with blur-to-focus + tracking tighten */}
        <div className="mb-3 lg:mb-4 max-w-5xl">
          <h1 className="type-display text-hero flex flex-wrap gap-x-[0.25em]">
            {headingWords.map((w, i) => (
              <motion.span key={i} custom={i} variants={wordReveal} initial="hidden" animate="visible"
                className={`inline-block ${wordStyle(w.style)}`}
                style={wordColor(w.style) ? { color: wordColor(w.style) } : undefined}>
                {w.text}
              </motion.span>
            ))}
          </h1>
        </div>
        <div className="mb-8 lg:mb-12 max-w-5xl">
          <h1 className="type-display text-hero flex flex-wrap gap-x-[0.25em]">
            {headingLine2.map((w, i) => (
              <motion.span key={i} custom={i + headingWords.length} variants={wordReveal} initial="hidden" animate="visible"
                className="inline-block"
                style={{ color: wordColor(w.style) }}>
                {w.text}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p custom={1.2} variants={fadeIn} initial="hidden" animate="visible"
          className="type-body max-w-md text-[15px] sm:text-base mb-10 lg:mb-14" style={{ color: 'var(--text-3)' }}>
          Мы перестраиваем цифровые системы — автоматизация, SaaS,
          AI&#8209;продукты — чтобы бизнес масштабировался без хаоса.
        </motion.p>

        {/* CTA */}
        <motion.div custom={1.5} variants={fadeIn} initial="hidden" animate="visible"
          className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <GlowButton href={contactDetails.telegramUrl} target="_blank" rel="noreferrer" className="justify-center px-9 py-4 text-[14px]">
            Запустить систему
          </GlowButton>
          <a href="#cases"
            className="group inline-flex items-center justify-center gap-3 rounded-full border px-9 py-4 text-[14px] font-display transition-all duration-500 hover:bg-white/[0.02]"
            style={{ borderColor: 'var(--line)', color: 'var(--text-3)' }}>
            Портфолио
            <span className="w-4 h-px transition-all duration-500 group-hover:w-8" style={{ background: 'var(--text-4)' }} />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
}
