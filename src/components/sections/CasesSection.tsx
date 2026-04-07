import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { projects } from '../../data/content';
import { revealUp, revealScale, stagger, staggerFast, viewport } from '../../lib/animation';

export function CasesSection() {
  return (
    <section id="cases" className="section-shell py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport} className="animated-divider">
          <SectionHeading eyebrow="Портфолио" title="Системы, которые работают." />
          <p className="mt-5 max-w-xl type-body text-[15px] sm:text-base" style={{ color: 'var(--text-3)' }}>
            Каждый проект — рабочая система с измеримым результатом.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--line)' }}>
          {projects.map((project, i) => (
            <motion.div key={project.title} variants={revealScale}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`group p-6 sm:p-8 card-hover relative border-l-2 ${i === 0 ? 'md:col-span-2' : ''}`}
              style={{ background: 'var(--bg)', borderLeftColor: 'var(--accent-dim)' }}>

              {/* Number + tag */}
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display text-2xl sm:text-3xl font-extralight" style={{ color: 'var(--text-4)' }}>
                  #{String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] font-medium px-3 py-1.5 rounded-full border"
                  style={{ color: 'var(--accent)', borderColor: 'var(--accent-dim)', background: 'var(--accent-soft)', borderWidth: '1px' }}>
                  {project.tag}
                </span>
                {project.liveUrl && (
                  <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(110,200,160,0.6)' }}>
                    <motion.span animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(110,200,160,0.6)' }} />
                    Live
                  </span>
                )}
              </div>

              <h3 className="type-heading text-lg sm:text-xl mb-3 transition-colors duration-400"
                style={{ color: 'var(--text-1)' }}>
                {project.title}
              </h3>

              <p className="type-body text-[13px] sm:text-[14px] mb-5 max-w-2xl" style={{ color: 'var(--text-3)' }}>
                {project.description}
              </p>

              <div className="mb-5 inline-flex items-baseline gap-2 px-4 py-2 border" style={{ borderColor: 'var(--line)', background: 'var(--accent-soft)' }}>
                <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-4)' }}>Результат:</span>
                <span className="text-[12px] font-medium" style={{ color: 'var(--accent)' }}>{project.result}</span>
              </div>

              <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map(t => (
                  <motion.span key={t} variants={revealUp}
                    className="text-[10px] px-2.5 py-1 border"
                    style={{ color: 'var(--text-3)', borderColor: 'var(--line)', background: 'var(--bg-card)' }}>
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              <div className="flex items-center gap-5">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-medium transition-colors group/link" style={{ color: 'var(--accent)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    <span className="group-hover/link:underline underline-offset-4">Демо</span>
                  </a>
                )}
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] transition-colors hover:opacity-70" style={{ color: 'var(--text-4)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
