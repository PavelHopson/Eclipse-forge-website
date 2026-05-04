import { motion } from 'framer-motion';
import { useSiteContent } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { MiniEclipse, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';

const servicesCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    audienceLabel: string;
    resultLabel: string;
  }
> = {
  ru: {
    eyebrow: 'Точки входа',
    title: 'То, с чем реально можно зайти в forge.',
    description: 'Это не прайс. Это самые естественные входы, когда проблема лежит в операционной сложности, AI-исполнении или продуктовой логике, которой нужен сильный front layer.',
    audienceLabel: 'Для кого',
    resultLabel: 'Результат',
  },
  en: {
    eyebrow: 'Entry points',
    title: 'Things you can actually bring into the forge.',
    description: 'Not a rate card. These are the most natural ways to engage when the problem is operational complexity, AI execution or product logic that needs a strong front layer.',
    audienceLabel: 'For who',
    resultLabel: 'Outcome',
  },
};

export function ServicesSection() {
  const { locale } = useLocale();
  const copy = servicesCopy[locale];
  const { serviceEntryPoints } = useSiteContent();

  return (
    <motion.section
      id="services"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-36"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute inset-0 services-atmosphere-bg" />
      <div className="absolute inset-0 opacity-35">
        <ParticleField count={12} />
      </div>
      <div className="absolute -left-24 top-12 hidden lg:block opacity-35">
        <OrbitalRing size={300} dotCount={3} duration={40} color="var(--accent)" />
      </div>
      <MiniEclipse size={20} className="absolute right-20 top-20 hidden opacity-35 lg:block" />
      <MiniEclipse size={16} className="absolute bottom-20 right-[38%] hidden opacity-25 lg:block" color="var(--accent-warm)" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display mb-6 max-w-[12ch] text-[clamp(2.2rem,4.5vw,4rem)]">
          {copy.title}
        </motion.h2>
        <motion.p variants={revealUp} className="max-w-2xl type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
          {copy.description}
        </motion.p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-5">
          {serviceEntryPoints.map((service, index) => (
            <motion.article
              key={service.title}
              variants={revealUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[1.9rem] border p-6 services-card"
            >
              <div className="pointer-events-none absolute inset-0 services-card-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 services-edge-glow" />

              <div className="relative">
                <div className="mb-5 inline-flex rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] services-chip">
                  {service.cue}
                </div>
                <h3 className="font-display text-[1.2rem] font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                  {service.title}
                </h3>
                <p className="mt-4 type-body text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {service.description}
                </p>
                <div className="mt-5 rounded-2xl border px-4 py-4 services-panel">
                  <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                    {copy.audienceLabel}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    {service.audience}
                  </p>
                </div>
                <div className="mt-4 rounded-2xl border px-4 py-4 services-panel">
                  <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                    {copy.resultLabel}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {service.result}
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-4 right-4 text-[3.4rem] font-display font-light tracking-tight text-white/5">
                0{index + 1}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
