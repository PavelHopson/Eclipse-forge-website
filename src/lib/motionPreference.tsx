import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'eclipse-forge:ambient-motion-paused:v1';
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

type MotionPreferenceContextValue = {
  ambientMotionEnabled: boolean;
  systemReducedMotion: boolean;
  userPausedMotion: boolean;
  toggleAmbientMotion: () => void;
};

const MotionPreferenceContext = createContext<MotionPreferenceContextValue | null>(null);

function readStoredPause() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function readSystemPreference() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(REDUCE_QUERY).matches;
}

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [systemReducedMotion, setSystemReducedMotion] = useState(readSystemPreference);
  const [userPausedMotion, setUserPausedMotion] = useState(readStoredPause);
  const ambientMotionEnabled = !systemReducedMotion && !userPausedMotion;

  useEffect(() => {
    const media = window.matchMedia(REDUCE_QUERY);
    const onChange = (event: MediaQueryListEvent) => setSystemReducedMotion(event.matches);
    setSystemReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.ambientMotion = ambientMotionEnabled ? 'running' : 'paused';
    try {
      if (userPausedMotion) window.localStorage.setItem(STORAGE_KEY, 'true');
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be unavailable in hardened/private browser contexts.
    }
  }, [ambientMotionEnabled, userPausedMotion]);

  const value = useMemo<MotionPreferenceContextValue>(() => ({
    ambientMotionEnabled,
    systemReducedMotion,
    userPausedMotion,
    toggleAmbientMotion: () => setUserPausedMotion((paused) => !paused),
  }), [ambientMotionEnabled, systemReducedMotion, userPausedMotion]);

  return <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>;
}

export function useMotionPreference() {
  const value = useContext(MotionPreferenceContext);
  if (!value) throw new Error('useMotionPreference must be used inside MotionPreferenceProvider');
  return value;
}
