import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';

type Copy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  steps: Array<{ index: string; phase: string; title: string; description: string; signal: string }>;
  flow: { input: string; core: string; output: string };
  bottomNote: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Как работает система',
    title: 'Хаос на входе.',
    titleAccent: 'Решение на выходе.',
    description:
      'Каждая система Eclipse Forge построена по одному и тому же контуру: события заходят, ядро принимает решение, исполнение замыкает цикл. Без человека, который сидит между этапами.',
    steps: [
      {
        index: '01',
        phase: 'INPUT',
        title: 'Анализ',
        description:
          'Сбор сигналов из чатов, форм, API, событий. Нормализация, контекст, исторические данные — всё, что нужно для решения.',
        signal: 'хаос → структурированный сигнал',
      },
      {
        index: '02',
        phase: 'CORE',
        title: 'Решение',
        description:
          'AI-ядро + правила + проверки качества. Маршрутизация задач между LLM, fallback-цепочки, retry-safe вызовы и guardrails.',
        signal: 'сигнал → действие с обоснованием',
      },
      {
        index: '03',
        phase: 'OUTPUT',
        title: 'Действие',
        description:
          'Выполнение через инструменты, API, очереди. Запись результата, метрик, телеметрии. Цикл замыкается — никто не нажимает следующую кнопку.',
        signal: 'действие → зафиксированный результат',
      },
    ],
    flow: { input: 'INPUT', core: 'CORE', output: 'OUTPUT' },
    bottomNote: 'Каждый этап наблюдаем. Каждое решение фиксируется. Цикл повторяется без участия оператора.',
  },
  en: {
    eyebrow: 'How the system works',
    title: 'Chaos in.',
    titleAccent: 'Decision out.',
    description:
      'Every Eclipse Forge system is built around one contour: events come in, the core decides, execution closes the loop. No human sitting between the stages.',
    steps: [
      {
        index: '01',
        phase: 'INPUT',
        title: 'Analyze',
        description:
          'Collect signals from chats, forms, APIs, events. Normalize, add context, attach history — everything the system needs to decide.',
        signal: 'chaos → structured signal',
      },
      {
        index: '02',
        phase: 'CORE',
        title: 'Decide',
        description:
          'AI core + rules + quality checks. Task routing across LLMs, fallback chains, retry-safe calls and guardrails.',
        signal: 'signal → reasoned action',
      },
      {
        index: '03',
        phase: 'OUTPUT',
        title: 'Act',
        description:
          'Execute through tools, APIs, queues. Record the result, metrics, telemetry. The loop closes — nobody presses the next button.',
        signal: 'action → recorded result',
      },
    ],
    flow: { input: 'INPUT', core: 'CORE', output: 'OUTPUT' },
    bottomNote: 'Every stage is observable. Every decision is recorded. The loop repeats without an operator.',
  },
};

export function HowItWorksSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <motion.section
      id="how-it-works"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-36"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-50"
          style={{ background: 'radial-gradient(ellipse, rgba(107,163,255,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl lg:mb-20">
          <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--accent)' }}>
            {copy.eyebrow}
          </motion.p>
          <motion.h2 variants={revealUp} className="type-display text-[clamp(2.1rem,4.8vw,4.4rem)]">
            {copy.title}
            <span className="block text-gradient-hero">{copy.titleAccent}</span>
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="mt-6 type-body text-[15px] leading-relaxed sm:text-[17px]"
            style={{ color: 'var(--text-2)' }}
          >
            {copy.description}
          </motion.p>
        </div>

        {/* Visual flow diagram */}
        <motion.div
          variants={revealUp}
          className="relative mb-14 hidden overflow-hidden rounded-[2rem] border p-8 lg:block lg:mb-20 lg:p-10"
          style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
        >
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6">
            {/* INPUT node */}
            <div className="rounded-[1.4rem] border p-5" style={{ borderColor: 'rgba(107,163,255,0.25)', background: 'rgba(107,163,255,0.04)' }}>
              <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                {copy.flow.input}
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full hero-signal-dot" />
                <span className="font-display text-sm tracking-tight" style={{ color: 'var(--text-1)' }}>
                  events · API · streams
                </span>
              </div>
              <div className="mt-3 space-y-1">
                {['chat → signal', 'form → record', 'event → trigger'].map((line) => (
                  <p key={line} className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* arrow */}
            <FlowArrow />

            {/* CORE node */}
            <div
              className="relative rounded-[1.6rem] border p-6 text-center"
              style={{ borderColor: 'rgba(255,200,138,0.35)', background: 'radial-gradient(circle at 50% 30%, rgba(255,200,138,0.08), rgba(15,18,24,0.4) 70%)' }}
            >
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(255,200,138,0.12) 0%, transparent 70%)' }}
              />
              <p className="relative type-meta mb-2" style={{ color: 'var(--accent-warm, #ffc88a)' }}>
                {copy.flow.core}
              </p>
              <CoreOrb />
              <p className="relative mt-3 font-display text-base tracking-tight" style={{ color: 'var(--text-1)' }}>
                AI engine + rules
              </p>
              <p className="relative mt-1 text-[10.5px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                routing · guardrails · retries
              </p>
            </div>

            {/* arrow */}
            <FlowArrow />

            {/* OUTPUT node */}
            <div className="rounded-[1.4rem] border p-5" style={{ borderColor: 'rgba(107,163,255,0.25)', background: 'rgba(107,163,255,0.04)' }}>
              <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                {copy.flow.output}
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full hero-signal-dot" />
                <span className="font-display text-sm tracking-tight" style={{ color: 'var(--text-1)' }}>
                  action · record · metric
                </span>
              </div>
              <div className="mt-3 space-y-1">
                {['action → tool', 'result → store', 'metric → board'].map((line) => (
                  <p key={line} className="text-[10.5px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three-step explanation */}
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {copy.steps.map((step) => (
            <motion.div
              key={step.index}
              variants={revealUp}
              whileHover={{ y: -3, borderColor: 'rgba(107,163,255,0.2)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="group relative overflow-hidden rounded-[1.6rem] border p-6 sm:p-7"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-[11px] font-light tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                  {step.index}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>
                  {step.phase}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[22px] tracking-tight sm:text-[24px]" style={{ color: 'var(--text-1)' }}>
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
                {step.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: 'var(--line)' }}>
                <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-3)' }}>
                  {step.signal}
                </span>
              </div>
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={revealUp}
          className="mt-10 max-w-2xl text-center text-[12px] uppercase tracking-[0.22em] mx-auto"
          style={{ color: 'var(--text-4)' }}
        >
          {copy.bottomNote}
        </motion.p>
      </div>
    </motion.section>
  );
}

function FlowArrow() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(107,163,255,0.4), transparent)' }} />
      <motion.div
        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
        style={{ background: 'rgba(255,200,138,0.95)', boxShadow: '0 0 12px rgba(255,200,138,0.6)' }}
        animate={{ x: ['-10%', '110%'] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function CoreOrb() {
  return (
    <div className="relative mx-auto h-20 w-20">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,200,138,0.4) 0%, rgba(255,200,138,0) 70%)' }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-3 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,200,138,0.7) 0%, rgba(107,163,255,0.3) 50%, transparent 80%)' }}
      />
      <motion.div
        className="absolute inset-6 rounded-full"
        style={{ background: 'rgba(0,0,0,0.6)', boxShadow: 'inset 0 0 14px rgba(0,0,0,0.8)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
