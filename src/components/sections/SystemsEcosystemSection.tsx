import { motion } from 'framer-motion';
import { type Project, useSiteContent } from '../../data/content';
import { revealScale, revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { AssetImage } from '../ui/AssetImage';
import { ConstellationField, EclipseSilhouette, MiniEclipse, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';

const systemsCopy: Record<Locale, { fallbackHint: string; demoLabel: string; githubLabel: string }> = {
  ru: {
    fallbackHint: 'Добавь `%file%` в `public/images/projects`.',
    demoLabel: 'Демо',
    githubLabel: 'GitHub',
  },
  en: {
    fallbackHint: 'Add `%file%` to `public/images/projects`.',
    demoLabel: 'Demo',
    githubLabel: 'GitHub',
  },
};

function SystemsFallback({ project, hint }: { project: Project; hint: string }) {
  return (
    <div className="systems-card-fallback relative flex min-h-[210px] items-center justify-center overflow-hidden rounded-[1.35rem] border">
      <div className="absolute inset-0 case-placeholder-grid opacity-60" />
      <div className="absolute inset-0 opacity-25">
        <ConstellationField />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80">
        <OrbitalRing size={170} dotCount={2} duration={34} color="var(--accent-warm)" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <EclipseSilhouette size={120} coronaColor="rgba(157, 196, 255, 0.13)" />
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border px-4 py-3 systems-card-panel">
        <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
          {project.systemType}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
          {hint}
        </p>
      </div>
    </div>
  );
}

function EcosystemCard({
  project,
  index,
  fallbackHint,
  demoLabel,
  githubLabel,
}: {
  project: Project;
  index: number;
  fallbackHint: string;
  demoLabel: string;
  githubLabel: string;
}) {
  const fileName = project.image?.sources?.[0]?.split('/').pop() ?? 'project-image.png';

  return (
    <motion.article variants={revealScale}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="group systems-card-shell relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-[1.9rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,175,55,0.18), transparent 30%, transparent 70%, rgba(212,175,55,0.14))',
          }}
        />

        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <AssetImage
            alt={project.image?.alt ?? `${project.title} preview`}
            sources={project.image?.sources}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={{ objectPosition: project.image?.objectPosition ?? 'center' }}
            fallback={<SystemsFallback project={project} hint={fallbackHint.replace('%file%', fileName)} />}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
            style={{ background: 'linear-gradient(to top, rgba(5,7,9,0.85), transparent)' }}
          />
        </div>

        <div className="relative flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--text-4)' }}>
            <span className="font-display">#{String(index + 1).padStart(2, '0')}</span>
            <span style={{ color: 'var(--accent)' }}>{project.systemType}</span>
          </div>

          <p className="type-body text-[13.5px] leading-relaxed sm:text-[14px]" style={{ color: 'var(--text-2)' }}>
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="systems-link-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-display tracking-[0.04em] transition-all duration-400"
              >
                {demoLabel}
                <span aria-hidden>→</span>
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="systems-link-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-display tracking-[0.04em] transition-all duration-400"
              >
                {githubLabel}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function SystemsEcosystemSection() {
  const { locale } = useLocale();
  const copy = systemsCopy[locale];
  const { systemsEcosystemIntro, systemsEcosystemProjects } = useSiteContent();

  return (
    <section id="systems-ecosystem" className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="systems-ecosystem-bg absolute inset-0" />
      <div className="absolute inset-0 opacity-35">
        <ParticleField count={16} />
      </div>
      <div className="absolute inset-0 opacity-25">
        <ConstellationField />
      </div>
      <div className="absolute left-[-8%] top-14 hidden lg:block opacity-20">
        <OrbitalRing size={320} dotCount={3} duration={36} color="var(--accent)" />
      </div>
      <MiniEclipse size={18} className="absolute right-16 top-20 hidden opacity-30 lg:block" color="var(--accent-warm)" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.div variants={revealUp} className="animated-divider">
            <p className="type-meta mb-6" style={{ color: 'var(--accent)' }}>
              {systemsEcosystemIntro.eyebrow}
            </p>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="type-display max-w-[13ch] text-balance text-[clamp(2.1rem,4.2vw,3.8rem)]">
                  {systemsEcosystemIntro.title}
                </h2>
                <p className="mt-5 max-w-2xl type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-2)' }}>
                  {systemsEcosystemIntro.description}
                </p>
              </div>
              <p className="max-w-xl text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>
                {systemsEcosystemIntro.note}
              </p>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center gap-2.5">
            {systemsEcosystemIntro.categories.map((category) => (
              <span key={category} className="systems-filter-pill inline-flex rounded-full border px-4 py-2 text-[10px] tracking-[0.24em]">
                {category}
              </span>
            ))}
          </motion.div>

          <div className="relative mt-10">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="systems-connector-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(107,163,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(140,124,255,0.18)" />
                </linearGradient>
              </defs>
              {[
                ['180,180', '600,160'],
                ['600,160', '1020,180'],
                ['180,180', '180,590'],
                ['600,160', '600,590'],
                ['1020,180', '1020,590'],
                ['180,590', '600,590'],
                ['600,590', '1020,590'],
              ].map((pair) => {
                const [start, end] = pair;
                const [x1, y1] = start.split(',');
                const [x2, y2] = end.split(',');
                return (
                  <line
                    key={`${start}-${end}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#systems-connector-gradient)"
                    strokeWidth="1"
                    strokeDasharray="5 11"
                    opacity="0.38"
                  />
                );
              })}
              {[
                [180, 180],
                [600, 160],
                [1020, 180],
                [180, 590],
                [600, 590],
                [1020, 590],
              ].map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                  <circle cx={cx} cy={cy} r="5" fill="rgba(107,163,255,0.6)" />
                  <circle cx={cx} cy={cy} r="18" fill="rgba(107,163,255,0.08)" />
                </g>
              ))}
            </svg>

            <motion.div variants={stagger} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {systemsEcosystemProjects.map((project, index) => (
                <EcosystemCard
                  key={project.title}
                  project={project}
                  index={index}
                  fallbackHint={copy.fallbackHint}
                  demoLabel={copy.demoLabel}
                  githubLabel={copy.githubLabel}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
