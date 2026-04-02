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
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={[
        'inline-flex items-center justify-center rounded-full border border-accent/30 bg-[linear-gradient(180deg,#ff8b3d_0%,#ff6a00_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black shadow-glow transition duration-300',
        'hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(255,106,0,0.2),0_22px_60px_rgba(255,106,0,0.24)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.a>
  );
}
