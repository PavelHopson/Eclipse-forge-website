import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { EclipseSilhouette, MiniEclipse } from '../ui/EclipseVisuals';

const serviceIcons = [
  // AI brain
  <svg key="ai" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" /><path d="M8 6a4 4 0 0 1 4-4" /><path d="M12 22a4 4 0 0 1-4-4c0-1.95 1.4-3.58 3.25-3.93" />
    <path d="M16 18a4 4 0 0 1-4 4" /><path d="M2 12a4 4 0 0 1 4-4c1.95 0 3.58 1.4 3.93 3.25" /><path d="M6 16a4 4 0 0 1-4-4" />
    <path d="M22 12a4 4 0 0 1-4 4c-1.95 0-3.58-1.4-3.93-3.25" /><path d="M18 8a4 4 0 0 1 4 4" /><circle cx="12" cy="12" r="2" />
  </svg>,
  // Code/fullstack
  <svg key="code" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="12" y1="2" x2="12" y2="22" />
  </svg>,
  // Rust/systems
  <svg key="rust" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 8h4l-2 4h4" />
  </svg>,
];

export function ServicesSection() {
  return (
    <motion.section id="services" className="section-shell py-16 sm:py-24 lg:py-40 relative overflow-hidden" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      {/* Background eclipse silhouette */}
      <div className="absolute -top-20 -left-20 opacity-30 hidden lg:block">
        <EclipseSilhouette size={300} coronaColor="rgba(245,166,35,0.1)" animate={false} />
      </div>
      <MiniEclipse size={20} className="absolute top-16 right-20 hidden lg:block opacity-30" />
      <MiniEclipse size={16} className="absolute bottom-24 right-[40%] hidden lg:block opacity-20" color="var(--accent-warm)" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 relative">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent)' }}>Экспертиза</motion.p>
        <motion.h2 variants={revealUp} className="type-display max-w-xl mb-16 lg:mb-20" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <span className="text-gradient">Технология как инструмент</span>
          <br />
          <span style={{ color: 'var(--text-4)' }}>контроля.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={revealUp}
              whileHover={{ y: -6, borderColor: 'rgba(107,163,255,0.15)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border rounded-2xl p-8 lg:p-10 transition-all duration-500 overflow-hidden"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(107,163,255,0.04) 0%, transparent 70%)' }} />

              {/* Icon */}
              <div className="relative mb-8 w-14 h-14 flex items-center justify-center rounded-xl border"
                style={{ borderColor: 'var(--line)', color: 'var(--accent)', background: 'var(--accent-soft)' }}>
                {serviceIcons[i]}
              </div>

              {/* Number */}
              <span className="relative font-display text-[11px] font-light tracking-[0.2em] uppercase block mb-4" style={{ color: 'var(--text-4)' }}>
                0{i + 1}
              </span>

              <h3 className="relative font-display text-xl lg:text-2xl font-medium tracking-tight mb-4 transition-colors duration-400"
                style={{ color: 'var(--text-1)' }}>
                {service.title}
              </h3>

              <p className="relative type-body text-[14px] sm:text-[15px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                {service.text}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700"
                style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
