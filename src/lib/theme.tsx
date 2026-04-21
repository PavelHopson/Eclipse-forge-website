import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Theme system with 3 user-selectable modes.
 * - 'auto'  → decides by time of day (06:00-18:00 = light, else dark)
 * - 'light' → always light
 * - 'dark'  → always dark
 *
 * Default is 'auto'.
 * Resolved theme (the one actually applied) = 'light' | 'dark' and is set on
 * document.documentElement as data-theme attribute.
 */

export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'ef-theme-mode';

function resolveByTime(): ResolvedTheme {
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? 'light' : 'dark';
}

function resolve(mode: ThemeMode): ResolvedTheme {
  if (mode === 'auto') return resolveByTime();
  return mode;
}

interface ThemeContextValue {
  mode: ThemeMode;
  theme: ResolvedTheme;
  setMode: (m: ThemeMode) => void;
  cycle: () => void; // auto → light → dark → auto
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'auto',
  theme: 'light',
  setMode: () => {},
  cycle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'auto';
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return stored && ['auto', 'light', 'dark'].includes(stored) ? stored : 'auto';
  });

  const [theme, setTheme] = useState<ResolvedTheme>(() => resolve(mode));

  // Apply resolved theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Recompute resolved theme whenever mode changes + start minute-poll for 'auto'
  useEffect(() => {
    const apply = () => setTheme(resolve(mode));
    apply();

    if (mode !== 'auto') return;

    // Re-check every 60s so transitions happen live
    const id = window.setInterval(apply, 60_000);
    return () => window.clearInterval(id);
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    try { localStorage.setItem(STORAGE_KEY, m); } catch { /* storage off */ }
  }, []);

  const cycle = useCallback(() => {
    const next: ThemeMode = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto';
    setMode(next);
  }, [mode, setMode]);

  const value = useMemo<ThemeContextValue>(() => ({ mode, theme, setMode, cycle }), [mode, theme, setMode, cycle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
