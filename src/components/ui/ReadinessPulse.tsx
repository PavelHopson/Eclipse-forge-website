import { useMemo, useState } from 'react';

type ReadinessItem = { title: string; text: string };
type ReadinessPulseProps = { items: ReadinessItem[]; locale: 'ru' | 'en' };

const interfaceCopy = {
  ru: {
    label: '\u0411\u044b\u0441\u0442\u0440\u0430\u044f \u0441\u0430\u043c\u043e\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430', progress: '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u043e',
    empty: '\u041e\u0442\u043c\u0435\u0442\u044c\u0442\u0435 \u043f\u0443\u043d\u043a\u0442\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0443\u0436\u0435 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u044b \u0444\u0430\u043a\u0442\u0430\u043c\u0438.',
    ready: '\u0411\u0430\u0437\u043e\u0432\u044b\u0439 \u043a\u043e\u043d\u0442\u0443\u0440 \u0437\u0430\u043a\u0440\u044b\u0442. \u0422\u0435\u043f\u0435\u0440\u044c \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0434\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430 \u043f\u043e \u043f\u043e\u043b\u043d\u043e\u043c\u0443 \u0447\u0435\u043a-\u043b\u0438\u0441\u0442\u0443.', reset: '\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c',
  },
  en: {
    label: 'Quick self-check', progress: 'Confirmed',
    empty: 'Mark the items that are already backed by evidence.',
    ready: 'The baseline is covered. Now verify the evidence with the full checklist.', reset: 'Reset',
  },
} as const;

export function ReadinessPulse({ items, locale }: ReadinessPulseProps) {
  const [selected, setSelected] = useState<boolean[]>(() => items.map(() => false));
  const copy = interfaceCopy[locale];
  const completed = useMemo(() => selected.filter(Boolean).length, [selected]);
  const progress = items.length === 0 ? 0 : completed / items.length;
  const isReady = completed === items.length && items.length > 0;

  return (
    <div className="h-full" style={{ background: 'rgba(255,255,255,.01)' }}>
      <div className="border-b px-6 py-5 sm:px-9" style={{ borderColor: 'var(--line)' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="type-meta" style={{ color: 'var(--text-2)' }}>{copy.label}</p>
            <p className="mt-2 max-w-md text-[12px] leading-5" style={{ color: isReady ? 'var(--gold)' : 'var(--text-4)' }} aria-live="polite">
              {isReady ? copy.ready : `${copy.progress}: ${completed}/${items.length}. ${copy.empty}`}
            </p>
          </div>
          {completed > 0 ? <button type="button" onClick={() => setSelected(items.map(() => false))} className="min-h-10 shrink-0 rounded-full border px-4 text-[10px] uppercase tracking-[.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ borderColor: 'var(--line)', color: 'var(--text-3)', outlineColor: 'var(--gold)' }}>{copy.reset}</button> : null}
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full" style={{ background: 'var(--line)' }} aria-hidden="true">
          <span className="block h-full origin-left motion-safe:transition-transform motion-safe:duration-500" style={{ transform: `scaleX(${progress})`, background: 'linear-gradient(90deg, var(--accent), var(--gold))' }} />
        </div>
      </div>
      <ol>
        {items.map((item, index) => {
          const isSelected = selected[index];
          return <li key={item.title} className="border-b last:border-b-0" style={{ borderColor: 'var(--line)' }}>
            <button type="button" onClick={() => setSelected((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} aria-pressed={isSelected} className="grid min-h-[88px] w-full grid-cols-[44px_1fr] gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:grid-cols-[56px_1fr] sm:px-9 sm:py-6" style={{ outlineColor: 'var(--gold)' }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs transition-colors" style={{ borderColor: isSelected ? 'var(--gold)' : 'var(--line)', background: isSelected ? 'rgba(212,175,55,.12)' : 'transparent', color: isSelected ? 'var(--gold)' : 'var(--text-4)' }} aria-hidden="true">{isSelected ? '\u2713' : `0${index + 1}`}</span>
              <span><span className="block font-display text-base" style={{ color: 'var(--text-1)' }}>{item.title}</span><span className="mt-1 block text-[13px] leading-6" style={{ color: 'var(--text-3)' }}>{item.text}</span></span>
            </button>
          </li>;
        })}
      </ol>
    </div>
  );
}
