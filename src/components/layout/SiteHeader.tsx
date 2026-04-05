import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { useState } from 'react';
import { GlowButton } from '../ui/GlowButton';

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
                  backgroundColor: 'rgba(10,10,10,0.82)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(18px)',
                }
              : {
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(14px)',
                }
          }
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.26)]"
        >
          <a href="#hero" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="h-3 w-3 shrink-0 rounded-full bg-accent shadow-[0_0_20px_rgba(249,115,22,0.9)]" />
            <span className="truncate text-[0.72rem] font-medium uppercase tracking-[0.32em] text-white/92 sm:text-sm">
              Eclipse Forge
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden sm:block">
            <GlowButton href="#contact" className="px-5 py-2.5 text-[0.78rem] shadow-[0_0_30px_rgba(249,115,22,0.12)]">
              Обсудить проект
            </GlowButton>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition hover:border-white/18 hover:text-white md:hidden"
          >
            <span className="relative h-4 w-4">
              <span
                className={[
                  'absolute left-0 top-[3px] h-px w-4 bg-current transition duration-300',
                  isMenuOpen ? 'translate-y-[4px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-[7px] h-px w-4 bg-current transition duration-300',
                  isMenuOpen ? 'opacity-0' : 'opacity-100',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-[11px] h-px w-4 bg-current transition duration-300',
                  isMenuOpen ? '-translate-y-[4px] -rotate-45' : '',
                ].join(' ')}
              />
            </span>
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 bg-black/55 px-4 pb-6 pt-24 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="monolith-surface mx-auto max-w-7xl rounded-[2rem] p-5"
            >
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-[1.2rem] border border-transparent px-4 py-4 text-sm uppercase tracking-[0.22em] text-white/72 transition hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-5 border-t border-white/10 pt-5">
                <GlowButton href="#contact" onClick={closeMenu} className="w-full justify-center">
                  Обсудить проект
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
