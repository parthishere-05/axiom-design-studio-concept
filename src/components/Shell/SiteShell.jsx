import { Approach } from '../sections/Approach.jsx';
import { Contact } from '../sections/Contact.jsx';
import { Journal } from '../sections/Journal.jsx';
import { SectionHeading } from '../sections/SectionHeading.jsx';
import { Studio } from '../sections/Studio.jsx';
import { Work } from '../sections/Work.jsx';
import { Colophon } from '../Footer/Colophon.jsx';
import { sections } from '../../data/sections.js';

/**
 * The document shell that sits beneath the fixed opening experience.
 *
 * The hero is `position: fixed` and occupies no space in the normal flow, so
 * the shell supplies the space for it: an opening spacer one viewport tall,
 * followed by the sections. The spacer is presentational — the hero carries its
 * own accessible name — and the sections begin at the exact fold where the
 * fixed hero ends, so the handoff has no gap to show through.
 *
 * `data-scroll-past-hero` lives on the app root rather than here because the
 * chrome it retires (rail, dock) is mounted as siblings of the shell.
 *
 * ── how a section gets built ────────────────────────────────────────────────
 * Every section's identity, anchor and label come from `sections.js`, and its
 * heading is always the shared `SectionHeading`. What differs is only the body,
 * so bodies are looked up in `BODIES` by id. A section without an entry still
 * renders with its real number, label, heading and `aria-labelledby` — it just
 * carries the placeholder note — so adding a section never requires a nested
 * conditional, and every section in the document outline is a labelled
 * destination rather than an empty target.
 *
 * The section keeps the `min-height`, padding and top rule it has always had:
 * those are the shell's scroll geometry, and they are what the opening
 * experience measures itself against.
 */
const BODIES = {
  studio: Studio,
  work: Work,
  approach: Approach,
  journal: Journal,
  contact: Contact,
};

export function SiteShell({ openingRef }) {
  return (
    <div className="shell">
      {/* The spacer reserves the height the fixed hero already occupies. The
          sentinel is a 1px marker on its last row: a full-height target can sit
          edge-to-edge with the viewport and browsers still call that an
          intersection, which delays the flag by a pixel. A 1px marker cleanly
          leaves the viewport instead of merely touching it. */}
      <div className="shell__opening" aria-hidden="true">
        <span className="shell__sentinel" ref={openingRef} />
      </div>

      <main className="shell__body">
        {sections.map((section) => {
          const Body = BODIES[section.id];

          return (
            <section
              className="section"
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <div className="section__inner">
                {/* Exactly one heading per section. A section with a body
                    renders it and lets it own its header — the body knows its
                    own heading text, intro and line breaks, and the section is
                    already labelled by that element's id. A section without a
                    body gets the shell's header, so it is still a real, labelled
                    destination in the document outline rather than an empty
                    target. Rendering both would emit duplicate ids and leave the
                    heading duplicated in the accessibility tree. */}
                {Body ? (
                  <Body />
                ) : (
                  <>
                    <SectionHeading
                      number={section.number}
                      label={section.label}
                      headingId={`${section.id}-heading`}
                    />
                    <p className="section__note">Section body in a later phase.</p>
                  </>
                )}
              </div>
            </section>
          );
        })}

        <Colophon />
      </main>
    </div>
  );
}