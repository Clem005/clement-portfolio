import { useReducedMotion, type Variants } from 'framer-motion';

/*
 * Shared scroll-in ("reveal") motion for the whole site, so every section moves
 * the same way: a soft fade with a small upward drift, settling on an ease-out
 * curve. Only opacity and transform are animated.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.6;
const DISTANCE = 14; // px
export const STAGGER = 0.07; // s between items in a group

/** A single element fading up into place. Pass `custom={n}` to delay it by n stagger steps. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: (step?: number) => ({
    opacity: 1,
    y: 0,
    // No delay key unless asked for: an explicit delay would override a parent's stagger.
    transition: step ? { duration: DURATION, ease: EASE_OUT, delay: step * STAGGER } : { duration: DURATION, ease: EASE_OUT },
  }),
};

/** A container whose `revealItem` children appear one after another. */
export const revealGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

/** Fire once, when the element is ~12% of the viewport height above the bottom edge. */
export const revealViewport = { once: true, margin: '0px 0px -12% 0px' } as const;

/**
 * Props that make a motion element reveal on scroll. With prefers-reduced-motion
 * the element (and any variant children) renders in its final state, no animation.
 */
export function useReveal() {
  const reduceMotion = useReducedMotion();
  return reduceMotion
    ? ({ initial: false, animate: 'visible' } as const)
    : ({ initial: 'hidden', whileInView: 'visible', viewport: revealViewport } as const);
}
