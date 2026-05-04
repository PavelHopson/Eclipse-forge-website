import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MouseEvent as ReactMouseEvent,
} from 'framer-motion';
import { useRef } from 'react';
import { type Project, type ProjectStatus, useSiteContent } from '../../data/content';
import { revealScale, revealUp, stagger, staggerFast, viewport } from '../../lib/animation';
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
    projectsLabel: string;
    statusLabels: Record<ProjectStatus, string>;
  }
> = {
  ru: {
    headingEyebrow: 'Избранные системы',
    headingTitle: 'Сначала флагманы, затем более широкое инженерное поле.',
    headingDescription:
      'Эти проекты хорошо показывают паттерн: интерфейсы здесь только видимая оболочка. Настоящая ценность живёт в слоях контроля, decision flow, AI-routing, extraction, monitoring и execution.',
    visibleSystems: 'видимых систем',
    anchorLabels: ['Флагманы', 'AI-системы', 'Продуктовые системы', 'Инструменты'],
    featuredEyebrow: 'Флагманские системы',
    featuredTitle: 'Проекты, которые ведут себя как ядра систем, а не как плитки портфолио',
    featuredDescription: 'Каждая карточка готова к реальному скриншоту, но уже сейчас несёт продуктовую логику даже тогда, когда виден только системный сигнал.',
    placeholderHint: 'Добавь скриншот в `public/images/projects`, и карточка подхватит его автоматически.',
    liveLabel: 'демо активно',
    signalLabel: 'сигнал',
    demoLabel: 'Демо',
    githubLabel: 'GitHub',
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
    headingTitle: 'Flagship artifacts, then the wider engineering field.',
    headingDescription:
      'These projects show the pattern clearly: interfaces are only the visible shell. The value lives in control layers, decision flows, AI routing, extraction, monitoring and execution.',
    visibleSystems: 'visible systems',
    anchorLabels: ['Flagships', 'AI systems', 'Product systems', 'Tooling'],
    featuredEyebrow: 'Flagship systems',
    featuredTitle: 'Projects that behave like system cores, not portfolio tiles',
    featuredDescription: 'Each card is ready for a real screenshot, but already carries the product logic even when only the system signal is visible.',
    placeholderHint: 'Add a screenshot into `public/images/projects` and the card will pick it up automatically.',
    liveLabel: 'demo live',
    signalLabel: 'signal',
    demoLabel: 'Demo',
    githubLabel: 'GitHub',
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

function ProjectVisual({ project, placeholderHint }: { project: Project; placeholderHint: string }) {
  return (
    <div className="case-media relative overflow-hidden rounded-[1.85rem] border">
      <AssetImage
        alt={project.image?.alt ?? `${project.title} preview`}
        sources={project.image?.sources}
        loading="lazy"
        className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: project.image?.objectPosition }}
        fallback={<PlaceholderVisual project={project} hint={placeholderHint} />}
      />
      <div className="pointer-events-none absolute inset-0 case-media-overlay" />
      <div className="pointer-events-none absolute left-5 top-5 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.22em] case-top-pill">
        {project.systemType}
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] case-top-pill">
            {tag}
          </span>
        ))}
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
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 28 });
  const rotateX = useSpring(useTransform(smoothY, [-0.5, 0.5], [3, -3]), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useTransform(smoothX, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${useTransform(smoothX, [-0.5, 0.5], ['18%', '82%'])} ${useTransform(
    smoothY,
    [-0.5, 0.5],
    ['12%', '88%'],
  )}, rgba(157,196,255,0.16), transparent 42%)`;

  const handleMouseMove = (event: ReactMouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article variants={revealScale} className={isLarge ? 'lg:col-span-2' : ''}>
      <div ref={ref} className="perspective-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="group relative overflow-hidden rounded-[2rem] border p-3 transition-all duration-500 case-card-shell"
        >
          <motion.div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: spotlight }} />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 case-edge-glow" />

          <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
            <ProjectVisual project={project} placeholderHint={copy.placeholderHint} />

            <div className="flex flex-col justify-between rounded-[1.85rem] border p-6 sm:p-7 case-copy-panel">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-display text-2xl font-light tracking-tight" style={{ color: 'var(--text-4)' }}>
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em]" style={statusStyle}>
                    {copy.statusLabels[project.status]}
                  </span>
                  {project.liveUrl ? (
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: '#7EE1B0' }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                      {copy.liveLabel}
                    </span>
                  ) : null}
                </div>

                <h3 className="type-heading text-[1.4rem] leading-tight sm:text-[1.8rem]" style={{ color: 'var(--text-1)' }}>
                  {project.title}
                </h3>

                <p className="mt-4 type-body text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
                  {project.description}
                </p>

                <div className="mt-5 rounded-2xl border px-4 py-4 case-signal-panel">
                  <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                    {copy.signalLabel}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {project.signal}
                  </p>
                </div>

                <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <motion.span key={tech} variants={revealUp} className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] case-tech-pill">
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="mt-6">
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-2 rounded-2xl border px-4 py-4 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 case-meta-strip">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] case-tech-pill">
                        {tag}
                      </span>
                    ))}
                    <span className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] case-tech-pill">
                      {project.result}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[12px] font-display transition-all duration-400 case-link-primary"
                    >
                      {copy.demoLabel}
                    </a>
                  ) : null}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[12px] font-display transition-all duration-400 case-link-secondary"
                  >
                    {copy.githubLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
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
