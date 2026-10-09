/**
 * Chapter data for the opening experience.
 *
 * All chapter copy, image pairings and focal points live here so the components
 * stay free of chapter-specific content.
 *
 * `focus` drives `object-position` per breakpoint. The supplied renders are
 * composed, not cropped programmatically, so each chapter declares where its
 * subject sits — the vault cluster, the tree column, the lit portal — and the
 * Hero honours that at every aspect ratio instead of blindly centring the crop.
 */
export const chapters = [
  {
    id: 'architecture',
    number: '01',
    label: 'Architecture',
    titleLines: ['Form Follows', 'Experience'],
    description:
      'We shape architecture through structure, proportion and movement, creating spaces that are experienced as much as they are seen.',
    hero: {
      src: '/images/chapter-architecture-2400.jpg',
      srcSet:
        '/images/chapter-architecture-1200.jpg 1200w, /images/chapter-architecture-2400.jpg 2400w',
      alt: 'Sculptural white vaulted facade with deep arched openings over a dark brick inner wall, lit at golden hour',
      focus: { desktop: '50% 60%', tablet: '48% 60%', mobile: '44% 62%' },
    },
    detail: {
      src: '/images/detail-architecture-1000.jpg',
      alt: 'Concrete and glass pavilion with a cantilevered slab overlooking distant hills at dusk',
      focus: '62% 58%',
    },
  },
  {
    id: 'interiors',
    number: '02',
    label: 'Interiors',
    titleLines: ['Spaces in', 'Motion'],
    description:
      'Interiors are composed through light, material and geometry to create environments that evolve throughout the day.',
    hero: {
      src: '/images/chapter-interiors-1120.jpg',
      srcSet:
        '/images/chapter-interiors-760.jpg 760w, /images/chapter-interiors-1120.jpg 1120w',
      alt: 'Sculptural ribbed interior with a branching tree-like column, planted beds and a polished dark stone floor',
      focus: { desktop: '50% 58%', tablet: '50% 56%', mobile: '50% 58%' },
    },
    detail: {
      src: '/images/detail-interiors-1000.jpg',
      alt: 'Glazed pavilion at dusk with a warmly lit interior reflected in a still water pool',
      focus: '58% 60%',
    },
  },
  {
    id: 'parametric',
    number: '03',
    label: 'Parametric',
    titleLines: ['Designed by', 'Computation'],
    description:
      'Parametric thinking allows complex forms to become precise, buildable and responsive to the conditions of each project.',
    hero: {
      src: '/images/chapter-parametric-2400.jpg',
      srcSet:
        '/images/chapter-parametric-1200.jpg 1200w, /images/chapter-parametric-2400.jpg 2400w',
      alt: 'Cantilevered concrete roof sweeping over a full-height glazed facade against a warm evening sky',
      focus: { desktop: '54% 60%', tablet: '54% 62%', mobile: '52% 66%' },
    },
    detail: {
      src: '/images/detail-parametric-1000.jpg',
      alt: 'Detail of flowing vaulted structure where two arched shells meet',
      focus: '40% 58%',
    },
  },
  {
    id: 'fabrication',
    number: '04',
    label: 'Fabrication',
    titleLines: ['From Digital', 'to Built'],
    description:
      'Digital fabrication connects computational design with material reality, turning complex ideas into precise architectural elements.',
    hero: {
      src: '/images/chapter-fabrication-1060.jpg',
      srcSet:
        '/images/chapter-fabrication-760.jpg 760w, /images/chapter-fabrication-1060.jpg 1060w',
      alt: 'Perforated metal facade screen with a woven diagonal pattern above a warmly lit entrance portal',
      focus: { desktop: '50% 88%', tablet: '50% 78%', mobile: '50% 80%' },
    },
    detail: {
      src: '/images/detail-fabrication-1000.jpg',
      alt: 'Detail of sculptural concrete fins beneath a cantilevered roofline',
      focus: '62% 62%',
    },
  },
];
