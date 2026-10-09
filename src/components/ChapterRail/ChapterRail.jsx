/**
 * The chapter rail reads as an index on an architectural drawing set: a hairline
 * datum with a numbered schedule hanging off it.
 *
 * The active marker is drawn per item rather than as one travelling element, so
 * the same markup serves the vertical desktop rail and the horizontal compact
 * rail without any measurement or index arithmetic.
 */
export function ChapterRail({ chapters, activeIndex, onSelect, railRef }) {
  return (
    <nav className="rail" id="chapters" aria-label="Chapters" ref={railRef}>
      <ol className="rail__list">
        {chapters.map((chapter, index) => (
          <li className="rail__item" key={chapter.id}>
            <button
              type="button"
              className="rail__button"
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-controls="hero-copy"
              aria-label={`${chapter.number} — ${chapter.label}`}
              onClick={() => onSelect(index)}
            >
              <span className="rail__number">{chapter.number}</span>
              <span className="rail__label">{chapter.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
