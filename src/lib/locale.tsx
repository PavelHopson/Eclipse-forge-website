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
    title: 'Eclipse Forge — системы, контроль, AI-операторы',
    description: 'Eclipse Forge создаёт AI-операторов, системы автоматизации, SaaS-продукты и контуры управления для сложных процессов.',
    ogLocale: 'ru_RU',
    twitterTitle: 'Eclipse Forge — системы, контроль, AI-операторы',
    twitterDescription: 'AI-операторы, автоматизация, продуктовые системы и контуры управления для сложных процессов.',
  },
  en: {
    lang: 'en',
    title: 'Eclipse Forge — Systems, Control, AI Operators',
    description: 'Eclipse Forge builds AI operators, automation systems, SaaS products and control surfaces for complex workflows.',
    ogLocale: 'en_US',
    twitterTitle: 'Eclipse Forge — Systems, Control, AI Operators',
    twitterDescription: 'AI operators, automation systems, product surfaces and control layers for complex workflows.',
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
