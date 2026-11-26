import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';

type Item = { q: string; a: string };

const COPY: Record<Locale, { eyebrow: string; title: string; items: Item[] }> = {
  ru: {
    eyebrow: 'Вопросы',
    title: 'Коротко о главном.',
    items: [
      {
        q: 'Чем это отличается от обычного сайта?',
        a: 'Обычный сайт отправляет заявку в почту, дальше всё вручную. Система ведёт заявку дальше: карточка, статус, напоминания, отчёт. Можно начать с сайта и добавить систему позже — переделывать не придётся.',
      },
      {
        q: 'Сколько стоит и как формируется цена?',
        a: 'Стартовые цены — в тарифах выше. После созвона на 30 минут фиксируем состав, срок и сумму в смете. Дополнительные работы — только после вашего согласия.',
      },
      {
        q: 'Сколько занимает работа?',
        a: 'Срок зависит от состава и указывается в смете до начала работ. Сайт и система запускаются по частям: сначала то, что приносит заявки.',
      },
      {
        q: 'Кому будет принадлежать сайт и данные?',
        a: 'Вам. Домен оформляем на вас, код и доступы передаём, заявки хранятся у вас.',
      },
      {
        q: 'AI не будет ошибаться с клиентами?',
        a: 'AI готовит карточку, а решения с ценой ошибки остаются за человеком. Всё, что AI понял и сделал, записывается в журнал — это видно и проверяемо.',
      },
      {
        q: 'Можно работать удалённо?',
        a: 'Да, с любым городом. Созвоны, доступы и приёмка работ — онлайн.',
      },
    ],
  },
  en: {
    eyebrow: 'Questions',
    title: 'The short version.',
    items: [
      {
        q: 'How is this different from a regular site?',
        a: 'A regular site sends a lead to email and everything after is manual. A system carries the lead forward: card, status, reminders, report. You can start with a site and add the system later without a rebuild.',
      },
      {
        q: 'What does it cost?',
        a: 'Starting prices are in the packages above. After a 30-minute call we fix scope, timeline and price in an estimate. Extra work only with your approval.',
      },
      {
        q: 'How long does it take?',
        a: 'Timeline depends on scope and is stated in the estimate before work starts. Launch goes in stages: first what brings in leads.',
      },
      {
        q: 'Who owns the site and data?',
        a: 'You do. The domain is registered to you, code and access are handed over, leads are stored on your side.',
      },
      {
        q: 'Will AI make mistakes with clients?',
        a: 'AI prepares the card; decisions with a real cost of error stay with a person. Everything AI understood and did is logged and reviewable.',
      },
      {
        q: 'Can we work remotely?',
        a: 'Yes, with any city. Calls, access and acceptance all happen online.',
      },
    ],
  },
};

export function FaqSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <motion.section
      id="faq"
      className="section-shell relative py-12 sm:py-24 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      aria-labelledby="faq-title"
    >
      <div className="relative mx-auto max-w-[960px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 id="faq-title" variants={revealUp} className="type-display text-[clamp(2rem,4vw,3.4rem)]">
          {copy.title}
        </motion.h2>
        <motion.div variants={revealUp} className="mt-8 faq-list">
          {copy.items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
