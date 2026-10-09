/**
 * One navigation list, rendered twice: inline in the header and stacked inside
 * the collapsed menu. Both modes read the same data and the same markup, so
 * there is no second navigation to keep in sync.
 *
 * ── active state ───────────────────────────────────────────────────────────
 * `activeId` is the section the scroll spy has under the read line. It is `null`
 * while the hero still fills the screen — no section is far enough up to be
 * judged current — so at `scrollY=0` no link carries `aria-current` and nothing
 * about the header's markup or its computed style differs from before this
 * feature existed.
 *
 * `aria-current="true"` rather than `"page"`: these are anchors into one
 * continuous document, not distinct pages, and `true` is the value that means
 * simply "you are here". The visual state is driven from the app root's
 * `data-active-section`, so the attribute here stays purely semantic and a
 * screen reader and the eye get the same answer from the same source.
 */
export function PrimaryNav({ items, variant, onNavigate, firstItemRef, activeId }) {
  return (
    <ul className={`nav nav--${variant}`}>
      {items.map((item, index) => (
        <li className="nav__item" key={item.id}>
          <a
            className="nav__link"
            href={item.href}
            ref={index === 0 ? firstItemRef : null}
            onClick={onNavigate}
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
