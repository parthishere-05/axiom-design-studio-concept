import { SectionHeading } from './SectionHeading.jsx';
import { awaiting, capabilities } from '../../data/site.js';

/**
 * Studio — what AXIOM is and what it does.
 *
 * ── what this section is allowed to say ─────────────────────────────────────
 * Everything here is either the studio's own supplied positioning or an explicit
 * placeholder. AXIOM has not provided a founding year, a location, a team, a
 * client list, an awards record or a project count, and none of those are
 * invented — a studio statement is exactly the place where such fictions would
 * do the most damage, because they are the details a prospective client reads
 * specifically to check whether the practice is real.
 *
 * The statement is therefore built from the only verified claim available: the
 * four disciplines the studio publishes. It says what the studio *does*, not
 * where it came from, how big it is, or who has used it.
 *
 * ── composition ─────────────────────────────────────────────────────────────
 * A statement reads badly centred and narrow, so the section splits: the
 * statement and its outstanding-details field on the left at display scale, and
 * the capability register on the right as a hairline-ruled list. The register
 * deliberately repeats the same three-part caption the hero eyebrow, the section
 * header and every Work tile use — index, dash, tracked label — so the studio's
 * disciplines read as a spec sheet rather than a set of badges.
 */
export function Studio() {
  return (
    <div className="studio">
      <SectionHeading
        number="02"
        label="Studio"
        heading="Designing the Space Between Ideas"
        headingId="studio-heading"
      />

      <div className="studio__body" data-reveal>
        <div className="studio__statement">
          <p className="studio__lead">
            AXIOM is a design studio working across architecture, interiors,
            parametric facades and digital fabrication.
          </p>

          <div className="studio__details">
            <p className="studio__detailsMeta">
              <span className="studio__detailsLabel">Studio details</span>
              <span className="studio__rule" aria-hidden="true" />
            </p>
            <p className="studio__detailsValue">{awaiting.studio}</p>
          </div>
        </div>

        <div className="studio__practice">
          <p className="studio__practiceLabel">Practice</p>

          <ol className="studio__capabilities" role="list">
            {capabilities.map((capability, index) => (
              <li className="studio__capability" key={capability}>
                <span className="studio__capabilityIndex">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="studio__rule" aria-hidden="true" />
                <span className="studio__capabilityName">{capability}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}