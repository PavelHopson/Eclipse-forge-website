import type { ReactNode } from 'react';

type IconProps = {
  size?: number;
  className?: string;
};

function IconBase({ size = 18, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function TelegramIcon({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path
        d="M21 4.8L17.8 19c-.2 1-1 1.3-1.8.9l-4.5-3.3-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.7 8.7-7.8c.4-.4-.1-.6-.6-.3L5.9 13.2l-4.6-1.4c-1-.3-1-.9.2-1.4L19.6 3c.9-.4 1.7.2 1.4 1.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function InstagramIcon({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </IconBase>
  );
}

export function GitHubIcon({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path
        d="M12 3.2a9 9 0 0 0-2.8 17.6c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 .1.1 2.1 2.9 2.1.8 0 1.3-.3 1.6-.6.1-.6.3-1 .6-1.3-2.3-.3-4.8-1.1-4.8-5A3.9 3.9 0 0 1 8 8.8c0-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .1a10.3 10.3 0 0 1 5.4 0c2.1-.4 3-.1 3-.1.6 1.6.1 2.8.1 3.1.7.7 1.1 1.7 1.1 2.8 0 3.9-2.5 4.7-4.9 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9 9 0 0 0 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function MailIcon({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7l6 5 1 1 1-1 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </IconBase>
  );
}

export function BroadcastIcon({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M12 8.3a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 5.5a9 9 0 0 0 0 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.6 2.8a13 13 0 0 0 0 18.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M19.4 2.8a13 13 0 0 1 0 18.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </IconBase>
  );
}

export function ArrowUpRightIcon({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M8 16 16 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 8h7v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}
