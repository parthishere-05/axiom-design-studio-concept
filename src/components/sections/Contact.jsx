import { SectionHeading } from './SectionHeading.jsx';
import { ArrowUpRightIcon } from '../icons/Icons.jsx';
import { awaiting, site } from '../../data/site.js';

/**
 * Contact — the end of the portfolio.
 *
 * ── what is linked and what is not ──────────────────────────────────────────
 * Instagram is the only contact channel AXIOM has verified as belonging to this
 * studio, so it is the only one that renders as a link. Everything else is
 * shown as the shared `awaiting` sentinel rather than as a plausible-looking
 * placeholder: an invented email address in a live portfolio is worse than a
 * visibly empty field, because a visitor will write to it and the message will
 * be lost without either party knowing why.
 *
 * The link is a real `<a>` with `target="_blank"` and
 * `rel="noopener noreferrer"`. The second half of that pair is the important
 * one: without `noopener`, a new tab opened this way hands the opening page a
 * handle on `window`, and a hostile destination could reach back into it. The
 * accessible name says where the link goes and that it opens a new tab, so the
 * behaviour is not sprung on anyone using a screen reader.
 *
 * ── composition ─────────────────────────────────────────────────────────────
 * This is the last thing a visitor reads, so it is the quietest: a large
 * statement, two fields beneath a hairline, and a lot of unused width. It is
 * deliberately not a form — no endpoint exists to post to, and a form that
 * accepts a message and silently discards it would be a worse failure than a
 * page that plainly offers only one way to get in touch.
 */
export function Contact() {
  return (
    <div className="contact">
      <SectionHeading
        number="06"
        label="Contact"
        heading="Let's Build Something Considered"
        headingId="contact-heading"
      />

      <div className="contact__body" data-reveal>
        <div className="contact__channel">
          <p className="contact__meta">
            <span className="contact__metaLabel">Instagram</span>
            <span className="contact__rule" aria-hidden="true" />
          </p>

          <a
            className="contact__link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AXIOM Design Studio on Instagram (opens in a new tab)"
          >
            <span className="contact__handle">axiomdesign_studio</span>
            <ArrowUpRightIcon className="contact__icon" />
          </a>
        </div>

        <div className="contact__channel">
          <p className="contact__meta">
            <span className="contact__metaLabel">Other channels</span>
            <span className="contact__rule" aria-hidden="true" />
          </p>

          <p className="contact__pending">{awaiting.contact}</p>
        </div>
      </div>
    </div>
  );
}