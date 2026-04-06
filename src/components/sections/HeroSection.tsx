import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { contactDetails } from '../../data/content';
import { revealUp, stagger } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

// Lazy-load Spline for performance (~1.5MB runtime)
const Spline = lazy(() => import('@splinetool/react-spline'));

// ╔═══════════════════════════════════════════════════╗
// ║  SPLINE SCENE URL                                 ║
// ║  Replace with your exported scene URL:            ║
// ║  1. Open scene in Spline Editor                   ║
// ║  2. Click "Remix" on community file               ║
// ║  3. Export → Web Content → Viewer                 ║
// ║  4. Paste the prod.spline.design URL below        ║
// ╚═══════════════════════════════════════════════════╝
// Distorting Typography — hero background
const SPLINE_SCENE_URL = 'https://prod.spline.design/FCcTPhNPOIAc2FlI/scene.splinecode';
// Boxes Hover — available for other sections:
// https://prod.spline.design/FCcTPhNPOIAc2FlI/scene.splinecode

const stats = [
  { value: '8+', label: 'проектов' },
  { value: 'AI', label: 'автоматизация' },
  { value: '24/7', label: 'поддержка' },
];

export function HeroSection() {
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated gradient background (always visible, fades when Spline loads) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          splineLoaded ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {/* Primary orb */}
        <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] animate-pulse" />
        {/* Secondary orb */}
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-orange-600/15 blur-[100px]" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        {/* Frost accent */}
        <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-full bg-frost/5 blur-[80px]" />
      </div>

      {/* Spline 3D Scene */}
      {SPLINE_SCENE_URL && (
        <div className="absolute inset-0 z-0 opacity-40">
          <Suspense fallback={null}>
            <Spline
              scene={SPLINE_SCENE_URL}
              onLoad={() => setSplineLoaded(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </div>
      )}
      {/* Left-side dark gradient — keeps text readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.4) 60%, transparent 100%)',
        }}
      />
      {/* Top + bottom fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, transparent 25%, transparent 75%, rgba(10,10,10,1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[5] mx-auto max-w-7xl px-5 sm:px-8 py-32 lg:py-40 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            variants={revealUp}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(255,106,0,0.8)]" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-accent/70">
              Product Engineering Studio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={revealUp}
            className="type-display text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-tight"
          >
            <span className="text-white">Мы проектируем</span>
            <br />
            <span className="text-accent">системы</span>
            <span className="text-white/40">, а не сайты.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={revealUp}
            className="mt-8 max-w-xl text-[1.05rem] leading-[1.75] text-white/45"
          >
            Eclipse Forge создаёт цифровые продукты — от AI-автоматизации
            до SaaS-платформ — которые увеличивают прибыль и убирают хаос.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={revealUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <GlowButton
              href={contactDetails.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="justify-center px-8 py-4"
            >
              Обсудить проект
            </GlowButton>
            <a
              href="#cases"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.08] px-8 py-4 text-sm font-medium text-white/50 transition-all duration-300 hover:border-white/15 hover:text-white/70"
            >
              Смотреть кейсы →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={revealUp}
            className="mt-16 flex gap-12"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold text-white/80">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/25">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />
    </section>
  );
}
