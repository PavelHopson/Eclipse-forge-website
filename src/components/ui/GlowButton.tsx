import { motion } from 'framer-motion';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type AnchorGlowButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
  };

type ButtonGlowButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

type GlowButtonProps = AnchorGlowButtonProps | ButtonGlowButtonProps;

const buttonClassName = [
  'inline-flex items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white shadow-panel transition duration-300',
  'hover:border-accent/28 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] hover:shadow-glow',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-white/12 disabled:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] disabled:hover:shadow-panel',
].join(' ');

export function GlowButton(props: GlowButtonProps) {
  const { children, className = '' } = props;

  const content = (
    <>
      <span className="mr-3 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(255,106,0,0.8)]" />
      {children}
    </>
  );

  if ('href' in props && props.href) {
    const { href, children: _children, className: _className, ...anchorProps } = props;

    return (
      <motion.a
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={[buttonClassName, className].join(' ')}
        href={href}
        {...anchorProps}
      >
        {content}
      </motion.a>
    );
  }

  const {
    children: _children,
    className: _className,
    type = 'button',
    disabled,
    ...buttonProps
  } = props;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={[buttonClassName, className].join(' ')}
      {...buttonProps}
    >
      {content}
    </motion.button>
  );
}
