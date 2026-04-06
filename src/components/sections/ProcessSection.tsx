import { motion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function ProcessSection() {
  return (
    <motion.section
      id="process"
      className="section-shell px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={revealUp} className="max-w-2xl mb-14">
          <SectionHeading
            eyebrow="Процесс"
            title="От задачи к системе — без хаоса и лишнего шума."
          />
        </motion.div>

        <div className="grid gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <motion.article
              key={step.index}
              variants={revealUp}
              className="group bg-[#060606] p-8 hover:bg-white/[0.02] transition-colors duration-500 relative"
            >
              <span className="text-3xl font-semibold text-accent/15 group-hover:text-accent/30 transition-colors duration-500 block mb-6">
                {step.index}
              </span>
              <h3 className="text-base sm:text-lg font-medium text-white/80 tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.7] text-white/30">
                {step.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
