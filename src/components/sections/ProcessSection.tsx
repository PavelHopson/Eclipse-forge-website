import { motion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ProcessSection() {
  return (
    <motion.section id="process" className="section-shell py-32 sm:py-40" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta mb-8" style={{ color: 'var(--accent-text)', opacity: 0.5 }}>Процесс</motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-lg mb-20">
          От задачи к системе.
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
          {processSteps.map((step) => (
            <motion.div
              key={step.index}
              variants={revealUp}
              className="group relative p-8 sm:p-10 border-l first:border-l-0 transition-colors duration-500"
              style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}
            >
              <span className="font-display text-5xl font-extralight text-quaternary group-hover:text-accent-theme transition-colors duration-700 block mb-8" style={{ opacity: 0.3 }}>
                {step.index}
              </span>
              <h3 className="font-display text-base font-medium tracking-tight mb-4 transition-colors duration-400 text-secondary">
                {step.title}
              </h3>
              <p className="type-body text-[13px] text-tertiary group-hover:text-secondary transition-colors duration-400">
                {step.text}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700" style={{ background: 'var(--accent)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
