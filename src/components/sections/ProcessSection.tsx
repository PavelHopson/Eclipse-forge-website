import { motion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ProcessSection() {
  return (
    <motion.section
      id="process"
      className="section-shell py-32 sm:py-40"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta text-accent/40 mb-8">
          Процесс
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-lg mb-20">
          От задачи к системе.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
          {processSteps.map((step) => (
            <motion.div
              key={step.index}
              variants={revealUp}
              className="group relative bg-[#030303] p-8 sm:p-10 border-l border-white/[0.03] first:border-l-0"
            >
              {/* Step number */}
              <span className="font-display text-5xl font-extralight text-white/[0.04] group-hover:text-accent/10 transition-colors duration-700 block mb-8">
                {step.index}
              </span>

              <h3 className="font-display text-base font-medium text-white/70 tracking-tight mb-4 group-hover:text-white/90 transition-colors duration-400">
                {step.title}
              </h3>
              <p className="type-body text-[13px] text-white/20 group-hover:text-white/30 transition-colors duration-400">
                {step.text}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-accent/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
