/**
 * Studio-level facts.
 *
 * Everything here is taken from the brief or from the studio's own published
 * profile. Nothing is inferred, and no contact channel is invented: Instagram is
 * the only verified public route to the studio today.
 */
export const capabilities = [
  'Architecture',
  'Interiors',
  'Parametric Facades',
  'Digital Fabrication',
];

export const site = {
  name: 'AXIOM Design Studio',
  shortName: 'AXIOM',
  /**
   * Derived from `capabilities` rather than written out a second time. The two
   * must never disagree — the same four disciplines are the studio statement's
   * capability register, the colophon's positioning line, and the dock/menu
   * lines that sit inside the locked opening experience. Joining a list here
   * produces a byte-identical string to the one that was hand-written, so the
   * hero's measured copy is unchanged while gaining one source of truth.
   */
  positioning: capabilities.join(' · '),
  instagram: 'https://www.instagram.com/axiomdesign_studio',

  /**
   * No ambient track has been supplied with the brand assets. While this is
   * `null` the dock omits its sound control entirely, rather than showing a
   * toggle that does nothing. Point it at a local file (e.g. '/audio/room.mp3')
   * to bring the control online.
   */
  ambientAudio: null,
};

/**
 * Facts the studio has not supplied yet.
 *
 * These are placeholders, not values. They are named and centralised so every
 * section marks a missing fact the same way — the same bracketed, shouted form
 * used for the project register in `work.js` — and so the wording can be
 * corrected in one place rather than hunted across components.
 *
 * Supplying a fact means replacing the string with real content; the components
 * test against these constants, so a section stops announcing a field as soon as
 * the field is real.
 */
export const awaiting = {
  studio: '[ AWAITING STUDIO INFORMATION ]',
  contact: 'MORE CONTACT OPTIONS COMING SOON',
};

/**
 * Header navigation. Shared by the inline desktop nav and the collapsed menu so
 * the markup and the data can never drift apart. These are deep links for the
 * sections that follow the opening experience.
 */
export const primaryNav = [
  { id: 'studio', label: 'Studio', href: '#studio' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'approach', label: 'Approach', href: '#approach' },
  { id: 'journal', label: 'Journal', href: '#journal' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];
