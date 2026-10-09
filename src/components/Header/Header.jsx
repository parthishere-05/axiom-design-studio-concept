import { AxiomWordmark } from '../Brand/AxiomWordmark.jsx';
import { PrimaryNav } from '../Nav/PrimaryNav.jsx';
import { ChevronRightIcon, MenuIcon } from '../icons/Icons.jsx';

/**
 * Architectural wayfinding: identity on the left, navigation and the single
 * entry control on the right. The menu trigger only exists below the desktop
 * breakpoint, where the inline navigation collapses.
 */
export function Header({
  navItems,
  activeId,
  isMenuOpen,
  menuButtonRef,
  onToggleMenu,
  onEnter,
}) {
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label={`${'AXIOM'} — start of page`}>
        <AxiomWordmark className="brand" />
      </a>

      <nav className="header__nav" aria-label="Studio">
        <PrimaryNav items={navItems} variant="inline" activeId={activeId} />
      </nav>

      <div className="header__controls">
        <button type="button" className="header__enter" onClick={onEnter}>
          <span>Enter</span>
          <ChevronRightIcon className="header__enterIcon" />
        </button>

        <button
          type="button"
          className="header__menu"
          ref={menuButtonRef}
          aria-expanded={isMenuOpen}
          aria-controls="studio-menu"
          onClick={onToggleMenu}
        >
          <MenuIcon className="header__menuIcon" />
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>
    </header>
  );
}
