import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="section-shell py-32 sm:py-40"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta text-accent/40 mb-8">
          Услуги
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-xl mb-20">
          Технология как инструмент роста.
        </motion.h2>

        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={revealUp}
              className="group border-t border-white/[0.04] py-10 sm:py-14 grid sm:grid-cols-[1fr_2fr] gap-6 sm:gap-12 items-start hover:bg-white/[0.01] -mx-6 sm:-mx-8 px-6 sm:px-8 transition-colors duration-500"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-sm text-white/10 font-light">0{i + 1}</span>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-white/80 tracking-tight group-hover:text-white transition-colors duration-400">
                  {service.title}
                </h3>
              </div>
              <p className="type-body text-[14px] text-white/25 max-w-lg group-hover:text-white/35 transition-colors duration-400">
                {service.text}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.04]" />
        </div>
      </div>
    </motion.section>
  );
}
