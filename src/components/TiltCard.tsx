import { useRef, type HTMLAttributes, type PointerEvent } from 'react';

/** Maximum tilt towards the pointer, in degrees. */
const MAX_TILT = 5;

/**
 * A card that tilts slightly towards a mouse pointer, with a soft light that
 * follows the cursor, and eases back flat when the pointer leaves.
 *
 * - Mouse only: touch and pen input never tilt (there is no hover to follow).
 * - The tilt itself is applied in CSS (`.tilt-card[data-tilt]` in index.css),
 *   which also switches it off for touch screens and prefers-reduced-motion.
 * - Pointer moves are batched to one update per animation frame.
 * - The light layer ignores the pointer, so links and buttons inside stay clickable.
 */
export default function TiltCard({ className = '', children, onPointerMove, onPointerLeave, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (e.pointerType !== 'mouse') return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width; // 0 (left) .. 1 (right)
      const y = (clientY - rect.top) / rect.height; // 0 (top) .. 1 (bottom)
      el.style.setProperty('--tilt-x', `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty('--glare-x', `${Math.round(clientX - rect.left)}px`);
      el.style.setProperty('--glare-y', `${Math.round(clientY - rect.top)}px`);
      el.setAttribute('data-tilt', '');
    });
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    cancelAnimationFrame(frame.current);
    // Dropping the attribute lets the CSS transition ease the card back to flat.
    ref.current?.removeAttribute('data-tilt');
  };

  return (
    <div ref={ref} {...rest} onPointerMove={handleMove} onPointerLeave={handleLeave} className={`tilt-card ${className}`}>
      {children}
      <span aria-hidden="true" className="tilt-glare">
        <span className="tilt-glare-spot" />
      </span>
    </div>
  );
}
