import { motion, useReducedMotion } from 'framer-motion';
import { cases } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function CasesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="cases"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
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

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              variants={revealUp}
              whileHover={reduceMotion ? undefined : { y: -10 }}
              transition={{ duration: 0.34, ease: 'easeOut' }}
              className="group panel-sheen relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)_30%,rgba(7,7,7,0.88)_100%)] p-5 shadow-panel sm:rounded-[1.9rem] sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.08),transparent_26%)] opacity-70 transition duration-500 group-hover:opacity-100" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-[-30%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-0 blur-sm transition duration-500 group-hover:opacity-100"
                initial={reduceMotion ? false : { x: '-18%' }}
                whileHover={reduceMotion ? undefined : { x: '16%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/35 sm:text-[0.68rem] sm:tracking-[0.34em]">
                    Проект {index + 1}
                  </p>
                  <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-white/42 sm:text-[0.62rem] sm:tracking-[0.26em]">
                    case study
                  </span>
                </div>

                <div className="mt-6 h-24 rounded-[1.2rem] border border-white/8 bg-[radial-gradient(circle_at_68%_28%,rgba(255,106,0,0.22),transparent_24%),radial-gradient(circle_at_32%_72%,rgba(118,199,255,0.09),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:mt-8 sm:h-28 sm:rounded-[1.4rem]" />

                <h3 className="mt-6 font-display text-[1.65rem] uppercase tracking-[-0.05em] text-white sm:mt-7 sm:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[22rem] text-sm leading-7 text-white/52">
                  Решение спроектировано как рабочий актив бизнеса: строго,
                  быстро и с измеримым эффектом.
                </p>

                <dl className="mt-7 flex-1 space-y-5 sm:mt-8">
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-[0.26em] text-white/34 sm:text-[0.68rem] sm:tracking-[0.3em]">
                      Проблема
                    </dt>
                    <dd className="mt-2 text-sm leading-7 text-white/66">
                      {item.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-[0.26em] text-white/34 sm:text-[0.68rem] sm:tracking-[0.3em]">
                      Решение
                    </dt>
                    <dd className="mt-2 text-sm leading-7 text-white/66">
                      {item.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-[0.26em] text-accent/78 sm:text-[0.68rem] sm:tracking-[0.3em]">
                      Результат
                    </dt>
                    <dd className="mt-2 text-sm leading-7 text-white">
                      {item.result}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-white/36 transition duration-300 group-hover:text-white/62 sm:mt-8 sm:text-[0.68rem] sm:tracking-[0.3em]">
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
