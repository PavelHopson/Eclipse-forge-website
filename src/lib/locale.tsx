import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ru' | 'en';

const STORAGE_KEY = 'ef-locale';

type LocaleMeta = {
  lang: string;
  title: string;
  description: string;
  ogLocale: string;
  twitterTitle: string;
  twitterDescription: string;
};

const META_BY_LOCALE: Record<Locale, LocaleMeta> = {
  ru: {
    lang: 'ru',
    title: 'Eclipse Forge — сайты с системой заявок под ключ',
    description: 'Делаю сайты с системой заявок под ключ: клиент пишет — менеджер получает готовую карточку, владелец видит, что происходит. Цены открыто, смета до начала работ.',
    ogLocale: 'ru_RU',
    twitterTitle: 'Eclipse Forge — сайты с системой заявок под ключ',
    twitterDescription: 'Сайты с системой заявок под ключ. Живые демо, открытые цены, смета до начала работ.',
  },
  en: {
    lang: 'en',
    title: 'Eclipse Forge — turnkey sites with a lead system',
    description: 'Turnkey sites with a lead system: the client writes, the manager gets a ready card, the owner sees what is happening. Open pricing, estimate fixed before start.',
    ogLocale: 'en_US',
    twitterTitle: 'Eclipse Forge — turnkey sites with a lead system',
    twitterDescription: 'Turnkey sites with a lead system. Live demos, open pricing, estimate fixed before start.',
  },
};

function setMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.setAttribute('content', content);
  }
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'ru',
  setLocale: () => {},
  toggle: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'ru';

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' ? 'en' : 'ru';
  });

  useEffect(() => {
    const meta = META_BY_LOCALE[locale];

    document.documentElement.setAttribute('lang', meta.lang);
    document.title = meta.title;

    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:locale"]', meta.ogLocale);
    setMeta('meta[name="twitter:title"]', meta.twitterTitle);
    setMeta('meta[name="twitter:description"]', meta.twitterDescription);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);

    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // Storage can be unavailable in restrictive browser modes.
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  }, [locale, setLocale]);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, toggle }), [locale, setLocale, toggle]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
