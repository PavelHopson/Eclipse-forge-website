import { motion } from 'framer-motion';
import { useLocale, type Locale } from '../../lib/locale';

// Operator-dashboard styled mockup fragments reused by the construction
// case section on the landing and by the dedicated /construction page.
// Plain SVG + Tailwind, no images, no external deps — so it renders fast
// and looks identical in both contexts.

type OrderCardCopy = {
  status: string;
  orderTag: string;
  customer: string;
  customerName: string;
  product: string;
  productValue: string;
  volume: string;
  volumeValue: string;
  address: string;
  addressValue: string;
  window: string;
  windowValue: string;
  amount: string;
  amountValue: string;
  manager: string;
  signal: string;
  aiBadge: string;
  driver: string;
  driverName: string;
};

const ORDER_COPY: Record<Locale, OrderCardCopy> = {
  ru: {
    status: 'Готов к отгрузке',
    orderTag: 'ORD-2851 / WB-Spring',
    customer: 'Заказчик',
    customerName: 'СтройРесурс ООО',
    product: 'Материал',
    productValue: 'Бетон М-300, B22.5',
    volume: 'Объём',
    volumeValue: '12 м³',
    address: 'Адрес объекта',
    addressValue: 'Калининград, ул. Куйбышева, 87',
    window: 'Окно доставки',
    windowValue: 'Сегодня · 14:30–15:30',
    amount: 'Сумма',
    amountValue: '184 800 ₽',
    manager: 'Менеджер',
    signal: 'AI confidence 0.94',
    aiBadge: 'AI-обработка завершена',
    driver: 'Водитель',
    driverName: 'Иванов А. · 12-Т',
  },
  en: {
    status: 'Ready for dispatch',
    orderTag: 'ORD-2851 / WB-Spring',
    customer: 'Customer',
    customerName: 'StroyResurs LLC',
    product: 'Material',
    productValue: 'Concrete M-300, B22.5',
    volume: 'Volume',
    volumeValue: '12 m³',
    address: 'Site address',
    addressValue: 'Kaliningrad, Kuybysheva 87',
    window: 'Delivery window',
    windowValue: 'Today · 14:30–15:30',
    amount: 'Amount',
    amountValue: '184 800 ₽',
    manager: 'Manager',
    signal: 'AI confidence 0.94',
    aiBadge: 'AI processing complete',
    driver: 'Driver',
    driverName: 'A. Ivanov · 12-T',
  },
};

export function OrderCardMockup({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const c = ORDER_COPY[locale];

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] border ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'}`}
      style={{
        borderColor: 'var(--line)',
        background: 'linear-gradient(180deg, rgba(15,18,24,0.85) 0%, rgba(8,10,15,0.95) 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[60px] opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)' }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: 'rgba(74,230,160,0.22)', color: 'rgba(74,230,160,0.95)', background: 'rgba(74,230,160,0.05)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(74,230,160,0.95)' }} />
          {c.status}
        </span>
        <span
          className="font-display text-[10px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--text-4)' }}
        >
          {c.orderTag}
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <Field label={c.customer} value={c.customerName} />
        <Field label={c.amount} value={c.amountValue} accent />
        <Field label={c.product} value={c.productValue} />
        <Field label={c.volume} value={c.volumeValue} />
        <Field label={c.address} value={c.addressValue} wide />
        <Field label={c.window} value={c.windowValue} />
        {!compact ? <Field label={c.driver} value={c.driverName} /> : null}
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: 'var(--line-subtle)' }}>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--gold)' }}>
          <SparkleGlyph />
          <span>{c.aiBadge}</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
          {c.signal}
        </span>
      </div>
    </div>
  );
}

function Field({ label, value, accent, wide }: { label: string; value: string; accent?: boolean; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <p className="text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
        {label}
      </p>
      <p
        className="mt-1 font-display text-[14px] tracking-tight sm:text-[15px]"
        style={{ color: accent ? 'var(--gold)' : 'var(--text-1)' }}
      >
        {value}
      </p>
    </div>
  );
}

function SparkleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
      <path d="M5.5 5.5l3 3" />
      <path d="M15.5 15.5l3 3" />
      <path d="M5.5 18.5l3-3" />
      <path d="M15.5 8.5l3-3" />
    </svg>
  );
}

type AiQualifyCopy = {
  label: string;
  raw: string;
  parsed: Array<{ k: string; v: string }>;
  ready: string;
};

const AI_COPY: Record<Locale, AiQualifyCopy> = {
  ru: {
    label: 'AI quality',
    raw: '«Нужен бетон м300 кубов 12 на завтра примерно после обеда на куйбышева 87 калининград, оплата по счёту»',
    parsed: [
      { k: 'material', v: 'Бетон М-300, B22.5' },
      { k: 'volume_m3', v: '12' },
      { k: 'address', v: 'Калининград, ул. Куйбышева, 87' },
      { k: 'window', v: '2026-05-13 · 14:30–15:30' },
      { k: 'payment', v: 'по счёту' },
    ],
    ready: 'Карточка готова',
  },
  en: {
    label: 'AI quality',
    raw: '"Need concrete m300 12 cubes by tomorrow around afternoon at kuybysheva 87 kaliningrad pay by invoice"',
    parsed: [
      { k: 'material', v: 'Concrete M-300, B22.5' },
      { k: 'volume_m3', v: '12' },
      { k: 'address', v: 'Kaliningrad, Kuybysheva 87' },
      { k: 'window', v: '2026-05-13 · 14:30–15:30' },
      { k: 'payment', v: 'invoice' },
    ],
    ready: 'Card ready',
  },
};

export function AiQualifyMockup() {
  const { locale } = useLocale();
  const c = AI_COPY[locale];

  return (
    <div
      className="relative overflow-hidden rounded-[1.5rem] border p-5 sm:p-6"
      style={{
        borderColor: 'var(--line)',
        background: 'linear-gradient(180deg, rgba(12,17,23,0.7) 0%, rgba(8,10,15,0.95) 100%)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9.5px] uppercase tracking-[0.22em]" style={{ borderColor: 'rgba(212,175,55,0.28)', color: 'var(--gold)' }}>
          <SparkleGlyph />
          {c.label}
        </span>
      </div>
      <p
        className="mt-3 rounded-2xl border px-3 py-2.5 font-mono text-[12px] leading-snug"
        style={{
          borderColor: 'var(--line-subtle)',
          background: 'rgba(255,255,255,0.015)',
          color: 'var(--text-3)',
        }}
      >
        {c.raw}
      </p>
      <div className="mt-3 flex items-center justify-center" style={{ color: 'var(--text-4)' }}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14" />
          <path d="M6 13l6 6 6-6" />
        </svg>
      </div>
      <div
        className="mt-3 rounded-2xl border p-3 font-mono text-[12px]"
        style={{ borderColor: 'rgba(212,175,55,0.18)', background: 'rgba(212,175,55,0.04)' }}
      >
        <span className="block" style={{ color: 'var(--text-4)' }}>{'{'}</span>
        {c.parsed.map((row, i) => (
          <span key={row.k} className="block pl-3" style={{ color: 'var(--text-2)' }}>
            <span style={{ color: 'var(--accent)' }}>&quot;{row.k}&quot;</span>: <span style={{ color: 'var(--gold)' }}>&quot;{row.v}&quot;</span>
            {i < c.parsed.length - 1 ? ',' : ''}
          </span>
        ))}
        <span className="block" style={{ color: 'var(--text-4)' }}>{'}'}</span>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--gold)' }}>
        ✓ {c.ready}
      </p>
    </div>
  );
}

type LogisticsCopy = {
  title: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  driver: string;
  driverName: string;
  truck: string;
  truckId: string;
  eta: string;
  etaValue: string;
  km: string;
  kmValue: string;
};

const LOGISTICS_COPY: Record<Locale, LogisticsCopy> = {
  ru: {
    title: 'Маршрут отправлен водителю',
    origin: 'База',
    originName: 'СтройРесурс · Завод-2',
    destination: 'Объект',
    destinationName: 'ул. Куйбышева, 87',
    driver: 'Водитель',
    driverName: 'А. Иванов',
    truck: 'Машина',
    truckId: 'КамАЗ 12-Т · 38М-7',
    eta: 'ETA',
    etaValue: '14:42',
    km: 'Дистанция',
    kmValue: '8.4 км',
  },
  en: {
    title: 'Route dispatched to driver',
    origin: 'Depot',
    originName: 'StroyResurs · Plant 2',
    destination: 'Site',
    destinationName: 'Kuybysheva 87',
    driver: 'Driver',
    driverName: 'A. Ivanov',
    truck: 'Truck',
    truckId: 'KamAZ 12-T · 38M-7',
    eta: 'ETA',
    etaValue: '14:42',
    km: 'Distance',
    kmValue: '8.4 km',
  },
};

export function LogisticsMockup() {
  const { locale } = useLocale();
  const c = LOGISTICS_COPY[locale];

  return (
    <div
      className="relative overflow-hidden rounded-[1.5rem] border p-5 sm:p-6"
      style={{
        borderColor: 'var(--line)',
        background: 'linear-gradient(180deg, rgba(12,17,23,0.7) 0%, rgba(8,10,15,0.95) 100%)',
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
        {c.title}
      </p>

      <svg viewBox="0 0 280 80" className="mt-4 h-20 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(107,163,255,0.6)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0.85)" />
          </linearGradient>
        </defs>
        <line x1="22" y1="40" x2="258" y2="40" stroke="rgba(28,37,54,0.85)" strokeWidth="1.4" strokeDasharray="3 4" />
        <path d="M 22 40 Q 100 12 160 40 T 258 40" fill="none" stroke="url(#route)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="40" r="6" fill="rgba(107,163,255,0.9)" />
        <circle cx="22" cy="40" r="11" fill="none" stroke="rgba(107,163,255,0.35)" strokeWidth="1" />
        <circle cx="258" cy="40" r="6" fill="rgba(212,175,55,0.95)" />
        <circle cx="258" cy="40" r="11" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
        <motion.circle
          cx="22"
          cy="40"
          r="3"
          fill="rgba(245,245,240,0.95)"
          initial={{ opacity: 0 }}
          animate={{ cx: [22, 258], opacity: [1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
        <RouteField label={c.origin} value={c.originName} />
        <RouteField label={c.destination} value={c.destinationName} accent />
        <RouteField label={c.driver} value={c.driverName} />
        <RouteField label={c.truck} value={c.truckId} />
        <RouteField label={c.km} value={c.kmValue} />
        <RouteField label={c.eta} value={c.etaValue} accent />
      </div>
    </div>
  );
}

function RouteField({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
        {label}
      </p>
      <p
        className="mt-0.5 font-display text-[13px] tracking-tight"
        style={{ color: accent ? 'var(--gold)' : 'var(--text-1)' }}
      >
        {value}
      </p>
    </div>
  );
}

type ContractCopy = {
  title: string;
  doc: string;
  partyLabel: string;
  partyA: string;
  partyB: string;
  subject: string;
  subjectValue: string;
  status: string;
  statusValue: string;
  signedAt: string;
  signedValue: string;
};

const CONTRACT_COPY: Record<Locale, ContractCopy> = {
  ru: {
    title: 'Договор сгенерирован и подписан',
    doc: 'ДОГОВОР № 2851/2026',
    partyLabel: 'Стороны',
    partyA: 'СтройРесурс ООО',
    partyB: 'Заказчик · ИНН 39000xxxxxxx',
    subject: 'Предмет',
    subjectValue: 'Поставка бетона М-300, 12 м³',
    status: 'Статус',
    statusValue: 'Подписан электронно',
    signedAt: 'Дата подписи',
    signedValue: '2026-05-12 · 13:48',
  },
  en: {
    title: 'Contract generated and signed',
    doc: 'CONTRACT № 2851/2026',
    partyLabel: 'Parties',
    partyA: 'StroyResurs LLC',
    partyB: 'Customer · INN 39000xxxxxxx',
    subject: 'Subject',
    subjectValue: 'Concrete M-300 supply, 12 m³',
    status: 'Status',
    statusValue: 'Signed electronically',
    signedAt: 'Signed at',
    signedValue: '2026-05-12 · 13:48',
  },
};

export function ContractMockup() {
  const { locale } = useLocale();
  const c = CONTRACT_COPY[locale];

  return (
    <div
      className="relative overflow-hidden rounded-[1.5rem] border p-5 sm:p-6"
      style={{
        borderColor: 'var(--line)',
        background: 'linear-gradient(180deg, rgba(12,17,23,0.7) 0%, rgba(8,10,15,0.95) 100%)',
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
        {c.title}
      </p>
      <div
        className="mt-3 rounded-2xl border p-4"
        style={{ borderColor: 'rgba(212,175,55,0.2)', background: 'rgba(212,175,55,0.03)' }}
      >
        <p className="text-center font-display text-[11px] uppercase tracking-[0.3em]" style={{ color: 'var(--gold)' }}>
          {c.doc}
        </p>
        <div className="mt-3 space-y-2 text-[12px]" style={{ color: 'var(--text-3)' }}>
          <Row label={c.partyLabel} value={`${c.partyA}, ${c.partyB}`} />
          <Row label={c.subject} value={c.subjectValue} />
          <Row label={c.status} value={c.statusValue} accent />
          <Row label={c.signedAt} value={c.signedValue} />
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-3 text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: 'var(--line-subtle)' }}>
          <span style={{ color: 'var(--text-4)' }}>e-sign · embedded</span>
          <span className="inline-flex items-center gap-1.5" style={{ color: 'rgba(74,230,160,0.95)' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(74,230,160,0.95)' }} />
            verified
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-[88px] shrink-0 text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
        {label}
      </span>
      <span
        className="flex-1 text-[12px] leading-snug"
        style={{ color: accent ? 'var(--gold)' : 'var(--text-2)' }}
      >
        {value}
      </span>
    </div>
  );
}
