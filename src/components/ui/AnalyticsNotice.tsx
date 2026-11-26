import { useEffect, useState } from 'react';
import { useLocale } from '../../lib/locale';
import { metrikaEnabled, readAnalyticsChoice, saveAnalyticsChoice, startMetrika } from '../../lib/metrika';

/** Короткое уведомление о счётчике посещений. Показывается, пока посетитель не выбрал. */
export function AnalyticsNotice() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!metrikaEnabled) return;
    startMetrika();
    setOpen(readAnalyticsChoice() === null);
  }, []);

  if (!open) return null;

  const copy =
    locale === 'ru'
      ? {
          label: 'Уведомление о статистике',
          text: 'Сайт считает посещения через Яндекс Метрику, чтобы понимать, какие разделы полезны.',
          link: 'Подробнее',
          accept: 'Хорошо',
          decline: 'Отключить',
        }
      : {
          label: 'Analytics notice',
          text: 'This site counts visits with Yandex Metrica to see which sections are useful.',
          link: 'Details',
          accept: 'OK',
          decline: 'Turn off',
        };

  const choose = (choice: 'granted' | 'denied') => {
    saveAnalyticsChoice(choice);
    setOpen(false);
    // Отключение действует со следующей загрузки: уже загруженный счётчик из страницы не выгрузить.
    if (choice === 'denied') window.location.reload();
  };

  return (
    <aside className="analytics-notice" role="region" aria-label={copy.label}>
      <p>
        {copy.text}{' '}
        <a href="/privacy/" target="_blank" rel="noreferrer">
          {copy.link}
        </a>
      </p>
      <div className="analytics-notice__actions">
        <button type="button" className="analytics-notice__accept" onClick={() => choose('granted')}>
          {copy.accept}
        </button>
        <button type="button" className="analytics-notice__decline" onClick={() => choose('denied')}>
          {copy.decline}
        </button>
      </div>
    </aside>
  );
}
