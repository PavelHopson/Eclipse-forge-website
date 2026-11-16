import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { RouteLink } from '../../lib/routing';

type Field = { key: string; label: string; value: string };

type Preset = { id: string; label: string; text: string };

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  inputLabel: string;
  presetsLabel: string;
  cardTitle: string;
  missingLabel: string;
  missingNone: string;
  readyLabel: string;
  incompleteLabel: string;
  honesty: string;
  caseLink: string;
  presets: Preset[];
  labels: Record<string, string>;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Демо · попробуйте сами',
    title: 'Напишите заявку как клиент. Получите карточку как менеджер.',
    description:
      'Клиенты пишут одной строкой и вразнобой. Система раскладывает сообщение по полям и сразу видит, чего не хватает, — менеджеру не нужно переспрашивать.',
    inputLabel: 'Сообщение клиента',
    presetsLabel: 'Примеры',
    cardTitle: 'Карточка заявки',
    missingLabel: 'Уточнить у клиента',
    missingNone: 'Всё есть — можно брать в работу',
    readyLabel: 'Готово к работе',
    incompleteLabel: 'Нужно уточнение',
    honesty:
      'Демо работает прямо в браузере по простым правилам и никуда не отправляет текст. В реальной системе сообщение разбирает AI с проверкой человеком.',
    caseLink: 'Полный пример для строительной компании',
    presets: [
      {
        id: 'build',
        label: 'Стройка',
        text: 'Нужен бетон м300 кубов 12 на завтра после обеда на Центральную 87, оплата по счёту. Сергей +7 921 555-12-34',
      },
      {
        id: 'stay',
        label: 'Гостевой дом',
        text: 'Здравствуйте, хотим домик на 2 взрослых и ребёнка с 14.07 по 17.07, можно с собакой? Анна',
      },
      {
        id: 'repair',
        label: 'Ремонт',
        text: 'Ремонт ванной под ключ, примерно 5 м², бюджет до 250 тыс, когда сможете приехать на замер? 89115550000',
      },
    ],
    labels: {
      request: 'Что нужно',
      amount: 'Объём',
      date: 'Когда',
      address: 'Адрес',
      guests: 'Гости',
      budget: 'Бюджет / оплата',
      name: 'Имя',
      phone: 'Телефон',
    },
  },
  en: {
    eyebrow: 'Demo · try it yourself',
    title: 'Write a request like a client. Get a card like a manager.',
    description:
      'Clients write in one messy line. The system splits the message into fields and instantly sees what is missing, so the manager does not have to ask again.',
    inputLabel: 'Client message',
    presetsLabel: 'Examples',
    cardTitle: 'Lead card',
    missingLabel: 'Ask the client',
    missingNone: 'Everything is here — ready to work',
    readyLabel: 'Ready to work',
    incompleteLabel: 'Needs follow-up',
    honesty:
      'The demo runs in your browser on simple rules and sends the text nowhere. In a real system the message is processed by AI with human review.',
    caseLink: 'Full example for a construction company',
    presets: [
      {
        id: 'build',
        label: 'Construction',
        text: 'Нужен бетон м300 кубов 12 на завтра после обеда на Центральную 87, оплата по счёту. Сергей +7 921 555-12-34',
      },
      {
        id: 'stay',
        label: 'Guest house',
        text: 'Здравствуйте, хотим домик на 2 взрослых и ребёнка с 14.07 по 17.07, можно с собакой? Анна',
      },
      {
        id: 'repair',
        label: 'Renovation',
        text: 'Ремонт ванной под ключ, примерно 5 м², бюджет до 250 тыс, когда сможете приехать на замер? 89115550000',
      },
    ],
    labels: {
      request: 'Request',
      amount: 'Volume',
      date: 'When',
      address: 'Address',
      guests: 'Guests',
      budget: 'Budget / payment',
      name: 'Name',
      phone: 'Phone',
    },
  },
};

const STOP_NAMES = new Set(['Здравствуйте', 'Добрый', 'Привет', 'Нужен', 'Нужна', 'Нужно', 'Ремонт', 'Хотим', 'Хочу', 'Можно']);

function first(text: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return (match[1] ?? match[0]).trim();
  }
  return '';
}

/** Rule-based parser: deliberately simple, runs locally, no network. */
export function parseLead(raw: string): Record<string, string> {
  const text = raw.replace(/\s+/g, ' ').trim();
  const phoneMatch = text.match(/(?:\+7|8)[\s(-]*\d{3}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}/);
  const phone = phoneMatch ? phoneMatch[0].replace(/[^\d+]/g, '') : '';

  const date = first(text, [
    /(с\s*\d{1,2}[./]\d{1,2}(?:[./]\d{2,4})?\s*по\s*\d{1,2}[./]\d{1,2}(?:[./]\d{2,4})?)/i,
    /((?:на\s+)?(?:сегодня|завтра|послезавтра)(?:\s+(?:утром|днём|вечером|после обеда|до обеда))?)/i,
    /(\d{1,2}[./]\d{1,2}(?:[./]\d{2,4})?)/,
    /(в\s+(?:понедельник|вторник|среду|четверг|пятницу|субботу|воскресенье))/i,
  ]).replace(/^на\s+/i, '');

  // JS `\w` does not match Cyrillic, so word tails use [а-яё]*.
  const area = first(text, [/(\d+(?:[.,]\d+)?\s*(?:м²|кв\.?\s*м|квадрат[а-яё]*))/i]);
  const cubic = first(text, [
    // number must not be glued to a word: «м300 кубов 12» is grade M300, volume 12
    /(?<![А-Яа-яЁёA-Za-z\d])(\d+(?:[.,]\d+)?)\s*(?:кубов|куба|кубометр[а-яё]*|м³)/i,
    /(?:кубов|куба|кубометр[а-яё]*)\s*(\d+(?:[.,]\d+)?)/i,
  ]);
  const pieces = first(text, [/(\d+(?:[.,]\d+)?\s*(?:тонн[а-яё]*|шт[а-яё.]*))/i]);
  const amountNormalized = area || (cubic ? `${cubic} м³` : '') || pieces;

  const address = first(text, [
    /((?:ул\.?|улица|пр\.?|проспект|пер\.?|переулок)\s*[А-ЯЁA-Z][\wА-Яа-яЁё-]*\s*,?\s*\d+[а-я]?)/,
    /на\s+([А-ЯЁ][а-яё]+(?:ую|ой|ая)\s+\d+[а-я]?)/,
  ]);

  const guests = first(text, [
    /(\d+\s*(?:взросл[а-яё]*|человек[а-яё]*|гост[а-яё]*)(?:\s*(?:и|\+)\s*(?:\d+\s*)?(?:ребён[а-яё]*|ребен[а-яё]*|дет[а-яё]*))?)/i,
  ]);

  const budget = first(text, [
    /(бюджет\s*(?:до|около|примерно)?\s*\d[\d\s]*(?:тыс\.?|₽|руб[а-яё.]*)?)/i,
    /(оплата\s+[^,.!?]+)/i,
  ]);

  const nameCandidates = [...text.matchAll(/(?:^|[,.!?]\s*|\s)([А-ЯЁ][а-яё]{2,12})(?=\s*(?:[,.!?]|\+7|8[\s(\d]|$))/g)]
    .map((match) => match[1])
    .filter((word) => !STOP_NAMES.has(word));
  const name = nameCandidates.at(-1) ?? '';

  const request = first(text, [
    /(?:нужен|нужна|нужно|нужны|хотим|хочу|интересует)\s+([^,.!?]+?)(?=\s+(?:на|с|кубов|\d)|[,.!?]|$)/i,
    /^((?:ремонт|замер|доставка|бронь)[^,.!?]*)/i,
  ]);

  return {
    request,
    amount: amountNormalized,
    date,
    address,
    guests,
    budget,
    name,
    phone,
  };
}

const REQUIRED = ['request', 'date', 'name', 'phone'];

export function LeadDemoSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];
  const [text, setText] = useState(copy.presets[0].text);

  const parsed = useMemo(() => parseLead(text), [text]);
  const fields: Field[] = Object.entries(parsed)
    .filter(([key, value]) => value || REQUIRED.includes(key))
    .map(([key, value]) => ({ key, label: copy.labels[key], value }));
  const missing = REQUIRED.filter((key) => !parsed[key]).map((key) => copy.labels[key]);
  const ready = missing.length === 0;

  return (
    <motion.section
      id="demo"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      aria-labelledby="lead-demo-title"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
          {copy.eyebrow}
        </motion.p>
        <motion.h2 id="lead-demo-title" variants={revealUp} className="type-display max-w-[20ch] text-[clamp(2rem,4vw,3.5rem)]">
          {copy.title}
        </motion.h2>
        <motion.p variants={revealUp} className="mt-5 max-w-2xl type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
          {copy.description}
        </motion.p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <motion.div variants={revealUp} className="rounded-[1.6rem] border p-6 sm:p-7 contact-panel">
            <label htmlFor="lead-demo-input" className="type-meta" style={{ color: 'var(--text-3)' }}>
              {copy.inputLabel}
            </label>
            <textarea
              id="lead-demo-input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={5}
              maxLength={600}
              className="contact-field mt-3 w-full resize-y rounded-[0.95rem] border px-4 py-3 text-[15px] leading-relaxed outline-none"
            />
            <p className="type-meta mt-5 mb-3" style={{ color: 'var(--text-4)' }}>
              {copy.presetsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {copy.presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setText(preset.text)}
                  aria-pressed={text === preset.text}
                  className="lead-demo-chip min-h-11 rounded-full border px-4 text-[13px]"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-[12px] leading-relaxed" style={{ color: 'var(--text-4)' }}>
              {copy.honesty}
            </p>
          </motion.div>

          <motion.div variants={revealUp} className="rounded-[1.6rem] border p-6 sm:p-7 services-card" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="type-meta" style={{ color: 'var(--gold)' }}>{copy.cardTitle}</p>
              <span className={`lead-demo-status${ready ? ' lead-demo-status--ready' : ''}`}>
                {ready ? copy.readyLabel : copy.incompleteLabel}
              </span>
            </div>
            <dl className="lead-demo-fields mt-5">
              {fields.map((field) => (
                <div key={field.key} className="lead-demo-field">
                  <dt>{field.label}</dt>
                  <dd className={field.value ? undefined : 'lead-demo-field__empty'}>{field.value || '—'}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-2xl border px-4 py-4 services-panel">
              <p className="type-meta mb-2" style={{ color: 'var(--text-4)' }}>{copy.missingLabel}</p>
              <p className="text-[14px]" style={{ color: ready ? 'var(--text-2)' : 'var(--gold)' }}>
                {ready ? copy.missingNone : missing.join(', ')}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={revealUp} className="mt-6">
          <RouteLink
            to="/construction"
            className="case-link-secondary inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em]"
          >
            {copy.caseLink}
            <span aria-hidden>→</span>
          </RouteLink>
        </motion.div>
      </div>
    </motion.section>
  );
}
