import { AnimatePresence, motion } from 'framer-motion';
import { useTheme, type ThemeMode } from '../../lib/theme';

/**
 * 3-state theme toggle: AUTO → LIGHT → DARK → AUTO
 * - AUTO uses time of day (06:00-18:00 = light)
 * - Icon reflects current mode
 * - Tooltip shows current resolved theme
 */

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function AutoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      {/* Half-moon split: one side filled */}
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

const MODE_META: Record<ThemeMode, { label: string; Icon: (p: { size?: number }) => JSX.Element; hint: string }> = {
  auto:  { label: 'AUTO',  Icon: AutoIcon,  hint: 'по времени суток' },
  light: { label: 'LIGHT', Icon: SunIcon,   hint: 'всегда светлая' },
  dark:  { label: 'DARK',  Icon: MoonIcon,  hint: 'всегда тёмная' },
};

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, cycle, theme } = useTheme();
  const meta = MODE_META[mode];

  const title = `Тема: ${meta.hint} · сейчас ${theme === 'light' ? 'светлая' : 'тёмная'}. Клик для смены.`;

  return (
    <button
      type="button"
      onClick={cycle}
      title={title}
      aria-label={title}
      className="relative inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300"
      style={{
        borderColor: 'var(--line)',
        color: 'var(--text-2)',
        background: 'var(--accent-soft)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ opacity: 0, y: -4, rotate: -30 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: 4, rotate: 30 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center"
          style={{ color: 'var(--accent)' }}
        >
          <meta.Icon size={14} />
        </motion.span>
      </AnimatePresence>
      {!compact && (
        <span className="font-display" style={{ color: 'var(--text-3)' }}>
          {meta.label}
        </span>
      )}
    </button>
  );
}
