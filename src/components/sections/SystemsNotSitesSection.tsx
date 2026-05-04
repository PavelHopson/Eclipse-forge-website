import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';

type SystemCard = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  signals: string[];
  glyph: 'operator' | 'automation' | 'pipeline' | 'execution';
};

type Copy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  cards: SystemCard[];
  liveLabel: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Что я делаю',
    title: 'Я не делаю сайты.',
    titleAccent: 'Я строю системы.',
    description:
      'Каждая система — это контур, который наблюдает, принимает решения и доводит процесс до конца. Без человека, который сидит и нажимает кнопки.',
    liveLabel: 'live',
    cards: [
      {
        index: '01',
        title: 'AI-оператор',
        subtitle: 'Operator layer',
        description:
          'Голос, terminal tooling, инструменты и permissions. AI, который не отвечает в чате, а исполняет работу.',
        signals: ['voice runtime', 'tool calling', 'local-first контроль'],
        glyph: 'operator',
      },
      {
        index: '02',
        title: 'Automation engine',
        subtitle: 'Execution loop',
        description:
          'Триггеры, маршрутизация, retries, очереди и наблюдаемость. Система превращает входящий поток событий в действия.',
        signals: ['event routing', 'retry-safe', 'observable runs'],
        glyph: 'automation',
      },
      {
        index: '03',
        title: 'Data pipeline',
        subtitle: 'Signal capture',
        description:
          'Ingestion, parsing, enrichment, dashboards. Данные перестают быть россыпью источников и становятся наблюдаемым потоком.',
        signals: ['ETL + monitoring', 'TLS scraping', 'schema-aware'],
        glyph: 'pipeline',
      },
      {
        index: '04',
        title: 'Execution system',
        subtitle: 'Decision contour',
        description:
          'Полный контур: вход, ядро решений, исполнение, фиксация. Это не интерфейс — это процесс, упакованный в систему.',
        signals: ['detect → decide → act', 'guarded actions', 'closed loop'],
        glyph: 'execution',
      },
    ],
  },
  en: {
    eyebrow: 'What I do',
    title: "I don't build sites.",
    titleAccent: 'I build systems.',
    description:
      'Each system is a contour that observes, decides and drives a process to completion. Without a human sitting there pressing buttons.',
    liveLabel: 'live',
    cards: [
      {
        index: '01',
        title: 'AI operator',
        subtitle: 'Operator layer',
        description:
          'Voice, terminal tooling, tools and permissions. AI that does not chat — it executes work.',
        signals: ['voice runtime', 'tool calling', 'local-first control'],
        glyph: 'operator',
      },
      {
        index: '02',
        title: 'Automation engine',
        subtitle: 'Execution loop',
        description:
          'Triggers, routing, retries, queues and observability. The system turns an event stream into actions.',
        signals: ['event routing', 'retry-safe', 'observable runs'],
        glyph: 'automation',
      },
      {
        index: '03',
        title: 'Data pipeline',
        subtitle: 'Signal capture',
        description:
          'Ingestion, parsing, enrichment, dashboards. Scattered sources become an observable stream.',
        signals: ['ETL + monitoring', 'TLS scraping', 'schema-aware'],
        glyph: 'pipeline',
      },
      {
        index: '04',
        title: 'Execution system',
        subtitle: 'Decision contour',
        description:
          'The full contour: input, decision core, action, recording. Not an interface — a process packaged as a system.',
        signals: ['detect → decide → act', 'guarded actions', 'closed loop'],
        glyph: 'execution',
      },
    ],
  },
};

function GlyphOperator() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="op-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(107,163,255,0.55)" />
          <stop offset="100%" stopColor="rgba(107,163,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(107,163,255,0.18)" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(107,163,255,0.32)" />
      <circle cx="60" cy="60" r="18" fill="url(#op-core)" />
      <circle cx="60" cy="60" r="3.4" fill="rgba(255,255,255,0.85)" />
      <g stroke="rgba(157,196,255,0.55)" strokeLinecap="round">
        <line x1="20" y1="60" x2="40" y2="60" strokeWidth="1.2" />
        <line x1="80" y1="60" x2="100" y2="60" strokeWidth="1.2" />
        <line x1="60" y1="20" x2="60" y2="40" strokeWidth="1.2" />
        <line x1="60" y1="80" x2="60" y2="100" strokeWidth="1.2" />
      </g>
      <g fill="rgba(255,200,138,0.95)">
        <circle cx="20" cy="60" r="1.6" />
        <circle cx="100" cy="60" r="1.6" />
        <circle cx="60" cy="20" r="1.6" />
        <circle cx="60" cy="100" r="1.6" />
      </g>
    </svg>
  );
}

function GlyphAutomation() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <g stroke="rgba(107,163,255,0.45)" fill="none" strokeLinecap="round">
        <path d="M16 36 Q40 36 40 60 T64 84 H104" strokeWidth="1.4" />
        <path d="M16 60 Q44 60 44 60 T74 60 H104" strokeWidth="1.4" />
        <path d="M16 84 Q40 84 40 60 T64 36 H104" strokeWidth="1.4" />
      </g>
      <g fill="rgba(157,196,255,0.95)">
        <circle cx="16" cy="36" r="2.4" />
        <circle cx="16" cy="60" r="2.4" />
        <circle cx="16" cy="84" r="2.4" />
      </g>
      <g fill="rgba(255,200,138,0.95)">
        <circle cx="104" cy="60" r="3" />
      </g>
      <circle cx="60" cy="60" r="6" fill="none" stroke="rgba(255,200,138,0.6)" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="2" fill="rgba(255,200,138,0.9)" />
    </svg>
  );
}

function GlyphPipeline() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <g stroke="rgba(107,163,255,0.5)" fill="none" strokeLinecap="round">
        <line x1="14" y1="32" x2="106" y2="32" strokeWidth="1.2" strokeDasharray="2 4" />
        <line x1="14" y1="60" x2="106" y2="60" strokeWidth="1.2" />
        <line x1="14" y1="88" x2="106" y2="88" strokeWidth="1.2" strokeDasharray="2 4" />
      </g>
      <g fill="rgba(157,196,255,0.85)">
        <rect x="20" y="28" width="6" height="8" rx="1" />
        <rect x="40" y="56" width="6" height="8" rx="1" />
        <rect x="60" y="56" width="6" height="8" rx="1" />
        <rect x="80" y="56" width="6" height="8" rx="1" />
        <rect x="46" y="84" width="6" height="8" rx="1" />
      </g>
      <g fill="rgba(255,200,138,0.95)">
        <rect x="94" y="56" width="8" height="8" rx="1.5" />
      </g>
    </svg>
  );
}

function GlyphExecution() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="46" width="22" height="28" rx="3" stroke="rgba(107,163,255,0.5)" strokeWidth="1.2" />
        <rect x="49" y="38" width="22" height="44" rx="3" stroke="rgba(107,163,255,0.7)" strokeWidth="1.4" />
        <rect x="84" y="46" width="22" height="28" rx="3" stroke="rgba(255,200,138,0.7)" strokeWidth="1.2" />
        <line x1="36" y1="60" x2="49" y2="60" stroke="rgba(157,196,255,0.55)" strokeWidth="1.2" />
        <line x1="71" y1="60" x2="84" y2="60" stroke="rgba(157,196,255,0.55)" strokeWidth="1.2" />
      </g>
      <circle cx="60" cy="60" r="3.6" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

const GLYPHS = {
  operator: GlyphOperator,
  automation: GlyphAutomation,
  pipeline: GlyphPipeline,
  execution: GlyphExecution,
};

export function SystemsNotSitesSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <motion.section
      id="not-sites"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full blur-[180px] opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(107,163,255,0.05) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--accent)' }}>
            {copy.eyebrow}
          </motion.p>
          <motion.h2 variants={revealUp} className="type-display text-[clamp(2rem,4.5vw,4.2rem)]">
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

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {copy.cards.map((card) => {
            const Glyph = GLYPHS[card.glyph];
            return (
              <motion.article
                key={card.index}
                variants={revealUp}
                whileHover={{ y: -4, borderColor: 'rgba(107,163,255,0.22)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                className="group relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-7 lg:p-8"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(107,163,255,0.06) 0%, transparent 70%)' }}
                />
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-[60px] opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: 'radial-gradient(circle, rgba(255,200,138,0.18) 0%, transparent 70%)' }}
                />

                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-[11px] font-light tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                        {card.index}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]" style={{ borderColor: 'var(--line)', color: 'var(--text-3)' }}>
                        <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                        {copy.liveLabel}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[22px] tracking-tight sm:text-[26px]" style={{ color: 'var(--text-1)' }}>
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="h-20 w-20 shrink-0 rounded-2xl border p-3 transition-all duration-500 group-hover:scale-[1.04]" style={{ borderColor: 'var(--line)', background: 'rgba(15, 18, 24, 0.4)' }}>
                    <Glyph />
                  </div>
                </div>

                <p className="relative mt-5 text-[14px] leading-relaxed sm:text-[15px]" style={{ color: 'var(--text-2)' }}>
                  {card.description}
                </p>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  {card.signals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em]"
                      style={{ borderColor: 'var(--line)', color: 'var(--text-3)', background: 'rgba(15,18,24,0.4)' }}
                    >
                      {signal}
                    </span>
                  ))}
                </div>

                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
