import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';

type Work = { kind: 'real' | 'concept'; name: string; text: string; tags: string[]; href: string };

const COPY: Record<Locale, { eyebrow: string; title: string; description: string; real: string; concept: string; open: string; works: Work[] }> = {
  ru: {
    eyebrow: 'Работы',
    title: 'Сайты, которые можно открыть.',
    description: 'Один настоящий бизнес и концепты. В концептах заказы не принимаются — это демонстрация уровня.',
    real: 'Настоящий бизнес',
    concept: 'Концепт',
    open: 'Открыть сайт',
    works: [
      {
        kind: 'real',
        name: 'Вся в Зефире',
        text: 'Домашняя кондитерская: каталог, торты, сезонные коллекции и заказ в Telegram.',
        tags: ['Каталог', 'Заказ в Telegram', 'Карта доставки'],
        href: 'https://zefir.eclipse-forge.ru/',
      },
      {
        kind: 'concept',
        name: 'Eclipse Premium Rent',
        text: 'Прокат премиальных автомобилей: 27 машин с фото салона и пошаговое бронирование.',
        tags: ['Автопарк', 'Бронирование'],
        href: 'https://rent.eclipse-forge.ru/',
      },
      {
        kind: 'concept',
        name: 'Dark Roast',
        text: 'Кофейня: атмосферная главная, меню с демо-корзиной и бронь столика.',
        tags: ['Меню', 'Бронь столика'],
        href: 'https://coffee.eclipse-forge.ru/',
      },
    ],
  },
  en: {
    eyebrow: 'Work',
    title: 'Sites you can open.',
    description: 'One real business and concepts. Concepts do not accept orders — they show the level of work.',
    real: 'Real business',
    concept: 'Concept',
    open: 'Open site',
    works: [
      {
        kind: 'real',
        name: 'Vsya v Zefire',
        text: 'Home confectionery: catalog, cakes, seasonal collections and Telegram ordering.',
        tags: ['Catalog', 'Telegram orders', 'Delivery map'],
        href: 'https://zefir.eclipse-forge.ru/',
      },
      {
        kind: 'concept',
        name: 'Eclipse Premium Rent',
        text: 'Premium car rental: 27 cars with interior photos and step-by-step booking.',
        tags: ['Fleet', 'Booking'],
        href: 'https://rent.eclipse-forge.ru/',
      },
      {
        kind: 'concept',
        name: 'Dark Roast',
        text: 'Coffee shop: atmospheric home page, menu with demo cart and table booking.',
        tags: ['Menu', 'Table booking'],
        href: 'https://coffee.eclipse-forge.ru/',
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
      className="section-shell relative py-16 sm:py-24 lg:py-28"
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
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.works.map((work) => (
            <motion.article key={work.name} variants={revealUp} className="flex flex-col rounded-[1.6rem] border p-6 services-card">
              <p className="type-meta" style={{ color: work.kind === 'real' ? 'var(--gold)' : 'var(--text-4)' }}>
                {work.kind === 'real' ? copy.real : copy.concept}
              </p>
              <h3 className="mt-3 font-display text-[1.3rem] font-medium tracking-tight" style={{ color: 'var(--text-1)' }}>
                {work.name}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {work.text}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <li key={tag} className="rounded-full border px-3 py-1 text-[11px] services-chip">{tag}</li>
                ))}
              </ul>
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="case-link-secondary mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em]"
              >
                {copy.open} <span aria-hidden>↗</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
