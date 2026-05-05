import { motion } from 'framer-motion';
import { type Project, type ProjectStatus, useSiteContent } from '../../data/content';
import { revealScale, revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { AssetImage } from '../ui/AssetImage';
import { ConstellationField, EclipseSilhouette, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';
import { SectionHeading } from '../ui/SectionHeading';

const statusStyles: Record<ProjectStatus, { color: string; borderColor: string; background: string }> = {
  live: { color: '#7EE1B0', borderColor: 'rgba(126,225,176,0.24)', background: 'rgba(126,225,176,0.08)' },
  beta: { color: 'var(--accent)', borderColor: 'var(--accent-dim)', background: 'var(--accent-soft)' },
  prototype: { color: '#C9BEFF', borderColor: 'rgba(201,190,255,0.28)', background: 'rgba(201,190,255,0.08)' },
  concept: { color: 'var(--text-3)', borderColor: 'var(--line)', background: 'var(--surface-2)' },
  reference: { color: '#9DB6CF', borderColor: 'rgba(157,182,207,0.24)', background: 'rgba(157,182,207,0.08)' },
};

const casesCopy: Record<
  Locale,
  {
    headingEyebrow: string;
    headingTitle: string;
    headingDescription: string;
    visibleSystems: string;
    anchorLabels: string[];
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    placeholderHint: string;
    liveLabel: string;
    signalLabel: string;
    demoLabel: string;
    githubLabel: string;
    openDemoLabel: string;
    openRepoLabel: string;
    projectsLabel: string;
    statusLabels: Record<ProjectStatus, string>;
  }
> = {
  ru: {
    headingEyebrow: 'Избранные системы',
    headingTitle: 'Флагманы — и инженерное поле вокруг.',
    headingDescription:
      'Не просто что собрано, а что меняется после запуска: где уходит ручная рутина, где появляется контроль, как система начинает работать вместо человека.',
    visibleSystems: 'видимых систем',
    anchorLabels: ['Флагманы', 'AI-системы', 'Продуктовые системы', 'Инструменты'],
    featuredEyebrow: 'Флагманские системы',
    featuredTitle: 'Шесть проектов, которые показывают паттерн.',
    featuredDescription: 'Каждый — рабочий контур исполнения, а не демонстрационный интерфейс.',
    placeholderHint: 'Добавь скриншот в `public/images/projects`, и карточка подхватит его автоматически.',
    liveLabel: 'демо активно',
    signalLabel: 'сигнал',
    demoLabel: 'Открыть демо',
    githubLabel: 'GitHub',
    openDemoLabel: 'Открыть демо',
    openRepoLabel: 'Открыть репозиторий',
    projectsLabel: 'проектов',
    statusLabels: {
      live: 'Live',
      beta: 'Beta',
      prototype: 'Prototype',
      concept: 'Concept',
      reference: 'Reference',
    },
  },
  en: {
    headingEyebrow: 'Selected systems',
    headingTitle: 'Flagships, and the engineering field around them.',
    headingDescription:
      'Not just what was built, but what changes after launch: less manual routine, more control, and a system that starts doing the work.',
    visibleSystems: 'visible systems',
    anchorLabels: ['Flagships', 'AI systems', 'Product systems', 'Tooling'],
    featuredEyebrow: 'Flagship systems',
    featuredTitle: 'Six projects that show the pattern.',
    featuredDescription: 'Each one is a working execution contour, not a demo interface.',
    placeholderHint: 'Add a screenshot into `public/images/projects` and the card will pick it up automatically.',
    liveLabel: 'demo live',
    signalLabel: 'signal',
    demoLabel: 'Open demo',
    githubLabel: 'GitHub',
    openDemoLabel: 'Open demo',
    openRepoLabel: 'Open repository',
    projectsLabel: 'projects',
    statusLabels: {
      live: 'Live',
      beta: 'Beta',
      prototype: 'Prototype',
      concept: 'Concept',
      reference: 'Reference',
    },
  },
};

function PlaceholderVisual({ project, hint }: { project: Project; hint: string }) {
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden rounded-[1.7rem] case-visual-placeholder">
      <div className="absolute inset-0 case-placeholder-grid" />
      <div className="absolute inset-0 opacity-35">
        <ConstellationField />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80">
        <OrbitalRing size={220} dotCount={3} duration={42} color="var(--accent-warm)" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <EclipseSilhouette size={150} coronaColor="rgba(157, 196, 255, 0.14)" />
      </div>
      <div className="absolute inset-x-5 bottom-5 rounded-2xl border px-4 py-4 case-placeholder-panel">
        <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
          {project.systemType}
        </p>
        <p className="font-display text-lg tracking-tight" style={{ color: 'var(--text-1)' }}>
          {project.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
          {hint}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  featured = false,
  isLastOdd = false,
  copy,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  isLastOdd?: boolean;
  copy: (typeof casesCopy)[Locale];
}) {
  const statusStyle = statusStyles[project.status];
  const isLarge = (featured && index === 0) || isLastOdd;
  const primaryUrl = project.liveUrl ?? project.repoUrl;
  const primaryHoverLabel = project.liveUrl ? copy.openDemoLabel : copy.openRepoLabel;

  return (
    <motion.article variants={revealScale} className={isLarge ? 'lg:col-span-2' : ''}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border transition-all duration-500 case-card-shell"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-[1.95rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,175,55,0.18), transparent 30%, transparent 70%, rgba(212,175,55,0.14))',
          }}
        />

        {primaryUrl ? (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryHoverLabel}: ${project.title}`}
            className="relative block aspect-[3/2] w-full overflow-hidden"
          >
            <AssetImage
              alt={project.image?.alt ?? `${project.title} preview`}
              sources={project.image?.sources}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              style={{ objectPosition: project.image?.objectPosition ?? 'center' }}
              fallback={<PlaceholderVisual project={project} hint={copy.placeholderHint} />}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{ background: 'linear-gradient(to top, rgba(5,7,9,0.85), transparent)' }}
            />
            <div
              className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] backdrop-blur-md"
              style={{ ...statusStyle, background: 'rgba(5,7,9,0.55)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
              {copy.statusLabels[project.status]}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-display uppercase tracking-[0.22em] backdrop-blur-md"
                style={{
                  borderColor: 'rgba(212,175,55,0.35)',
                  background: 'rgba(5,7,9,0.7)',
                  color: 'rgba(245,233,196,0.95)',
                }}
              >
                {primaryHoverLabel}
                <span aria-hidden>↗</span>
              </span>
            </div>
          </a>
        ) : (
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <AssetImage
              alt={project.image?.alt ?? `${project.title} preview`}
              sources={project.image?.sources}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              style={{ objectPosition: project.image?.objectPosition ?? 'center' }}
              fallback={<PlaceholderVisual project={project} hint={copy.placeholderHint} />}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{ background: 'linear-gradient(to top, rgba(5,7,9,0.85), transparent)' }}
            />
            <div
              className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] backdrop-blur-md"
              style={{ ...statusStyle, background: 'rgba(5,7,9,0.55)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
              {copy.statusLabels[project.status]}
            </div>
          </div>
        )}

        <div className="relative flex flex-1 flex-col gap-5 px-6 py-6 sm:px-7 sm:py-7">
          <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--text-4)' }}>
            <span className="font-display">#{String(index + 1).padStart(2, '0')}</span>
            <span className="font-display" style={{ color: 'var(--text-3)' }}>{project.systemType}</span>
          </div>

          <p className="type-body text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em] transition-all duration-400 case-link-primary"
              >
                {copy.demoLabel}
                <span aria-hidden>→</span>
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em] transition-all duration-400 case-link-secondary"
              >
                {copy.githubLabel}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function CasesSection() {
  const { locale } = useLocale();
  const copy = casesCopy[locale];
  const { allProjects, featuredProjects, portfolioCollections } = useSiteContent();

  const portfolioAnchors = [
    { href: '#featured-cases', label: copy.anchorLabels[0], count: featuredProjects.length },
    { href: '#ai-products', label: copy.anchorLabels[1], count: portfolioCollections[0]?.projects.length ?? 0 },
    { href: '#product-systems', label: copy.anchorLabels[2], count: portfolioCollections[1]?.projects.length ?? 0 },
    { href: '#engineering-tools', label: copy.anchorLabels[3], count: portfolioCollections[2]?.projects.length ?? 0 },
  ];

  return (
    <section id="cases" className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-36">
      <div className="absolute inset-0 case-atmosphere-bg" />
      <div className="absolute inset-0 opacity-40">
        <ParticleField count={18} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="animated-divider">
          <SectionHeading eyebrow={copy.headingEyebrow} title={copy.headingTitle} />
          <p className="mt-5 max-w-3xl type-body text-[15px] sm:text-base" style={{ color: 'var(--text-3)' }}>
            {copy.headingDescription}
          </p>
        </motion.div>

        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em] case-anchor-chip">
            {allProjects.length} {copy.visibleSystems}
          </span>
          {portfolioAnchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 case-anchor-chip">
              <span>{anchor.label}</span>
              <span style={{ color: 'var(--accent)' }}>{anchor.count}</span>
            </a>
          ))}
        </motion.div>

        <div id="featured-cases" className="mt-12 sm:mt-14">
          <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="type-meta mb-4" style={{ color: 'var(--accent)' }}>
                {copy.featuredEyebrow}
              </p>
              <h3 className="type-heading text-2xl sm:text-3xl" style={{ color: 'var(--text-1)' }}>
                {copy.featuredTitle}
              </h3>
            </div>
            <p className="max-w-xl text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>
              {copy.featuredDescription}
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                featured
                copy={copy}
                isLastOdd={index === featuredProjects.length - 1 && featuredProjects.length % 2 !== 0}
              />
            ))}
          </motion.div>
        </div>

        {portfolioCollections.map((collection) => (
          <div key={collection.id} id={collection.id} className="mt-16 sm:mt-20">
            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="border-t pt-6 sm:pt-8" style={{ borderColor: 'var(--line)' }}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="type-meta mb-4" style={{ color: 'var(--accent)' }}>
                    {collection.eyebrow}
                  </p>
                  <h3 className="type-heading text-2xl sm:text-3xl" style={{ color: 'var(--text-1)' }}>
                    {collection.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>
                    {collection.description}
                  </p>
                </div>
                <div className="inline-flex self-start rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em] case-anchor-chip">
                  {collection.projects.length} {copy.projectsLabel}
                </div>
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {collection.projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  copy={copy}
                  isLastOdd={index === collection.projects.length - 1 && collection.projects.length % 2 !== 0}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
