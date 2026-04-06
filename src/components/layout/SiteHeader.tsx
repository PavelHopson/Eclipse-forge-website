import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { useState } from 'react';
import { GlowButton } from '../ui/GlowButton';
import { useTheme } from '../../lib/theme';

const navItems = [
  { label: 'О нас', href: '#about' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Услуги', href: '#services' },
  { label: 'Процесс', href: '#process' },
  { label: 'Контакт', href: '#contact' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { theme, toggle } = useTheme();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const closeMenu = () => setIsMenuOpen(false);

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
              ? {
                  backgroundColor: theme === 'dark' ? 'rgba(8,8,8,0.85)' : 'rgba(255,255,255,0.85)',
                  borderColor: 'var(--line)',
                  backdropFilter: 'blur(20px)',
                }
              : {
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  borderColor: 'var(--line)',
                  backdropFilter: 'blur(12px)',
                }
          }
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mx-auto flex max-w-[1200px] items-center justify-between rounded-full border px-5 py-3"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <a href="#hero" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: 'var(--accent)', boxShadow: `0 0 16px var(--glow)` }} />
            <span className="truncate text-[0.72rem] font-medium uppercase tracking-[0.3em] font-display" style={{ color: 'var(--text-1)', opacity: 0.8 }}>
              Eclipse Forge
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: 'var(--text-3)' }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors duration-300 hover:!text-[var(--text-1)]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <div className="hidden sm:block">
              <GlowButton href="#contact" className="px-5 py-2.5 text-[0.78rem]">
                Обсудить проект
              </GlowButton>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setIsMenuOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
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
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 px-4 pb-6 pt-24 backdrop-blur-md md:hidden"
            style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="mx-auto max-w-[1200px] rounded-2xl border p-5"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}
            >
              <nav className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-4 text-sm uppercase tracking-[0.15em] transition-colors"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                <GlowButton href="#contact" onClick={closeMenu} className="w-full justify-center">
                  Обсудить проект
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
