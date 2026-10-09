import { useEffect, useState } from 'react';

/**
 * Chapter plates are mounted progressively: the opening chapter plus a one-ahead
 * prefetch. Mounted plates are never unmounted, because the outgoing plate has
 * to stay in the document for its crossfade to play. The set is bounded by the
 * chapter count, so this cannot grow without limit.
 */
export function useMountedPlates(chapterCount, activeIndex) {
  const [mounted, setMounted] = useState(() => new Set([0]));

  useEffect(() => {
    const prefetch = (activeIndex + 1) % chapterCount;

    setMounted((current) => {
      if (current.has(activeIndex) && current.has(prefetch)) return current;

      const next = new Set(current);
      next.add(activeIndex);
      next.add(prefetch);
      return next;
    });
  }, [activeIndex, chapterCount]);

  return mounted;
}
