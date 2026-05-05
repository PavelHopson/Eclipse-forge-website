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
  { numericValue: 6, max: 8, suffix: '', accent: false },
  { numericValue: 958, max: 1000, suffix: '+', accent: true },
  { numericValue: 22, max: 30, suffix: 'K', accent: false },
];

const metricsCopy: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  ru: {
    eyebrow: 'Системы, которые работают',
    title: 'Цифры, за которыми стоит исполнение.',
    subtitle: '24/7 процессы, проверки в релизе, инженерное ядро. Эти числа не маркетинг — это рабочая телеметрия.',
  },
  en: {
    eyebrow: 'Systems that run',
    title: 'Numbers backed by execution.',
    subtitle: '24/7 processes, release checks, engineering core. These are not marketing numbers — they are working telemetry.',
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

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(ellipse, rgba(107,163,255,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="absolute right-8 top-8 hidden opacity-25 lg:block">
        <EclipseSilhouette size={80} coronaColor="rgba(140,124,255,0.16)" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6 text-center" style={{ color: 'var(--gold)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display mb-6 text-center text-[clamp(1.8rem,3.5vw,3rem)]">
          <span className="text-gradient">{copy.title}</span>
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
                className="group relative overflow-hidden rounded-2xl border p-8 text-center transition-all duration-500 lg:p-10"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
                whileHover={{ y: -4, borderColor: 'rgba(107,163,255,0.15)' }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(107,163,255,0.04) 0%, transparent 70%)' }} />

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
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
