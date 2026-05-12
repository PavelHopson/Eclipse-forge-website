import { motion } from 'framer-motion';
import { revealUp, revealLeft, revealRight, stagger, viewport } from '../lib/animation';
import { useLocale, type Locale } from '../lib/locale';
import { RouteLink } from '../lib/routing';
import { contactDetails } from '../data/content';
import { GlowButton } from '../components/ui/GlowButton';
import { EclipseDivider } from '../components/ui/EclipseVisuals';
import {
  AiQualifyMockup,
  ContractMockup,
  LogisticsMockup,
  OrderCardMockup,
} from '../components/construction/mockups';

type ConstructionCopy = {
  meta: {
    backLabel: string;
    productTag: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    bullets: string[];
  };
  problem: {
    eyebrow: string;
    title: string;
    pains: Array<{ title: string; text: string }>;
  };
  solution: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ index: string; title: string; text: string }>;
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    nodes: Array<{ title: string; meta: string }>;
    footer: string;
  };
  modules: {
    eyebrow: string;
    title: string;
    items: Array<{ name: string; description: string }>;
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    beforeLabel: string;
    afterLabel: string;
    before: string[];
    after: string[];
  };
  cta: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

const COPY: Record<Locale, ConstructionCopy> = {
  ru: {
    meta: {
      backLabel: 'Назад на главную',
      productTag: 'Forge Construction Runtime · концепт-демо',
    },
    hero: {
      eyebrow: 'Forge Construction Runtime',
      title: 'Сайт, который не просто собирает заявки,',
      titleAccent: 'а запускает исполнение заказа.',
      description:
        'Система для строительного бизнеса: заявки, AI-обработка, operator dashboard, логистика, договоры, электронная подпись и контроль исполнения — в одном workflow.',
      primaryCta: 'Обсудить внедрение',
      secondaryCta: 'Смотреть workflow',
      bullets: [
        'AI принимает и структурирует заявку',
        'Менеджер видит готовую карточку',
        'Логист получает маршрут и адрес',
        'Договор генерируется и подписывается',
        'Руководитель видит статус и отчёт',
      ],
    },
    problem: {
      eyebrow: 'Боли',
      title: 'Заказы живут между мессенджерами и таблицами.',
      pains: [
        {
          title: 'Заявки теряются',
          text: 'Клиент написал в WhatsApp, менеджер пропустил — заказ ушёл конкуренту. Нет единого входа.',
        },
        {
          title: 'Ручной перенос данных',
          text: 'Менеджер 15 минут перепечатывает заказ из мессенджера в Excel и снова в 1С.',
        },
        {
          title: 'Адреса в WhatsApp',
          text: 'Водитель уточняет адрес и время по телефону. Ошибся улицей — поехал на другой объект.',
        },
        {
          title: 'Договоры собирают руками',
          text: 'Шаблон в Word, копи-паст реквизитов. Опечатка в ИНН — клиент возвращает на переподпись.',
        },
        {
          title: 'Нет картины по заказам',
          text: 'Собственник не видит, что происходит. Чтобы узнать статус — звонит менеджеру.',
        },
        {
          title: 'Ошибки стоят денег',
          text: 'Не тот объём, не та марка, не то время. Каждая ошибка — расход на возврат и репутацию.',
        },
      ],
    },
    solution: {
      eyebrow: 'Решение',
      title: 'Один workflow от заявки до отчёта.',
      description:
        'Система не заменяет менеджера — она убирает ручную передачу данных между людьми и инструментами. Менеджер занимается заказчиком, водитель едет, руководитель видит цифры.',
      steps: [
        { index: '01', title: 'Клиент оставляет заявку', text: 'Форма на сайте, Telegram-бот или WhatsApp — один вход.' },
        { index: '02', title: 'AI уточняет данные', text: 'Модель структурирует адрес, объём, время, материал.' },
        { index: '03', title: 'Карточка в operator dashboard', text: 'Менеджер видит готовый заказ — без переноса из мессенджера.' },
        { index: '04', title: 'Менеджер подтверждает', text: 'Корректирует, если нужно, и передаёт в логистику.' },
        { index: '05', title: 'Логист получает маршрут', text: 'Адрес, время, водитель, объект, комментарии.' },
        { index: '06', title: 'Водитель получает доставку', text: 'Точка на карте, контакт заказчика, окно по времени.' },
        { index: '07', title: 'Договор формируется', text: 'Шаблон + данные карточки → готовый документ.' },
        { index: '08', title: 'Клиент подписывает', text: 'Электронная подпись прямо со ссылки.' },
        { index: '09', title: 'Статус обновляется', text: 'Доставлено, подписано, оплачено — видно всем.' },
        { index: '10', title: 'Руководитель видит отчёт', text: 'AI summary за день: заказы, выручка, узкие места.' },
      ],
    },
    workflow: {
      eyebrow: 'Workflow',
      title: 'Контур исполнения целиком.',
      description:
        'Каждый узел — это либо AI-операция, либо операторская точка, либо автоматическое действие. Ничто не теряется между ними, потому что между ними нет ручной передачи.',
      nodes: [
        { title: 'Website Lead', meta: 'forms · Telegram · WhatsApp' },
        { title: 'AI Qualification', meta: 'parse → structure → validate' },
        { title: 'Operator Dashboard', meta: 'order card · status · actions' },
        { title: 'Contract Generation', meta: 'template + data → PDF' },
        { title: 'E-signature', meta: 'embedded · audit log' },
        { title: 'Logistics Routing', meta: 'driver · address · time' },
        { title: 'Execution Tracking', meta: 'real-time status' },
        { title: 'AI Report', meta: 'daily summary · alerts' },
      ],
      footer: 'AI · automation · operator panel · documents · execution — один контур, ни одного ручного звена.',
    },
    modules: {
      eyebrow: 'Модули',
      title: 'Из чего собирается система.',
      items: [
        { name: 'AI-заявки', description: 'AI собирает и структурирует данные по заказу. Голос, текст, мессенджеры — всё нормализуется в одну схему.' },
        { name: 'Operator dashboard', description: 'Менеджер видит готовые заявки без ручного переноса. Статусы, фильтры, история по клиенту.' },
        { name: 'Логистика', description: 'Адрес, время, водитель, объект, комментарии. Маршрут уходит водителю в Telegram или мобильное приложение.' },
        { name: 'Документы', description: 'Автоматическая генерация договора, счёта, ТТН. Шаблоны привязаны к типу заказа.' },
        { name: 'Электронная подпись', description: 'Подписание без бумажного хаоса. Поддерживаемые провайдеры — Контур, Тензор, СберКЭП.' },
        { name: 'Уведомления', description: 'Telegram / WhatsApp / email alerts. Менеджеру — новые заказы, клиенту — статус, руководителю — аномалии.' },
        { name: 'AI-отчёты', description: 'Daily summary для руководителя. Выручка, заказы, узкие места, аномалии в потоке.' },
      ],
    },
    beforeAfter: {
      eyebrow: 'Сравнение',
      title: 'До и после.',
      beforeLabel: 'Как сейчас',
      afterLabel: 'С системой',
      before: [
        'WhatsApp + Excel + телефонные звонки',
        'Менеджер вручную переносит заявку из мессенджера',
        'Адреса уточняются голосом, ошибки в маршруте',
        'Договоры пишутся в Word, копи-паст реквизитов',
        'Заявки теряются между людьми',
        'Собственник не видит картины — звонит менеджеру',
        'Ошибки в объёме и времени → возвраты и репутация',
      ],
      after: [
        'Единый workflow: сайт → AI → dashboard → исполнение',
        'AI структурирует заказ, менеджер получает карточку',
        'Маршрут уходит водителю автоматически',
        'Документы формируются и подписываются онлайн',
        'Каждый шаг наблюдаем, ничто не теряется',
        'Руководитель видит daily summary и аномалии',
        'AI ловит несогласованности до отправки',
      ],
    },
    cta: {
      eyebrow: 'Контакт',
      title: 'Если ваши заказы живут в звонках и таблицах —',
      titleAccent: 'соберём контур, который превратит это в процесс.',
      description:
        'Начнём с разбора реальной операции: где утекает время и контроль, что можно автоматизировать сразу, а что — на следующем шаге.',
      primary: 'Написать в Telegram',
      secondary: 'Открыть запрос',
    },
  },
  en: {
    meta: {
      backLabel: 'Back to home',
      productTag: 'Forge Construction Runtime · concept demo',
    },
    hero: {
      eyebrow: 'Forge Construction Runtime',
      title: 'A site that does not just collect leads,',
      titleAccent: 'it starts the order execution.',
      description:
        'A system for construction businesses: leads, AI processing, operator dashboard, logistics, contracts, e-signature and execution tracking — in one workflow.',
      primaryCta: 'Discuss implementation',
      secondaryCta: 'See the workflow',
      bullets: [
        'AI accepts and structures the lead',
        'Manager sees a ready-made card',
        'Logistics gets the route and address',
        'Contract is generated and signed',
        'Owner sees status and the report',
      ],
    },
    problem: {
      eyebrow: 'Pains',
      title: 'Orders live between messengers and spreadsheets.',
      pains: [
        {
          title: 'Leads get lost',
          text: 'A client wrote on WhatsApp, the manager missed it — the order went to a competitor. No single entry point.',
        },
        {
          title: 'Manual data re-entry',
          text: 'The manager spends 15 minutes copying the order from the messenger to Excel and then to 1C.',
        },
        {
          title: 'Addresses in WhatsApp',
          text: 'The driver clarifies the address and time by phone. Wrong street — wrong site.',
        },
        {
          title: 'Contracts stitched by hand',
          text: 'A Word template, copy-paste of legal details. A typo in INN — and the client sends it back.',
        },
        {
          title: 'No picture across orders',
          text: 'The owner does not see what is happening. To learn the status — they call a manager.',
        },
        {
          title: 'Mistakes cost money',
          text: 'Wrong volume, wrong grade, wrong time. Every mistake is a refund and a reputation hit.',
        },
      ],
    },
    solution: {
      eyebrow: 'Solution',
      title: 'One workflow from lead to report.',
      description:
        'The system does not replace the manager — it removes the manual hand-off between people and tools. The manager works with the client, the driver drives, the owner sees the numbers.',
      steps: [
        { index: '01', title: 'Client submits a lead', text: 'Site form, Telegram bot or WhatsApp — single entry.' },
        { index: '02', title: 'AI clarifies the data', text: 'Model structures address, volume, time, material.' },
        { index: '03', title: 'Card in operator dashboard', text: 'Manager sees a ready order — without re-typing from chat.' },
        { index: '04', title: 'Manager confirms', text: 'Edits if needed, hands off to logistics.' },
        { index: '05', title: 'Logistics gets the route', text: 'Address, time, driver, site, notes.' },
        { index: '06', title: 'Driver gets the delivery', text: 'Map pin, customer contact, time window.' },
        { index: '07', title: 'Contract is generated', text: 'Template + card data → ready document.' },
        { index: '08', title: 'Client signs', text: 'E-signature straight from the link.' },
        { index: '09', title: 'Status updates', text: 'Delivered, signed, paid — visible to everyone.' },
        { index: '10', title: 'Owner sees the report', text: 'Daily AI summary: orders, revenue, bottlenecks.' },
      ],
    },
    workflow: {
      eyebrow: 'Workflow',
      title: 'The full execution contour.',
      description:
        'Each node is either an AI operation, an operator point, or an automated action. Nothing leaks between them because there is no manual hand-off between them.',
      nodes: [
        { title: 'Website Lead', meta: 'forms · Telegram · WhatsApp' },
        { title: 'AI Qualification', meta: 'parse → structure → validate' },
        { title: 'Operator Dashboard', meta: 'order card · status · actions' },
        { title: 'Contract Generation', meta: 'template + data → PDF' },
        { title: 'E-signature', meta: 'embedded · audit log' },
        { title: 'Logistics Routing', meta: 'driver · address · time' },
        { title: 'Execution Tracking', meta: 'real-time status' },
        { title: 'AI Report', meta: 'daily summary · alerts' },
      ],
      footer: 'AI · automation · operator panel · documents · execution — one contour, zero manual links.',
    },
    modules: {
      eyebrow: 'Modules',
      title: 'What the system is built from.',
      items: [
        { name: 'AI lead capture', description: 'AI collects and structures order data. Voice, text, messengers — all normalized into one schema.' },
        { name: 'Operator dashboard', description: 'Manager sees ready-made orders without re-entry. Statuses, filters, per-client history.' },
        { name: 'Logistics', description: 'Address, time, driver, site, notes. The route goes to the driver via Telegram or a mobile app.' },
        { name: 'Documents', description: 'Automatic generation of contract, invoice, waybill. Templates are bound to order type.' },
        { name: 'E-signature', description: 'Signing without paper chaos. Supported providers — Kontur, Tenzor, SberKEP.' },
        { name: 'Notifications', description: 'Telegram / WhatsApp / email alerts. Manager — new orders, client — status, owner — anomalies.' },
        { name: 'AI reports', description: 'Daily summary for the owner. Revenue, orders, bottlenecks, anomalies in the flow.' },
      ],
    },
    beforeAfter: {
      eyebrow: 'Before / after',
      title: 'Before and after.',
      beforeLabel: 'Today',
      afterLabel: 'With the system',
      before: [
        'WhatsApp + Excel + phone calls',
        'Manager manually moves the lead from the messenger',
        'Addresses clarified by voice, route mistakes',
        'Contracts are written in Word, copy-paste of details',
        'Leads get lost between people',
        'Owner does not see the picture — calls a manager',
        'Volume and time errors → refunds and reputation',
      ],
      after: [
        'One workflow: site → AI → dashboard → execution',
        'AI structures the order, manager receives a card',
        'Route goes to the driver automatically',
        'Documents are generated and signed online',
        'Every step observable, nothing leaks',
        'Owner sees a daily summary and anomalies',
        'AI catches inconsistencies before dispatch',
      ],
    },
    cta: {
      eyebrow: 'Contact',
      title: 'If your orders live in calls and spreadsheets —',
      titleAccent: 'we will build the contour that turns that into a process.',
      description:
        'Start with mapping a real operation: where time and control are leaking, what can be automated immediately, what comes next.',
      primary: 'Message on Telegram',
      secondary: 'Open a request',
    },
  },
};

function ConstructionHero({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-hero"
      className="relative overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-16 lg:pb-32 lg:pt-20"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full blur-[180px] opacity-50"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <RouteLink
            to="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 hover:!text-[var(--gold)]"
            style={{ color: 'var(--text-3)' }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="M11 18l-6-6 6-6" />
            </svg>
            {copy.meta.backLabel}
          </RouteLink>
          <span
            className="hidden rounded-full border px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] sm:inline-flex"
            style={{ borderColor: 'var(--line)', color: 'var(--text-3)', background: 'var(--bg-card)' }}
          >
            {copy.meta.productTag}
          </span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <motion.div variants={revealLeft}>
            <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
              {copy.hero.eyebrow}
            </p>
            <h1 className="type-display text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">
              <span className="block" style={{ color: 'var(--text-1)' }}>
                {copy.hero.title}
              </span>
              <span className="mt-1 block text-gradient-hero">{copy.hero.titleAccent}</span>
            </h1>
            <p
              className="mt-7 type-body max-w-xl text-[15px] leading-relaxed sm:text-[17px]"
              style={{ color: 'var(--text-2)' }}
            >
              {copy.hero.description}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {copy.hero.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-[13.5px] leading-snug"
                  style={{ borderColor: 'var(--line-subtle)', background: 'rgba(15,18,24,0.4)', color: 'var(--text-2)' }}
                >
                  <span
                    className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: 'var(--gold)' }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <GlowButton href="#construction-cta" className="justify-center px-9 py-4 text-[14px]">
                {copy.hero.primaryCta}
              </GlowButton>
              <a
                href="#construction-workflow"
                className="group inline-flex items-center justify-center gap-3 rounded-full border px-9 py-4 text-[14px] font-display transition-all duration-500 hover:bg-white/[0.02]"
                style={{ color: 'var(--text-2)', borderColor: 'var(--line)' }}
              >
                {copy.hero.secondaryCta}
                <span className="h-px w-6 transition-all duration-500 group-hover:w-12" style={{ background: 'var(--accent-warm)' }} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={revealRight} className="flex flex-col gap-4">
            <OrderCardMockup />
            <LogisticsMockup />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function ConstructionProblem({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-problem"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.problem.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.06]">
            {copy.problem.title}
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.problem.pains.map((pain) => (
            <motion.article
              key={pain.title}
              variants={revealUp}
              className="rounded-[1.5rem] border p-6 transition-colors duration-400 hover:border-[rgba(212,175,55,0.22)]"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ background: 'rgba(140,124,255,0.6)' }}
                />
                <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                  pain
                </span>
              </div>
              <h3 className="mt-3 font-display text-[17px] tracking-tight sm:text-[18px]" style={{ color: 'var(--text-1)' }}>
                {pain.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                {pain.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ConstructionSolution({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-solution"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-[400px] w-[700px] rounded-full blur-[180px] opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(107,163,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.solution.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.06]">
            {copy.solution.title}
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-2)' }}>
            {copy.solution.description}
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {copy.solution.steps.map((step) => (
            <motion.div
              key={step.index}
              variants={revealUp}
              className="flex items-start gap-5 rounded-2xl border p-5 sm:p-6"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <span
                className="shrink-0 font-display text-[26px] font-extralight"
                style={{ color: 'var(--text-4)' }}
              >
                {step.index}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[15px] tracking-tight sm:text-[16px]" style={{ color: 'var(--text-1)' }}>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ConstructionWorkflow({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-workflow"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.workflow.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.06]">
            {copy.workflow.title}
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-2)' }}>
            {copy.workflow.description}
          </p>
        </motion.div>

        <motion.div
          variants={revealUp}
          className="relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10"
          style={{
            borderColor: 'var(--line)',
            background:
              'linear-gradient(180deg, rgba(15,18,24,0.6) 0%, rgba(8,10,15,0.95) 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full blur-[120px] opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
          />
          <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {copy.workflow.nodes.map((node, idx) => (
              <div key={node.title} className="relative">
                <div
                  className="flex h-full flex-col rounded-2xl border p-5"
                  style={{
                    borderColor: idx % 2 === 0 ? 'rgba(212,175,55,0.16)' : 'var(--line)',
                    background: idx % 2 === 0 ? 'rgba(212,175,55,0.03)' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: 'var(--text-4)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ background: idx % 2 === 0 ? 'var(--gold)' : 'var(--accent)' }}
                    />
                  </div>
                  <h3
                    className="mt-3 font-display text-[16px] tracking-tight"
                    style={{ color: 'var(--text-1)' }}
                  >
                    {node.title}
                  </h3>
                  <p
                    className="mt-2 font-mono text-[11px] leading-snug"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {node.meta}
                  </p>
                </div>
                {idx < copy.workflow.nodes.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-10px] top-1/2 hidden h-px w-[18px] lg:block"
                    style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <p className="relative mt-7 text-center text-[12px] uppercase tracking-[0.24em]" style={{ color: 'var(--gold)' }}>
            {copy.workflow.footer}
          </p>
        </motion.div>

        <motion.div variants={revealUp} className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
          <AiQualifyMockup />
          <ContractMockup />
        </motion.div>
      </div>
    </motion.section>
  );
}

function ConstructionModules({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-modules"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.modules.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.06]">
            {copy.modules.title}
          </h2>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {copy.modules.items.map((module, idx) => (
            <motion.article
              key={module.name}
              variants={revealUp}
              className="group relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 hover:-translate-y-1"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-display text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: 'var(--text-4)' }}
                >
                  Module {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
              </div>
              <h3 className="mt-3 font-display text-[18px] tracking-tight sm:text-[19px]" style={{ color: 'var(--text-1)' }}>
                {module.name}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                {module.description}
              </p>
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, var(--gold), var(--accent-warm))' }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ConstructionBeforeAfter({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-before-after"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
            {copy.beforeAfter.eyebrow}
          </p>
          <h2 className="type-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.06]">
            {copy.beforeAfter.title}
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.div
            variants={revealLeft}
            className="rounded-[1.75rem] border p-6 sm:p-7"
            style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
                style={{ borderColor: 'var(--line)', color: 'var(--text-4)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(140,124,255,0.5)' }} />
                {copy.beforeAfter.beforeLabel}
              </span>
            </div>
            <ul className="mt-5 space-y-2.5">
              {copy.beforeAfter.before.map((row) => (
                <li key={row} className="flex items-start gap-3 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  <span
                    className="mt-1.5 inline-block h-1 w-3 shrink-0"
                    style={{ background: 'var(--text-4)' }}
                  />
                  {row}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={revealRight}
            className="relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-7"
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
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
                style={{ borderColor: 'rgba(212,175,55,0.32)', color: 'var(--gold)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                {copy.beforeAfter.afterLabel}
              </span>
            </div>
            <ul className="relative mt-5 space-y-2.5">
              {copy.beforeAfter.after.map((row) => (
                <li key={row} className="flex items-start gap-3 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  <span
                    className="mt-1.5 inline-block h-1 w-3 shrink-0"
                    style={{ background: 'var(--gold)' }}
                  />
                  {row}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function ConstructionCta({ copy }: { copy: ConstructionCopy }) {
  return (
    <motion.section
      id="construction-cta"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-50"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
          {copy.cta.eyebrow}
        </motion.p>
        <motion.h2 variants={revealUp} className="type-display mx-auto max-w-3xl text-[clamp(2rem,4.4vw,4rem)] leading-[1.04]">
          {copy.cta.title}
          <span className="mt-1 block text-gradient-hero">{copy.cta.titleAccent}</span>
        </motion.h2>
        <motion.p
          variants={revealUp}
          className="mx-auto mt-6 max-w-2xl type-body text-[15px] leading-relaxed sm:text-[17px]"
          style={{ color: 'var(--text-2)' }}
        >
          {copy.cta.description}
        </motion.p>
        <motion.div variants={revealUp} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={contactDetails.telegramDmUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 font-display text-[14px] tracking-tight transition-all duration-400"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.95) 0%, rgba(201,169,110,0.9) 100%)',
              color: '#0A0A0F',
              boxShadow: '0 12px 40px rgba(212,175,55,0.18)',
            }}
          >
            {copy.cta.primary}
          </a>
          <RouteLink
            to="/#contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full border px-9 py-4 font-display text-[14px] transition-all duration-500 hover:bg-white/[0.02]"
            style={{ color: 'var(--text-2)', borderColor: 'var(--line)' }}
          >
            {copy.cta.secondary}
            <span className="h-px w-6 transition-all duration-500 group-hover:w-12" style={{ background: 'var(--accent-warm)' }} />
          </RouteLink>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function ConstructionPage() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <main className="relative z-10">
      <ConstructionHero copy={copy} />
      <EclipseDivider />
      <ConstructionProblem copy={copy} />
      <ConstructionSolution copy={copy} />
      <EclipseDivider />
      <ConstructionWorkflow copy={copy} />
      <ConstructionModules copy={copy} />
      <EclipseDivider />
      <ConstructionBeforeAfter copy={copy} />
      <ConstructionCta copy={copy} />
    </main>
  );
}
