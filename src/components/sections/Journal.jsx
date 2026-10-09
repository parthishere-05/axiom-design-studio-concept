import { SectionHeading } from './SectionHeading.jsx';
import { entries, emptyState } from '../../data/journal.js';

/**
 * Journal — an index, and today an intentional empty one.
 *
 * ── the empty state is a design, not a gap ──────────────────────────────────
 * AXIOM has published no verified entries, so there is nothing honest to list.
 * The section therefore renders a composed, deliberately sized block that states
 * its own condition — a label, an oversized state, and the shared bracketed
 * sentinel — rather than the default nothing-a-template-would-emit stub that
 * reads as unfinished work.
 *
 * The tell that this is intentional rather than broken is the treatment: the
 * same hairline, tracked label and display scale used everywhere else in AXIOM,
 * set on a generous field. A broken placeholder looks empty because nobody
 * designed it. This looks empty because the state *is* the content.
 *
 * ── ready for real entries ──────────────────────────────────────────────────
 * The list is written and rendered above the empty branch: populate `entries`
 * in journal.js and the article list appears, with no component change. The
 * empty state is a function of `entries.length`, so it cannot linger alongside
 * real articles — the two states are mutually exclusive by construction.
 *
 * `href` is conditional, so an entry that has no permalink yet renders as plain
 * text rather than as a dead link.
 */
export function Journal() {
  return (
    <div className="journal">
      <SectionHeading
        number="05"
        label="Journal"
        heading="Thoughts, Studies, Observations"
        headingId="journal-heading"
      />

      <div className="journal__body" data-reveal>
        {entries.length ? (
          <ol className="journal__list" role="list">
            {entries.map((entry) => (
              <li className="journal__entry" key={entry.id}>
                <p className="journal__entryMeta">
                  {entry.date ? <time className="journal__date">{entry.date}</time> : null}
                </p>

                <div className="journal__entryBody">
                  <h3 className="journal__entryTitle">{entry.title}</h3>
                  {entry.summary ? (
                    <p className="journal__entrySummary">{entry.summary}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="journal__empty">
            <p className="journal__emptyLabel">Journal</p>
            <p className="journal__emptyTitle">{emptyState.title}</p>
            <p className="journal__emptyNote">{emptyState.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}