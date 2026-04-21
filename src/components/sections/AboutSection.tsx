import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { EclipsePhases, MiniEclipse } from '../ui/EclipseVisuals';

const stackItems = [
  { label: 'Rust', detail: '22K строк' },
  { label: 'TypeScript', detail: 'React 19' },
  { label: 'Python', detail: 'FastAPI' },
  { label: 'AI/ML', detail: '6 провайдеров' },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  return (
    <motion.section ref={ref} id="about" className="section-shell py-16 sm:py-24 lg:py-40" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Animated accent line */}
        <motion.div className="h-px mb-12 origin-left" style={{ width: lineWidth, background: 'linear-gradient(90deg, var(--accent), var(--accent-warm), transparent)' }} />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 sm:gap-12 lg:gap-24">
          {/* LEFT — Statement */}
          <div>
            <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent)' }}>
              Позиционирование
            </motion.p>
            <motion.h2 variants={revealUp} className="type-display max-w-xl mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text-1)' }}>
              Идея{' '}
              <span style={{ color: 'var(--text-4)' }}>→</span>{' '}
              <span className="text-gradient-accent">система</span>
              <span style={{ color: 'var(--text-4)' }}>, которая</span>
              <br />
              <span className="text-gradient">работает как актив.</span>
            </motion.h2>
            <motion.div variants={revealUp} className="space-y-4">
              <p className="type-body text-[15px] sm:text-[16px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Проектирую цифровые продукты, автоматизацию и сервисы,
                которые сокращают хаос и усиливают продажи.
              </p>
              <p className="type-body text-[15px] sm:text-[16px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                Код, дизайн и архитектура работают в одной связке.
                Результат запускается быстро и масштабируется.
              </p>
            </motion.div>
          </div>

          {/* RIGHT — Stack visualization */}
          <motion.div variants={revealUp} className="flex flex-col gap-3">
            {stackItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 8, borderColor: 'rgba(107,163,255,0.2)' }}
                className="group flex items-center justify-between border rounded-xl px-6 py-5 transition-colors duration-400"
                style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-[11px] font-light" style={{ color: 'var(--text-4)' }}>
                    0{i + 1}
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                    {item.label}
                  </span>
                </div>
                <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-3)' }}>
                  {item.detail}
                </span>
              </motion.div>
            ))}

            {/* Summary stat */}
            <div className="mt-4 flex items-center gap-4 px-6">
              <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
                958 тестов · 7 проектов · 11 PR
              </span>
              <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
            </div>
          </motion.div>
        </div>

        {/* Eclipse phases decoration */}
        <motion.div variants={revealUp} className="mt-16 lg:mt-20">
          <EclipsePhases />
          <p className="text-center mt-4 text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-4)' }}>
            от идеи → к полному затмению конкурентов
          </p>
        </motion.div>

        {/* Decorative mini eclipses */}
        <MiniEclipse size={18} className="absolute top-12 right-12 hidden lg:block opacity-40" />
        <MiniEclipse size={14} className="absolute bottom-20 left-8 hidden lg:block opacity-30" color="var(--accent-warm)" />
      </div>
    </motion.section>
  );
}
