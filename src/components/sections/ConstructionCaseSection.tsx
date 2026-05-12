import { motion } from 'framer-motion';
import { revealUp, revealLeft, revealRight, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { RouteLink } from '../../lib/routing';
import { AiQualifyMockup, OrderCardMockup } from '../construction/mockups';

type Copy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  flow: string[];
  flowFooter: string;
  cta: string;
  ctaSub: string;
};

const COPY: Record<Locale, Copy> = {
  ru: {
    eyebrow: 'Пример отрасли · Стройка',
    title: 'Стройка живёт в Excel,',
    titleAccent: 'WhatsApp и звонках.',
    description:
      'Сайт принимает заявку. AI её структурирует. Менеджер видит готовую карточку. Логист — маршрут. Договор формируется и подписывается онлайн. Руководитель видит статус. Это не сайт — это контур исполнения заказа.',
    flow: [
      'Заявка с сайта',
      'AI структурирует данные',
      'Карточка в operator dashboard',
      'Маршрут водителю',
      'Договор + e-sign',
      'Отчёт руководителю',
    ],
    flowFooter: 'Один workflow вместо WhatsApp + Excel + звонков.',
    cta: 'Открыть полный демо-лендинг',
    ctaSub: 'Forge Construction Runtime — все 7 модулей, before/after, схема workflow',
  },
  en: {
    eyebrow: 'Industry example · Construction',
    title: 'Construction lives in Excel,',
    titleAccent: 'WhatsApp and phone calls.',
    description:
      'The site captures a lead. AI structures it. The manager sees a ready-made card. Logistics gets the route. The contract is generated and signed online. The owner sees the status. This is not a site — it is the order execution contour.',
    flow: [
      'Lead from the site',
      'AI structures the data',
      'Card in the operator dashboard',
      'Route to the driver',
      'Contract + e-sign',
      'Report to the owner',
    ],
    flowFooter: 'One workflow instead of WhatsApp + Excel + calls.',
    cta: 'Open the full demo landing',
    ctaSub: 'Forge Construction Runtime — all 7 modules, before/after, workflow diagram',
  },
};

export function ConstructionCaseSection() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <motion.section
      id="construction-case"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[10%] top-[10%] h-[380px] w-[820px] rounded-full blur-[180px] opacity-25"
          style={{ background: 'radial-gradient(ellipse, rgba(107,163,255,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <motion.div variants={revealLeft}>
            <p className="type-meta mb-5" style={{ color: 'var(--gold)' }}>
              {copy.eyebrow}
            </p>
            <h2 className="type-display text-[clamp(2rem,4vw,3.8rem)] leading-[1.04]">
              <span className="block">{copy.title}</span>
              <span className="block text-gradient-hero">{copy.titleAccent}</span>
            </h2>
            <p
              className="mt-6 type-body max-w-xl text-[15px] leading-relaxed sm:text-[17px]"
              style={{ color: 'var(--text-2)' }}
            >
              {copy.description}
            </p>

            <ol className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {copy.flow.map((step, idx) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-3"
                  style={{
                    borderColor: 'var(--line-subtle)',
                    background: 'rgba(15,18,24,0.4)',
                  }}
                >
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-display"
                    style={{
                      background: 'rgba(212,175,55,0.1)',
                      color: 'var(--gold)',
                      border: '1px solid rgba(212,175,55,0.2)',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13.5px] leading-snug" style={{ color: 'var(--text-2)' }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <p
              className="mt-5 text-[12px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--text-4)' }}
            >
              {copy.flowFooter}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <RouteLink
                to="/construction"
                className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 font-display text-[13px] tracking-tight transition-all duration-400"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.95) 0%, rgba(201,169,110,0.9) 100%)',
                  color: '#0A0A0F',
                  boxShadow: '0 12px 40px rgba(212,175,55,0.18)',
                }}
              >
                {copy.cta}
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: 'rgba(10,10,15,0.18)' }}
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </RouteLink>
              <span
                className="max-w-xs text-[12px] leading-snug"
                style={{ color: 'var(--text-4)' }}
              >
                {copy.ctaSub}
              </span>
            </div>
          </motion.div>

          <motion.div variants={revealRight} className="relative flex flex-col gap-4">
            <AiQualifyMockup />
            <OrderCardMockup />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
