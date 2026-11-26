import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocale, type Locale } from '../../lib/locale';
import { useTheme } from '../../lib/theme';
import { GlowButton } from '../ui/GlowButton';
import { LanguageToggle } from '../ui/LanguageToggle';
import { MotionToggle } from '../ui/MotionToggle';
import { useMotionPreference } from '../../lib/motionPreference';
import { ThemeToggle } from '../ui/ThemeToggle';

const headerCopy: Record<
  Locale,
  {
    navItems: Array<{ label: string; href: string }>;
    cta: string;
    openMenu: string;
    closeMenu: string;
    navLabel: string;
    settingsLabel: string;
  }
> = {
  ru: {
    navItems: [
      { label: 'Работы', href: '#works' },
      { label: 'Цены', href: '#services' },
      { label: 'Демо заявки', href: '#demo' },
      { label: 'Как работаю', href: '#process' },
      { label: 'Вопросы', href: '#faq' },
      { label: 'Контакты', href: '#contact' },
    ],
    cta: 'Обсудить проект',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    navLabel: 'Разделы страницы',
    settingsLabel: 'Язык и оформление',
  },
  en: {
    navItems: [
      { label: 'Work', href: '#works' },
      { label: 'Pricing', href: '#services' },
      { label: 'Lead demo', href: '#demo' },
      { label: 'Process', href: '#process' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Open a request',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navLabel: 'Page sections',
    settingsLabel: 'Language and appearance',
  },
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const { locale } = useLocale();
  const copy = headerCopy[locale];
  const isLight = theme === 'light';
  const { ambientMotionEnabled } = useMotionPreference();
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useMotionValueEvent(scrollY, 'change', (latest) => setIsScrolled(latest > 20));
  const closeMenu = () => setIsMenuOpen(false);

  // Подсветка раздела, в котором сейчас находится посетитель: считаем по положению страницы,
  // а не по событию «вошёл в экран», чтобы прокрутка вверх и вниз давала один и тот же ответ.
  // Разделы без пункта меню (сравнение, «Кто делает») ничего не подсвечивают.
  useEffect(() => {
    const navHrefs = new Set(headerCopy.ru.navItems.map((item) => item.href));
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
      if (sections.length === 0) return;

      const line = window.innerHeight * 0.4;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = sections[sections.length - 1];

      const href = `#${current.id}`;
      const next = navHrefs.has(href) ? href : '';
      // Расчёт дешёвый (девять замеров), а состояние меняется только при смене раздела.
      setActiveHref((previous) => (previous === next ? previous : next));
    };

    // Страница подгружается отдельным куском, поэтому первый расчёт повторяем чуть позже.
    update();
    const retry = window.setTimeout(update, 800);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.clearTimeout(retry);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    // Пока меню открыто, страница под ним недоступна с клавиатуры и для скринридера.
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    background.forEach((element) => element.setAttribute('inert', ''));

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      background.forEach((element) => element.removeAttribute('inert'));
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div
          className={`site-command-bar mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-4 py-3 sm:px-5${isScrolled ? ' is-scrolled' : ''}`}
        >
          <span aria-hidden className="site-command-bar__surface site-command-bar__surface--idle" />
          <span aria-hidden className="site-command-bar__surface site-command-bar__surface--scrolled" />
          <a
            href="#hero"
            aria-label="Eclipse Forge"
            className="site-command-brand group relative z-[1] flex min-h-11 min-w-0 items-center gap-3"
            onClick={closeMenu}
          >
            <span aria-hidden className="site-command-mark">
              <span className="site-command-mark__corona" />
              <span className="site-command-mark__disc" />
              <span className="site-command-mark__flare" />
              <motion.span className="site-command-mark__tracker" style={{ rotate: orbitRotation }}>
                <span />
              </motion.span>
            </span>
            <span
              aria-hidden
              className="site-brand-label truncate font-display text-[0.72rem] font-medium uppercase tracking-[0.3em] transition-colors duration-400 group-hover:text-[var(--text-1)]"
              style={{ color: 'var(--text-2)' }}
            >
              Eclipse Forge
            </span>
          </a>

          {/* Разделы видны на ноутбуках от 1200px; ниже — в меню под кнопкой. */}
          <nav
            aria-label={copy.navLabel}
            className="site-command-nav relative z-[1] ml-5 hidden items-center gap-4 text-sm min-[1200px]:flex min-[1360px]:ml-0 min-[1360px]:gap-6"
            style={{ color: 'var(--text-3)' }}
          >
            {copy.navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className="group relative inline-flex min-h-11 items-center whitespace-nowrap transition-colors duration-300 hover:!text-[var(--text-1)]"
                  style={isActive ? { color: 'var(--text-1)' } : undefined}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.9), rgba(212,175,55,0.4))' }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="relative z-[1] flex items-center gap-2 sm:gap-3">
            {/* Язык, пауза анимации и тема — в шапке только там, где есть место; иначе в меню. */}
            <div className="hidden items-center gap-2 min-[1200px]:flex">
              <LanguageToggle compact />
              <MotionToggle />
              <div className="min-[1360px]:hidden">
                <ThemeToggle compact />
              </div>
              <div className="hidden min-[1360px]:block">
                <ThemeToggle />
              </div>
            </div>
            <div className={isMenuOpen ? 'hidden min-[1200px]:block' : 'hidden sm:block'}>
              <GlowButton href="#contact" className="px-5 py-2.5 text-[0.78rem]">
                {copy.cta}
              </GlowButton>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border min-[1200px]:hidden"
              style={{ borderColor: 'var(--line)', color: 'var(--text-2)' }}
            >
              <span className="relative h-4 w-4">
                <span className={`absolute left-0 top-[3px] h-px w-4 bg-current transition duration-300 ${isMenuOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-[7px] h-px w-4 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 top-[11px] h-px w-4 bg-current transition duration-300 ${isMenuOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 overflow-y-auto px-4 pb-6 pt-24 backdrop-blur-md min-[1200px]:hidden"
            style={{ background: isLight ? 'rgba(245, 242, 235, 0.97)' : 'rgba(5,7,10,0.96)' }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="mx-auto max-w-[1400px] rounded-2xl border p-5"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <nav aria-label={copy.navLabel} className="grid gap-1">
                {copy.navItems.map((item, index) => {
                  const isActive = activeHref === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive ? 'location' : undefined}
                      className={`site-menu-link flex min-h-12 items-center gap-4 rounded-xl border-l-2 px-4 py-3 font-display text-[1.05rem] tracking-tight transition-colors hover:bg-white/[0.03] ${isActive ? 'border-[var(--gold)] font-semibold' : 'border-transparent'}`}
                      style={{ color: 'var(--text-1)' }}
                    >
                      <span aria-hidden className="w-5 text-[11px] tabular-nums" style={{ color: isActive ? 'var(--gold)' : 'var(--text-3)' }}>
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                <GlowButton href="#contact" onClick={closeMenu} className="w-full justify-center">
                  {copy.cta}
                </GlowButton>
              </div>
              <div
                role="group"
                aria-label={copy.settingsLabel}
                className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4"
                style={{ borderColor: 'var(--line)' }}
              >
                <LanguageToggle compact />
                <MotionToggle />
                <ThemeToggle compact />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
