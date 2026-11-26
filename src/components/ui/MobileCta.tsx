import { useEffect, useState } from 'react';
import { directContacts } from '../../data/content';
import { useLocale } from '../../lib/locale';
import { reachGoal } from '../../lib/metrika';

/** Sticky CTA for phones: appears after the hero, hides while the contact form is on screen. */
export function MobileCta() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero || !contact || typeof IntersectionObserver === 'undefined') return;
    let heroVisible = true;
    let contactVisible = false;
    const update = () => setVisible(!heroVisible && !contactVisible);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === contact) contactVisible = entry.isIntersecting;
      });
      update();
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mobile-cta" data-visible={visible} aria-hidden={!visible}>
      <span>{locale === 'ru' ? 'Сайт + заявки от 30 000 ₽' : 'Site + leads from 30 000 ₽'}</span>
      <span className="mobile-cta__actions">
        {directContacts.phoneHref ? (
          <a
            href={directContacts.phoneHref}
            className="mobile-cta__call"
            tabIndex={visible ? 0 : -1}
            aria-label={`${locale === 'ru' ? 'Позвонить' : 'Call'} ${directContacts.phone}`}
            onClick={() => reachGoal('click_phone')}
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
          </a>
        ) : null}
        <a href="#contact" tabIndex={visible ? 0 : -1}>{locale === 'ru' ? 'Обсудить' : 'Discuss'}</a>
      </span>
    </div>
  );
}
