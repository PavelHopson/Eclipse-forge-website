import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { EclipsePhases, MiniEclipse } from '../ui/EclipseVisuals';

const stackItems = [
  { label: 'Rust systems', detail: '22K-line engine' },
  { label: 'TypeScript surfaces', detail: 'React 19 products' },
  { label: 'Python services', detail: 'FastAPI and ingestion' },
  { label: 'AI execution', detail: 'multi-provider routing' },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  return (
    <motion.section
      ref={ref}
      id="about"
      className="section-shell py-16 sm:py-24 lg:py-40"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div
          className="mb-12 h-px origin-left"
          style={{ width: lineWidth, background: 'linear-gradient(90deg, var(--accent), var(--accent-warm), transparent)' }}
        />

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent)' }}>
              Positioning
            </motion.p>
            <motion.h2 variants={revealUp} className="type-display mb-8 max-w-xl text-[clamp(2rem,4vw,3.5rem)]" style={{ color: 'var(--text-1)' }}>
              From idea
              <span className="mx-2" style={{ color: 'var(--text-4)' }}>
                →
              </span>
              to a system
              <span className="block text-gradient">that behaves like an asset.</span>
            </motion.h2>
            <motion.div variants={revealUp} className="space-y-4">
              <p className="type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-2)' }}>
                Eclipse Forge is strongest where product, automation and operator logic overlap. The aim is not to deliver a prettier screen,
                but to turn a messy manual process into a usable execution system.
              </p>
              <p className="type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
                Code, design and architecture are treated as one control surface. That is why the portfolio keeps returning to the same pattern:
                AI layers, workflow engines, dashboards, booking logic and products that push action forward.
              </p>
            </motion.div>
          </div>

          <motion.div variants={revealUp} className="flex flex-col gap-3">
            {stackItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 8, borderColor: 'rgba(107,163,255,0.2)' }}
                className="group flex items-center justify-between rounded-xl border px-6 py-5 transition-colors duration-400"
                style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-[11px] font-light" style={{ color: 'var(--text-4)' }}>
                    0{index + 1}
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                    {item.label}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-3)' }}>
                  {item.detail}
                </span>
              </motion.div>
            ))}

            <div className="mt-4 flex items-center gap-4 px-6">
              <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-4)' }}>
                958+ tests · flagship systems · reusable tooling
              </span>
              <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
            </div>
          </motion.div>
        </div>

        <motion.div variants={revealUp} className="mt-16 lg:mt-20">
          <EclipsePhases />
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-4)' }}>
            from signal → to full system gravity
          </p>
        </motion.div>

        <MiniEclipse size={18} className="absolute right-12 top-12 hidden opacity-40 lg:block" />
        <MiniEclipse size={14} className="absolute bottom-20 left-8 hidden opacity-30 lg:block" color="var(--accent-warm)" />
      </div>
    </motion.section>
  );
}
