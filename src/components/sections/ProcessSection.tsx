import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { MiniEclipse, OrbitalRing } from '../ui/EclipseVisuals';

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progressWidth = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '100%']);

  return (
    <motion.section
      ref={ref}
      id="process"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-40"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute -bottom-16 -right-16 hidden opacity-20 lg:block">
        <OrbitalRing size={280} dotCount={3} duration={25} color="var(--accent)" />
      </div>
      <MiniEclipse size={22} className="absolute right-16 top-20 hidden opacity-30 lg:block" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent)' }}>
              Process
            </motion.p>
            <motion.h2 variants={revealUp} className="type-display mb-8 text-[clamp(2rem,4vw,3.5rem)]">
              <span className="text-gradient">From request</span>
              <br />
              <span style={{ color: 'var(--text-4)' }}>to operational shape.</span>
            </motion.h2>
            <div className="hidden lg:block">
              <div className="h-px w-full overflow-hidden rounded-full" style={{ background: 'var(--line)' }}>
                <motion.div className="h-full rounded-full" style={{ width: progressWidth, background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }} />
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                  input
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                  controlled result
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.index}
                variants={revealUp}
                whileHover={{ x: 8, borderColor: 'rgba(107,163,255,0.15)' }}
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(107,163,255,0.03) 0%, transparent 60%)' }} />

                <div className="relative flex gap-6 sm:gap-8">
                  <div className="shrink-0">
                    <span className="block font-display text-5xl font-extralight transition-colors duration-700 lg:text-6xl" style={{ color: 'var(--text-4)' }}>
                      {step.index}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="mb-3 font-display text-lg font-medium tracking-tight transition-colors duration-400 lg:text-xl" style={{ color: 'var(--text-1)' }}>
                      {step.title}
                    </h3>
                    <p className="type-body text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>
                      {step.text}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, var(--accent), ${index % 2 === 0 ? 'var(--accent-warm)' : 'transparent'})` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
