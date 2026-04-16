import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { metrics } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { ConstellationField, SolarCorona, EclipseSilhouette } from '../ui/EclipseVisuals';

/* ── Animated counter hook ── */
function useAnimatedCounter(target: number, duration: number = 2, inView: boolean) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString();
      }
    });
    return unsubscribe;
  }, [spring]);

  return ref;
}

/* ── Circular progress ring ── */
function ProgressRing({ value, max, size = 80, strokeWidth = 3 }: { value: number; max: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) progress.set(value / max);
  }, [inView, progress, value, max]);

  return (
    <div ref={ref} className="counter-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--line)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="url(#ringGradient)" strokeWidth={strokeWidth} fill="none"
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
  { numericValue: 958, max: 1000, suffix: '', accent: true },
  { numericValue: 22, max: 30, suffix: 'K', accent: false },
  { numericValue: 6, max: 8, suffix: '', accent: false },
];

export function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section ref={ref} className="section-shell py-24 sm:py-32 lg:py-40 relative overflow-hidden"
      variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>

      {/* Background constellation */}
      <ConstellationField />

      {/* Solar corona behind the metrics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <SolarCorona size={500} rays={32} color="rgba(107,163,255,0.04)" />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(ellipse, rgba(107,163,255,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Small eclipse silhouette */}
      <div className="absolute top-8 right-8 hidden lg:block opacity-25">
        <EclipseSilhouette size={80} coronaColor="rgba(245,166,35,0.15)" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 relative">
        <motion.p variants={revealUp} className="type-meta mb-6 text-center" style={{ color: 'var(--accent)' }}>
          Метрики
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display text-center mb-16 lg:mb-20" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
          <span className="text-gradient">Цифры, которые</span>{' '}
          <span style={{ color: 'var(--text-4)' }}>говорят сами.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {metrics.map((m, i) => {
            const config = metricConfigs[i];
            const counterRef = useAnimatedCounter(config.numericValue, 2.5, inView);

            return (
              <motion.div
                key={m.label}
                variants={revealUp}
                className="group relative text-center border rounded-2xl p-8 lg:p-10 overflow-hidden transition-all duration-500"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
                whileHover={{ y: -4, borderColor: 'rgba(107,163,255,0.15)' }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(107,163,255,0.04) 0%, transparent 70%)' }} />

                {/* Ring */}
                <div className="relative flex justify-center mb-6">
                  <ProgressRing value={config.numericValue} max={config.max} size={90} strokeWidth={3} />
                </div>

                {/* Counter */}
                <div className="relative">
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span ref={counterRef}
                      className="font-display text-5xl lg:text-6xl font-light tracking-tight"
                      style={{ color: config.accent ? 'var(--accent)' : 'var(--text-1)' }}>
                      0
                    </span>
                    {config.suffix && (
                      <span className="font-display text-3xl font-light" style={{ color: 'var(--text-3)' }}>
                        {config.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-3)' }}>
                    {m.label}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
