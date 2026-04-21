import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { allProjects, featuredProjects, portfolioCollections, type Project, type ProjectStatus } from '../../data/content';
import { revealScale, revealUp, stagger, staggerFast, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

const statusStyles: Record<ProjectStatus, { color: string; borderColor: string; background: string }> = {
  Live: { color: '#6EC8A0', borderColor: 'rgba(110,200,160,0.2)', background: 'rgba(110,200,160,0.08)' },
  Beta: { color: 'var(--accent)', borderColor: 'var(--accent-dim)', background: 'var(--accent-soft)' },
  Prototype: { color: '#D6AE72', borderColor: 'rgba(214,174,114,0.2)', background: 'rgba(214,174,114,0.08)' },
  Concept: { color: 'var(--text-3)', borderColor: 'var(--line)', background: 'var(--surface-2)' },
  Reference: { color: '#9DB6CF', borderColor: 'rgba(157,182,207,0.2)', background: 'rgba(157,182,207,0.08)' },
};

const portfolioAnchors = [
  { href: '#featured-cases', label: 'Флагман', count: featuredProjects.length },
  { href: '#ai-products', label: 'AI-продукты', count: portfolioCollections[0]?.projects.length ?? 0 },
  { href: '#web-fullstack', label: 'Веб и Fullstack', count: portfolioCollections[1]?.projects.length ?? 0 },
  { href: '#engineering-tools', label: 'Инструменты', count: portfolioCollections[2]?.projects.length ?? 0 },
];

/* ── 3D Tilt Card ── */
function TiltCard({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  function handleMouse(e: ReactMouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div ref={ref} className="perspective-container" onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      <motion.div
        className={className}
        style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, featured = false, isLastOdd = false }: { project: Project; index: number; featured?: boolean; isLastOdd?: boolean }) {
  const statusStyle = statusStyles[project.status];
  const isLarge = (featured && index === 0) || isLastOdd;

  return (
    <motion.article
      variants={revealScale}
      className={isLarge ? 'md:col-span-2' : ''}
    >
      <TiltCard
        className="group relative rounded-2xl border p-6 sm:p-8 overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg) 100%)',
          borderColor: 'var(--line)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
        }}
      >
        {/* Hover gradient border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(107,163,255,0.06) 0%, transparent 40%, transparent 60%, rgba(245,166,35,0.04) 100%)',
          }} />

        {/* Top glow on hover */}
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(107,163,255,0.3), transparent)' }} />

        <div className="relative">
          <div className="mb-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-display text-2xl font-extralight sm:text-3xl" style={{ color: 'var(--text-4)' }}>
              #{String(index + 1).padStart(2, '0')}
            </span>

            <span className="rounded-full border px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.35em]"
              style={{ color: 'var(--accent)', borderColor: 'var(--accent-dim)', background: 'var(--accent-soft)', borderWidth: '1px' }}>
              {project.tag}
            </span>

            <span className="rounded-full border px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.28em]"
              style={{ ...statusStyle, borderWidth: '1px' }}>
              {project.status}
            </span>

            {project.liveUrl && (
              <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(110,200,160,0.72)' }}>
                <motion.span
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'rgba(110,200,160,0.8)' }}
                />
                Demo
              </span>
            )}
          </div>

          <h3 className="type-heading mb-3 text-lg sm:text-xl group-hover:text-gradient-accent transition-colors duration-400" style={{ color: 'var(--text-1)' }}>
            {project.title}
          </h3>

          <p className="type-body mb-5 max-w-2xl text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
            {project.description}
          </p>

          <div className="mb-5 inline-flex items-baseline gap-2 border rounded-lg px-4 py-2"
            style={{ borderColor: 'var(--line)', background: 'var(--accent-soft)' }}>
            <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-4)' }}>Результат:</span>
            <span className="text-[12px] font-medium" style={{ color: 'var(--accent)' }}>{project.result}</span>
          </div>

          <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <motion.span key={tech} variants={revealUp}
                className="border rounded-md px-2.5 py-1 text-[10px]"
                style={{ color: 'var(--text-3)', borderColor: 'var(--line)', background: 'var(--bg-card)' }}>
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium font-display transition-all duration-400 hover:shadow-[0_0_20px_rgba(107,163,255,0.08)] sm:text-[13px]"
                style={{ color: 'var(--accent)', borderColor: 'var(--accent-dim)', background: 'var(--accent-soft)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
                Демо
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-display transition-all duration-400 hover:border-[var(--text-3)] hover:text-[var(--text-2)] sm:text-[13px]"
              style={{ color: 'var(--text-3)', borderColor: 'var(--line)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export function CasesSection() {
  return (
    <section id="cases" className="section-shell py-16 sm:py-24 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="animated-divider">
          <SectionHeading eyebrow="Портфолио" title="Флагманские кейсы и вся экосистема." />
          <p className="mt-5 max-w-3xl type-body text-[15px] sm:text-base" style={{ color: 'var(--text-3)' }}>
            Системы, которые продают экспертизу студии. Ниже — вся библиотека: продуктовые демо,
            backend-инструменты и knowledge-слой.
          </p>
        </motion.div>

        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--text-2)', borderColor: 'var(--line)', background: 'var(--surface-2)' }}>
            {allProjects.length} проектов
          </span>
          {portfolioAnchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 hover:border-[var(--text-3)] hover:text-[var(--text-1)]"
              style={{ color: 'var(--text-3)', borderColor: 'var(--line)' }}>
              <span>{anchor.label}</span>
              <span style={{ color: 'var(--accent)' }}>{anchor.count}</span>
            </a>
          ))}
        </motion.div>

        {/* Featured — bento grid */}
        <div id="featured-cases" className="mt-12 sm:mt-14">
          <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport}
            className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="type-meta mb-4" style={{ color: 'var(--accent)' }}>Флагманские проекты</p>
              <h3 className="type-heading text-2xl sm:text-3xl" style={{ color: 'var(--text-1)' }}>
                {featuredProjects.length} проектов с глубиной и масштабом
              </h3>
            </div>
            <p className="max-w-xl text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>
              Архитектура, инженерная ширина, визуальная подача.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} featured
                isLastOdd={index === featuredProjects.length - 1 && featuredProjects.length % 2 !== 0} />
            ))}
          </motion.div>
        </div>

        {/* Collections */}
        {portfolioCollections.map((collection) => (
          <div key={collection.id} id={collection.id} className="mt-16 sm:mt-20">
            <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="border-t pt-6 sm:pt-8" style={{ borderColor: 'var(--line)' }}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="type-meta mb-4" style={{ color: 'var(--accent)' }}>{collection.eyebrow}</p>
                  <h3 className="type-heading text-2xl sm:text-3xl" style={{ color: 'var(--text-1)' }}>{collection.title}</h3>
                  <p className="mt-4 max-w-2xl text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-3)' }}>{collection.description}</p>
                </div>
                <div className="inline-flex self-start rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: 'var(--text-2)', borderColor: 'var(--line)', background: 'var(--surface-2)' }}>
                  {collection.projects.length} проектов
                </div>
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
              className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {collection.projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index}
                  isLastOdd={index === collection.projects.length - 1 && collection.projects.length % 2 !== 0} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
