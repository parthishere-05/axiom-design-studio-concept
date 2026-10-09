import { Fragment } from 'react';

import { site } from '../../data/site.js';
import { ArrowUpRightIcon, ChevronDownIcon } from '../icons/Icons.jsx';

/**
 * The primary CTA walks the visitor into the chapter sequence the page already
 * contains; the secondary one opens the studio's only verified public channel.
 * Both are real destinations — no action here is decorative.
 *
 * The whole card is keyed on the chapter, so React remounts it on every change
 * and the masked rise replays without any transition bookkeeping.
 */
export function HeroCopy({ chapter, isSwapping }) {
  return (
    <div className="hero__copy" id="hero-copy" data-swapping={isSwapping ? '' : undefined}>
      <div className="hero__copyInner" key={chapter.id}>
        <p className="hero__eyebrow">
          <span className="hero__eyebrowIndex">{chapter.number}</span>
          <span className="hero__eyebrowRule" aria-hidden="true" />
          <span className="hero__eyebrowLabel">{chapter.label}</span>
        </p>

        <h1 className="hero__headline">
          {chapter.titleLines.map((line, index) => (
            <Fragment key={line}>
              <span className="hero__line">
                <span className="hero__lineInner" style={{ '--line-index': index }}>
                  {line}
                </span>
              </span>{' '}
            </Fragment>
          ))}
        </h1>

        <p className="hero__lede">{chapter.description}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            <span className="btn__surface">
              <span>Explore our work</span>
              <ChevronDownIcon className="btn__icon" />
            </span>
          </a>

          <a
            className="btn btn--quiet"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="btn__surface">
              <span>Axiom on Instagram</span>
              <ArrowUpRightIcon className="btn__icon" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
