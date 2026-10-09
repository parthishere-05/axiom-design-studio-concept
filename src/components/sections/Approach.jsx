import { SectionHeading } from './SectionHeading.jsx';
import { chapters } from '../../data/chapters.js';

/**
 * Approach — how the studio works, as a numbered register.
 *
 * ── reuses the chapter data rather than restating it ─────────────────────────
 * The four concepts are already written, numbered and approved in `chapters.js`
 * for the opening experience. Rewriting them here would create a second version
 * of the studio's own methodology that could drift from the first, so this
 * section *reads* that file and changes nothing in it: the hero still gets its
 * chapters, and Approach gets the same words rendered as a list.
 *
 * `titleLines` is an array only because the hero sets it across two lines of
 * display type. Here the lines are joined into one heading, because a register
 * row is a single horizontal unit and a mid-word line break would only fight
 * the column. The text is identical either way.
 *
 * The description is used verbatim. It is the studio's own sentence about the
 * discipline, so restating it in plainer language would be a second, weaker
 * claim about the same thing.
 */
export function Approach() {
  return (
    <div className="approach">
      <SectionHeading
        number="04"
        label="Approach"
        heading="From Idea to Built Form"
        headingId="approach-heading"
      />

      <ol className="approach__register" role="list">
        {chapters.map((chapter) => (
          <li className="approach__row" key={chapter.id} data-reveal>
            <p className="approach__number">{chapter.number}</p>

            <h3 className="approach__title">{chapter.titleLines.join(' ')}</h3>

            <p className="approach__description">{chapter.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}