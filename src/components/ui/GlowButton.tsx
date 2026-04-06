import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../../lib/theme';

type BaseProps = { children: ReactNode; className?: string };
type AnchorGlowButtonProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string };
type ButtonGlowButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };
type GlowButtonProps = AnchorGlowButtonProps | ButtonGlowButtonProps;

export function GlowButton(props: GlowButtonProps) {
  const { children, className = '' } = props;
  const { theme } = useTheme();

  const cls = [
    'inline-flex items-center justify-center rounded-full',
    'px-7 py-3.5 text-[13px] font-medium tracking-[0.01em]',
    'font-display transition-all duration-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    theme === 'dark'
      ? 'border border-accent/25 bg-accent/[0.08] text-white shadow-[0_0_40px_rgba(255,106,0,0.06)] hover:bg-accent/[0.14] hover:border-accent/40 focus-visible:ring-accent/50 focus-visible:ring-offset-surface'
      : 'border-0 bg-[#C04500] text-white shadow-[0_2px_12px_rgba(192,69,0,0.25)] hover:bg-[#A83D00] hover:shadow-[0_4px_20px_rgba(192,69,0,0.3)] focus-visible:ring-[#C04500]/50 focus-visible:ring-offset-white',
  ].join(' ');

  const content = (
    <>
      <span className={`mr-3 h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-accent shadow-[0_0_8px_rgba(255,106,0,0.7)]' : 'bg-white/60'}`} />
      {children}
    </>
  );

  if ('href' in props && props.href) {
    const { href, children: _, className: __, ...rest } = props;
    return (
      <motion.a whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className={`${cls} ${className}`} href={href} {...rest}>
        {content}
      </motion.a>
    );
  }

  const { children: _, className: __, type = 'button', disabled, ...rest } = props;
  return (
    <motion.button type={type} disabled={disabled} whileHover={disabled ? undefined : { y: -1 }} whileTap={disabled ? undefined : { scale: 0.98 }} transition={{ duration: 0.2 }} className={`${cls} ${className}`} {...rest}>
      {content}
    </motion.button>
  );
}
