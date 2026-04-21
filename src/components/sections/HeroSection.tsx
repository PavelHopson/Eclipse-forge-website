import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { metrics } from '../../data/content';
import { EclipseSilhouette, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';
import { GlowButton } from '../ui/GlowButton';
import { MagneticButton } from '../ui/MagneticButton';
import { BlackHoleCanvas } from '../ui/BlackHoleCanvas';

/* ── Kinetic word reveal ── */
const wordReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)', rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0,
    transition: { duration: 1, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const lineSlide = {
  hidden: { scaleX: 0 },
  visible: (d: number) => ({
    scaleX: 1,
    transition: { duration: 1.2, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Scramble text hook ── */
function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (frame / totalFrames > i / text.length) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return display;
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const scrambledBadge = useTextScramble('ECLIPSE FORGE', mounted);

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden min-h-screen flex items-end pb-16 sm:pb-24 lg:items-center lg:pb-0">
      {/* Black hole — live physics simulation. On mobile: centered behind content with low opacity (acts as ambient bg). On desktop: anchored to right. */}
      <motion.div
        className="absolute top-1/2 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:right-[4%] -translate-y-1/2 pointer-events-none
                   w-[min(90vw,360px)] h-[min(90vw,360px)]
                   sm:w-[min(80vw,500px)] sm:h-[min(80vw,500px)]
                   lg:w-[min(50vw,720px)] lg:h-[min(50vw,720px)]
                   opacity-40 sm:opacity-60 lg:opacity-100"
        style={{ scale: ringScale, opacity: ringOpacity, y: visualY }}
      >
        {/* Physics sim — particles spiraling into event horizon */}
        <BlackHoleCanvas className="absolute inset-0 w-full h-full rounded-full" />

        {/* Subtle orbital ring overlay — decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <OrbitalRing size={760} dotCount={2} duration={60} color="var(--accent-warm)" />
        </div>
      </motion.div>

      {/* Use EclipseSilhouette import to avoid tree-shake removal if other sections need it */}
      <div className="hidden">
        <EclipseSilhouette size={1} />
      </div>

      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-60" />

      {/* Floating particles */}
      <ParticleField count={25} />

      {/* Grid lines — subtle structure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[20%] w-px h-full" style={{ background: 'linear-gradient(to bottom, transparent, var(--line-subtle) 30%, var(--line-subtle) 70%, transparent)' }} />
        <div className="absolute top-0 left-[50%] w-px h-full hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, var(--line-subtle) 30%, var(--line-subtle) 70%, transparent)' }} />
        <div className="absolute top-0 left-[80%] w-px h-full hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, var(--line-subtle) 30%, var(--line-subtle) 70%, transparent)' }} />
      </div>

      {/* Fog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[700px] h-[700px] rounded-full blur-[250px] animate-float" style={{ background: 'rgba(107,163,255,0.03)' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[200px] animate-float-slow" style={{ background: 'rgba(245,166,35,0.015)' }} />
      </div>

      {/* Split-screen content: text LEFT, visual RIGHT */}
      <motion.div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 lg:pt-0" style={{ y: textY }}>
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8 sm:gap-10 lg:gap-8 items-center min-h-[80vh]">

          {/* LEFT — Text */}
          <div className="relative">
            {/* Badge */}
            <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" className="mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-3 border px-5 py-2.5 rounded-full" style={{ borderColor: 'var(--line)', background: 'rgba(107,163,255,0.04)' }}>
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="type-meta font-mono tracking-[0.2em]" style={{ color: 'var(--text-3)', fontSize: '0.65rem' }}>
                  {scrambledBadge}
                </span>
              </div>
            </motion.div>

            {/* Headline — asymmetric, large */}
            <div className="mb-8 lg:mb-10" style={{ perspective: '800px' }}>
              <h1 className="type-display" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
                {['Строю'].map((w, i) => (
                  <motion.span key={i} custom={i} variants={wordReveal} initial="hidden" animate="visible"
                    className="inline-block mr-[0.2em]" style={{ color: 'var(--text-3)' }}>
                    {w}
                  </motion.span>
                ))}
                <br />
                {['AI-системы,'].map((w, i) => (
                  <motion.span key={`ai-${i}`} custom={i + 1} variants={wordReveal} initial="hidden" animate="visible"
                    className="inline-block mr-[0.2em] text-gradient-accent">
                    {w}
                  </motion.span>
                ))}
              </h1>
              <h1 className="type-display mt-2" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
                {['которые'].map((w, i) => (
                  <motion.span key={`w2-${i}`} custom={i + 2} variants={wordReveal} initial="hidden" animate="visible"
                    className="inline-block mr-[0.2em]" style={{ color: 'var(--text-4)' }}>
                    {w}
                  </motion.span>
                ))}
                {['работают.'].map((w, i) => (
                  <motion.span key={`w3-${i}`} custom={i + 3} variants={wordReveal} initial="hidden" animate="visible"
                    className="inline-block text-gradient-hero">
                    {w}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Decorative line */}
            <motion.div
              custom={1.0}
              variants={lineSlide}
              initial="hidden"
              animate="visible"
              className="h-px w-full max-w-[200px] mb-8 origin-left"
              style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
            />

            {/* Subtitle */}
            <motion.p custom={1.2} variants={fadeIn} initial="hidden" animate="visible"
              className="type-body max-w-lg text-[15px] sm:text-[16px] mb-10 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Rust-инфраструктура, мультиплатформенные TypeScript-приложения, Python-бэкенды.
              <span className="block mt-2" style={{ color: 'var(--accent)' }}>958 тестов в 7 проектах. Каждый коммит проверен.</span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div custom={1.5} variants={fadeIn} initial="hidden" animate="visible"
              className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <MagneticButton strength={0.25}>
                <GlowButton href="#contact" className="justify-center px-10 py-4 text-[14px]">
                  Написать
                </GlowButton>
              </MagneticButton>
              <a href="#cases"
                className="group inline-flex items-center justify-center gap-3 rounded-full border px-10 py-4 text-[14px] font-display transition-all duration-500 hover:bg-white/[0.02]"
                style={{ color: 'var(--text-3)', borderColor: 'var(--line)' }}>
                Портфолио
                <span className="w-5 h-px transition-all duration-500 group-hover:w-10" style={{ background: 'var(--accent-warm)' }} />
              </a>
            </motion.div>

            {/* Mobile/tablet metric chips — visible on <lg, replace the lg-only floating cards */}
            <motion.div custom={1.8} variants={fadeIn} initial="hidden" animate="visible"
              className="mt-10 flex flex-wrap gap-2 lg:hidden">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="inline-flex items-baseline gap-2 border rounded-lg px-3 py-2 backdrop-blur-sm"
                  style={{ borderColor: 'var(--line)', background: 'var(--hero-stat-bg)' }}
                >
                  <span className="font-display text-lg font-semibold leading-none" style={{ color: 'var(--text-1)' }}>
                    {m.value}
                  </span>
                  <span className="text-[10px] tracking-[0.12em] uppercase leading-none" style={{ color: 'var(--text-4)' }}>
                    {m.label}
                  </span>
                </div>
              ))}
              <div className="inline-flex items-center gap-2 px-3 py-2">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--live)' }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-4)' }}>
                  Открыт к проектам
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Metric cards + visual */}
          <motion.div custom={1.8} variants={fadeIn} initial="hidden" animate="visible"
            className="relative hidden lg:flex flex-col gap-4 items-end">

            {/* Floating metric cards */}
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="border rounded-2xl px-6 py-5 backdrop-blur-sm"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--hero-stat-bg)',
                  marginRight: i === 1 ? '2rem' : i === 2 ? '4rem' : '0',
                }}
              >
                <span className="font-display text-3xl font-light tracking-tight" style={{ color: 'var(--text-1)' }}>
                  {m.value}
                </span>
                <span className="block text-[11px] tracking-[0.15em] uppercase mt-1" style={{ color: 'var(--text-4)' }}>
                  {m.label}
                </span>
              </motion.div>
            ))}

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="flex items-center gap-2 mt-4 mr-8"
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--live)' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: 'var(--text-4)' }}>
                Открыт к проектам
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 glow-line" />

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
