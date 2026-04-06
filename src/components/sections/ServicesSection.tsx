import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ServicesSection() {
  return (
    <motion.section id="services" className="section-shell py-32 sm:py-40" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta mb-8" style={{ color: 'var(--accent-text)', opacity: 0.5 }}>Услуги</motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-xl mb-20">
          Технология как инструмент роста.
        </motion.h2>
        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={revealUp}
              className="group border-t py-10 sm:py-14 grid sm:grid-cols-[1fr_2fr] gap-6 sm:gap-12 items-start -mx-6 sm:-mx-8 px-6 sm:px-8 transition-colors duration-500"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-light text-quaternary">0{i + 1}</span>
                <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-400" style={{ color: 'var(--text-2)' }}>
                  {service.title}
                </h3>
              </div>
              <p className="type-body text-[14px] max-w-lg text-tertiary group-hover:text-secondary transition-colors duration-400">
                {service.text}
              </p>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: 'var(--line)' }} />
        </div>
      </div>
    </motion.section>
  );
}
