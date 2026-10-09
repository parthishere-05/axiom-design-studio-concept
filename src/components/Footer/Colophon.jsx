import { AxiomWordmark } from '../Brand/AxiomWordmark.jsx';
import { ArrowUpRightIcon } from '../icons/Icons.jsx';
import { sections } from '../../data/sections.js';
import { capabilities, site } from '../../data/site.js';

/**
 * The colophon.
 *
 * ── what a colophon is, and what this one is allowed to contain ──────────────
 * A colophon names the maker and points onward. It is not a legal footer, and
 * nothing here invents company registration, an address, a year of incorporation
 * or a copyright line for an entity whose details have not been supplied. Those
 * three facts are the standard furniture of a site footer and the most commonly
 * fabricated, so their absence is deliberate rather than an oversight.
 *
 * What it carries is all verified: the lockup, the four disciplines AXIOM
 * publishes, the section index, and the one channel the studio actually runs.
 *
 * ── the positioning line ───────────────────────────────────────────────────
 * The same four capabilities the Studio register and the opening dock draw on,
 * joined with slashes here for a stacked reading. It comes from `capabilities`,
 * not a second list, so the discipline wording cannot drift apart from the
 * hero's own — only the separator differs.
 *
 * The index is generated from `sections.js`, the same list the header and the
 * collapsed menu read, so it cannot list a section that does not exist or omit
 * one that does. The brand lockup is `<a href="#top">`, which makes it the
 * conventional keyboard escape hatch back to the opening experience.
 */
export function Colophon() {
  return (
    <footer className="section section--colophon" id="colophon">
      <div className="section__inner colophon">
        <div className="colophon__lead" data-reveal>
          <a
            className="colophon__brand"
            href="#top"
            aria-label={`${site.shortName} — start of page`}
          >
            <AxiomWordmark className="brand" />
          </a>

          <p className="colophon__positioning">{capabilities.join(' / ')}</p>
        </div>

        <div className="colophon__base" data-reveal>
          <nav aria-label="Colophon">
            <ul className="colophon__index" role="list">
              {sections.map((section) => (
                <li key={section.id}>
                  <a className="colophon__link" href={`#${section.id}`}>
                    <span className="colophon__linkNumber" aria-hidden="true">
                      {section.number}
                    </span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            className="colophon__social"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AXIOM Design Studio on Instagram (opens in a new tab)"
          >
            <span>Instagram</span>
            <ArrowUpRightIcon className="colophon__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}