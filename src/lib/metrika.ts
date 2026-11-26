import { analytics } from '../data/content';

// Яндекс Метрика: считает посещения и цели (отправка заявки, клики по контактам).
// Вебвизор выключен намеренно: он записывает ввод в поля, а в форме заявки — персональные данные.
// Посетитель может отключить счётчик в уведомлении; выбор хранится в его браузере.

const CHOICE_KEY = 'ef-analytics-choice';
export type AnalyticsChoice = 'granted' | 'denied' | null;

export type MetrikaGoal =
  | 'lead_sent'
  | 'click_telegram'
  | 'click_phone'
  | 'click_whatsapp'
  | 'click_max'
  | 'click_email'
  | 'open_demo';

type YmFunction = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
  interface Window {
    ym?: YmFunction;
  }
}

export const metrikaEnabled = analytics.yandexMetrikaId > 0;

let started = false;

export function readAnalyticsChoice(): AnalyticsChoice {
  try {
    const value = window.localStorage.getItem(CHOICE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsChoice(choice: Exclude<AnalyticsChoice, null>) {
  try {
    window.localStorage.setItem(CHOICE_KEY, choice);
  } catch {
    // Хранилище недоступно (приватный режим): выбор действует до закрытия страницы.
  }
  if (choice === 'granted') startMetrika();
}

/** Подключает счётчик, если он задан и посетитель его не отключил. Повторный вызов ничего не делает. */
export function startMetrika() {
  if (!metrikaEnabled || started || typeof window === 'undefined') return;
  if (readAnalyticsChoice() === 'denied') return;
  started = true;

  const queue: YmFunction = function ym(...args: unknown[]) {
    (queue.a = queue.a || []).push(args);
  };
  queue.l = Date.now();
  window.ym = window.ym || queue;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  window.ym(analytics.yandexMetrikaId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });
}

/** Отмечает достижение цели. Без подключённого счётчика молча ничего не делает. */
export function reachGoal(goal: MetrikaGoal) {
  if (!started || !window.ym) return;
  window.ym(analytics.yandexMetrikaId, 'reachGoal', goal);
}
