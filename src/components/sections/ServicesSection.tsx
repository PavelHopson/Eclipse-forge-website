import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ServicesSection() {
  return (
    <motion.section id="services" className="section-shell py-20 sm:py-24 lg:py-28" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent-text)', opacity: 0.6 }}>Услуги</motion.p>
        <motion.h2 variants={revealUp} className="type-display text-[clamp(2rem,4vw,3.8rem)] text-gradient max-w-xl mb-12 lg:mb-16">
          Технология как инструмент роста.
        </motion.h2>
        <div>
          {services.map((service, i) => (
            <motion.div key={service.title} variants={revealUp}
              className="group border-t py-8 sm:py-10 grid sm:grid-cols-[1fr_2fr] gap-4 sm:gap-10 items-baseline transition-colors duration-400"
              style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm font-light text-quaternary">0{i + 1}</span>
                <h3 className="font-display text-xl sm:text-2xl lg:text-[1.7rem] font-medium tracking-tight text-primary group-hover:text-accent-theme transition-colors duration-400">
                  {service.title}
                </h3>
              </div>
              <p className="type-body text-[15px] sm:text-base text-secondary max-w-xl">
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
