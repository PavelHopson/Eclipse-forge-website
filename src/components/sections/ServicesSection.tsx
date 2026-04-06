import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="section-shell px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={revealUp} className="max-w-2xl mb-14">
          <SectionHeading
            eyebrow="Услуги"
            title="Технология как инструмент роста, а не витрина."
          />
        </motion.div>

        <div className="grid gap-px bg-white/[0.04] sm:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              variants={revealUp}
              className="group bg-[#060606] p-8 sm:p-10 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[11px] text-white/15 font-medium tracking-[0.2em]">0{i + 1}</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
                <div className="h-2 w-2 rounded-full bg-accent/40 group-hover:bg-accent group-hover:shadow-[0_0_16px_rgba(255,106,0,0.6)] transition-all duration-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-white/85 tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.75] text-white/35">
                {service.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
