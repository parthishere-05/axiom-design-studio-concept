/**
 * Every mounted chapter plate is stacked in the same frame and crossfaded by
 * opacity, so the transition never depends on a timer: whichever plate is
 * active is simply the one with `is-active`, however fast the visitor clicks.
 *
 * The plate on screen only moves on once its render has decoded. That gate is
 * invisible on a sequential stepper run — the next plate is mounted one ahead
 * and is already in cache — but a jump straight to a distant chapter mounts a
 * cold `loading="lazy"` image, and under reduced motion the crossfade is
 * collapsed to nothing, so an ungated swap would drop straight to an empty
 * backdrop. Holding the outgoing plate until the incoming one is ready keeps
 * both motion modes showing a picture at every single instant.
 *
 * Plates are also the unit of lazy loading — the Hero only mounts the active
 * chapter and its successor, so the opening paint carries a single render.
 */
import { useCallback, useEffect, useState } from 'react';

function focusVars(focus) {
  return {
    '--focus-desktop': focus.desktop,
    '--focus-tablet': focus.tablet,
    '--focus-mobile': focus.mobile,
  };
}

export function HeroBackdrop({ chapters, activeIndex, mountedPlates, parallaxRef }) {
  const [decoded, setDecoded] = useState(() => new Set());
  const [shownId, setShownId] = useState(null);

  const activeId = chapters[activeIndex]?.id;

  /**
   * A cached image is already complete the moment the node mounts and `load`
   * will not fire again for it, so readiness is confirmed from the element
   * itself. A failed image counts as ready: the copy must never sit over a
   * previous chapter's picture just because an asset is missing.
   */
  const noteReady = useCallback((chapterId, img, ok) => {
    if (!chapterId || !img) return;
    if (ok && (!img.complete || img.naturalWidth === 0)) return;

    setDecoded((current) =>
      current.has(chapterId) ? current : new Set(current).add(chapterId),
    );
  }, []);

  const handleRef = useCallback(
    (img) => noteReady(img?.dataset?.chapter, img, true),
    [noteReady],
  );

  useEffect(() => {
    if (activeId && decoded.has(activeId)) setShownId(activeId);
  }, [activeId, decoded]);

  return (
    <div className="hero__backdrop">
      <div className="hero__stage" ref={parallaxRef}>
        {chapters.map((chapter, index) => {
          if (!mountedPlates.has(index)) return null;

          const isActive = chapter.id === shownId;

          return (
            <figure
              className={`hero__plate${isActive ? ' is-active' : ''}`}
              key={chapter.id}
              style={focusVars(chapter.hero.focus)}
              aria-hidden={isActive ? undefined : 'true'}
            >
              <img
                className="hero__plateImg"
                src={chapter.hero.src}
                srcSet={chapter.hero.srcSet}
                sizes="100vw"
                alt={chapter.hero.alt}
                data-chapter={chapter.id}
                ref={handleRef}
                onLoad={(event) => noteReady(chapter.id, event.currentTarget, true)}
                onError={(event) => noteReady(chapter.id, event.currentTarget, false)}
                /* the plate being asked for now is fetched at once; the rest stay lazy */
                loading={index === activeIndex || index === 0 ? 'eager' : 'lazy'}
                /* lowercase: React 18 passes these through to the DOM verbatim */
                fetchpriority={index === activeIndex || index === 0 ? 'high' : 'low'}
                decoding="async"
                draggable="false"
              />
            </figure>
          );
        })}
      </div>

      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />
    </div>
  );
}
