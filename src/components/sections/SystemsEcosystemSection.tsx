import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MouseEvent as ReactMouseEvent,
} from 'framer-motion';
import { useRef } from 'react';
import { systemsEcosystemIntro, systemsEcosystemProjects, type Project } from '../../data/content';
import { revealScale, revealUp, stagger, staggerFast, viewport } from '../../lib/animation';
import { AssetImage } from '../ui/AssetImage';
import { ConstellationField, EclipseSilhouette, MiniEclipse, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';

function SystemsFallback({ project }: { project: Project }) {
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
          Add `{project.image?.sources?.[0]?.split('/').pop() ?? 'project-image.png'}` to `public/images/projects`.
        </p>
      </div>
    </div>
  );
}

function EcosystemCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 26 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 26 });
  const rotateX = useSpring(useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 180, damping: 24 });
  const rotateY = useSpring(useTransform(smoothX, [-0.5, 0.5], [-3, 3]), { stiffness: 180, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${useTransform(smoothX, [-0.5, 0.5], ['18%', '82%'])} ${useTransform(
    smoothY,
    [-0.5, 0.5],
    ['16%', '84%'],
  )}, rgba(157,196,255,0.14), transparent 44%)`;
  const tags = project.ecosystemTags ?? project.tags.slice(0, 3);

  const handleMove = (event: ReactMouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article variants={revealScale}>
      <div ref={ref} className="perspective-container" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="group systems-card-shell relative overflow-hidden rounded-[2rem] border p-3"
        >
          <motion.div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: spotlight }} />
          <div className="systems-card-edge pointer-events-none absolute inset-x-10 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="systems-card-body flex h-full flex-col rounded-[1.65rem] border p-3">
            <div className="systems-card-image-wrap relative overflow-hidden rounded-[1.35rem] border">
              <AssetImage
                alt={project.image?.alt ?? `${project.title} preview`}
                sources={project.image?.sources}
                loading="lazy"
                className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: project.image?.objectPosition }}
                fallback={<SystemsFallback project={project} />}
              />
              <div className="systems-card-image-overlay pointer-events-none absolute inset-0" />
            </div>

            <div className="flex flex-1 flex-col px-2 pb-2 pt-5 sm:px-3">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-[0.9rem] uppercase tracking-[0.34em]" style={{ color: 'var(--text-4)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                </div>
                <div className="systems-card-panel rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]">
                  {project.systemType}
                </div>
              </div>

              <h3 className="font-display text-[1.3rem] font-medium uppercase leading-tight tracking-[0.02em] sm:text-[1.45rem]" style={{ color: 'var(--text-1)' }}>
                {project.title}
              </h3>

              <p className="mt-3 type-body min-h-[4.4rem] text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {project.description}
              </p>

              <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <motion.span key={tag} variants={revealUp} className="systems-tag rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em]">
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="systems-link-primary inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[12px] font-display transition-all duration-400"
                  >
                    Demo
                  </a>
                ) : null}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="systems-link-secondary inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[12px] font-display transition-all duration-400"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function SystemsEcosystemSection() {
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
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block"
              viewBox="0 0 1200 760"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
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
                <EcosystemCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
