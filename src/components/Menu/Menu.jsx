import { useCallback, useEffect, useRef } from 'react';

import { site } from '../../data/site.js';
import { PrimaryNav } from '../Nav/PrimaryNav.jsx';
import { CloseIcon } from '../icons/Icons.jsx';

/**
 * The collapsed navigation, presented as a floating architectural panel over a
 * scrim. The same <PrimaryNav> markup the header uses is stacked here.
 *
 * Focus behaviour: the first link takes focus on open, Tab cycles inside the
 * panel, Escape restores focus to the trigger, and a click on the scrim or on
 * any link closes the panel and returns focus to the trigger.
 */
export function Menu({ open, navItems, activeId, onClose, returnFocusRef }) {
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  const closeAndRestoreFocus = useCallback(() => {
    onClose();
    returnFocusRef.current?.focus();
  }, [onClose, returnFocusRef]);

  useEffect(() => {
    if (!open) return undefined;

    firstLinkRef.current?.focus();

    const focusableNodes = () =>
      Array.from(
        panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [],
      );

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAndRestoreFocus();
        return;
      }

      if (event.key !== 'Tab') return;

      const nodes = focusableNodes();
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeAndRestoreFocus]);

  if (!open) return null;

  return (
    <div className="menu" id="studio-menu">
      <div className="menu__scrim" onClick={closeAndRestoreFocus} />

      <div className="menu__panel" role="dialog" aria-modal="true" aria-label="Menu" ref={panelRef}>
        <div className="menu__head">
          <p className="menu__title">{site.shortName}</p>
          <button
            type="button"
            className="menu__close"
            onClick={closeAndRestoreFocus}
            aria-label="Close menu"
          >
            <CloseIcon className="menu__closeIcon" />
          </button>
        </div>

        <nav className="menu__nav" aria-label="Studio menu">
          <PrimaryNav
            items={navItems}
            variant="stacked"
            activeId={activeId}
            firstItemRef={firstLinkRef}
            onNavigate={closeAndRestoreFocus}
          />
        </nav>

        <p className="menu__positioning">{site.positioning}</p>

        <a
          className="menu__external"
          href={site.instagram}
          target="_blank"
          rel="noreferrer noopener"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
