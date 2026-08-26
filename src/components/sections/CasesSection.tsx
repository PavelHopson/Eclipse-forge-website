import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { type Project, type ProjectStatus, useSiteContent } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { useMotionPreference } from '../../lib/motionPreference';
import { AssetImage } from '../ui/AssetImage';
import { ConstellationField, EclipseSilhouette, ParticleField } from '../ui/EclipseVisuals';
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
    flagshipAnchor: string;
    indexAnchor: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    indexEyebrow: string;
    indexTitle: string;
    indexDescription: string;
    flagshipLabel: string;
    indexedLabel: string;
    placeholderHint: string;
    signalLabel: string;
    resultLabel: string;
    stackLabel: string;
    demoLabel: string;
    githubLabel: string;
    openDemoLabel: string;
    openRepoLabel: string;
    statusLabels: Record<ProjectStatus, string>;
  }
> = {
  ru: {
    headingEyebrow: 'Избранные системы',
    headingTitle: 'Четыре флагмана. Остальное — без витринного шума.',
    headingDescription:
      'Каждая большая сцена показывает отдельный режим работы: дисциплина, AI-оператор, премиальный booking и инфраструктура данных. Полный каталог собран ниже в компактный инженерный индекс.',
    visibleSystems: 'систем в каталоге',
    flagshipAnchor: '4 флагмана',
    indexAnchor: 'System Index',
    featuredEyebrow: 'Flagship sequence / 01—04',
    featuredTitle: 'Четыре продукта — четыре разных характера.',
    featuredDescription:
      'Живые интерфейсы, проверяемые результаты и прямые точки входа. Никаких одинаковых карточек ради заполнения сетки.',
    indexEyebrow: 'System Index',
    indexTitle: 'Остальные системы — одной точной картой.',
    indexDescription:
      'Все проекты остаются на странице: статус, назначение, результат, технический сигнал и ссылки видны сразу.',
    flagshipLabel: 'флагманские сцены',
    indexedLabel: 'систем в индексе',
    placeholderHint: 'Визуал системы готовится к публикации.',
    signalLabel: 'Инженерный сигнал',
    resultLabel: 'Что меняется',
    stackLabel: 'Технологическая основа',
    demoLabel: 'Открыть систему',
    githubLabel: 'Исходный код',
    openDemoLabel: 'Открыть систему',
    openRepoLabel: 'Открыть репозиторий',
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
    headingTitle: 'Four flagships. Everything else, without showroom noise.',
    headingDescription:
      'Each large scene represents a distinct operating mode: discipline, AI operations, premium booking and data infrastructure. The full catalogue becomes a compact engineering index below.',
    visibleSystems: 'systems in the catalogue',
    flagshipAnchor: '4 flagships',
    indexAnchor: 'System Index',
    featuredEyebrow: 'Flagship sequence / 01—04',
    featuredTitle: 'Four products, four distinct characters.',
    featuredDescription:
      'Real interfaces, verifiable outcomes and direct entry points. No repeated cards used merely to fill a grid.',
    indexEyebrow: 'System Index',
    indexTitle: 'Every other system, on one precise map.',
    indexDescription:
      'Every project stays visible: status, purpose, outcome, engineering signal and links are available at a glance.',
    flagshipLabel: 'flagship scenes',
    indexedLabel: 'systems in the index',
    placeholderHint: 'The system visual is being prepared for publication.',
    signalLabel: 'Engineering signal',
    resultLabel: 'What changes',
    stackLabel: 'Technical foundation',
    demoLabel: 'Open system',
    githubLabel: 'Source code',
    openDemoLabel: 'Open system',
    openRepoLabel: 'Open repository',
    statusLabels: {
      live: 'Live',
      beta: 'Beta',
      prototype: 'Prototype',
      concept: 'Concept',
      reference: 'Reference',
    },
  },
};

function ProjectFallback({ project, hint }: { project: Project; hint: string }) {
  return (
    <div className="flagship-scene__fallback relative flex h-full min-h-[300px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 case-placeholder-grid opacity-60" />
      <div className="absolute inset-0 opacity-30">
        <ConstellationField />
      </div>
      <EclipseSilhouette size={150} coronaColor="rgba(212, 175, 55, 0.2)" />
      <div className="absolute inset-x-5 bottom-5 border-l pl-4" style={{ borderColor: 'var(--gold)' }}>
        <p className="type-meta" style={{ color: 'var(--gold)' }}>{project.systemType}</p>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-3)' }}>{hint}</p>
      </div>
    </div>
  );
}

function ProjectLinks({ project, copy, compact = false }: { project: Project; copy: (typeof casesCopy)[Locale]; compact?: boolean }) {
  return (
    <div className={compact ? 'system-index__links' : 'flagship-scene__links'}>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.openDemoLabel}: ${project.title}`}
          className={compact ? 'system-index__link system-index__link--primary' : 'flagship-scene__link flagship-scene__link--primary'}
        >
          {copy.demoLabel}
          <span aria-hidden>↗</span>
        </a>
      ) : null}
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.openRepoLabel}: ${project.title}`}
          className={compact ? 'system-index__link' : 'flagship-scene__link'}
        >
          {copy.githubLabel}
          <span aria-hidden>↗</span>
        </a>
      ) : null}
    </div>
  );
}

function FlagshipScene({ project, index, copy }: { project: Project; index: number; copy: (typeof casesCopy)[Locale] }) {
  const { ambientMotionEnabled } = useMotionPreference();
  const statusStyle = statusStyles[project.status];
  const primaryUrl = project.liveUrl ?? project.repoUrl;
  const primaryLabel = project.liveUrl ? copy.openDemoLabel : copy.openRepoLabel;
  const sceneNumber = String(index + 1).padStart(2, '0');
  const sceneClass = index % 2 === 1 ? 'flagship-scene flagship-scene--reverse' : 'flagship-scene';
  const media = (
    <>
      <AssetImage
        alt={project.image?.alt ?? `${project.title} preview`}
        sources={project.image?.sources}
        loading="lazy"
        className="flagship-scene__image h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.025] group-focus-within:scale-[1.025]"
        style={{ objectPosition: project.image?.objectPosition ?? 'center' }}
        fallback={<ProjectFallback project={project} hint={copy.placeholderHint} />}
      />
      <div className="flagship-scene__media-scrim" aria-hidden />
      <span className="flagship-scene__media-index" aria-hidden>{sceneNumber}</span>
      <span className="flagship-scene__media-type">{project.systemType}</span>
      {primaryUrl ? (
        <span className="flagship-scene__media-action">
          {primaryLabel}
          <span aria-hidden>↗</span>
        </span>
      ) : null}
    </>
  );

  return (
    <motion.article
      variants={revealUp}
      className={sceneClass}
      data-scene={sceneNumber}
      initial={ambientMotionEnabled ? 'hidden' : false}
      whileInView={ambientMotionEnabled ? 'visible' : undefined}
      viewport={viewport}
    >
      <div className="flagship-scene__media group">
        {primaryUrl ? (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryLabel}: ${project.title}`}
            className="flagship-scene__media-link"
          >
            {media}
          </a>
        ) : (
          <div className="flagship-scene__media-link">{media}</div>
        )}
      </div>

      <div className="flagship-scene__content">
        <div className="flagship-scene__meta">
          <span>EF / {sceneNumber}</span>
          <span className="flagship-scene__status" style={statusStyle}>
            <span aria-hidden />
            {copy.statusLabels[project.status]}
          </span>
        </div>

        <h4 className="flagship-scene__title">{project.title}</h4>
        <p className="flagship-scene__description">{project.description}</p>

        <dl className="flagship-scene__proof">
          <div>
            <dt>{copy.resultLabel}</dt>
            <dd>{project.result}</dd>
          </div>
          <div>
            <dt>{copy.signalLabel}</dt>
            <dd>{project.signal}</dd>
          </div>
        </dl>

        <div className="flagship-scene__stack" aria-label={copy.stackLabel}>
          {project.tech.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
          {project.tech.length > 5 ? <span>+{project.tech.length - 5}</span> : null}
        </div>

        <ProjectLinks project={project} copy={copy} />
      </div>
    </motion.article>
  );
}

function SystemIndexRow({ project, index, copy }: { project: Project; index: number; copy: (typeof casesCopy)[Locale] }) {
  const statusStyle = statusStyles[project.status];

  return (
    <li className="system-index__row">
      <article className="system-index__item">
        <div className="system-index__identity">
          <span className="system-index__number">{String(index + 5).padStart(2, '0')}</span>
          <div>
            <p className="system-index__type">{project.systemType}</p>
            <h4>{project.title}</h4>
          </div>
        </div>

        <div className="system-index__proof">
          <p>{project.result}</p>
          <p>{project.signal}</p>
        </div>

        <div className="system-index__meta">
          <span className="system-index__status" style={statusStyle}>
            <span aria-hidden />
            {copy.statusLabels[project.status]}
          </span>
          <div className="system-index__stack" aria-label={copy.stackLabel}>
            {project.tech.slice(0, 2).map((technology) => <span key={technology}>{technology}</span>)}
            {project.tech.length > 2 ? <span>+{project.tech.length - 2}</span> : null}
          </div>
        </div>

        <ProjectLinks project={project} copy={copy} compact />
      </article>
    </li>
  );
}

export function CasesSection() {
  const { locale } = useLocale();
  const copy = casesCopy[locale];
  const { ambientMotionEnabled } = useMotionPreference();
  const { allProjects, featuredProjects } = useSiteContent();
  const flagshipProjects = featuredProjects.slice(0, 4);
  const flagshipTitles = new Set(flagshipProjects.map((project) => project.title));
  const indexedProjects = allProjects.filter((project) => !flagshipTitles.has(project.title));
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const progressWidth = useTransform(scrollYProgress, [0.04, 0.7], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="cases" className="section-shell showcase-v2 relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="case-atmosphere-bg absolute inset-0" />
      <div className="absolute inset-0 opacity-30">
        <ParticleField count={12} />
      </div>

      <motion.div
        className="absolute left-0 top-0 h-px origin-left"
        style={{
          width: ambientMotionEnabled ? progressWidth : '100%',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.72), rgba(107,163,255,0.42), transparent)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={revealUp}
          initial={ambientMotionEnabled ? 'hidden' : false}
          whileInView={ambientMotionEnabled ? 'visible' : undefined}
          viewport={viewport}
          className="animated-divider"
        >
          <SectionHeading eyebrow={copy.headingEyebrow} title={copy.headingTitle} />
          <p className="mt-5 max-w-3xl type-body text-[15px] sm:text-base" style={{ color: 'var(--text-3)' }}>
            {copy.headingDescription}
          </p>
        </motion.div>

        <motion.nav
          variants={revealUp}
          initial={ambientMotionEnabled ? 'hidden' : false}
          whileInView={ambientMotionEnabled ? 'visible' : undefined}
          viewport={viewport}
          aria-label={copy.headingEyebrow}
          className="showcase-v2__nav"
        >
          <span>{allProjects.length} {copy.visibleSystems}</span>
          <a href="#flagship-systems">{copy.flagshipAnchor} <strong>{flagshipProjects.length}</strong></a>
          <a href="#system-index">{copy.indexAnchor} <strong>{indexedProjects.length}</strong></a>
        </motion.nav>

        <div id="flagship-systems" className="showcase-v2__flagships">
          <motion.div
            variants={revealUp}
            initial={ambientMotionEnabled ? 'hidden' : false}
            whileInView={ambientMotionEnabled ? 'visible' : undefined}
            viewport={viewport}
            className="showcase-v2__intro"
          >
            <div>
              <p className="type-meta" style={{ color: 'var(--gold)' }}>{copy.featuredEyebrow}</p>
              <h3>{copy.featuredTitle}</h3>
            </div>
            <p>{copy.featuredDescription}</p>
          </motion.div>

          <div className="showcase-v2__sequence">
            {flagshipProjects.map((project, index) => (
              <FlagshipScene key={project.title} project={project} index={index} copy={copy} />
            ))}
          </div>
        </div>

        <motion.div
          id="system-index"
          variants={stagger}
          initial={ambientMotionEnabled ? 'hidden' : false}
          whileInView={ambientMotionEnabled ? 'visible' : undefined}
          viewport={viewport}
          className="system-index"
        >
          <motion.div variants={revealUp} className="system-index__header">
            <div>
              <p className="type-meta" style={{ color: 'var(--gold)' }}>{copy.indexEyebrow}</p>
              <h3>{copy.indexTitle}</h3>
              <p>{copy.indexDescription}</p>
            </div>
            <dl className="system-index__counts">
              <div><dt>{copy.flagshipLabel}</dt><dd>{flagshipProjects.length}</dd></div>
              <div><dt>{copy.indexedLabel}</dt><dd>{indexedProjects.length}</dd></div>
            </dl>
          </motion.div>

          <motion.ol variants={revealUp} className="system-index__list">
            {indexedProjects.map((project, index) => (
              <SystemIndexRow key={project.title} project={project} index={index} copy={copy} />
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
