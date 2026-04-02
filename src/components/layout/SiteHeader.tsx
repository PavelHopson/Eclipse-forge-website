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
    setIsScrolled(latest > 24);
  });

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 px-3 pt-3 sm:px-4"
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <motion.div
          animate={
            isScrolled
              ? {
                  backdropFilter: 'blur(22px)',
                  backgroundColor: 'rgba(8,8,8,0.82)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }
              : {
                  backdropFilter: 'blur(16px)',
                  backgroundColor: 'rgba(8,8,8,0.46)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }
          }
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 shadow-panel sm:px-5 lg:px-6"
        >
          <a
            href="#hero"
            className="flex min-w-0 items-center gap-3 text-[0.72rem] uppercase tracking-[0.3em] text-white/92 sm:text-sm sm:tracking-[0.32em]"
            onClick={closeMenu}
          >
            <span className="relative inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_18px_rgba(255,106,0,0.85)]">
              <span className="absolute inset-[-5px] rounded-full border border-accent/20" />
            </span>
            <span className="truncate">Eclipse Forge</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/62 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition duration-300 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden sm:block">
            <GlowButton href="#contact" className="px-5 py-2.5 text-[0.72rem]">
              Запустить проект
            </GlowButton>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition hover:border-white/18 hover:text-white lg:hidden"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/52 px-3 pb-6 pt-24 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="panel-sheen mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_34%,rgba(7,7,7,0.92)_100%)] p-5 shadow-panel"
            >
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-[1.2rem] border border-transparent px-4 py-4 text-sm uppercase tracking-[0.24em] text-white/72 transition hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 border-t border-white/10 pt-5">
                <GlowButton
                  href="#contact"
                  className="w-full justify-center"
                  onClick={closeMenu}
                >
                  Запустить проект
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
