import { motion, useReducedMotion } from 'framer-motion';
import { contactDetails } from '../../data/content';
import { revealUp, stagger } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

const heroServices = [
  'Автоматизация процессов',
  'AI-инструменты',
  'SaaS и внутренние платформы',
];

const stackTags = ['Automation', 'AI', 'CRM', 'Dashboards', 'Integrations', 'SaaS'];

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,111,0,0.25),transparent_20%),radial-gradient(circle_at_78%_28%,rgba(255,94,0,0.18),transparent_18%),radial-gradient(circle_at_52%_82%,rgba(255,120,0,0.12),transparent_22%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid min-h-[calc(100svh-108px)] items-center gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-20"
        >
          <div>
            <motion.div
              variants={revealUp}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-orange-200"
            >
              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.95)]" />
              Product Engineering Studio
            </motion.div>

            <motion.h1
              variants={revealUp}
              className="type-display max-w-4xl text-[clamp(3.1rem,8vw,5.75rem)] font-semibold leading-[0.93] text-white"
            >
              Мы не делаем сайты.
              <br />
              Мы проектируем
              <br />
              системы.
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="type-body mt-8 max-w-2xl text-[1.02rem] text-white/72 sm:text-[1.18rem] sm:leading-8"
            >
              Eclipse Forge создаёт цифровые системы, которые увеличивают прибыль,
              убирают ручную рутину и превращают хаос в управляемый рост.
            </motion.p>

            <motion.div
              variants={revealUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <GlowButton
                href={contactDetails.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="justify-center border-orange-400/40 bg-white/[0.05] px-7 py-4 shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-300/60 hover:bg-white/[0.08]"
              >
                Обсудить проект
              </GlowButton>
              <a
                href="#cases"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-7 py-4 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
              >
                Смотреть кейсы
              </a>
            </motion.div>

            <motion.div
              variants={revealUp}
              className="mt-12 grid gap-4 sm:grid-cols-3"
            >
              {heroServices.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
                >
                  <div className="mb-3 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
                  <p className="text-sm leading-6 text-white/82">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={revealUp}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-700/20 blur-3xl" />
            <div className="relative rounded-[2.25rem] border border-orange-400/20 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_0_80px_rgba(249,115,22,0.12)] backdrop-blur-xl">
              <div className="rounded-[1.8rem] border border-white/10 bg-[#0b0b0d]/90 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">System View</p>
                    <h3 className="mt-2 text-xl font-medium text-white">Forge Console</h3>
                  </div>
                  <div className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-xs text-orange-200">
                    live architecture
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">Revenue impact</p>
                    <p className="mt-4 text-3xl font-semibold text-white">+32%</p>
                    <div className="mt-4 h-24 rounded-xl bg-gradient-to-t from-orange-500/20 to-transparent p-3">
                      <div className="flex h-full items-end gap-2">
                        <div className="h-8 w-6 rounded-t-md bg-white/20" />
                        <div className="h-12 w-6 rounded-t-md bg-white/25" />
                        <div className="h-16 w-6 rounded-t-md bg-orange-400/70" />
                        <div className="h-20 w-6 rounded-t-md bg-orange-300/90 shadow-[0_0_20px_rgba(251,146,60,0.45)]" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">Ops load</p>
                    <p className="mt-4 text-3xl font-semibold text-white">-60%</p>
                    <div className="mt-6 space-y-3">
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 w-[78%] rounded-full bg-orange-300/90" />
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 w-[58%] rounded-full bg-orange-400/70" />
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 w-[86%] rounded-full bg-orange-200/80" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/75">Core modules</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">stack</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stackTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/72"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
