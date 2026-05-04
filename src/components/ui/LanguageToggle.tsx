import { useLocale, type Locale } from '../../lib/locale';

const LABELS: Record<Locale, { group: string; button: string }> = {
  ru: {
    group: 'Язык интерфейса',
    button: 'Переключить язык интерфейса',
  },
  en: {
    group: 'Interface language',
    button: 'Change interface language',
  },
};

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const labels = LABELS[locale];

  return (
    <div
      role="group"
      aria-label={labels.group}
      className={`inline-flex items-center rounded-full border p-1 ${compact ? 'gap-1' : 'gap-1.5'}`}
      style={{ borderColor: 'var(--line)', background: 'var(--accent-soft)' }}
    >
      {(['ru', 'en'] as const).map((item) => {
        const active = locale === item;

        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            aria-label={`${labels.button}: ${item.toUpperCase()}`}
            onClick={() => setLocale(item)}
            className={`rounded-full px-3 py-1.5 text-[10px] font-display uppercase tracking-[0.22em] transition-all duration-300 ${compact ? 'min-w-[2.8rem]' : 'min-w-[3.1rem]'}`}
            style={{
              color: active ? 'var(--text-1)' : 'var(--text-4)',
              background: active ? 'rgba(107, 163, 255, 0.12)' : 'transparent',
              boxShadow: active ? '0 0 24px rgba(107, 163, 255, 0.12)' : 'none',
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
