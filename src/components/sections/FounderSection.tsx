import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AssetImage } from '../ui/AssetImage';
import { ConstellationField, EclipseSilhouette, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';
import { brandAssets, useSiteContent } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';

const founderCopy: Record<
  Locale,
  {
    fallbackTitle: string;
    fallbackText: string;
    status: string;
    plateFallback: string;
    noteTitle: string;
    noteText: string;
    modeLabel: string;
    modeValue: string;
    surfaceLabel: string;
    surfaceValue: string;
  }
> = {
  ru: {
    fallbackTitle: 'сигнал основателя',
    fallbackText: 'Слот портрета готов. Положи `founder-portrait.png` в `public/images/projects`, чтобы заменить fallback-рамку.',
    status: 'оператор в сети',
    plateFallback: 'Eclipse Forge / системы > интерфейсы',
    noteTitle: 'Системная заметка',
    noteText: 'Eclipse Forge лучше всего работает на проектах, где сложность лежит не в самом экране, а в модели исполнения за ним.',
    modeLabel: 'режим',
    modeValue: 'systems first',
    surfaceLabel: 'поверхность',
    surfaceValue: 'UI + логика оператора',
  },
  en: {
    fallbackTitle: 'Founder signal',
    fallbackText: 'Portrait slot is ready. Drop `founder-portrait.png` into `public/images/projects` to replace the fallback frame.',
    status: 'operator online',
    plateFallback: 'Eclipse Forge / systems > interfaces',
    noteTitle: 'System note',
    noteText: 'Eclipse Forge works best on projects where the hard part is not the screen itself, but the execution model behind it.',
    modeLabel: 'mode',
    modeValue: 'systems first',
    surfaceLabel: 'surface',
    surfaceValue: 'UI + operator logic',
  },
};

function PortraitFallback({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] border founder-frame-inner">
      <div className="absolute inset-0 founder-orbit-sheen" />
      <EclipseSilhouette size={220} coronaColor="rgba(157, 196, 255, 0.14)" />
      <div className="absolute bottom-8 left-8 right-8 rounded-2xl border px-5 py-4 founder-panel">
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

export function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const { locale } = useLocale();
  const copy = founderCopy[locale];
  const { founderProfile } = useSiteContent();

  return (
    <motion.section
      ref={ref}
      id="founder"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-36"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute inset-0 founder-radial-bg" />
      <div className="absolute inset-0 opacity-60">
        <ConstellationField className="opacity-30" />
        <ParticleField count={16} className="opacity-35" />
      </div>
      <div className="absolute -left-20 top-10 hidden lg:block opacity-30">
        <OrbitalRing size={320} dotCount={3} duration={42} color="var(--accent-warm)" />
      </div>
      <div className="absolute right-[-8%] top-1/2 hidden -translate-y-1/2 lg:block opacity-20">
        <EclipseSilhouette size={420} coronaColor="rgba(117, 140, 255, 0.12)" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <motion.div variants={revealUp} className="rounded-[2rem] border p-7 sm:p-10 founder-panel">
            <p className="type-meta mb-5" style={{ color: 'var(--accent)' }}>
              {founderProfile.eyebrow}
            </p>
            <h2 className="type-display max-w-[13ch] text-balance text-[clamp(2.2rem,4.5vw,4.6rem)]">
              {founderProfile.title}
            </h2>

            <div className="mt-8 space-y-4">
              {founderProfile.summary.map((paragraph) => (
                <p key={paragraph} className="type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-2)' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {founderProfile.stats.map((item) => (
                <div key={item.label} className="rounded-2xl border px-4 py-4 founder-metric">
                  <p className="font-display text-base font-medium tracking-tight sm:text-lg" style={{ color: 'var(--text-1)' }}>
                    {item.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              {founderProfile.pillars.map((pillar, index) => (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.12 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 rounded-2xl border px-4 py-4 founder-list-row"
                >
                  <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full founder-list-dot" />
                  <p className="type-body text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>
                    {pillar}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={revealUp} style={{ y: panelY }} className="relative flex flex-col gap-4">
            <div className="founder-frame rounded-[2rem] border p-3 sm:p-4">
              <AssetImage
                alt={founderProfile.portrait.alt}
                sources={founderProfile.portrait.sources}
                loading="lazy"
                className="h-full min-h-[420px] w-full rounded-[1.6rem] object-cover"
                style={{ objectPosition: founderProfile.portrait.objectPosition }}
                fallback={<PortraitFallback title={copy.fallbackTitle} text={copy.fallbackText} />}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] founder-frame-glow" />
              <div className="pointer-events-none absolute right-8 top-8 hidden rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.26em] sm:inline-flex founder-status">
                {copy.status}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
              <div className="overflow-hidden rounded-[1.7rem] border founder-panel">
                <AssetImage
                  alt={brandAssets.heroPlate.alt}
                  sources={brandAssets.heroPlate.sources}
                  loading="lazy"
                  className="h-full min-h-[180px] w-full object-cover"
                  style={{ objectPosition: brandAssets.heroPlate.objectPosition }}
                  fallback={
                    <div className="flex min-h-[180px] items-end bg-[radial-gradient(circle_at_top,rgba(117,140,255,0.16),transparent_58%),linear-gradient(180deg,#0c1117_0%,#07090d_100%)] p-6">
                      <p className="type-meta" style={{ color: 'var(--text-3)' }}>
                        {copy.plateFallback}
                      </p>
                    </div>
                  }
                />
              </div>

              <div className="rounded-[1.7rem] border p-5 founder-panel">
                <p className="type-meta mb-3" style={{ color: 'var(--accent)' }}>
                  {copy.noteTitle}
                </p>
                <p className="type-body text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
                  {copy.noteText}
                </p>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between rounded-full border px-3 py-2 founder-chip">
                    <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                      {copy.modeLabel}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-2)' }}>
                      {copy.modeValue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-full border px-3 py-2 founder-chip">
                    <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                      {copy.surfaceLabel}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-2)' }}>
                      {copy.surfaceValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
