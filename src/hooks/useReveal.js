import { useEffect } from 'react';

/**
 * Scroll reveals, built on the Phase 2 `[data-reveal]` foundation.
 *
 * ── how it uses the existing foundation ─────────────────────────────────────
 * `sections.css` already defines the transition and the held-back state, and
 * already neutralises both under `prefers-reduced-motion`. It deliberately does
 * not apply the hidden state until something sets `data-reveal-state`, so this
 * hook's only job is to set and clear that one attribute.
 *
 * ── nothing is hidden until an observer has confirmed it ─────────────────────
 * The held state is applied only to elements the observer reports as *not* on
 * screen, and cleared as soon as one is. Two consequences, both deliberate:
 *
 *   · content already in the viewport on load is never hidden and re-shown, so
 *     there is no flash of content that fades away from under the visitor;
 *   · if `IntersectionObserver` is unavailable the hook returns early and the
 *     attribute is never set — so every section renders fully visible. Failing
 *     open is the only acceptable direction for a failure that would otherwise
 *     make content permanently invisible.
 *
 * ── reveal once, never un-reveal ───────────────────────────────────────────
 * An element that has been seen stays revealed. `revealed` remembers what has
 * already appeared, so scrolling back up does not re-hide section headings the
 * visitor has already read. (The note in sections.css describes clearing on
 * exit; that is inverted here on purpose — re-hiding content above the viewport
 * would make scrolling back up feel like the page was resetting itself.)
 *
 * Only `opacity` and `transform` are ever animated, both already declared in
 * the stylesheet, so a reveal cannot reflow the page.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const targets = [...document.querySelectorAll('[data-reveal]')];
    if (!targets.length) return undefined;

    const revealed = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealed.add(entry.target);
            entry.target.removeAttribute('data-reveal-state');
          } else if (!revealed.has(entry.target)) {
            entry.target.setAttribute('data-reveal-state', 'pending');
          }
        }
      },
      // A little lead-in above the fold, so a block has begun to arrive before
      // it is fully on screen rather than starting its transition at the edge.
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}