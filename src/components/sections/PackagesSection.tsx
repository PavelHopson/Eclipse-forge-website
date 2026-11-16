import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { usePriceModal } from '../../lib/priceModal';

type Package = {
  id: 'site' | 'crm' | 'ai';
  name: string;
  price: string;
  forWhom: string;
  includes: string[];
  featured?: boolean;
};

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  includesLabel: string;
  choose: string;
  featuredLabel: string;
  supportTitle: string;
  supportText: string;
  supportPrice: string;
  smallTitle: string;
  smallText: string;
  smallLink: string;
  fullPrice: string;
  note: string;
  packages: Package[];
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Тарифы',
    title: 'Три уровня. Цены открыто.',
    description:
      'Начните с сайта и добавляйте систему, когда заявок станет больше, чем успевают разобрать руками. Точную смету фиксируем после созвона на 30 минут.',
    includesLabel: 'Что входит',
    choose: 'Обсудить этот тариф',
    featuredLabel: 'Чаще выбирают',
    supportTitle: 'Сопровождение',
    supportText: 'Хостинг, правки, проверка заявок и отчёт раз в месяц.',
    supportPrice: 'от 3 000 ₽ / мес',
    smallTitle: 'Нужен только простой лендинг?',
    smallText: 'Готовые лендинги от 9 900 ₽ за 1–3 дня делает наша студия Romark.',
    smallLink: 'Открыть Romark',
    fullPrice: 'Полный прайс',
    note: 'Все цены — стартовые. Состав и срок фиксируем в смете до начала работ.',
    packages: [
      {
        id: 'site',
        name: 'Сайт с заявками',
        price: 'от 30 000 ₽',
        forWhom: 'Вам нужен сайт, которому доверяют, и заявки без потерь.',
        includes: [
          'Дизайн под ваш бренд, без шаблона',
          'Мобильная версия и быстрая загрузка',
          'Заявки в Telegram, MAX или на почту',
          'Яндекс Метрика и цели на заявки',
          'Домен оформляем на вас',
          'Сопровождение — 3 000 ₽/мес: хостинг, правки, заявки',
        ],
      },
      {
        id: 'crm',
        name: 'Сайт + система заявок',
        price: 'от 70 000 ₽',
        forWhom: 'Заявок много, и они теряются между мессенджерами и таблицами.',
        includes: [
          'Всё из «Сайта с заявками»',
          'Кабинет менеджера: каждая заявка — карточка со статусом',
          'Напоминания, если заявку не взяли в работу',
          'Отчёт руководителю: сколько пришло, сколько закрыто',
          'Передача в вашу CRM, если она уже есть',
        ],
        featured: true,
      },
      {
        id: 'ai',
        name: 'AI-обработка заявок',
        price: 'от 50 000 ₽',
        forWhom: 'Клиенты пишут как придётся, а менеджер тратит время на переспрашивание.',
        includes: [
          'AI разбирает сообщение клиента в готовую карточку',
          'Уточняющие вопросы, если данных не хватает',
          'Правила и проверка человеком там, где цена ошибки высокая',
          'Подключается к новому или уже работающему сайту',
          'Журнал: что AI понял и что сделал',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Packages',
    title: 'Three levels. Open pricing.',
    description:
      'Start with a site and add the system once leads outgrow manual handling. The exact estimate is fixed after a 30-minute call.',
    includesLabel: 'Included',
    choose: 'Discuss this package',
    featuredLabel: 'Most chosen',
    supportTitle: 'Ongoing support',
    supportText: 'Hosting, edits, lead checks and a monthly report.',
    supportPrice: 'from 3 000 ₽ / mo',
    smallTitle: 'Need just a simple landing page?',
    smallText: 'Ready-made landings from 9 900 ₽ in 1–3 days are made by our Romark studio.',
    smallLink: 'Open Romark',
    fullPrice: 'Full price list',
    note: 'All prices are starting prices. Scope and timeline are fixed in the estimate before work starts.',
    packages: [
      {
        id: 'site',
        name: 'Site with leads',
        price: 'from 30 000 ₽',
        forWhom: 'You need a site people trust and leads that never get lost.',
        includes: [
          'Custom design for your brand, no template',
          'Mobile version and fast loading',
          'Leads to Telegram, MAX or email',
          'Yandex Metrica with lead goals',
          'Domain registered to you',
          'Support — 3 000 ₽/mo: hosting, edits, leads',
        ],
      },
      {
        id: 'crm',
        name: 'Site + lead system',
        price: 'from 70 000 ₽',
        forWhom: 'Plenty of leads, and they get lost between messengers and spreadsheets.',
        includes: [
          'Everything in «Site with leads»',
          'Manager workspace: every lead is a card with a status',
          'Reminders when a lead is not picked up',
          'Owner report: how many came in, how many closed',
          'Hand-off to your CRM if you already have one',
        ],
        featured: true,
      },
      {
        id: 'ai',
        name: 'AI lead processing',
        price: 'from 50 000 ₽',
        forWhom: 'Clients write however they like, and managers waste time asking again.',
        includes: [
          'AI turns a client message into a ready card',
          'Follow-up questions when data is missing',
          'Rules and human review where mistakes are costly',
          'Works with a new or an existing site',
          'Log of what AI understood and did',
        ],
      },
    ],
  },
};

export const PACKAGE_EVENT = 'ef:choose-package';

function choosePackage(id: Package['id']) {
  window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: id }));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || document.documentElement.dataset.ambientMotion === 'paused';
  document.getElementById('contact')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  window.setTimeout(() => document.getElementById('cta-name')?.focus({ preventScroll: true }), reduced ? 0 : 700);
}

export function PackagesSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];
  const { setOpen: setPriceOpen } = usePriceModal();

  return (
    <motion.section
      id="services"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      aria-labelledby="packages-title"
    >
      <div className="absolute inset-0 services-atmosphere-bg" />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 id="packages-title" variants={revealUp} className="type-display max-w-[16ch] text-[clamp(2.2rem,4.5vw,4rem)]">
          {copy.title}
        </motion.h2>
        <motion.p variants={revealUp} className="mt-5 max-w-2xl type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
          {copy.description}
        </motion.p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {copy.packages.map((pkg) => (
            <motion.article
              key={pkg.id}
              variants={revealUp}
              className={`package-card relative flex flex-col rounded-[1.6rem] border p-6 sm:p-7 services-card${pkg.featured ? ' package-card--featured' : ''}`}
            >
              {pkg.featured ? <p className="package-card__badge type-meta">{copy.featuredLabel}</p> : null}
              <h3 className="font-display text-[1.35rem] font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                {pkg.name}
              </h3>
              <p className="mt-3 font-display text-[1.9rem] font-medium tracking-tight" style={{ color: 'var(--gold)' }}>
                {pkg.price}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {pkg.forWhom}
              </p>
              <p className="type-meta mt-6 mb-3" style={{ color: 'var(--text-4)' }}>
                {copy.includesLabel}
              </p>
              <ul className="package-card__list flex-1">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => choosePackage(pkg.id)}
                className={`mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-3 text-[13px] font-display tracking-[0.03em] transition-colors ${pkg.featured ? 'case-link-primary' : 'case-link-secondary'}`}
              >
                {copy.choose}
                <span aria-hidden>→</span>
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <motion.div variants={revealUp} className="rounded-[1.4rem] border px-6 py-5 services-panel">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-display text-[16px] tracking-tight" style={{ color: 'var(--text-1)' }}>{copy.supportTitle}</p>
              <p className="font-display text-[16px]" style={{ color: 'var(--gold)' }}>{copy.supportPrice}</p>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--text-3)' }}>{copy.supportText}</p>
          </motion.div>
          <motion.div variants={revealUp} className="rounded-[1.4rem] border px-6 py-5 services-panel">
            <p className="font-display text-[16px] tracking-tight" style={{ color: 'var(--text-1)' }}>{copy.smallTitle}</p>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
              {copy.smallText}{' '}
              <a href="https://romark.site/" target="_blank" rel="noreferrer" className="package-inline-link">
                {copy.smallLink} ↗
              </a>
            </p>
          </motion.div>
        </div>

        <motion.div variants={revealUp} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px]" style={{ color: 'var(--text-4)' }}>{copy.note}</p>
          <button
            type="button"
            onClick={() => setPriceOpen(true)}
            className="case-link-secondary inline-flex min-h-11 items-center gap-2 self-start rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em]"
          >
            {copy.fullPrice}
            <span aria-hidden>→</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
