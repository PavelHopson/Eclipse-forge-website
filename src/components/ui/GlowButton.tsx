import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = { children: ReactNode; className?: string };
type AnchorGlowButtonProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string };
type ButtonGlowButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };
type GlowButtonProps = AnchorGlowButtonProps | ButtonGlowButtonProps;

const cls = [
  'inline-flex items-center justify-center rounded-full',
  'border border-[#2E3740] bg-white/[0.03]',
  'px-7 py-3.5 text-[13px] font-medium tracking-[0.01em]',
  'font-display',
  'shadow-[0_0_40px_rgba(220,230,242,0.04)]',
  'transition-all duration-500',
  'hover:border-[#A7B4C2]/30 hover:bg-white/[0.06] hover:shadow-[0_0_60px_rgba(220,230,242,0.08)]',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A7B4C2]/30',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ');

export function GlowButton(props: GlowButtonProps) {
  const { children, className = '' } = props;
  const content = (
    <>
      <span className="mr-3 h-1.5 w-1.5 rounded-full bg-[#A7B4C2]/50 shadow-[0_0_8px_rgba(167,180,194,0.4)]" />
      <span style={{ color: '#E6EDF3' }}>{children}</span>
    </>
  );

  if ('href' in props && props.href) {
    const { href, children: _, className: __, ...rest } = props;
    return (
      <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}
        className={`${cls} ${className}`} href={href} {...rest}>{content}</motion.a>
    );
  }

  const { children: _, className: __, type = 'button', disabled, ...rest } = props;
  return (
    <motion.button type={type} disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }} whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }} className={`${cls} ${className}`} {...rest}>{content}</motion.button>
  );
}
