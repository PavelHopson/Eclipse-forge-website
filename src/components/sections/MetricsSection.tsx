import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useSiteContent } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { ConstellationField, EclipseSilhouette, SolarCorona } from '../ui/EclipseVisuals';

function useAnimatedCounter(target: number, duration = 2, inView: boolean) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (value) => {
      if (ref.current) {
        ref.current.textContent = Math.round(value).toLocaleString();
      }
    });

    return unsubscribe;
  }, [spring]);

  return ref;
}

function ProgressRing({ value, max, size = 80, strokeWidth = 3 }: { value: number; max: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      progress.set(value / max);
    }
  }, [inView, max, progress, value]);

  return (
    <div ref={ref} className="counter-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--line)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: springProgress.get() === 0 ? circumference : undefined,
          }}
          animate={inView ? { strokeDashoffset: circumference * (1 - value / max) } : { strokeDashoffset: circumference }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-warm)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const metricConfigs = [
  { numericValue: 13, max: 16, suffix: '', accent: false },
  { numericValue: 3, max: 5, suffix: '', accent: true },
  { numericValue: 1, max: 1, suffix: '', accent: false },
];

const metricsCopy: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  ru: {
    eyebrow: 'Проверяемая база',
    title: 'Показатели со ссылкой на источник.',
    subtitle: 'Каждое число на этой поверхности связано с публичным версионированным реестром или контрактом.',
  },
  en: {
    eyebrow: 'Verifiable baseline',
    title: 'Numbers linked to their source.',
    subtitle: 'Every number on this surface points to a public versioned registry or contract.',
  },
};

export function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { locale } = useLocale();
  const copy = metricsCopy[locale];
  const { metrics } = useSiteContent();

  return (
    <motion.section
      ref={ref}
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-40"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <ConstellationField />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <SolarCorona size={500} rays={32} color="rgba(107,163,255,0.04)" />
      </div>

      <div className="absolute right-8 top-8 hidden opacity-25 lg:block">
        <EclipseSilhouette size={80} coronaColor="rgba(212,175,55,0.16)" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6 text-center" style={{ color: 'var(--gold)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display mb-6 text-center text-[clamp(1.8rem,3.5vw,3rem)]">
          <span style={{ color: 'var(--text-1)' }}>{copy.title}</span>
        </motion.h2>
        <motion.p
          variants={revealUp}
          className="mx-auto mb-16 max-w-2xl text-center text-[14px] leading-relaxed sm:text-[15px] lg:mb-20"
          style={{ color: 'var(--text-3)' }}
        >
          {copy.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {metrics.map((metric, index) => {
            const config = metricConfigs[index];
            const counterRef = useAnimatedCounter(config.numericValue, 2.5, inView);

            return (
              <motion.div
                key={metric.label}
                variants={revealUp}
                className="relative overflow-hidden rounded-2xl border p-8 text-center lg:p-10"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
              >
                <div className="relative mb-6 flex justify-center">
                  <ProgressRing value={config.numericValue} max={config.max} size={90} strokeWidth={3} />
                </div>

                <div className="relative">
                  <div className="mb-3 flex items-baseline justify-center gap-1">
                    <span ref={counterRef} className="font-display text-5xl font-light tracking-tight lg:text-6xl" style={{ color: config.accent ? 'var(--accent)' : 'var(--text-1)' }}>
                      0
                    </span>
                    {config.suffix ? (
                      <span className="font-display text-3xl font-light" style={{ color: 'var(--text-3)' }}>
                        {config.suffix}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-3)' }}>
                    {metric.label}
                  </p>
                  <a
                    href={metric.sourceHref}
                    className="mt-5 inline-flex min-h-11 items-center border-b text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{ color: 'var(--text-2)', borderColor: 'var(--line)', outlineColor: 'var(--gold)' }}
                  >
                    {metric.sourceLabel} ↗
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
