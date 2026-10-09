import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether the visitor has scrolled past the opening experience.
 *
 * The hero is `position: fixed`, so it never leaves the viewport and cannot be
 * observed directly — it would report as intersecting forever. What actually
 * moves is the opening spacer, the block of normal flow that stands in for it.
 * While the spacer is in view the fixed hero is what the visitor is looking at;
 * once it has gone, the first section has taken over and the hero-only chrome
 * should retire.
 *
 * The observed target is the spacer's 1px sentinel rather than the spacer
 * itself. A full-height target can come to rest exactly edge-to-edge with the
 * viewport, and a zero-area contact still counts as intersecting — which leaves
 * the rail and dock floating over the first section for the last pixel of the
 * transition. A 1px marker leaves the viewport cleanly instead of touching it.
 */
export function useScrollPastHero() {
  const openingRef = useRef(null);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const node = openingRef.current;

    // A browser without IntersectionObserver keeps the full opening experience
    // intact rather than stranding the page with its chrome permanently hidden.
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The sentinel is a 1px marker on the spacer's last row, so it leaves
        // the viewport cleanly instead of resting edge-to-edge with it. Both
        // signals are honoured: the edge measurement pins the exact moment the
        // first section reaches the top, and `isIntersecting` keeps the flag
        // correct for any larger jump.
        setIsPastHero(!entry.isIntersecting || entry.boundingClientRect.bottom <= 0);
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { openingRef, isPastHero };
}