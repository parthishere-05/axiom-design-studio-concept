import { useCallback, useEffect, useRef, useState } from 'react';

import { BottomDock } from './components/BottomDock/BottomDock.jsx';
import { ChapterRail } from './components/ChapterRail/ChapterRail.jsx';
import { SiteFrame } from './components/Frame/SiteFrame.jsx';
import { Header } from './components/Header/Header.jsx';
import { Hero } from './components/Hero/Hero.jsx';
import { Menu } from './components/Menu/Menu.jsx';
import { SiteShell } from './components/Shell/SiteShell.jsx';
import { chapters } from './data/chapters.js';
import { primaryNav, site } from './data/site.js';
import { useAmbientAudio } from './hooks/useAmbientAudio.js';
import { useChapterTransition } from './hooks/useChapterTransition.js';
import { useMediaQuery } from './hooks/useMediaQuery.js';
import { useMountedPlates } from './hooks/useMountedPlates.js';
import { usePointerParallax } from './hooks/usePointerParallax.js';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js';
import { useReveal } from './hooks/useReveal.js';
import { useScrollPastHero } from './hooks/useScrollPastHero.js';
import { useSectionSpy } from './hooks/useSectionSpy.js';

const MENU_BREAKPOINT = '(max-width: 1100px)';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

// Length of the entrance composition. After it has played the copy stops
// offsetting its rise, so chapter changes read as immediate.
const INTRO_DURATION = 2400;

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  const {
    activeIndex,
    copyIndex,
    isCopySwapping,
    selectChapter,
    selectNext,
    selectPrevious,
  } = useChapterTransition(chapters.length, { instant: reducedMotion });

  const isCompact = useMediaQuery(MENU_BREAKPOINT);
  const hasFinePointer = useMediaQuery(FINE_POINTER);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const menuButtonRef = useRef(null);
  const railRef = useRef(null);

  const mountedPlates = useMountedPlates(chapters.length, activeIndex);

  // The hero is fixed and occupies no normal flow, so the shell's opening
  // spacer is what actually scrolls past. That flag retires the chapter-only
  // chrome and stands the pointer loop down once the hero is behind the visitor.
  const { openingRef, isPastHero } = useScrollPastHero();

  // One observer for every `[data-reveal]` block on the page, rather than one
  // per section — the attribute is shared across the section system, so the
  // thing that sets it should be too.
  useReveal();

  // Nav state reads scroll position only. It needs no gate on the past-hero
  // flag: judged against the read line, no section qualifies while the hero
  // occupies the screen, so the fold still resolves to no active section —
  // which is what keeps the header byte-identical at `scrollY=0`.
  const activeSectionId = useSectionSpy();

  const parallaxRef = usePointerParallax(
    !reducedMotion && hasFinePointer && !isCompact && !isPastHero,
  );
  const sound = useAmbientAudio(site.ambientAudio);

  useEffect(() => {
    if (reducedMotion) {
      setIntroDone(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setIntroDone(true), INTRO_DURATION);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  // Widening past the breakpoint must not leave the floating panel orphaned.
  useEffect(() => {
    if (!isCompact) setIsMenuOpen(false);
  }, [isCompact]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  // "Enter" hands the keyboard to the chapter rail, where the experience lives.
  const enterExperience = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const target =
      rail.querySelector('.rail__button[aria-current="true"]') ??
      rail.querySelector('.rail__button');

    target?.focus();
  }, []);

  const activeChapter = chapters[activeIndex];

  return (
    <div
      className="app"
      data-intro-done={introDone ? 'true' : 'false'}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      data-scroll-past-hero={isPastHero ? 'true' : 'false'}
      data-active-section={activeSectionId ?? undefined}
    >
      <SiteFrame />

      <Header
        navItems={primaryNav}
        activeId={activeSectionId}
        isMenuOpen={isMenuOpen}
        menuButtonRef={menuButtonRef}
        onToggleMenu={toggleMenu}
        onEnter={enterExperience}
      />

      <ChapterRail
        chapters={chapters}
        activeIndex={activeIndex}
        onSelect={selectChapter}
        railRef={railRef}
      />

      <Hero
        chapters={chapters}
        activeIndex={activeIndex}
        copyIndex={copyIndex}
        isCopySwapping={isCopySwapping}
        mountedPlates={mountedPlates}
        parallaxRef={parallaxRef}
      />

      <BottomDock
        chapter={activeChapter}
        total={chapters.length}
        onNext={selectNext}
        onPrevious={selectPrevious}
        sound={sound}
      />

      <Menu
        open={isMenuOpen}
        navItems={primaryNav}
        activeId={activeSectionId}
        onClose={closeMenu}
        returnFocusRef={menuButtonRef}
      />

      <p className="sr-only" aria-live="polite">
        {`Chapter ${activeChapter.number} — ${activeChapter.label}`}
      </p>

      <SiteShell openingRef={openingRef} />
    </div>
  );
}
