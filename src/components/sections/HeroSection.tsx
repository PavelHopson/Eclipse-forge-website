import { motion } from 'framer-motion';
import { contactDetails, metrics } from '../../data/content';
import { GlowButton } from '../ui/GlowButton';

const wordReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const headingWords = [
  { text: 'Мы', accent: false },
  { text: 'проектируем', accent: false },
  { text: 'системы', accent: true },
  { text: ',', accent: false, dim: true },
  { text: 'а', accent: false, dim: true },
  { text: 'не', accent: false, dim: true },
  { text: 'сайты.', accent: false, dim: true },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[8%] left-[12%] w-[600px] h-[600px] rounded-full bg-accent/[0.08] blur-[180px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[8%] w-[500px] h-[500px] rounded-full bg-orange-800/[0.06] blur-[150px]"
        />
        <div className="absolute top-[45%] left-[50%] w-[250px] h-[250px] rounded-full bg-frost/[0.02] blur-[100px]" />
      </div>

      {/* Grid */}
      <div className="grid-overlay absolute inset-0 opacity-[0.025] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-40 lg:py-48 w-full">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 inline-flex items-center gap-3 border border-accent/10 bg-accent/[0.04] px-5 py-2.5 rounded-full"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,106,0,0.8)]" />
          <span className="text-[0.58rem] uppercase tracking-[0.45em] text-accent/50 font-medium">
            Product Engineering Studio
          </span>
        </motion.div>

        {/* Heading — word by word reveal with blur */}
        <h1 className="type-display max-w-5xl text-[clamp(2.4rem,6vw,5rem)] leading-[1.0] mb-10">
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className={`inline-block mr-[0.25em] ${
                word.accent ? 'text-accent' : word.dim ? 'text-white/25' : 'text-white/90'
              }`}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          custom={1.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="type-body max-w-lg text-[0.95rem] sm:text-base text-white/35 mb-12"
        >
          От AI-автоматизации до SaaS-платформ —
          создаём цифровые продукты, которые превращают
          хаос в управляемый рост.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-20"
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
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.06] px-8 py-4 text-sm text-white/30 transition-all duration-400 hover:border-white/10 hover:text-white/50"
          >
            Смотреть кейсы
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        {/* Metrics */}
        <motion.div
          custom={1.7}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex gap-12 sm:gap-16 border-t border-white/[0.04] pt-8"
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="type-heading text-xl sm:text-2xl text-white/75">{m.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/15 font-medium">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
