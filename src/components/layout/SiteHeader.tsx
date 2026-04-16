import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
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

  useMotionValueEvent(scrollY, 'change', (latest) => setIsScrolled(latest > 20));
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
          animate={isScrolled
            ? { backgroundColor: 'rgba(5,7,10,0.88)', borderColor: '#1C232B', backdropFilter: 'blur(20px)' }
            : { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: '#1C232B40', backdropFilter: 'blur(8px)' }
          }
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-5 py-3"
          style={{ boxShadow: isScrolled ? '0 0 40px rgba(0,0,0,0.3)' : 'none' }}
        >
          <a href="#hero" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 12px rgba(167,180,194,0.3)' }} />
            <span className="truncate text-[0.72rem] font-medium uppercase tracking-[0.3em] font-display" style={{ color: 'var(--text-2)' }}>
              Pavel Hopson
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: 'var(--text-3)' }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors duration-300 hover:!text-[var(--text-1)]">{item.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <GlowButton href="#contact" className="px-5 py-2.5 text-[0.78rem]">Войти в работу</GlowButton>
            </div>

            <button type="button" aria-label={isMenuOpen ? 'Закрыть' : 'Меню'}
              onClick={() => setIsMenuOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
              style={{ borderColor: 'var(--line)', color: 'var(--text-2)' }}>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 px-4 pb-6 pt-24 backdrop-blur-md md:hidden"
            style={{ background: 'rgba(5,7,10,0.7)' }}>
            <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="mx-auto max-w-[1400px] rounded-2xl border p-5"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}>
              <nav className="grid gap-1">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu}
                    className="rounded-xl px-4 py-4 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-white/[0.03]"
                    style={{ color: 'var(--text-2)' }}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                <GlowButton href="#contact" onClick={closeMenu} className="w-full justify-center">Войти в работу</GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
