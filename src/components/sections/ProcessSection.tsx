import { motion, useReducedMotion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="process"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealUp}
          className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end"
        >
          <SectionHeading
            eyebrow="Инженерный ритуал"
            title="Действуем как продуктовая команда: быстро, системно и с контролем результата."
          />
          <p className="max-w-xs text-sm leading-7 text-white/48 sm:text-base">
            Не импровизируем в продакшне. Каждый этап нужен, чтобы снижать риск,
            ускорять выпуск и держать качество под контролем.
          </p>
        </motion.div>

        <div className="relative mt-12 sm:mt-14">
          <div className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,106,0,0.18),rgba(118,199,255,0.12),rgba(255,255,255,0.04))] md:block lg:left-1/2 lg:-translate-x-[16.5rem]" />

          <div className="grid gap-5 sm:gap-6">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.index}
                variants={revealUp}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative grid gap-5 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)_34%,rgba(6,6,6,0.92)_100%)] p-5 shadow-panel sm:rounded-[2rem] sm:p-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:p-8"
              >
                <div className="absolute inset-0 rounded-[1.7rem] bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.1),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.06),transparent_24%)] opacity-65 transition duration-500 group-hover:opacity-100 sm:rounded-[2rem]" />

                <div className="relative flex items-start gap-4 lg:block">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/35 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/64 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_12px_35px_rgba(0,0,0,0.35)] sm:h-12 sm:w-12 sm:text-[0.72rem] sm:tracking-[0.22em]">
                    {step.index}
                  </div>
                  <div className="lg:mt-8">
                    <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/32 sm:text-[0.68rem] sm:tracking-[0.34em]">
                      Stage {index + 1}
                    </p>
                    <p className="mt-3 max-w-[15rem] font-display text-[1.6rem] uppercase leading-[0.94] tracking-[-0.05em] text-white/88 sm:text-3xl">
                      {step.title}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:rounded-[1.6rem] sm:p-5">
                    <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-base sm:leading-8">
                      {step.text}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-white/32 sm:mt-5 sm:text-[0.68rem] sm:tracking-[0.3em]">
                    <span className="h-px flex-1 bg-white/10" />
                    {index === processSteps.length - 1 ? 'Release loop' : 'Next phase'}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
