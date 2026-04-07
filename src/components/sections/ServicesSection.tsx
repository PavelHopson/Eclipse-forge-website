import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function ServicesSection() {
  return (
    <motion.section id="services" className="section-shell py-20 sm:py-24 lg:py-28" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--text-3)' }}>Услуги</motion.p>
        <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-xl mb-14 lg:mb-16">
          Технология как инструмент контроля.
        </motion.h2>
        <div>
          {services.map((service, i) => (
            <motion.div key={service.title} variants={revealUp}
              className="group border-t py-8 sm:py-10 grid sm:grid-cols-[1fr_2fr] gap-4 sm:gap-10 items-baseline transition-colors duration-500 hover:bg-white/[0.01] -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12"
              style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm font-light" style={{ color: 'var(--text-4)' }}>0{i + 1}</span>
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-normal tracking-tight transition-colors duration-400"
                  style={{ color: 'var(--text-2)' }}>
                  {service.title}
                </h3>
              </div>
              <p className="type-body text-[14px] sm:text-[15px] max-w-xl" style={{ color: 'var(--text-3)' }}>
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
