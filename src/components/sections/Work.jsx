import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from './SectionHeading.jsx';
import { work } from '../../data/work.js';

const REVEAL_MARGIN = '400px';

function useDeferredSource() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: REVEAL_MARGIN },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, ready];
}

function WorkProject({ project }) {
  const { id, number, title, discipline, image, aspect, focal } = project;
  const [plateRef, ready] = useDeferredSource();

  return (
    <article
      className={`work__item work__item--${id}`}
      ref={plateRef}
      style={{
        '--work-aspect': aspect,
        '--work-focal': focal.desktop,
        '--work-focal-tablet': focal.tablet,
        '--work-focal-mobile': focal.mobile,
      }}
    >
      <figure className="work__figure">
        <div className="work__plate">
          {ready && (
            <img
              className="work__image"
              src={image.src}
              srcSet={image.srcSet}
              sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) 58vw, 62vw"
              width={image.w}
              height={image.h}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <figcaption className="work__caption">
          <p className="work__meta">
            <span className="work__number">{number}</span>

            <span className="work__rule" aria-hidden="true" />

            <span className="work__discipline">{discipline}</span>
          </p>

          <h3 className="work__title">{title}</h3>
        </figcaption>
      </figure>
    </article>
  );
}

/*
 * Desktop:
 * Left column:  01 → 03 → 05
 * Right column: 02 → 04 → 06
 *
 * Mobile:
 * Projects return to their original numbered order, 01 → 06.
 */
const leftProjects = work.filter((_, index) => index % 2 === 0);
const rightProjects = work.filter((_, index) => index % 2 === 1);

export function Work() {
  return (
    <section className="work" aria-labelledby="work-heading">
      <SectionHeading
        number="03"
        label="Work"
        heading="Selected Work"
        intro="Architecture, interiors and computational design explored through form, material and fabrication."
        headingId="work-heading"
      />

      <div className="work__grid">
        <div className="work__col--left">
          {leftProjects.map((project) => (
            <WorkProject key={project.id} project={project} />
          ))}
        </div>

        <div className="work__col--right">
          {rightProjects.map((project) => (
            <WorkProject key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}