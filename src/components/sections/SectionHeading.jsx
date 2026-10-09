/**
 * The shared section header.
 *
 * Every content section opens with the same four-part editorial structure:
 *
 *   01 ─── STUDIO          number · hairline · label
 *   THE SPACE
 *   BETWEEN IDEAS         the heading
 *   Supporting text.       optional intro
 *
 * All content arrives as props, so nothing about AXIOM's sections is baked in —
 * the same component renders any section, in any language, at any heading level.
 *
 * `headingLevel` is a prop rather than a fixed `h2` because the surrounding
 * markup decides the level: top-level sections pass 2, but the same header
 * nested inside another section can pass 3 without changing its own code. The
 * value is validated against the six real heading elements so a typo can never
 * emit invalid markup.
 *
 * `heading` is optional. When a section has no distinct editorial heading, the
 * label stands in for it — the header still needs exactly one heading, because
 * the section is labelled by it.
 */
const HEADING_ELEMENTS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export function SectionHeading({
  number,
  label,
  heading,
  intro,
  headingLevel = 'h2',
  headingId,
}) {
  const Heading = HEADING_ELEMENTS.has(headingLevel) ? headingLevel : 'h2';

  // `??` rather than `||` so an empty string is a deliberate choice, not a
  // silent fall back to the label.
  const title = heading ?? label;
  if (!title) return null;

  return (
    <header className="section-header">
      <p className="section-header__meta">
        {number ? <span className="section-header__number">{number}</span> : null}

        <span className="section-header__rule" aria-hidden="true" />

        {label ? <span className="section-header__label">{label}</span> : null}
      </p>

      <Heading className="section-header__heading" id={headingId}>
        {title}
      </Heading>

      {intro ? <p className="section-header__intro">{intro}</p> : null}
    </header>
  );
}