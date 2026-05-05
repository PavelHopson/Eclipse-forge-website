import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { MiniEclipse, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';

type ImpactCard = {
  index: string;
  title: string;
  description: string;
  signal: string;
};

type ImpactCopy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  cards: ImpactCard[];
  signalLabel: string;
};

const impactCopy: Record<Locale, ImpactCopy> = {
  ru: {
    eyebrow: 'Бизнес-эффект',
    title: 'Не просто интерфейс.',
    titleAccent: 'Бизнес-эффект.',
    description:
      'Когда за экраном есть логика, бизнес получает не набор экранов, а рабочий контур: меньше ручной нагрузки, меньше ошибок и больше контроля над процессом.',
    signalLabel: 'эффект',
    cards: [
      {
        index: '01',
        title: 'Меньше ручной работы',
        description: 'Повторяющиеся шаги, follow-up и рутинная маршрутизация переходят в систему вместо постоянного ручного сопровождения.',
        signal: 'automation layer',
      },
      {
        index: '02',
        title: 'Меньше ошибок',
        description: 'Правила, логирование, проверки и fallback-цепочки уменьшают количество срывов и ручных недосмотров.',
        signal: 'guardrails + control',
      },
      {
        index: '03',
        title: 'Быстрее решения',
        description: 'Данные быстрее превращаются в действие: меньше ожидания между сигналом, анализом и следующим шагом.',
        signal: 'data -> action',
      },
      {
        index: '04',
        title: 'Управляемый процесс',
        description: 'Видно, что происходит, где узкое место и что делать дальше. Процесс перестаёт быть чёрным ящиком.',
        signal: 'observable flow',
      },
    ],
  },
  en: {
    eyebrow: 'Business effect',
    title: 'Not just an interface.',
    titleAccent: 'A business outcome.',
    description:
      'When logic sits behind the screen, the business gets more than a polished surface: less manual work, fewer errors and tighter control over the process.',
    signalLabel: 'effect',
    cards: [
      {
        index: '01',
        title: 'Less manual work',
        description: 'Repeated steps, follow-up and routine routing move into the system instead of staying manual.',
        signal: 'automation layer',
      },
      {
        index: '02',
        title: 'Fewer errors',
        description: 'Rules, logging, checks and fallback chains reduce breakage and manual oversight failures.',
        signal: 'guardrails + control',
      },
      {
        index: '03',
        title: 'Faster decisions',
        description: 'Data turns into action faster with less delay between signal, analysis and the next step.',
        signal: 'data -> action',
      },
      {
        index: '04',
        title: 'A controllable process',
        description: 'You can see what is happening, where the bottleneck is and what needs to happen next.',
        signal: 'observable flow',
      },
    ],
  },
};

export function BusinessImpactSection() {
  const { locale } = useLocale();
  const copy = impactCopy[locale];

  return (
    <motion.section
      id="business-impact"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute inset-0 services-atmosphere-bg" />
      <div className="absolute inset-0 opacity-30">
        <ParticleField count={10} />
      </div>
      <div className="absolute right-[-6%] top-16 hidden lg:block opacity-30">
        <OrbitalRing size={280} dotCount={3} duration={44} color="var(--accent-warm)" />
      </div>
      <MiniEclipse size={18} className="absolute left-20 top-16 hidden opacity-30 lg:block" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.eyebrow}
          </motion.p>
          <motion.h2 variants={revealUp} className="type-display text-[clamp(2.15rem,4.6vw,4.2rem)]">
            {copy.title}
            <span className="block text-gradient-hero">{copy.titleAccent}</span>
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="mt-6 type-body text-[15px] leading-relaxed sm:text-[16px]"
            style={{ color: 'var(--text-3)' }}
          >
            {copy.description}
          </motion.p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {copy.cards.map((card) => (
            <motion.article
              key={card.index}
              variants={revealUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[1.9rem] border p-6 services-card sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 services-card-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 services-edge-glow" />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] services-chip">
                    {card.index}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] services-chip"
                  >
                    <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                    {copy.signalLabel}
                  </span>
                </div>

                <h3 className="font-display text-[1.25rem] font-medium tracking-tight sm:text-[1.45rem]" style={{ color: 'var(--text-1)' }}>
                  {card.title}
                </h3>
                <p className="mt-4 type-body text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
                  {card.description}
                </p>

                <div className="mt-5 rounded-2xl border px-4 py-4 services-panel">
                  <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--accent)' }}>
                    {card.signal}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
