import { motion, useReducedMotion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function CtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className="section-shell px-4 pb-20 pt-20 sm:px-6 lg:px-10 lg:pb-28 lg:pt-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div
        variants={revealUp}
        className="monolith-surface mx-auto max-w-7xl rounded-[1.9rem] px-5 py-8 sm:rounded-[2.25rem] sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(255,106,0,0.16),transparent_22%),radial-gradient(circle_at_78%_50%,rgba(118,199,255,0.08),transparent_22%),radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_36%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 bg-[radial-gradient(circle,rgba(255,255,255,0.025),rgba(255,255,255,0.008)_42%,rgba(0,0,0,0)_70%)] blur-xl sm:h-[22rem] sm:w-[22rem]" />

        <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/34 sm:text-[0.68rem]">
              Final ignition
            </p>
            <h2 className="type-display mt-4 max-w-[12.5ch] text-balance text-[clamp(2.35rem,9vw,4.85rem)] font-semibold text-white sm:mt-5">
              Если нужен продукт, который выглядит сильно и работает на деньги,
              пора запускать.
            </h2>
            <p className="type-body mt-6 max-w-2xl text-[0.98rem] text-white/58 sm:mt-7 sm:text-[1.02rem]">
              Пришлите задачу, идею или текущую точку боли. Мы превратим это в
              понятную систему, релиз и следующий этап роста без хаоса и лишней
              декоративности.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
              <GlowButton
                href="mailto:hello@eclipseforge.dev"
                className="w-full justify-center sm:w-auto"
              >
                Обсудить задачу
              </GlowButton>
              <a
                href="https://t.me/eclipseforge"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[0.24em] text-white/52 transition hover:text-white sm:justify-start sm:tracking-[0.28em]"
              >
                <span className="h-px w-10 bg-white/20" />
                Написать в Telegram
              </a>
            </div>
          </div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="monolith-surface rounded-[1.5rem] p-5 sm:rounded-[1.8rem] sm:p-6"
          >
            <div className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.06),transparent_24%)] sm:rounded-[1.8rem]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/30 sm:text-[0.68rem]">
                  Contact node
                </p>
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(255,106,0,0.85)]" />
              </div>

              <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                <div className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] px-4 py-4 sm:rounded-[1.2rem]">
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30 sm:text-[0.62rem]">
                    Email
                  </p>
                  <p className="mt-2 text-base text-white/88">
                    hello@eclipseforge.dev
                  </p>
                </div>

                <div className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] px-4 py-4 sm:rounded-[1.2rem]">
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30 sm:text-[0.62rem]">
                    Telegram
                  </p>
                  <p className="mt-2 text-base text-white/88">@eclipseforge</p>
                </div>

                <div className="rounded-[1.1rem] border border-frost/10 bg-[linear-gradient(135deg,rgba(118,199,255,0.06),rgba(255,255,255,0.015))] px-4 py-4 sm:rounded-[1.2rem]">
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-frost/54 sm:text-[0.62rem]">
                    Response window
                  </p>
                  <p className="mt-2 text-base text-white/88">
                    Возвращаемся с ответом в течение 24 часов
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.3em] text-white/30 sm:mt-8 sm:text-[0.68rem]">
                <span className="h-px flex-1 bg-white/10" />
                Eclipse Forge
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
