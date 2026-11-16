import { useEffect, useState } from 'react';
import { useLocale } from '../../lib/locale';

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
      <a href="#contact" tabIndex={visible ? 0 : -1}>{locale === 'ru' ? 'Обсудить' : 'Discuss'}</a>
    </div>
  );
}
