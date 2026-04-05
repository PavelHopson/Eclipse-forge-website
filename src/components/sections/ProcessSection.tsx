import { motion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function ProcessSection() {
  return (
    <motion.section
      id="process"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr]">
        <motion.div variants={revealUp}>
          <SectionHeading
            eyebrow="Process"
            title="От задачи к системе — без хаоса и лишнего шума."
          />
        </motion.div>

        <div className="grid gap-4">
          {processSteps.map((step) => (
            <motion.article
              key={step.index}
              variants={revealUp}
              className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-5 md:grid-cols-[80px_1fr] md:items-start"
            >
              <div className="text-2xl font-semibold text-orange-300">{step.index}</div>
              <div>
                <h3 className="type-heading text-[1.35rem] font-medium text-white sm:text-[1.55rem]">
                  {step.title}
                </h3>
                <p className="type-body mt-2 text-sm leading-6 text-white/66">
                  {step.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
