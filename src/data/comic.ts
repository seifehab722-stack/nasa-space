import { ComicChapter } from './types';

/**
 * COSMO character asset configuration.
 * References the original uploaded character artwork under /public/characters/cosmo/.
 */
export const COSMO_HERO_ASSET = {
  imagePath: '/characters/cosmo/cosmo-hero.png',
  alt: 'COSMO, the alien explorer of BEYOND RELICS',
  placeholderLabel: 'COSMO — upload reference image here',
};

export const COMIC_CHAPTERS: ComicChapter[] = [
  {
    id: 'chapter-1',
    slug: 'chapter-01',
    number: 1,
    title: 'The Journey Beginning',
    subtitle: 'Departure from planet Xyron into deep space',
    description:
      'From the ringed planet Xyron, COSMO unlocks a hidden underground hangar, boards a waiting spacecraft, and launches into the cosmos.',
    coverImage: '/comic/chapter-01/page-001.webp',
    coverAlt:
      'Chapter 1 cover (Page 1) showing a ringed planet named Xyron, a lit wooden cabin, and COSMO looking out at stars and galaxies',
    pages: [
      {
        pageNumber: 1,
        imagePath: '/comic/chapter-01/page-001.webp',
        alt: 'Comic page 1 showing a ringed planet named Xyron, a lit wooden cabin beneath glowing tree roots, and COSMO seated inside looking out at stars and galaxies',
        isPlaceholder: false,
      },
      {
        pageNumber: 2,
        imagePath: '/comic/chapter-01/page-002.webp',
        alt: 'Comic page 2 showing COSMO pressing a red ground button, an underground hatch opening with a ladder, and COSMO climbing down a vertical metal shaft',
        isPlaceholder: false,
      },
      {
        pageNumber: 3,
        imagePath: '/comic/chapter-01/page-003.webp',
        alt: 'Comic page 3 showing COSMO standing inside a metal hangar in front of a silver spacecraft and smiling in a close-up portrait',
        isPlaceholder: false,
      },
      {
        pageNumber: 4,
        imagePath: '/comic/chapter-01/page-004.webp',
        alt: 'Comic page 4 showing COSMO at the cockpit controls, the spacecraft powering up and launching into space, and a portrait of COSMO',
        isPlaceholder: false,
      },
    ],
  },
  {
    id: 'chapter-2',
    slug: 'chapter-02',
    number: 2,
    title: 'Apollo 11 AGC',
    subtitle: 'Exploring the Apollo 11 lunar lander Eagle and its guidance computer',
    description:
      'Landing on the Moon, COSMO encounters the Apollo 11 lunar lander Eagle and explores how the Apollo Guidance Computer (AGC) and DSKY interface operated.',
    coverImage: '/comic/chapter-02/page-001.webp',
    coverAlt:
      'Chapter 2 cover (Page 1) showing COSMO’s spacecraft landing on the Moon and COSMO discovering the Apollo 11 lunar lander Eagle',
    pages: [
      {
        pageNumber: 1,
        imagePath: '/comic/chapter-02/page-001.webp',
        alt: 'Comic page 1 showing COSMO’s spacecraft landing on the cratered Moon, COSMO discovering the Apollo 11 lunar lander Eagle, and a close-up of COSMO reacting in surprise',
        isPlaceholder: false,
      },
      {
        pageNumber: 2,
        imagePath: '/comic/chapter-02/page-002.webp',
        alt: 'Comic page 2 showing COSMO beside the lunar lander Eagle under a distant Earth and a Saturn V rocket launch, then climbing the ladder into the cramped instrument cabin',
        isPlaceholder: false,
      },
      {
        pageNumber: 3,
        imagePath: '/comic/chapter-02/page-003.webp',
        alt: 'Comic page 3 showing COSMO inside the lunar lander cabin inspecting the DSKY keypad and display panel and pointing at the Apollo Guidance Computer unit',
        isPlaceholder: false,
      },
      {
        pageNumber: 4,
        imagePath: '/comic/chapter-02/page-004.webp',
        alt: 'Comic page 4 showing COSMO looking at a glowing memory hologram alongside diagrams of woven fixed memory and erasable magnetic core memory totaling 38,912 words',
        isPlaceholder: false,
      },
      {
        pageNumber: 5,
        imagePath: '/comic/chapter-02/page-005.webp',
        alt: 'Comic page 5 showing a CPU hologram, a cutaway of the central processor, a magnified integrated circuit, a 3-input NOR logic gate truth table, and a Fetch-Decode-Execute-Store diagram',
        isPlaceholder: false,
      },
      {
        pageNumber: 6,
        imagePath: '/comic/chapter-02/page-006.webp',
        alt: 'Comic page 6 showing Apollo Guidance Computer Block II hardware details, an Inertial Measurement Unit cutaway, and a spacecraft navigation diagram between Earth and the Moon',
        isPlaceholder: false,
      },
      {
        pageNumber: 7,
        imagePath: '/comic/chapter-02/page-007.webp',
        alt: 'Comic page 7 showing COSMO operating the DSKY panel, a close-up of the DSKY display and keys, and a flowchart illustrating the Verb and Noun command sequence',
        isPlaceholder: false,
      },
      {
        pageNumber: 8,
        imagePath: '/comic/chapter-02/page-008.webp',
        alt: 'Comic page 8 showing astronauts reacting to a 1202 program alarm on the DSKY, NASA Mission Control engineers at consoles, the Eagle landed on the Moon, and COSMO looking toward the sky',
        isPlaceholder: false,
      },
    ],
  },
  {
    id: 'chapter-3',
    slug: 'chapter-03',
    number: 3,
    title: 'The Kepler Space Telescope',
    subtitle: 'Exploring NASA’s planet-hunting observatory and the transit method',
    description:
      'Encountering the Kepler Space Telescope in deep space, COSMO learns how transit photometry, CCD detectors, and habitable zone discoveries revealed thousands of exoplanets.',
    coverImage: '/comic/chapter-03/page-001.webp',
    coverAlt:
      'Chapter 3 cover (Page 1) showing COSMO’s spacecraft approaching the Kepler Space Telescope floating in deep space',
    pages: [
      {
        pageNumber: 1,
        imagePath: '/comic/chapter-03/page-001.webp',
        alt: 'Comic page 1 showing COSMO’s spacecraft flying toward the Kepler Space Telescope in space, COSMO looking through the cockpit viewport asking who it is, and COSMO exiting in a bubble pod to approach the telescope.',
        isPlaceholder: false,
      },
      {
        pageNumber: 2,
        imagePath: '/comic/chapter-03/page-002.webp',
        alt: 'Comic page 2 showing COSMO floating in a pod beside the Kepler Space Telescope, with panels illustrating the transit method where an orbiting planet passes in front of a star and causes a dip in measured starlight.',
        isPlaceholder: false,
      },
      {
        pageNumber: 3,
        imagePath: '/comic/chapter-03/page-003.webp',
        alt: 'Comic page 3 showing Kepler displaying a holographic light curve of a transiting planet to COSMO, and a technical cutaway diagram of Kepler’s optical system, corrector lens, primary mirror, and CCD detector array.',
        isPlaceholder: false,
      },
      {
        pageNumber: 4,
        imagePath: '/comic/chapter-03/page-004.webp',
        alt: 'Comic page 4 showing a hologram illustrating how starlight is converted into data graphs, a Delta II rocket launching Kepler from the launchpad, an Earth-trailing orbit diagram, and a star field showing Cygnus and Lyra.',
        isPlaceholder: false,
      },
      {
        pageNumber: 5,
        imagePath: '/comic/chapter-03/page-005.webp',
        alt: 'Comic page 5 showing exoplanet Kepler-22b orbiting a Sun-like star, a diagram of planetary orbits with a green habitable zone, and the Earth-size planet Kepler-186f orbiting a red dwarf star.',
        isPlaceholder: false,
      },
      {
        pageNumber: 6,
        imagePath: '/comic/chapter-03/page-006.webp',
        alt: 'Comic page 6 showing two exoplanets side-by-side in space, circumbinary planet Kepler-16b orbiting twin stars, and the view across cloudy atmospheric layers toward two suns.',
        isPlaceholder: false,
      },
      {
        pageNumber: 7,
        imagePath: '/comic/chapter-03/page-007.webp',
        alt: 'Comic page 7 showing Kepler floating beside COSMO, a star field filled with more than 2,600 discovered planetary systems, and a cutaway view of Kepler’s lower equipment section displaying its reaction wheels.',
        isPlaceholder: false,
      },
      {
        pageNumber: 8,
        imagePath: '/comic/chapter-03/page-008.webp',
        alt: 'Comic page 8 showing a low-fuel warning hologram as Kepler notes its retirement after nine years in space, with COSMO waving goodbye from his pod against distant planetary systems under the caption "THE END — THE UNIVERSE IS STILL WAITING TO BE EXPLORED!".',
        isPlaceholder: false,
      },
    ],
  },
];

export function getChapterBySlug(slug: string): ComicChapter | undefined {
  return COMIC_CHAPTERS.find((ch) => ch.slug === slug && !ch.isComingSoon);
}

export function getPublishedChapters(): ComicChapter[] {
  return COMIC_CHAPTERS.filter((ch) => !ch.isComingSoon);
}
