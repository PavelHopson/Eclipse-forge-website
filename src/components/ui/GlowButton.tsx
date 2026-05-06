import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type BaseProps = { children: ReactNode; className?: string };
type AnchorGlowButtonProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string };
type ButtonGlowButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };
type GlowButtonProps = AnchorGlowButtonProps | ButtonGlowButtonProps;

const cls = [
  'relative isolate inline-flex items-center justify-center rounded-full overflow-hidden',
  'border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.05)]',
  'px-7 py-3.5 text-[13px] font-medium tracking-[0.01em]',
  'font-display',
  'shadow-[0_14px_30px_rgba(80,60,20,0.18)]',
  'transition-[border-color,background,box-shadow] duration-500',
  'hover:border-[rgba(228,195,90,0.5)] hover:bg-[rgba(212,175,55,0.09)] hover:shadow-[0_18px_42px_rgba(120,90,30,0.26)]',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(212,175,55,0.4)]',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ');

function useCursorGlow() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width) * 100);
    y.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const background = useMotionTemplate`radial-gradient(220px circle at ${x}% ${y}%, rgba(245, 233, 196, 0.22), rgba(212, 175, 55, 0.08) 32%, transparent 65%)`;

  return { handleMove, background };
}

export function GlowButton(props: GlowButtonProps) {
  const { children, className = '' } = props;
  const { handleMove, background } = useCursorGlow();

  const content = (
    <>
      <motion.span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
        aria-hidden
      />
      <span
        className="relative z-10 mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-500"
        style={{ background: 'rgba(212,175,55,0.85)', boxShadow: '0 0 10px rgba(212,175,55,0.45)' }}
      />
      <span className="relative z-10" style={{ color: 'rgba(245,233,196,0.95)' }}>
        {children}
      </span>
    </>
  );

  if ('href' in props && props.href) {
    const { href, children: _children, className: _className, onMouseMove, ...rest } = props;
    void _children;
    void _className;
    return (
      <motion.a
        href={href}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`${cls} ${className} group`}
        onMouseMove={(event) => {
          handleMove(event);
          onMouseMove?.(event);
        }}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  const { children: _children, className: _className, type = 'button', disabled, onMouseMove, ...rest } = props;
  void _children;
  void _className;
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`${cls} ${className} group`}
      onMouseMove={(event) => {
        handleMove(event);
        onMouseMove?.(event);
      }}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
