import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { OrbitalRing, MiniEclipse } from '../ui/EclipseVisuals';

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progressWidth = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '100%']);

  return (
    <motion.section ref={ref} id="process" className="section-shell py-24 sm:py-32 lg:py-40 relative overflow-hidden" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      {/* Decorative orbital ring */}
      <div className="absolute -bottom-16 -right-16 opacity-20 hidden lg:block">
        <OrbitalRing size={280} dotCount={3} duration={25} color="var(--accent)" />
      </div>
      <MiniEclipse size={22} className="absolute top-20 right-16 hidden lg:block opacity-30" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 relative">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* LEFT — Sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent)' }}>Процесс</motion.p>
            <motion.h2 variants={revealUp} className="type-display mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span className="text-gradient">От задачи</span>
              <br />
              <span style={{ color: 'var(--text-4)' }}>к системе.</span>
            </motion.h2>
            {/* Progress bar */}
            <div className="hidden lg:block">
              <div className="h-px w-full rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                <motion.div className="h-full rounded-full" style={{ width: progressWidth, background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-4)' }}>Начало</span>
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-4)' }}>Результат</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Steps */}
          <div className="flex flex-col gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.index}
                variants={revealUp}
                whileHover={{ x: 8, borderColor: 'rgba(107,163,255,0.15)' }}
                className="group relative border rounded-2xl p-8 transition-all duration-500 overflow-hidden"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
              >
                {/* Hover effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(107,163,255,0.03) 0%, transparent 60%)' }} />

                <div className="relative flex gap-6 sm:gap-8">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <span className="font-display text-5xl lg:text-6xl font-extralight block transition-colors duration-700"
                      style={{ color: 'var(--text-4)' }}>
                      {step.index}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg lg:text-xl font-medium tracking-tight mb-3 transition-colors duration-400"
                      style={{ color: 'var(--text-1)' }}>
                      {step.title}
                    </h3>
                    <p className="type-body text-[14px] sm:text-[15px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                      {step.text}
                    </p>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, var(--accent), ${i % 2 === 0 ? 'var(--accent-warm)' : 'transparent'})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
