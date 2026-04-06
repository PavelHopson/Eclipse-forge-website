import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = { children: ReactNode; className?: string };
type AnchorGlowButtonProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string };
type ButtonGlowButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };
type GlowButtonProps = AnchorGlowButtonProps | ButtonGlowButtonProps;

const cls = [
  'inline-flex items-center justify-center rounded-full',
  'border border-accent/25 bg-accent/[0.06]',
  'px-7 py-3.5 text-[13px] font-medium tracking-[0.01em] text-white',
  'font-display',
  'shadow-[0_0_40px_rgba(255,106,0,0.08)]',
  'transition-all duration-400',
  'hover:border-accent/40 hover:bg-accent/[0.1] hover:shadow-[0_0_50px_rgba(255,106,0,0.12)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ');

export function GlowButton(props: GlowButtonProps) {
  const { children, className = '' } = props;
  const content = (
    <>
      <span className="mr-3 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(255,106,0,0.7)]" />
      {children}
    </>
  );

  if ('href' in props && props.href) {
    const { href, children: _, className: __, ...rest } = props;
    return (
      <motion.a
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={`${cls} ${className}`}
        href={href}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  const { children: _, className: __, type = 'button', disabled, ...rest } = props;
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`${cls} ${className}`}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
