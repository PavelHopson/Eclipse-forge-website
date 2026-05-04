import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'ef-theme-mode';

function resolveByTime(): ResolvedTheme {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

function resolve(mode: ThemeMode): ResolvedTheme {
  if (mode === 'auto') return resolveByTime();
  return mode;
}

interface ThemeContextValue {
  mode: ThemeMode;
  theme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  theme: 'dark',
  setMode: () => {},
  cycle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return stored && ['auto', 'light', 'dark'].includes(stored) ? stored : 'dark';
  });

  const [theme, setTheme] = useState<ResolvedTheme>(() => resolve(mode));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setTheme(resolve(mode));

    if (mode !== 'auto') {
      return undefined;
    }

    const id = window.setInterval(() => {
      setTheme(resolve('auto'));
    }, 60_000);

    return () => window.clearInterval(id);
  }, [mode]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);

    try {
      localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // Storage can be unavailable in restrictive browser modes.
    }
  }, []);

  const cycle = useCallback(() => {
    const nextMode: ThemeMode = mode === 'dark' ? 'auto' : mode === 'auto' ? 'light' : 'dark';
    setMode(nextMode);
  }, [mode, setMode]);

  const value = useMemo<ThemeContextValue>(() => ({ mode, theme, setMode, cycle }), [cycle, mode, setMode, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
