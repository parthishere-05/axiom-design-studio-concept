import { HeroBackdrop } from './HeroBackdrop.jsx';
import { HeroCopy } from './HeroCopy.jsx';

/**
 * The opening composition. The backdrop tracks the chapter the visitor has
 * chosen; the copy trails it by a beat so the outgoing headline can fade before
 * the incoming one rises. Splitting the two indices is what keeps rapid
 * selection coherent.
 */
export function Hero({ chapters, activeIndex, copyIndex, isCopySwapping, mountedPlates, parallaxRef }) {
  const copyChapter = chapters[copyIndex];

  return (
    <section className="hero" id="top" aria-label="AXIOM Design Studio">
      <HeroBackdrop
        chapters={chapters}
        activeIndex={activeIndex}
        mountedPlates={mountedPlates}
        parallaxRef={parallaxRef}
      />

      <HeroCopy chapter={copyChapter} isSwapping={isCopySwapping} />

      <figure className="hero__detail" key={copyChapter.id}>
        <img
          className="hero__detailImg"
          src={copyChapter.detail.src}
          alt={copyChapter.detail.alt}
          style={{ objectPosition: copyChapter.detail.focus }}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </figure>
    </section>
  );
}
