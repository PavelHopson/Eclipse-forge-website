import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useLocale, type Locale } from '../../lib/locale';
import { useTheme } from '../../lib/theme';
import { GlowButton } from '../ui/GlowButton';
import { LanguageToggle } from '../ui/LanguageToggle';
import { ThemeToggle } from '../ui/ThemeToggle';

const headerCopy: Record<
  Locale,
  {
    navItems: Array<{ label: string; href: string }>;
    cta: string;
    openMenu: string;
    closeMenu: string;
  }
> = {
  ru: {
    navItems: [
      { label: 'Позиционирование', href: '#about' },
      { label: 'Кейсы', href: '#cases' },
      { label: 'Услуги', href: '#services' },
      { label: 'Процесс', href: '#process' },
      { label: 'Контакт', href: '#contact' },
    ],
    cta: 'Открыть запрос',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
  },
  en: {
    navItems: [
      { label: 'Positioning', href: '#about' },
      { label: 'Cases', href: '#cases' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Open a request',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const { locale } = useLocale();
  const copy = headerCopy[locale];
  const isLight = theme === 'light';

  useMotionValueEvent(scrollY, 'change', (latest) => setIsScrolled(latest > 20));
  const closeMenu = () => setIsMenuOpen(false);

  const bgScrolled = isLight ? 'rgba(245, 242, 235, 0.9)' : 'rgba(5, 7, 10, 0.88)';
  const bgIdle = isLight ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.02)';
  const borderScrolled = isLight ? 'rgba(7, 7, 10, 0.08)' : '#1C232B';
  const borderIdle = isLight ? 'rgba(7, 7, 10, 0.04)' : '#1C232B40';
  const shadowScrolled = isLight ? '0 6px 24px rgba(7, 7, 10, 0.06), 0 2px 8px rgba(7, 7, 10, 0.04)' : '0 0 40px rgba(0, 0, 0, 0.3)';

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10"
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          animate={
            isScrolled
              ? { backgroundColor: bgScrolled, borderColor: borderScrolled, backdropFilter: 'blur(20px)' }
              : { backgroundColor: bgIdle, borderColor: borderIdle, backdropFilter: 'blur(8px)' }
          }
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-4 py-3 sm:px-5"
          style={{ boxShadow: isScrolled ? shadowScrolled : 'none' }}
        >
          <a href="#hero" className="group flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <motion.span
              className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(212,175,55,0.85)', boxShadow: '0 0 12px rgba(212,175,55,0.5)' }}
              />
              <span
                className="absolute inset-[2px] rounded-full"
                style={{ background: 'var(--bg)' }}
              />
            </motion.span>
            <span
              className="truncate font-display text-[0.72rem] font-medium uppercase tracking-[0.3em] transition-colors duration-400 group-hover:text-[var(--text-1)]"
              style={{ color: 'var(--text-2)' }}
            >
              Eclipse Forge
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: 'var(--text-3)' }}>
            {copy.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center transition-colors duration-300 hover:!text-[var(--text-1)]"
              >
                {item.label}
                <span
                  className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.7), rgba(107,163,255,0.5))' }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle compact />
            <div className="sm:hidden">
              <ThemeToggle compact />
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div className="hidden sm:block">
              <GlowButton href="#contact" className="px-5 py-2.5 text-[0.78rem]">
                {copy.cta}
              </GlowButton>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
              style={{ borderColor: 'var(--line)', color: 'var(--text-2)' }}
            >
              <span className="relative h-4 w-4">
                <span className={`absolute left-0 top-[3px] h-px w-4 bg-current transition duration-300 ${isMenuOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-[7px] h-px w-4 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 top-[11px] h-px w-4 bg-current transition duration-300 ${isMenuOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 px-4 pb-6 pt-24 backdrop-blur-md md:hidden"
            style={{ background: isLight ? 'rgba(245, 242, 235, 0.85)' : 'rgba(5,7,10,0.7)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="mx-auto max-w-[1400px] rounded-2xl border p-5"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <nav className="grid gap-1">
                {copy.navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-4 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-white/[0.03]"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                <GlowButton href="#contact" onClick={closeMenu} className="w-full justify-center">
                  {copy.cta}
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
