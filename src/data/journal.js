/**
 * The journal register.
 *
 * ── why this is empty ───────────────────────────────────────────────────────
 * AXIOM has published no verified journal entries: no articles, no notes, no
 * dates, no authors. Writing plausible titles and timestamps would put invented
 * content into a portfolio whose credibility rests on its content being real —
 * and a dated article link is the single hardest kind of thing to retract once
 * it has shipped, because a visitor may already have cited or bookmarked it.
 *
 * So the register is an empty array and the section renders an explicit,
 * deliberately composed empty state instead of a broken-looking placeholder.
 *
 * ── publishing real entries ────────────────────────────────────────────────
 * Append objects to `entries` in the shape below and the section renders the
 * article list. Nothing else needs to change: the empty state is a function of
 * `entries.length`, not a separate flag that could drift out of step with the
 * data, so it cannot show a "coming soon" panel while articles are already
 * listed.
 *
 *   {
 *     id:     'stable-slug',
 *     date:   '2026-03-14',   // ISO — rendered as text, never as a raw datetime
 *     title:  'Article title',
 *     summary: 'One or two restrained lines.',   // optional
 *     href:   '/journal/stable-slug',           // omit for a non-link entry
 *   }
 *
 * `date` is deliberately a string rather than a Date so a future source can
 * supply it without timezone ambiguity, and so an entry can exist that has no
 * date at all — in which case the date is simply not rendered.
 */
export const entries = [];

/** Shown in place of the article list while the register is empty. */
export const emptyState = {
  title: 'Coming Soon',
  note: '[ AWAITING JOURNAL CONTENT ]',
};