import { motion } from 'framer-motion';
import { contactDetails, metrics } from '../../data/content';
import { revealUp, stagger } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-accent/[0.12] blur-[150px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-orange-700/[0.08] blur-[120px]" />
        <div className="absolute top-[50%] left-[55%] w-[300px] h-[300px] rounded-full bg-frost/[0.03] blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div className="grid-overlay absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-36 lg:py-44 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={revealUp}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/15 bg-accent/[0.05] px-5 py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(255,106,0,0.9)]" />
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-accent/60 font-medium">
              Product Engineering Studio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={revealUp}
            className="type-display max-w-4xl text-[clamp(2.6rem,6.5vw,5.2rem)] font-semibold leading-[0.93] tracking-tight"
          >
            <span className="text-white/95">Мы проектируем</span>
            <br />
            <span className="text-accent">системы</span>
            <span className="text-white/30">,</span>
            <br className="sm:hidden" />
            <span className="text-white/30"> а не сайты.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={revealUp}
            className="mt-8 max-w-lg text-[0.95rem] sm:text-[1.05rem] leading-[1.8] text-white/40"
          >
            От AI-автоматизации до SaaS-платформ —
            создаём цифровые продукты, которые увеличивают прибыль
            и превращают хаос в управляемый рост.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={revealUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <GlowButton
              href={contactDetails.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="justify-center px-8 py-4"
            >
              Обсудить проект
            </GlowButton>
            <a
              href="#cases"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.07] px-8 py-4 text-sm font-medium text-white/40 transition-all duration-300 hover:border-white/12 hover:text-white/60"
            >
              Смотреть кейсы
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={revealUp}
            className="mt-20 flex gap-10 sm:gap-16 border-t border-white/[0.05] pt-8"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xl sm:text-2xl font-semibold text-white/80 tracking-tight">{m.value}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-white/20">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
    </section>
  );
}
