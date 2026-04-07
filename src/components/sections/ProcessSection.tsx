import { motion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ProcessSection() {
  return (
    <motion.section id="process" className="section-shell py-20 sm:py-24 lg:py-28" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--text-3)' }}>Процесс</motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-lg mb-14 lg:mb-16">
          От задачи к системе.
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--line)' }}>
          {processSteps.map((step) => (
            <motion.div key={step.index} variants={revealUp}
              className="group relative p-6 sm:p-8 transition-colors duration-500 hover:bg-white/[0.015]"
              style={{ background: 'var(--bg)' }}>
              <span className="font-display text-4xl lg:text-5xl font-extralight block mb-6 transition-colors duration-700"
                style={{ color: 'var(--text-4)' }}>
                {step.index}
              </span>
              <h3 className="font-display text-base lg:text-lg font-normal tracking-tight mb-3 transition-colors duration-400"
                style={{ color: 'var(--text-2)' }}>
                {step.title}
              </h3>
              <p className="type-body text-[13px] sm:text-[14px]" style={{ color: 'var(--text-3)' }}>
                {step.text}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700"
                style={{ background: 'var(--accent)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
