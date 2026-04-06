import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { projects } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function CasesSection() {
  return (
    <section id="cases" className="section-shell py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="Portfolio"
            title="Реальные проекты, которые работают."
          />
          <p className="mt-5 max-w-2xl text-white/40 type-body leading-relaxed">
            Каждый проект — это рабочая система с измеримым результатом.
            От AI-автоматизации до premium веб-платформ.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={revealUp}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-500 ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="p-7 sm:p-9">
                {/* Tags row */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent/70 bg-accent/[0.08] px-3 py-1 rounded-full font-medium">
                    {project.tag}
                  </span>
                  {project.liveUrl && (
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-emerald-400/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white/90 mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/35 text-[14px] leading-relaxed mb-6 max-w-2xl">
                  {project.description}
                </p>

                {/* Result */}
                <div className="mb-6 inline-flex items-baseline gap-2 px-4 py-2.5 rounded-xl bg-accent/[0.06] border border-accent/10">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Результат:</span>
                  <span className="text-[13px] text-accent/80 font-medium">{project.result}</span>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="text-[10px] text-white/25 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] text-accent/60 hover:text-accent transition-colors font-medium"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                      Демо
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] text-white/20 hover:text-white/45 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                </div>
              </div>

              {/* Corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
