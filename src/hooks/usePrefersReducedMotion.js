import { useMediaQuery } from './useMediaQuery.js';

/**
 * True when the visitor has asked the platform to reduce motion.
 * Drives the entrance sequence, the chapter crossfade and the parallax.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
