import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * Wraps one page section and gives it a scroll entrance with depth: it starts
 * tilted back and slightly smaller, then settles flat before reaching the
 * middle of the screen. All styling lives in index.css (`.depth-section`).
 *
 * Browsers with CSS scroll-driven animations run it entirely in CSS, tied to
 * scroll position, with no JavaScript on scroll. Other browsers get a short
 * timed transition, started once by an IntersectionObserver.
 *
 * Each section owns its effect, so the audience views can reorder sections freely.
 */

let observer: IntersectionObserver | null = null;

function fallbackObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Also settle sections that are already above the viewport (e.g. after a view switch).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.setAttribute('data-depth-in', '');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  return observer;
}

export default function DepthSection({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || CSS.supports('animation-timeline: view()')) return;
    const io = fallbackObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div ref={ref} className="depth-section w-full" style={style}>
      {children}
    </div>
  );
}
