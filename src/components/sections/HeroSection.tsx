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
  const panelY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.975]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[calc(100svh-90px)] items-center overflow-hidden px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_34%,rgba(255,255,255,0.055),transparent_10%),radial-gradient(circle_at_64%_36%,rgba(255,106,0,0.11),transparent_22%),radial-gradient(circle_at_70%_24%,rgba(118,199,255,0.06),transparent_10%)]" />
      <motion.div
        style={reduceMotion ? undefined : { y: orbY }}
        className="pointer-events-none absolute right-[-26%] top-[0%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.28),rgba(255,106,0,0.07)_34%,rgba(0,0,0,0)_68%)] blur-2xl sm:right-[-14%] sm:h-[420px] sm:w-[420px] lg:h-[540px] lg:w-[540px]"
      />
      <motion.div
        style={reduceMotion ? undefined : { y: gridY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[22%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.75))]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))] sm:h-48" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:items-center lg:gap-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[44rem]"
        >
          <motion.p
            variants={revealUp}
            className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.38em] text-white/46 shadow-soft backdrop-blur sm:text-[0.68rem]"
          >
            Кузница IT-решений
          </motion.p>

          <motion.h1
            variants={revealUp}
            className="type-display max-w-[10.4ch] text-balance text-[clamp(2.8rem,10vw,6.8rem)] font-semibold text-white"
          >
            Куем IT-продукты, которые увеличивают прибыль бизнеса
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="type-body mt-6 max-w-[34rem] text-[0.98rem] text-white/58 sm:mt-8 sm:text-[1.02rem] lg:text-[1.05rem]"
          >
            Проектируем и разрабатываем сайты, SaaS и автоматизацию — от идеи
            до запуска. Без декоративной разработки. Только решения, которые
            усиливают продукт, продажи и операционную эффективность.
          </motion.p>

          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5"
          >
            <GlowButton href="#contact" className="w-full justify-center sm:w-auto">
              Запустить проект
            </GlowButton>
            <a
              href="#cases"
              className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[0.22em] text-white/44 transition hover:text-white sm:justify-start sm:tracking-[0.26em]"
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
          transition={{ duration: 0.74, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 translate-x-3 translate-y-5 rounded-[2rem] border border-white/8 bg-white/[0.02] blur-2xl sm:translate-x-5 sm:translate-y-6" />
          <div className="monolith-surface rounded-[1.8rem] p-5 sm:rounded-[2rem] sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(255,106,0,0.11),transparent_22%),radial-gradient(circle_at_22%_84%,rgba(118,199,255,0.06),transparent_22%)]" />
            <div className="relative flex items-center justify-between border-b border-white/8 pb-4 sm:pb-5">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/34 sm:text-[0.68rem]">
                  Eclipse Core
                </p>
                <p className="type-heading mt-2 text-[1.34rem] text-white sm:mt-3 sm:text-[1.7rem]">
                  Сайт. SaaS. Автоматизация.
                </p>
              </div>
              <div className="eclipse-core h-14 w-14 sm:h-16 sm:w-16" />
            </div>

            <div className="relative mt-6 grid gap-3 sm:mt-7 sm:gap-4">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          borderColor: 'rgba(255,255,255,0.14)',
                        }
                  }
                  transition={{ duration: 0.22 }}
                  className="rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:rounded-2xl sm:px-5"
                >
                  <p className="type-heading text-[1.28rem] text-white sm:text-[1.7rem]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/46">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0.7 }}
              whileHover={reduceMotion ? undefined : { opacity: 1, y: -2 }}
              transition={{ duration: 0.28 }}
              className="relative mt-6 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(135deg,rgba(118,199,255,0.08),rgba(255,255,255,0.012)_42%,rgba(255,106,0,0.03))] p-4 shadow-frost sm:mt-7 sm:rounded-2xl sm:p-5"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-frost/62 sm:text-[0.68rem]">
                Подход
              </p>
              <p className="mt-3 text-sm leading-7 text-white/60">
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
