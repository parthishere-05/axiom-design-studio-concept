import { useCallback, useEffect, useState } from 'react';

/**
 * The brief's crossfade is deliberately asymmetric: the backdrop starts moving
 * as soon as a chapter is chosen, and the copy follows a beat later so the
 * outgoing headline can fade before the incoming one rises through its mask.
 *
 * Holding the copy index in its own state means a burst of clicks can never
 * strand the page. Every new selection clears the pending swap, so only the
 * most recent chapter's timeout survives and the sequence always settles on
 * the chapter the visitor last chose.
 */
const COPY_SWAP_DELAY = 260;

/**
 * @param {number} chapterCount
 * @param {{ instant?: boolean }} [options] `instant` collapses the copy swap to
 *   the same frame — used when the visitor has asked for reduced motion, so the
 *   copy never sits in an invisible in-between state.
 */
export function useChapterTransition(chapterCount, options = {}) {
  const { instant = false } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyIndex, setCopyIndex] = useState(0);

  const selectChapter = useCallback(
    (index) => {
      if (index < 0 || index >= chapterCount) return;
      setActiveIndex((current) => (current === index ? current : index));
    },
    [chapterCount],
  );

  const selectNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % chapterCount);
  }, [chapterCount]);

  const selectPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + chapterCount) % chapterCount);
  }, [chapterCount]);

  useEffect(() => {
    if (activeIndex === copyIndex) return undefined;

    if (instant) {
      setCopyIndex(activeIndex);
      return undefined;
    }

    const timer = window.setTimeout(() => setCopyIndex(activeIndex), COPY_SWAP_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeIndex, copyIndex, instant]);

  return {
    activeIndex,
    copyIndex,
    isCopySwapping: activeIndex !== copyIndex,
    selectChapter,
    selectNext,
    selectPrevious,
  };
}
