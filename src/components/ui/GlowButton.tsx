import { motion } from 'framer-motion';
import type { MouseEventHandler, ReactNode } from 'react';

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function GlowButton({
  children,
  className = '',
  ...props
}: GlowButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={[
        'inline-flex items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white shadow-panel transition duration-300',
        'hover:border-accent/28 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] hover:shadow-glow',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      ].join(' ')}
      {...props}
    >
      <span className="mr-3 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(255,106,0,0.8)]" />
      {children}
    </motion.a>
  );
}
