/**
 * The section register.
 *
 * This is the single list every part of the site reads section identity from:
 * the header navigation, the collapsed menu, the scroll spy, and the shell that
 * renders the section elements themselves. Adding a section is therefore a
 * one-line change here rather than an edit in five places.
 *
 * `id` values are load-bearing — `primaryNav` in site.js already points at them
 * as deep links, so the anchor contract cannot drift from the markup.
 *
 * Section bodies are built in later phases; this file carries only the identity
 * each section needs to exist at all.
 */
export const sections = [
  { id: 'studio', number: '02', label: 'Studio' },
  { id: 'work', number: '03', label: 'Work' },
  { id: 'approach', number: '04', label: 'Approach' },
  { id: 'journal', number: '05', label: 'Journal' },
  { id: 'contact', number: '06', label: 'Contact' },
];