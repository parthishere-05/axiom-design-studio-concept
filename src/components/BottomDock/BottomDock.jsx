import { site } from '../../data/site.js';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InstagramIcon,
  MuteIcon,
  SoundIcon,
} from '../icons/Icons.jsx';

/**
 * The dock sits on the bottom edge of the frame: a chapter stepper on the left,
 * the studio's positioning line through the middle, and the studio's channels on
 * the right.
 *
 * Two deliberate departures from the reference dock:
 *  - the reference's "scroll to explore" cue is replaced by the practice's own
 *    positioning line, because this opening experience has nothing below it and
 *    a scroll affordance would be a control that does nothing;
 *  - the sound control is rendered only when an ambient track actually exists
 *    (see site.ambientAudio), rather than showing a mute toggle over silence.
 */
export function BottomDock({ chapter, total, onNext, onPrevious, sound }) {
  return (
    <div className="dock">
      <div className="dock__side dock__side--start">
        {sound.available && (
          <button
            type="button"
            className="dock__sound"
            onClick={sound.toggleMuted}
            aria-pressed={!sound.isMuted}
          >
            {sound.isMuted ? (
              <MuteIcon className="dock__icon" />
            ) : (
              <SoundIcon className="dock__icon" />
            )}
            <span>{sound.isMuted ? 'Sound' : 'Mute'}</span>
          </button>
        )}

        <div className="dock__stepper">
          <button
            type="button"
            className="dock__step"
            onClick={onPrevious}
            aria-label="Previous chapter"
          >
            <ChevronLeftIcon className="dock__icon" />
          </button>

          <p className="dock__index">
            <span className="dock__indexCurrent">{chapter.number}</span>
            <span className="dock__indexTotal">{`/ ${String(total).padStart(2, '0')}`}</span>
          </p>

          <button type="button" className="dock__step" onClick={onNext} aria-label="Next chapter">
            <ChevronRightIcon className="dock__icon" />
          </button>
        </div>
      </div>

      <p className="dock__center">{site.positioning}</p>

      <div className="dock__side dock__side--end">
        <a
          className="dock__link"
          href={site.instagram}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Axiom on Instagram"
        >
          <InstagramIcon className="dock__icon" />
        </a>

        {/* Instagram is the studio's only published contact route today. */}
        <a
          className="dock__link dock__link--text"
          href={site.instagram}
          target="_blank"
          rel="noreferrer noopener"
        >
          Contact Axiom
        </a>
      </div>
    </div>
  );
}
