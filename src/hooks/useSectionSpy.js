import { useEffect, useState } from 'react';
import { sections } from '../data/sections.js';

/**
 * Reports which section the visitor is currently reading, for nav state.
 *
 * ── the line, not the midpoint ─────────────────────────────────────────────
 * Position is judged against a line a third of the way down the viewport rather
 * than against each section's centre. With centres, a tall section stays "not
 * current" for the whole time it crosses the middle of the screen, so the nav
 * would look unresponsive for most of a long section; and the boundary between
 * two adjacent sections falls exactly where neither owns it. A fixed line gives
 * one unambiguous answer at every scroll position, and it is the same line the
 * eye reads as "what am I looking at".
 *
 * ── why there is no "past the hero" gate ─────────────────────────────────────
 * The obvious design is to enable the spy only once the opening experience has
 * been left. That turns out to be wrong in a way that only shows up on the first
 * section: the sentinel the past-hero flag watches sits at the bottom of a
 * one-viewport spacer, so anchoring to `#studio` — which lands with only a
 * fraction of a viewport of scrolling — never crosses it. With the gate in
 * place, a visitor who clicks Studio and lands in Studio got no active state at
 * all, while every other section behaved correctly.
 *
 * The gate is unnecessary as well as harmful. Judged against a line a third of
 * the way down the viewport, no section qualifies while the hero is on screen:
 * `#studio` begins a full viewport down, so its measured top is a viewport away
 * from the line and the result is `null` without being told to be. The fold
 * keeps exactly the state it had before this feature existed — no active
 * section, no `aria-current`, no `data-active-section` — and the first section
 * can now become current the moment it actually is.
 *
 * Scrolling is sampled on animation frames rather than used to drive a
 * `position` toggle: the listener stays passive and never calls `preventDefault`,
 * and it does no layout work per event, only once per frame.
 */
const READ_LINE = 0.34;

export function useSectionSpy() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * READ_LINE;
      let current = null;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = section.id;
        else break;
      }

      setActiveId(current);
    };

    const onChange = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  return activeId;
}