import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { reachGoal } from '../../lib/metrika';

type Kind = 'demo' | 'real' | 'concept';
type Work = { kind: Kind; name: string; niche: string; text: string; tags: string[]; href: string; shot: string };

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  kinds: Record<Kind, string>;
  openDemo: string;
  openSite: string;
  works: Work[];
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Работы',
    title: 'Откройте и попробуйте.',
    description:
      'Живые демо: оставьте заявку как клиент — и сразу увидите панель владельца, куда она пришла. Компании в демо вымышленные. Ниже — настоящий проект и концепты.',
    kinds: { demo: 'Живое демо', real: 'Настоящий бизнес', concept: 'Концепт' },
    openDemo: 'Открыть демо',
    openSite: 'Открыть сайт',
    works: [
      {
        kind: 'demo',
        name: 'Дюна',
        niche: 'Гостевые домики',
        text: 'Подбор домика по датам и гостям, цена считается сразу, занятые даты выбрать нельзя.',
        tags: ['Бронь по датам', 'Расчёт цены', 'Панель владельца'],
        href: '/demos/guest-house/index.html',
        shot: 'guest-house',
      },
      {
        kind: 'demo',
        name: 'Отвес',
        niche: 'Ремонт квартир',
        text: 'Калькулятор ремонта по площади и виду работ; ориентир попадает в заявку на замер.',
        tags: ['Калькулятор', 'Заявка на замер', 'Панель владельца'],
        href: '/demos/renovation/index.html',
        shot: 'renovation',
      },
      {
        kind: 'demo',
        name: 'Северный бокс',
        niche: 'Автосервис',
        text: 'Онлайн-запись на свободное время, цены на услуги, подтверждение в мессенджер.',
        tags: ['Онлайн-запись', 'Свободные окна', 'Панель владельца'],
        href: '/demos/auto-service/index.html',
        shot: 'auto-service',
      },
      {
        kind: 'real',
        name: 'Вся в Зефире',
        niche: 'Кондитерская',
        text: 'Каталог, торты, сезонные коллекции и заказ в Telegram.',
        tags: ['Каталог', 'Заказ в Telegram', 'Карта доставки'],
        href: 'https://zefir.eclipse-forge.ru/',
        shot: 'zefir',
      },
      {
        kind: 'concept',
        name: 'Eclipse Premium Rent',
        niche: 'Прокат автомобилей',
        text: '27 машин с фото салона и пошаговое бронирование.',
        tags: ['Автопарк', 'Бронирование'],
        href: 'https://rent.eclipse-forge.ru/',
        shot: 'rent',
      },
      {
        kind: 'concept',
        name: 'Dark Roast',
        niche: 'Кофейня',
        text: 'Атмосферная главная, меню с демо-корзиной и бронь столика.',
        tags: ['Меню', 'Бронь столика'],
        href: 'https://coffee.eclipse-forge.ru/',
        shot: 'coffee',
      },
    ],
  },
  en: {
    eyebrow: 'Work',
    title: 'Open it and try it.',
    description:
      'Live demos: submit a request as a client and instantly see the owner panel it lands in. Demo companies are fictional. Below — a real project and concepts.',
    kinds: { demo: 'Live demo', real: 'Real business', concept: 'Concept' },
    openDemo: 'Open demo',
    openSite: 'Open site',
    works: [
      {
        kind: 'demo',
        name: 'Dyuna',
        niche: 'Guest cabins',
        text: 'Pick a cabin by dates and guests, price is calculated instantly, booked dates are blocked.',
        tags: ['Date booking', 'Price calc', 'Owner panel'],
        href: '/demos/guest-house/index.html',
        shot: 'guest-house',
      },
      {
        kind: 'demo',
        name: 'Otves',
        niche: 'Apartment renovation',
        text: 'Renovation calculator by area and type; the estimate goes straight into the request.',
        tags: ['Calculator', 'Survey request', 'Owner panel'],
        href: '/demos/renovation/index.html',
        shot: 'renovation',
      },
      {
        kind: 'demo',
        name: 'Northern Box',
        niche: 'Car service',
        text: 'Online booking of free slots, service prices, confirmation via messenger.',
        tags: ['Online booking', 'Free slots', 'Owner panel'],
        href: '/demos/auto-service/index.html',
        shot: 'auto-service',
      },
      {
        kind: 'real',
        name: 'Vsya v Zefire',
        niche: 'Confectionery',
        text: 'Catalog, cakes, seasonal collections and Telegram ordering.',
        tags: ['Catalog', 'Telegram orders', 'Delivery map'],
        href: 'https://zefir.eclipse-forge.ru/',
        shot: 'zefir',
      },
      {
        kind: 'concept',
        name: 'Eclipse Premium Rent',
        niche: 'Car rental',
        text: '27 cars with interior photos and step-by-step booking.',
        tags: ['Fleet', 'Booking'],
        href: 'https://rent.eclipse-forge.ru/',
        shot: 'rent',
      },
      {
        kind: 'concept',
        name: 'Dark Roast',
        niche: 'Coffee shop',
        text: 'Atmospheric home page, menu with demo cart and table booking.',
        tags: ['Menu', 'Table booking'],
        href: 'https://coffee.eclipse-forge.ru/',
        shot: 'coffee',
      },
    ],
  },
};

export function WorksSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <motion.section
      id="works"
      className="section-shell relative py-12 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      aria-labelledby="works-title"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 id="works-title" variants={revealUp} className="type-display text-[clamp(2rem,4vw,3.4rem)]">
          {copy.title}
        </motion.h2>
        <motion.p variants={revealUp} className="mt-5 max-w-2xl type-body text-[15px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
          {copy.description}
        </motion.p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.works.map((work) => {
            const external = work.href.startsWith('http');
            return (
              <motion.article
                key={work.href}
                variants={revealUp}
                className={`work-card flex flex-col overflow-hidden rounded-[1.6rem] border services-card${work.kind === 'demo' ? ' work-card--demo' : ' work-card--compact'}`}
              >
                <a
                  href={work.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="device-stage"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span className="device-laptop">
                    <span className="device-laptop__screen">
                      <img src={`/images/works/${work.shot}-desktop.webp`} alt="" width={1200} height={750} loading="lazy" decoding="async" />
                    </span>
                    <span className="device-laptop__base" />
                  </span>
                  <span className="device-phone">
                    <img src={`/images/works/${work.shot}-mobile.webp`} alt="" width={390} height={844} loading="lazy" decoding="async" />
                  </span>
                </a>
                <div className="work-card__body flex flex-1 flex-col p-5 pt-4 sm:p-6 sm:pt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="type-meta" style={{ color: work.kind === 'concept' ? 'var(--text-4)' : 'var(--gold)' }}>
                    {copy.kinds[work.kind]}
                  </p>
                  <p className="text-[12px]" style={{ color: 'var(--text-4)' }}>{work.niche}</p>
                </div>
                <h3 className="mt-3 font-display text-[1.3rem] font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                  {work.name}
                </h3>
                <p className="work-card__text mt-2 flex-1 text-[14px] leading-relaxed sm:mt-3" style={{ color: 'var(--text-2)' }}>
                  {work.text}
                </p>
                <ul className="mt-4 hidden flex-wrap gap-2 sm:flex">
                  {work.tags.map((tag) => (
                    <li key={tag} className="rounded-full border px-3 py-1 text-[11px] services-chip">{tag}</li>
                  ))}
                </ul>
                <a
                  href={work.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={`${work.kind === 'demo' ? copy.openDemo : copy.openSite}: ${work.name}`}
                  onClick={work.kind === 'demo' ? () => reachGoal('open_demo') : undefined}
                  className={`${work.kind === 'demo' ? 'case-link-primary' : 'case-link-secondary'} work-card__link mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em] sm:mt-6`}
                >
                  {work.kind === 'demo' ? copy.openDemo : copy.openSite} <span aria-hidden>{external ? '↗' : '→'}</span>
                </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
