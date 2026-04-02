import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { metrics } from '../../data/content';
import { revealUp, stagger } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const panelY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[calc(100svh-90px)] items-center overflow-hidden px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_38%,rgba(255,106,0,0.16),transparent_22%),radial-gradient(circle_at_67%_40%,rgba(255,255,255,0.07),transparent_9%),radial-gradient(circle_at_72%_28%,rgba(118,199,255,0.08),transparent_11%)]" />
      <motion.div
        style={reduceMotion ? undefined : { y: orbY }}
        className="pointer-events-none absolute right-[-24%] top-[4%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.34),rgba(255,106,0,0.09)_34%,rgba(0,0,0,0)_68%)] blur-2xl sm:right-[-12%] sm:h-[460px] sm:w-[460px] lg:h-[620px] lg:w-[620px]"
      />
      <motion.div
        style={reduceMotion ? undefined : { y: gridY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[22%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.75))]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))] sm:h-48" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.95fr)] lg:items-end lg:gap-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[46rem]"
        >
          <motion.p
            variants={revealUp}
            className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-white/58 shadow-soft backdrop-blur sm:mb-7 sm:text-[0.68rem] sm:tracking-[0.34em]"
          >
            Кузница IT-решений
          </motion.p>

          <motion.h1
            variants={revealUp}
            className="max-w-[11ch] text-balance font-display text-[clamp(2.65rem,12vw,7.4rem)] uppercase leading-[0.88] tracking-[-0.06em] text-white"
          >
            Куем IT-продукты, которые увеличивают прибыль бизнеса
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="mt-6 max-w-[38rem] text-sm leading-7 text-white/62 sm:mt-8 sm:text-[1.02rem] sm:leading-8 lg:text-[1.08rem] lg:leading-9"
          >
            Проектируем и разрабатываем сайты, SaaS и автоматизацию — от идеи
            до запуска. Без декоративной разработки. Только решения, которые
            усиливают продукт, продажи и операционную эффективность.
          </motion.p>

          <motion.div
            variants={revealUp}
            className="mt-9 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5"
          >
            <GlowButton href="#contact" className="w-full justify-center sm:w-auto">
              Запустить проект
            </GlowButton>
            <a
              href="#cases"
              className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[0.24em] text-white/52 transition hover:text-white sm:justify-start sm:tracking-[0.28em]"
            >
              <span className="h-px w-10 bg-white/20" />
              Смотреть кейсы
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { y: panelY, scale: panelScale }}
          initial={reduceMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 translate-x-3 translate-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] blur-2xl sm:translate-x-6 sm:translate-y-8" />
          <div className="panel-sheen relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_32%,rgba(8,8,8,0.74)_72%)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.09),transparent_28%)]" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/42 sm:text-[0.68rem] sm:tracking-[0.34em]">
                  Eclipse Core
                </p>
                <p className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-white sm:mt-3 sm:text-[1.9rem]">
                  Сайт. SaaS. Автоматизация.
                </p>
              </div>
              <div className="relative h-14 w-14 rounded-full border border-accent/30 bg-[radial-gradient(circle,rgba(255,106,0,0.9)_0,rgba(255,106,0,0.24)_38%,rgba(0,0,0,0)_72%)] shadow-[0_0_50px_rgba(255,106,0,0.38)] sm:h-16 sm:w-16">
                <div className="absolute inset-[18%] rounded-full border border-white/10" />
              </div>
            </div>

            <div className="relative mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 6,
                          borderColor: 'rgba(255,255,255,0.16)',
                          backgroundColor: 'rgba(255,255,255,0.06)',
                        }
                  }
                  transition={{ duration: 0.24 }}
                  className="rounded-[1.25rem] border border-white/8 bg-black/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] sm:rounded-2xl sm:px-5"
                >
                  <p className="font-display text-[1.35rem] uppercase tracking-[-0.05em] text-white sm:text-2xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/52">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0.7 }}
              whileHover={reduceMotion ? undefined : { opacity: 1, y: -2 }}
              transition={{ duration: 0.28 }}
              className="relative mt-6 rounded-[1.25rem] border border-frost/15 bg-[linear-gradient(135deg,rgba(118,199,255,0.11),rgba(255,255,255,0.02))] p-4 shadow-frost sm:mt-7 sm:rounded-2xl sm:p-5"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-frost/70 sm:text-[0.68rem] sm:tracking-[0.34em]">
                Подход
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Мы соединяем продуктовую стратегию, инженерную дисциплину и
                сильную визуальную подачу, чтобы цифровой продукт выглядел
                дорого и работал как инструмент прибыли.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
