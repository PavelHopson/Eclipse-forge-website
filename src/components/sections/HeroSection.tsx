import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AssetImage } from '../ui/AssetImage';
import { BlackHoleCanvas } from '../ui/BlackHoleCanvas';
import { GlowButton } from '../ui/GlowButton';
import { MagneticButton } from '../ui/MagneticButton';
import {
  ConstellationField,
  EclipseSilhouette,
  OrbitalRing,
  ParticleField,
  SolarCorona,
} from '../ui/EclipseVisuals';
import { brandAssets, contactDetails, useSiteContent } from '../../data/content';
import { useLocale, type Locale } from '../../lib/locale';

const heroCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    channelStatus: string;
    fallbackTitle: string;
    fallbackText: string;
    operatorLabel: string;
    operatorStatus: string;
    systemCore: string;
    orbitalView: string;
    scrollHint: string;
    plateFallback: string;
  }
> = {
  ru: {
    eyebrow: 'Eclipse Forge / AI systems engineering',
    title: 'Строю AI-системы,',
    titleAccent: 'которые работают вместо ручной рутины.',
    description: 'Автоматизация, SaaS и AI-операторы для задач, где ручной процесс уже стал узким местом.',
    primaryCta: 'Обсудить задачу',
    secondaryCta: 'Смотреть системы',
    channelStatus: 'канал запроса открыт',
    fallbackTitle: 'слот портрета активен',
    fallbackText: 'Положи `founder-portrait.png` в `public`, чтобы заменить fallback-визуал.',
    operatorLabel: 'оператор',
    operatorStatus: 'сигнал стабилен',
    systemCore: 'ядро системы',
    orbitalView: 'орбитальный обзор',
    scrollHint: 'спуститься в орбиту',
    plateFallback: 'Eclipse Forge',
  },
  en: {
    eyebrow: 'Eclipse Forge / AI systems engineering',
    title: 'I build AI systems',
    titleAccent: 'that replace manual routine.',
    description: 'Automation, SaaS and AI operators for work where manual process has become the bottleneck.',
    primaryCta: 'Discuss your task',
    secondaryCta: 'Explore systems',
    channelStatus: 'request channel open',
    fallbackTitle: 'portrait slot active',
    fallbackText: 'Drop `founder-portrait.png` into `public` to replace the fallback visual.',
    operatorLabel: 'operator',
    operatorStatus: 'signal stable',
    systemCore: 'system core',
    orbitalView: 'orbital view',
    scrollHint: 'scroll into orbit',
    plateFallback: 'Eclipse Forge',
  },
};

function HeroPortraitFallback({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-[1.75rem] border hero-portrait-fallback">
      <div className="absolute inset-0 hero-portrait-noise" />
      <EclipseSilhouette size={180} coronaColor="rgba(157, 196, 255, 0.14)" />
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border px-4 py-4 hero-data-chip">
        <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
          {text}
        </p>
      </div>
    </div>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const { locale } = useLocale();
  const copy = heroCopy[locale];
  const { metrics } = useSiteContent();

  return (
    <section ref={ref} id="hero" className="relative min-h-screen overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28 lg:flex lg:items-center lg:pb-0">
      <motion.div className="absolute inset-0 hero-depth-layer" style={{ y: bgY }} />
      <div className="absolute inset-0 hero-grid-overlay" />
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-0 pointer-events-none">
        <ConstellationField className="opacity-30" />
        <ParticleField count={28} className="opacity-45" />
      </div>
      <motion.div className="absolute left-[-8%] top-[16%] hidden lg:block hero-ambient-glow" style={{ scale: glowScale }} />
      <motion.div className="absolute bottom-[6%] right-[-4%] hidden lg:block hero-ambient-glow-alt" style={{ y: visualY }} />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid min-h-[86vh] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <motion.div style={{ y: textY }} className="relative">
            <motion.div custom={0.15} variants={reveal} initial="hidden" animate="visible">
              <div className="inline-flex items-center gap-3 rounded-full border px-5 py-2.5 hero-data-chip">
                <span className="h-2 w-2 rounded-full hero-signal-dot" />
                <span className="type-meta" style={{ color: 'var(--text-3)' }}>
                  {copy.eyebrow}
                </span>
              </div>
            </motion.div>

            <motion.h1
              custom={0.25}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="type-display mt-8 max-w-[11.5ch] text-balance text-[clamp(3rem,6.2vw,5.8rem)]"
            >
              {copy.title}
              <span className="block text-gradient-hero">{copy.titleAccent}</span>
            </motion.h1>

            <motion.p
              custom={0.38}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="type-body mt-7 max-w-md text-[15px] leading-relaxed sm:text-[17px]"
              style={{ color: 'var(--text-2)' }}
            >
              {copy.description}
            </motion.p>

            <motion.div custom={0.48} variants={reveal} initial="hidden" animate="visible" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton strength={0.22}>
                <GlowButton href="#contact" className="justify-center px-10 py-4 text-[14px]">
                  {copy.primaryCta}
                </GlowButton>
              </MagneticButton>

              <a
                href="#cases"
                className="group inline-flex items-center justify-center gap-3 rounded-full border px-10 py-4 text-[14px] font-display transition-all duration-500 hover:bg-white/[0.02]"
                style={{ color: 'var(--text-2)', borderColor: 'var(--line)' }}
              >
                {copy.secondaryCta}
                <span className="h-px w-6 transition-all duration-500 group-hover:w-12" style={{ background: 'var(--accent-warm)' }} />
              </a>
            </motion.div>

            <motion.div
              custom={0.58}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="mt-9 grid max-w-[31rem] grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border px-4 py-3 hero-data-chip">
                  <p className="font-display text-lg font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                    {metric.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={0.68}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 hero-data-chip">
                <span className="h-2 w-2 rounded-full hero-signal-dot" />
                <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-3)' }}>
                  {copy.channelStatus}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                Telegram {contactDetails.telegramDm}
              </span>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: visualY }} className="relative lg:pr-2">
            <div className="relative mx-auto flex max-w-[690px] justify-center lg:justify-end">
              <div className="hero-core-shell relative w-full max-w-[650px] min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]">
                <motion.div className="absolute left-[55%] top-[51%] z-0 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2" style={{ scale: glowScale }}>
                  <BlackHoleCanvas className="h-full w-full rounded-full opacity-90" />
                </motion.div>

                <div className="pointer-events-none absolute left-[55%] top-[51%] z-10 -translate-x-1/2 -translate-y-1/2">
                  <SolarCorona size={520} rays={28} color="rgba(157,196,255,0.07)" />
                </div>
                <div className="pointer-events-none absolute left-[55%] top-[51%] z-10 -translate-x-1/2 -translate-y-1/2">
                  <OrbitalRing size={560} dotCount={3} duration={54} color="var(--accent)" />
                </div>
                <div className="pointer-events-none absolute left-[55%] top-[51%] z-10 -translate-x-1/2 -translate-y-1/2 opacity-70">
                  <OrbitalRing size={660} dotCount={2} duration={78} color="var(--accent-warm)" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 40, y: 24 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-portrait-card absolute left-[8%] top-[15%] z-20 w-[52%] max-w-[350px] rounded-[2rem] border p-3 sm:p-4"
                >
                  <AssetImage
                    alt={brandAssets.founderDesk.alt}
                    sources={brandAssets.founderDesk.sources}
                    loading="eager"
                    className="h-[320px] w-full rounded-[1.7rem] object-cover sm:h-[420px]"
                    style={{ objectPosition: brandAssets.founderDesk.objectPosition }}
                    fallback={<HeroPortraitFallback title={copy.fallbackTitle} text={copy.fallbackText} />}
                  />

                  <div className="pointer-events-none absolute inset-x-6 top-6 rounded-full border px-4 py-2 hero-status-line sm:inset-x-10 sm:top-8">
                    <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.24em]">
                      <span style={{ color: 'var(--text-4)' }}>{copy.operatorLabel}</span>
                      <span style={{ color: 'var(--text-2)' }}>{copy.operatorStatus}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-brand-plate absolute bottom-[13%] right-[4%] z-20 hidden w-[220px] rounded-[1.6rem] border p-3 sm:block"
                >
                  <AssetImage
                    alt={brandAssets.heroPlate.alt}
                    sources={brandAssets.heroPlate.sources}
                    loading="lazy"
                    className="h-[148px] w-full rounded-[1.25rem] object-cover"
                    style={{ objectPosition: brandAssets.heroPlate.objectPosition }}
                    fallback={
                      <div className="flex h-[148px] w-full items-end rounded-[1.25rem] bg-[radial-gradient(circle_at_top,rgba(117,140,255,0.18),transparent_58%),linear-gradient(180deg,#0d1117_0%,#07090d_100%)] p-4">
                        <p className="type-meta" style={{ color: 'var(--text-3)' }}>
                          {copy.plateFallback}
                        </p>
                      </div>
                    }
                  />
                  <div className="mt-3 flex items-center justify-between px-1">
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                      {copy.systemCore}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                      {copy.orbitalView}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: 'var(--text-4)' }}>
          {copy.scrollHint}
        </span>
        <motion.div
          className="h-10 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.3, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
