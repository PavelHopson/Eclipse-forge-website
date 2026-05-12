import { useEffect, useState, useCallback, type MouseEvent, type ReactNode } from 'react';

// Tiny hash router: only treats hashes starting with "/" as routes.
// Plain "#section-id" anchors remain native scroll-to-anchor links —
// the router ignores them so existing in-page nav keeps working.

function readRoute(): string {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.hash.slice(1);
  return raw.startsWith('/') ? raw : '/';
}

export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(() => readRoute());

  useEffect(() => {
    const handler = () => setRoute(readRoute());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return route;
}

export function useScrollResetOnRoute(route: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // If the hash is an anchor (#section-id, not #/route), preserve the
    // jump-to-anchor target across a route change. Wait a frame so the new
    // page has mounted and the target element exists.
    const raw = window.location.hash.slice(1);
    if (raw && !raw.startsWith('/')) {
      const id = raw.split(/[?#]/)[0];
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route]);
}

interface RouteLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export function RouteLink({ to, children, className, onClick, style, ...rest }: RouteLinkProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(event);
      if (event.defaultPrevented) return;
      // Let middle-click / cmd-click open in new tab
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
      event.preventDefault();
      const target = to.startsWith('/') ? `#${to}` : to;
      if (window.location.hash === target) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      window.location.hash = target;
    },
    [to, onClick],
  );

  const href = to.startsWith('/') ? `#${to}` : to;

  return (
    <a href={href} onClick={handleClick} className={className} style={style} aria-label={rest['aria-label']}>
      {children}
    </a>
  );
}
