import { motion, useReducedMotion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="services"
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
            eyebrow="Боевые направления"
            title="Собираем цифровую инфраструктуру бренда: от первого касания до автоматизированного ядра бизнеса."
          />
          <p className="max-w-xs text-sm leading-7 text-white/48 sm:text-base">
            Каждое направление собрано как продуктовая дисциплина: с
            архитектурой, контролем качества и визуальной подачей уровня
            сильного бренда.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={revealUp}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className={[
                'group panel-sheen relative overflow-hidden rounded-[1.7rem] border border-white/10 shadow-panel sm:rounded-[2rem]',
                'bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_34%,rgba(7,7,7,0.9)_100%)]',
                index === 0 ? 'lg:row-span-2 lg:min-h-[31rem]' : '',
              ].join(' ')}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.08),transparent_22%)] opacity-70 transition duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.46),transparent)] opacity-60" />

              <div className="relative flex h-full flex-col p-5 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/34 sm:text-[0.68rem] sm:tracking-[0.34em]">
                    Direction {index + 1}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(255,106,0,0.8)]" />
                    <span className="text-[0.58rem] uppercase tracking-[0.22em] text-white/32 sm:text-[0.62rem] sm:tracking-[0.26em]">
                      Eclipse Forge
                    </span>
                  </div>
                </div>

                <div
                  className={[
                    'mt-6 rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] sm:mt-8 sm:rounded-[1.6rem]',
                    'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
                    index === 0 ? 'h-36 sm:h-44' : 'h-24 sm:h-28',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'h-full w-full rounded-[1.35rem] sm:rounded-[1.6rem]',
                      index === 0
                        ? 'bg-[radial-gradient(circle_at_78%_28%,rgba(255,106,0,0.22),transparent_26%),radial-gradient(circle_at_22%_82%,rgba(118,199,255,0.12),transparent_24%)]'
                        : 'bg-[radial-gradient(circle_at_72%_26%,rgba(255,106,0,0.16),transparent_24%),radial-gradient(circle_at_24%_76%,rgba(118,199,255,0.08),transparent_22%)]',
                    ].join(' ')}
                  />
                </div>

                <h3 className="mt-6 max-w-[15ch] font-display text-[clamp(1.8rem,5vw,3rem)] uppercase leading-[0.92] tracking-[-0.055em] text-white sm:mt-8">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-[34rem] text-sm leading-7 text-white/62 sm:mt-5 sm:text-base sm:leading-8">
                  {service.text}
                </p>

                <div className="mt-auto pt-8 sm:pt-10">
                  <div className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-white/32 transition duration-300 group-hover:text-white/56 sm:text-[0.68rem] sm:tracking-[0.3em]">
                    <span className="h-px flex-1 bg-white/10 transition duration-300 group-hover:bg-accent/28" />
                    Serious systems
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
