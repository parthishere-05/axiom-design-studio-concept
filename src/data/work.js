/**
 * AXIOM Work section data.
 *
 * Image assets, focal positions, and project labels are preserved.
 * Aspect ratios are defined per project to retain the architectural
 * composition of each image.
 */

/** Shared sentinel for factual information awaiting client input. */
export const PENDING = '[ AWAITING PROJECT INFORMATION ]';

export const work = [
  {
    id: 'architecture-studies',
    number: '01',
    title: 'Architecture Studies',
    discipline: 'Architecture',
    image: {
      src: '/images/work-architecture-1600.jpg',
      srcSet:
        '/images/work-architecture-900.jpg 900w, /images/work-architecture-1600.jpg 1600w',
      alt: 'Sculptural white vaulted facade with deep arched openings over a dark brick inner wall, lit at golden hour',
      w: 1600,
      h: 909,
    },
    aspect: '1600 / 909',
    focal: {
      desktop: '50% 60%',
      tablet: '48% 60%',
      mobile: '44% 62%',
    },
  },
  {
    id: 'interior-environments',
    number: '02',
    title: 'Interior Environments',
    discipline: 'Interiors',
    image: {
      src: '/images/work-interiors-900.jpg',
      srcSet:
        '/images/work-interiors-560.jpg 560w, /images/work-interiors-900.jpg 900w',
      alt: 'Sculptural ribbed interior with a branching tree-like column, planted beds and a polished dark stone floor',
      w: 900,
      h: 1129,
    },
    aspect: '900 / 1129',
    focal: {
      desktop: '50% 58%',
      tablet: '50% 56%',
      mobile: '50% 58%',
    },
  },
  {
    id: 'parametric-systems',
    number: '03',
    title: 'Parametric Systems',
    discipline: 'Parametric',
    image: {
      src: '/images/work-parametric-1600.jpg',
      srcSet:
        '/images/work-parametric-900.jpg 900w, /images/work-parametric-1600.jpg 1600w',
      alt: 'Cantilevered concrete roof sweeping over a full-height glazed facade against a warm evening sky',
      w: 1600,
      h: 914,
    },
    aspect: '1600 / 914',
    focal: {
      desktop: '54% 60%',
      tablet: '54% 62%',
      mobile: '52% 66%',
    },
  },
  {
    id: 'fabrication-studies',
    number: '04',
    title: 'Fabrication Studies',
    discipline: 'Fabrication',
    image: {
      src: '/images/work-fabrication-880.jpg',
      srcSet:
        '/images/work-fabrication-540.jpg 540w, /images/work-fabrication-880.jpg 880w',
      alt: 'Perforated metal facade screen with a woven diagonal pattern above a warmly lit entrance portal',
      w: 880,
      h: 1200,
    },
    aspect: '880 / 1200',
    focal: {
      desktop: '50% 88%',
      tablet: '50% 78%',
      mobile: '50% 80%',
    },
  },
  {
    id: 'glass-and-light',
    number: '05',
    title: 'Glass + Light',
    discipline: 'Architecture',
    image: {
      src: '/images/work-glass-1400.jpg',
      srcSet:
        '/images/work-glass-800.jpg 800w, /images/work-glass-1400.jpg 1400w',
      alt: 'Glazed pavilion at dusk with a warmly lit interior reflected in a still water pool',
      w: 1400,
      h: 800,
    },
    aspect: '1400 / 800',
    focal: {
      desktop: '64% 58%',
      tablet: '62% 58%',
      mobile: '68% 58%',
    },
  },
  {
    id: 'residential-form',
    number: '06',
    title: 'Residential Form',
    discipline: 'Architecture',
    image: {
      src: '/images/work-residential-1400.jpg',
      srcSet:
        '/images/work-residential-800.jpg 800w, /images/work-residential-1400.jpg 1400w',
      alt: 'Concrete and glass pavilion with a cantilevered slab overlooking distant hills at dusk',
      w: 1400,
      h: 800,
    },
    aspect: '1400 / 800',
    focal: {
      desktop: '52% 46%',
      tablet: '50% 48%',
      mobile: '46% 50%',
    },
  },
  {
    id: 'interior-studies',
    number: '07',
    title: 'Interior Studies',
    discipline: 'Interiors',
    image: {
      src: '/images/work-interior-studies.webp',
      alt: 'Contemporary interior atrium with flowing white organic structural forms, warm timber ceiling panels, large skylights and integrated greenery',
    },
    aspect: '16 / 9',
    focal: {
      desktop: '50% 50%',
      tablet: '50% 50%',
      mobile: '50% 50%',
    },
  },
];