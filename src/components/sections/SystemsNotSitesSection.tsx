import { motion } from 'framer-motion';
import { revealUp, revealLeft, revealRight, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';

type ComparisonRow = {
  surface: string;
  system: string;
};

type LoopStep = {
  label: string;
  hint: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  leftHeading: string;
  leftSub: string;
  rightHeading: string;
  rightSub: string;
  comparisonHeader: { surface: string; system: string };
  rows: ComparisonRow[];
  closing: string;
  loopEyebrow: string;
  loop: LoopStep[];
  loopFooter: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Позиционирование',
    title: 'Не сайт.',
    titleAccent: 'Система.',
    description:
      'Обычный сайт показывает информацию и собирает заявки. Eclipse Forge строит контур, который доводит заявку до результата — без ручного управления через мессенджеры и таблицы.',
    leftHeading: 'Обычный сайт',
    leftSub: 'Витрина — front layer без исполнения',
    rightHeading: 'Eclipse Forge система',
    rightSub: 'Execution layer — сайт + AI + dashboard + automation',
    comparisonHeader: { surface: 'Что делает витрина', system: 'Что делает система' },
    rows: [
      {
        surface: 'Показывает информацию о компании',
        system: 'Принимает заявку и сразу запускает workflow исполнения',
      },
      {
        surface: 'Собирает заявку в email или Telegram',
        system: 'Структурирует данные через AI и кладёт в operator dashboard',
      },
      {
        surface: 'Заявка попадает менеджеру вручную',
        system: 'Менеджер получает готовую карточку без переноса из мессенджера',
      },
      {
        surface: 'Логистика и адреса уходят в WhatsApp / звонки',
        system: 'Маршрут, объект и комментарии — в единой системе у исполнителя',
      },
      {
        surface: 'Договор собирается руками в Word',
        system: 'Документ генерируется автоматически и подписывается онлайн',
      },
      {
        surface: 'Нет картины: где заявка, что с заказом',
        system: 'Статус исполнения виден в реальном времени, руководитель получает отчёт',
      },
    ],
    closing:
      'Когда заказы живут в Excel, мессенджерах и звонках — теряются деньги и контроль. Система убирает ручную передачу между людьми.',
    loopEyebrow: 'Контур исполнения',
    loop: [
      { label: 'Заявка', hint: 'клиент оставляет данные на сайте' },
      { label: 'AI quality', hint: 'модель уточняет и структурирует' },
      { label: 'Operator dashboard', hint: 'менеджер видит готовую карточку' },
      { label: 'Workflow', hint: 'логистика, документы, уведомления' },
      { label: 'Execution', hint: 'заказ доведён до результата' },
    ],
    loopFooter: 'Каждый шаг наблюдаем. Каждое действие фиксируется. Цикл закрыт.',
  },
  en: {
    eyebrow: 'Positioning',
    title: 'Not a site.',
    titleAccent: 'A system.',
    description:
      'A regular website shows information and collects leads. Eclipse Forge builds the contour that drives a lead to outcome — without manual coordination through messengers and spreadsheets.',
    leftHeading: 'A regular website',
    leftSub: 'A storefront — front layer without execution',
    rightHeading: 'Eclipse Forge system',
    rightSub: 'Execution layer — site + AI + dashboard + automation',
    comparisonHeader: { surface: 'What a storefront does', system: 'What a system does' },
    rows: [
      {
        surface: 'Shows company information',
        system: 'Accepts a request and immediately fires the execution workflow',
      },
      {
        surface: 'Sends leads to email or Telegram',
        system: 'Structures data through AI into an operator dashboard',
      },
      {
        surface: 'Manager re-types data from messengers',
        system: 'Manager receives a ready-made order card without re-entry',
      },
      {
        surface: 'Logistics and addresses live in WhatsApp / calls',
        system: 'Route, site and notes live in one operator system',
      },
      {
        surface: 'Contracts are stitched together by hand',
        system: 'Documents are generated automatically and signed online',
      },
      {
        surface: 'No picture: where is the order, what is the status',
        system: 'Execution status is visible in real-time, owner gets a report',
      },
    ],
    closing:
      'When orders live in spreadsheets, messengers and calls — money and control leak. A system removes the manual hand-off between people.',
    loopEyebrow: 'Execution loop',
    loop: [
      { label: 'Lead', hint: 'client submits data on the site' },
      { label: 'AI qualification', hint: 'model clarifies and structures' },
      { label: 'Operator dashboard', hint: 'manager sees a ready card' },
      { label: 'Workflow', hint: 'logistics, documents, notifications' },
      { label: 'Execution', hint: 'order driven to outcome' },
    ],
    loopFooter: 'Every step observable. Every action recorded. The loop is closed.',
  },
};

function ArrowGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function CrossGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

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
          className="absolute left-1/2 top-0 h-[320px] w-[820px] -translate-x-1/2 rounded-full blur-[180px] opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.eyebrow}
          </motion.p>
          <motion.h2 variants={revealUp} className="type-display text-[clamp(2rem,4.5vw,4.2rem)] leading-[1.02]">
            <span className="block" style={{ color: 'var(--text-4)' }}>
              {copy.title}
            </span>
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

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.article
            variants={revealLeft}
            className="relative overflow-hidden rounded-[1.75rem] border p-7 sm:p-8 lg:p-9"
            style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border"
                style={{ borderColor: 'var(--line)', color: 'var(--text-4)' }}
              >
                <CrossGlyph />
              </span>
              <span
                className="type-meta"
                style={{ color: 'var(--text-4)' }}
              >
                {copy.leftSub}
              </span>
            </div>
            <h3 className="mt-3 font-display text-[24px] tracking-tight sm:text-[28px]" style={{ color: 'var(--text-2)' }}>
              {copy.leftHeading}
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
              {copy.comparisonHeader.surface}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {copy.rows.map((row, idx) => (
                <li
                  key={`surface-${idx}`}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-[13.5px] leading-relaxed sm:text-[14.5px]"
                  style={{
                    borderColor: 'var(--line-subtle)',
                    background: 'rgba(255,255,255,0.015)',
                    color: 'var(--text-3)',
                  }}
                >
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(74,85,104,0.16)', color: 'var(--text-4)' }}
                  >
                    <CrossGlyph />
                  </span>
                  <span>{row.surface}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            variants={revealRight}
            className="relative overflow-hidden rounded-[1.75rem] border p-7 sm:p-8 lg:p-9"
            style={{
              borderColor: 'rgba(212,175,55,0.28)',
              background:
                'linear-gradient(180deg, rgba(212,175,55,0.04) 0%, rgba(12,17,23,0.6) 60%)',
            }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-[80px] opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)' }}
            />
            <div className="relative flex items-center gap-3">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border"
                style={{ borderColor: 'rgba(212,175,55,0.32)', color: 'var(--gold)' }}
              >
                <CheckGlyph />
              </span>
              <span className="type-meta" style={{ color: 'var(--gold)' }}>
                {copy.rightSub}
              </span>
            </div>
            <h3 className="relative mt-3 font-display text-[24px] tracking-tight sm:text-[28px]" style={{ color: 'var(--text-1)' }}>
              {copy.rightHeading}
            </h3>
            <p className="relative mt-1 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-3)' }}>
              {copy.comparisonHeader.system}
            </p>
            <ul className="relative mt-6 flex flex-col gap-3">
              {copy.rows.map((row, idx) => (
                <li
                  key={`system-${idx}`}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-[13.5px] leading-relaxed sm:text-[14.5px]"
                  style={{
                    borderColor: 'rgba(212,175,55,0.14)',
                    background: 'rgba(212,175,55,0.04)',
                    color: 'var(--text-2)',
                  }}
                >
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(212,175,55,0.18)', color: 'var(--gold)' }}
                  >
                    <CheckGlyph />
                  </span>
                  <span>{row.system}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        <motion.p
          variants={revealUp}
          className="mx-auto mt-10 max-w-3xl text-center text-[14px] leading-relaxed sm:text-[15px] lg:mt-14"
          style={{ color: 'var(--text-3)' }}
        >
          {copy.closing}
        </motion.p>

        <motion.div variants={revealUp} className="mt-14 lg:mt-20">
          <p className="mb-6 text-center type-meta" style={{ color: 'var(--gold)' }}>
            {copy.loopEyebrow}
          </p>
          <div
            className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[1.75rem] border p-5 sm:p-7 lg:p-8"
            style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2 lg:gap-3">
              {copy.loop.map((step, idx) => (
                <div key={step.label} className="flex flex-1 items-stretch gap-2">
                  <div
                    className="flex flex-1 flex-col items-start rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
                    style={{
                      borderColor: idx === copy.loop.length - 1 ? 'rgba(212,175,55,0.28)' : 'var(--line-subtle)',
                      background:
                        idx === copy.loop.length - 1
                          ? 'rgba(212,175,55,0.04)'
                          : 'rgba(15,18,24,0.4)',
                    }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: 'var(--text-4)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="mt-2 font-display text-[15px] tracking-tight sm:text-[16px]"
                      style={{ color: idx === copy.loop.length - 1 ? 'var(--gold)' : 'var(--text-1)' }}
                    >
                      {step.label}
                    </span>
                    <span
                      className="mt-1 text-[12px] leading-snug"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {step.hint}
                    </span>
                  </div>
                  {idx < copy.loop.length - 1 ? (
                    <div
                      aria-hidden="true"
                      className="hidden flex-col items-center justify-center sm:flex"
                      style={{ color: 'var(--text-4)' }}
                    >
                      <ArrowGlyph />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-[12px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
              {copy.loopFooter}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
