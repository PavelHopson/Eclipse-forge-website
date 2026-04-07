import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = { children: ReactNode; className?: string };
type AnchorGlowButtonProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string };
type ButtonGlowButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };
type GlowButtonProps = AnchorGlowButtonProps | ButtonGlowButtonProps;

const cls = [
  'inline-flex items-center justify-center rounded-full',
  'border border-[#6BA3FF]/20 bg-[#6BA3FF]/[0.06]',
  'px-7 py-3.5 text-[13px] font-medium tracking-[0.01em]',
  'font-display btn-sweep',
  'shadow-[0_0_30px_rgba(107,163,255,0.06)]',
  'transition-all duration-500',
  'hover:border-[#6BA3FF]/35 hover:bg-[#6BA3FF]/[0.1] hover:shadow-[0_0_50px_rgba(107,163,255,0.12)]',
  'active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6BA3FF]/30',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ');

export function GlowButton(props: GlowButtonProps) {
  const { children, className = '' } = props;
  const content = (
    <>
      <span className="mr-3 h-1.5 w-1.5 rounded-full bg-[#6BA3FF]/50 shadow-[0_0_10px_rgba(107,163,255,0.5)] group-hover:bg-[#9DC4FF]/70 transition-colors duration-500" />
      <span style={{ color: '#F0F4F8' }}>{children}</span>
    </>
  );

  if ('href' in props && props.href) {
    const { href, children: _, className: __, ...rest } = props;
    return (
      <motion.a whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`${cls} ${className} group`} href={href} {...rest}>{content}</motion.a>
    );
  }

  const { children: _, className: __, type = 'button', disabled, ...rest } = props;
  return (
    <motion.button type={type} disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`${cls} ${className} group`} {...rest}>{content}</motion.button>
  );
}
