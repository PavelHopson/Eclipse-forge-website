import { motion, useReducedMotion } from 'framer-motion';
import { cases } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function CasesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="cases"
      className="section-shell px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div variants={revealUp}>
          <SectionHeading
            eyebrow="Кейсы"
            title="Примеры решений, где разработка работает на прибыль, а не на красивый отчёт."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              variants={revealUp}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              className="group monolith-surface rounded-[1.6rem] p-5 sm:rounded-[1.9rem] sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.11),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.06),transparent_24%)] opacity-80 transition duration-500 group-hover:opacity-100" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-[-30%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-0 blur-sm transition duration-500 group-hover:opacity-100"
                initial={reduceMotion ? false : { x: '-18%' }}
                whileHover={reduceMotion ? undefined : { x: '16%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/30 sm:text-[0.68rem]">
                    Проект {index + 1}
                  </p>
                  <span className="inline-flex rounded-full border border-white/8 px-3 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-white/32 sm:text-[0.62rem]">
                    case study
                  </span>
                </div>

                <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.01))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mt-8 sm:rounded-[1.4rem]">
                  <div className="h-[5.75rem] rounded-[1rem] bg-[radial-gradient(circle_at_70%_28%,rgba(255,106,0,0.18),transparent_22%),radial-gradient(circle_at_28%_74%,rgba(118,199,255,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))] sm:h-[6.5rem]" />
                </div>

                <h3 className="type-heading mt-6 max-w-[12ch] text-[1.58rem] text-white sm:mt-7 sm:text-[1.9rem]">
                  {item.title}
                </h3>
                <p className="type-body mt-3 max-w-[22rem] text-[0.95rem] text-white/46">
                  Решение спроектировано как рабочий актив бизнеса: строго,
                  быстро и с измеримым эффектом.
                </p>

                <dl className="mt-7 flex-1 space-y-5 sm:mt-8">
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-[0.3em] text-white/30 sm:text-[0.68rem]">
                      Проблема
                    </dt>
                    <dd className="type-body mt-2 text-[0.95rem] text-white/62">
                      {item.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-[0.3em] text-white/30 sm:text-[0.68rem]">
                      Решение
                    </dt>
                    <dd className="type-body mt-2 text-[0.95rem] text-white/62">
                      {item.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-[0.3em] text-accent/68 sm:text-[0.68rem]">
                      Результат
                    </dt>
                    <dd className="type-body mt-2 text-[0.95rem] text-white">
                      {item.result}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.3em] text-white/30 transition duration-300 group-hover:text-white/48 sm:mt-8 sm:text-[0.68rem]">
                  <span className="h-px flex-1 bg-white/10 transition duration-300 group-hover:bg-accent/30" />
                  Eclipse Forge
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
