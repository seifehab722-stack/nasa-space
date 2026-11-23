import { ComicChapter } from './types';

/**
 * COSMO character asset configuration.
 * References the original uploaded character artwork under /public/characters/cosmo/.
 */
export const COSMO_HERO_ASSET = {
  imagePath: '/characters/cosmo/cosmo-hero.png',
  webpPath: '/characters/cosmo/cosmo-hero.webp',
  alt: 'COSMO, the alien explorer of BEYOND RELICS',
  placeholderLabel: 'COSMO — upload reference image here',
  width: 1000,
  height: 1339,
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
  {
    id: 'chapter-4',
    slug: 'chapter-04',
    number: 4,
    title: 'Sojourner Rover',
    subtitle: 'The first robotic rover to explore the Martian surface',
    description:
      'Arriving on Mars aboard the Mars Pathfinder lander, COSMO meets Sojourner, the pioneering six-wheeled robotic rover that opened a new era of planetary exploration.',
    coverImage: '/comic/chapter-04/page-001.jpg',
    coverAlt:
      'Chapter 4 cover showing COSMO’s spacecraft descending toward Mars and COSMO greeting the robotic rover Sojourner',
    pages: [
      {
        pageNumber: 1,
        imagePath: '/comic/chapter-04/page-001.jpg',
        alt: 'Comic page 1 showing COSMO’s silver spacecraft landing on the Martian surface near a small robotic rover, and COSMO walking down the spacecraft ramp in an astronaut suit to greet Sojourner.',
        isPlaceholder: false,
      },
      {
        pageNumber: 2,
        imagePath: '/comic/chapter-04/page-002.jpg',
        alt: 'Comic page 2 showing a technical blueprint hologram detailing Sojourner’s dimensions (65 cm length, 48 cm width, 30 cm height, 10.5 kg mass), its six-wheel rocker-bogie suspension system, solar panels, and a portrait hologram of abolitionist Sojourner Truth after whom the rover was named, along with a launch hologram of the Delta II rocket.',
        isPlaceholder: false,
      },
      {
        pageNumber: 3,
        imagePath: '/comic/chapter-04/page-003.jpg',
        alt: 'Comic page 3 showing the Carl Sagan Memorial Station stationary lander on Mars, a hologram of the trajectory from Earth to Mars, the entry capsule descending through the Martian atmosphere with a heat shield, and the cluster of airbags bouncing on the Martian surface during landing.',
        isPlaceholder: false,
      },
      {
        pageNumber: 4,
        imagePath: '/comic/chapter-04/page-004.jpg',
        alt: 'Comic page 4 showing Sojourner rolling down the lander ramp on July 5, 1997, communicating with the lander via UHF radio link, using its Alpha Proton X-ray Spectrometer (APXS) to analyze a Martian rock, and driving across the Martian soil.',
        isPlaceholder: false,
      },
      {
        pageNumber: 5,
        imagePath: '/comic/chapter-04/page-005.jpg',
        alt: 'Comic page 5 showing Sojourner inspecting rocks named Barnacle Bill and Yogi with its APXS instrument, traveling approximately 100 meters across Mars, and displaying a mission timeline hologram showing its operation lasted 83 sols instead of the planned 7 days.',
        isPlaceholder: false,
      },
      {
        pageNumber: 6,
        imagePath: '/comic/chapter-04/page-006.jpg',
        alt: 'Comic page 6 showing a summary hologram of Sojourner’s milestones (83 sols, ~100 m distance, 550 photos, 230 commanded maneuvers, 16 APXS analyses, ~250 m² explored area), the final loss of communication with the lander on September 27, 1997, and a lineage hologram depicting later Mars rovers Spirit, Opportunity, Curiosity, Perseverance, and the Ingenuity helicopter.',
        isPlaceholder: false,
      },
      {
        pageNumber: 7,
        imagePath: '/comic/chapter-04/page-007.jpg',
        alt: 'Comic page 7 showing a hologram of future Mars exploration rovers and helicopters, a size comparison lineup of Mars rovers, and COSMO resting beside Sojourner under the Martian sunset watching the distant Pathfinder lander.',
        isPlaceholder: false,
      },
    ],
  },
  {
    id: 'chapter-5',
    slug: 'chapter-05',
    number: 5,
    title: 'Lunar Roving Vehicle',
    subtitle: "Humanity's electric buggy on the Moon across Apollo 15, 16, and 17",
    description:
      'COSMO explores the Moon and discovers the Lunar Roving Vehicle, the four-wheeled electric rover that carried Apollo astronauts across lunar mountains, craters, and plains.',
    coverImage: '/comic/chapter-05/page-001.jpg',
    coverAlt:
      'Chapter 5 cover showing COSMO walking on the Moon toward the Lunar Roving Vehicle and seated at the rover’s controls',
    pages: [
      {
        pageNumber: 1,
        imagePath: '/comic/chapter-05/page-001.jpg',
        alt: 'Comic page 1 showing COSMO discovering the Lunar Roving Vehicle on the Moon, climbing into the driver’s seat, and engineers designing and assembling the rover on Earth.',
        isPlaceholder: false,
      },
      {
        pageNumber: 2,
        imagePath: '/comic/chapter-05/page-002.jpg',
        alt: 'Comic page 2 showing a development hologram by NASA and Boeing, the woven zinc-coated steel mesh tires designed without pneumatic air, independent electric drive motors at each wheel, and the astronaut T-handle controller.',
        isPlaceholder: false,
      },
      {
        pageNumber: 3,
        imagePath: '/comic/chapter-05/page-003.jpg',
        alt: 'Comic page 3 showing the rover’s 36-volt silver-zinc batteries, how it folded into a compact package beneath the Lunar Module, and the pulley deployment system used by astronauts to unfold it on the Moon.',
        isPlaceholder: false,
      },
      {
        pageNumber: 4,
        imagePath: '/comic/chapter-05/page-004.jpg',
        alt: 'Comic page 4 showing Apollo astronauts driving the Lunar Roving Vehicle across the Moon during Apollo 15 at Hadley-Apennine, Apollo 16 at Descartes Highlands, and Apollo 17 at Taurus-Littrow with mission distance statistics.',
        isPlaceholder: false,
      },
      {
        pageNumber: 5,
        imagePath: '/comic/chapter-05/page-005.jpg',
        alt: 'Comic page 5 showing COSMO inspecting the damaged rear fender torn off by a hammer on Apollo 17, the astronaut and Mission Control map-and-duct-tape repair, and the high-gain dish antenna used to communicate with Earth.',
        isPlaceholder: false,
      },
      {
        pageNumber: 6,
        imagePath: '/comic/chapter-05/page-006.jpg',
        alt: 'Comic page 6 showing the color television camera controlled by Mission Control, the Sun-shadow navigation system, the 7.6 km walkback safety limit radius, and the 35.9 km distance record on Apollo 17.',
        isPlaceholder: false,
      },
      {
        pageNumber: 7,
        imagePath: '/comic/chapter-05/page-007.jpg',
        alt: 'Comic page 7 showing the Lunar Roving Vehicle left on the Moon with its wheel tracks, COSMO sitting beside the rover beneath the lunar sky, and COSMO walking alongside the rover under the distant Earth.',
        isPlaceholder: false,
      },
    ],
  },
  {
    id: 'chapter-6',
    slug: 'chapter-06',
    number: 6,
    title: 'Pioneer 10 & 11',
    subtitle: "Humanity's deep-space messengers across Jupiter, Saturn, and the interstellar threshold",
    description:
      'Drifting across deep space, Orion encounters Pioneer 10 and Pioneer 11, exploring the golden Pioneer Plaque, Jupiter encounters, Saturn’s ring plane crossing, and the enduring message sent to the stars.',
    coverImage: '/comic/chapter-06/page-001.jpg',
    coverAlt:
      'Chapter 6 cover showing Orion in a pod greeting Pioneer 10 and Pioneer 11 with their parabolic dish antennas in deep space',
    pages: [
      {
        pageNumber: 1,
        imagePath: '/comic/chapter-06/page-001.jpg',
        alt: 'Comic page 1 showing Orion in a spherical space pod floating beside Pioneer 11 and Pioneer 10 in deep space, discovering a faint rhythmic signal from Pioneer 11.',
        isPlaceholder: false,
      },
      {
        pageNumber: 2,
        imagePath: '/comic/chapter-06/page-002.jpg',
        alt: 'Comic page 2 showing Orion examining the golden Pioneer Plaque mounted on the spacecraft frame, featuring the engraved human figures, pulsar map, and hydrogen atom transition diagram.',
        isPlaceholder: false,
      },
      {
        pageNumber: 3,
        imagePath: '/comic/chapter-06/page-003.jpg',
        alt: 'Comic page 3 showing magnified circular callouts of the Pioneer Plaque symbols, including the hydrogen hyperfine transition, the 14-pulsar solar coordinates map, the human figures with spacecraft scale outline, and the solar system departure trajectory diagram.',
        isPlaceholder: false,
      },
      {
        pageNumber: 4,
        imagePath: '/comic/chapter-06/page-004.jpg',
        alt: 'Comic page 4 showing Carl Sagan and Frank Drake discussing the plaque design while Linda Salzman Sagan illustrates the human figures, an engineer inspecting the gold plaque on Earth, and Orion gazing at the plaque in space.',
        isPlaceholder: false,
      },
      {
        pageNumber: 5,
        imagePath: '/comic/chapter-06/page-005.jpg',
        alt: 'Comic page 5 showing technicians assembling the spacecraft at NASA Ames Research Center, diagrams of the plasma analyzer, cosmic-ray detector, and magnetometer, and the radioisotope thermoelectric generators (RTGs) fueled by plutonium-238.',
        isPlaceholder: false,
      },
      {
        pageNumber: 6,
        imagePath: '/comic/chapter-06/page-006.jpg',
        alt: 'Comic page 6 showing the launch of Pioneer 10 on March 2, 1972 from Cape Kennedy aboard an Atlas-Centaur rocket, Pioneer in Earth orbit, and Orion reacting to the mission extending far beyond its planned 21 months.',
        isPlaceholder: false,
      },
      {
        pageNumber: 7,
        imagePath: '/comic/chapter-06/page-007.jpg',
        alt: 'Comic page 7 showing Pioneer navigating the asteroid belt from July 15, 1972 to February 15, 1973, becoming the first spacecraft to safely traverse the asteroid belt and open the path to the outer planets.',
        isPlaceholder: false,
      },
      {
        pageNumber: 8,
        imagePath: '/comic/chapter-06/page-008.jpg',
        alt: 'Comic page 8 showing a panoramic view of Jupiter and the Great Red Spot during Pioneer 10’s closest approach on December 3, 1973, with data panels showing MAG instrument measurements, a cloud-band close-up, and images of Galilean moons Callisto, Ganymede, and Europa.',
        isPlaceholder: false,
      },
      {
        pageNumber: 9,
        imagePath: '/comic/chapter-06/page-009.jpg',
        alt: 'Comic page 9 showing Pioneer 10 flying past Jupiter into the outer solar system, measuring solar wind and cosmic rays, and crossing the orbit of Neptune on June 13, 1983 as the first human-made object beyond the outermost planet.',
        isPlaceholder: false,
      },
      {
        pageNumber: 10,
        imagePath: '/comic/chapter-06/page-010.jpg',
        alt: 'Comic page 10 showing Orion reviewing historical records of sister spacecraft Pioneer 11, with a flashback to cleanroom technicians preparing Pioneer 11 on Earth in the 1970s for a different trajectory.',
        isPlaceholder: false,
      },
      {
        pageNumber: 11,
        imagePath: '/comic/chapter-06/page-011.jpg',
        alt: 'Comic page 11 showing the launch of Pioneer 11 on April 6, 1973 from Cape Canaveral on an Atlas-Centaur rocket, its scientific instruments including the imaging photopolarimeter, and its arrival at Jupiter.',
        isPlaceholder: false,
      },
      {
        pageNumber: 12,
        imagePath: '/comic/chapter-06/page-012.jpg',
        alt: 'Comic page 12 showing Pioneer 11’s encounter with Jupiter on December 3, 1974, observing polar regions and radiation, and executing a gravity assist maneuver that redirected its trajectory toward Saturn.',
        isPlaceholder: false,
      },
      {
        pageNumber: 13,
        imagePath: '/comic/chapter-06/page-013.jpg',
        alt: 'Comic page 13 showing Pioneer 11’s arrival at Saturn on September 1, 1979 as the first spacecraft to fly past the ringed planet, capturing 440 images, studying its magnetic field and atmosphere, and discovering the F-ring and two new moons.',
        isPlaceholder: false,
      },
      {
        pageNumber: 14,
        imagePath: '/comic/chapter-06/page-014.jpg',
        alt: 'Comic page 14 showing Pioneer 11 braving a hazardous ring plane crossing through Saturn’s F-ring and Encke gaps, gathering critical environmental data to ensure a safe path for the subsequent Voyager 2 mission.',
        isPlaceholder: false,
      },
      {
        pageNumber: 15,
        imagePath: '/comic/chapter-06/page-015.jpg',
        alt: 'Comic page 15 showing Pioneer 10 and Pioneer 11 drifting in space with Orion, summarizing the official end of Pioneer 10’s scientific mission on March 31, 1997 and Pioneer 11’s in 1995 as their RTG power gradually declined.',
        isPlaceholder: false,
      },
      {
        pageNumber: 16,
        imagePath: '/comic/chapter-06/page-016.jpg',
        alt: 'Comic page 16 showing Pioneer 10 transmitting its final detectable signal on January 23, 2003 from 7.6 billion miles away, and Pioneer 11 sending its final engineering data on November 24, 1995 before Earth moved out of antenna view.',
        isPlaceholder: false,
      },
      {
        pageNumber: 17,
        imagePath: '/comic/chapter-06/page-017.jpg',
        alt: 'Comic page 17 showing trajectory diagrams of Pioneer 10 heading toward Aldebaran in Taurus over 2+ million years and Pioneer 11 heading toward the constellation Aquila over ~4 million years.',
        isPlaceholder: false,
      },
      {
        pageNumber: 18,
        imagePath: '/comic/chapter-06/page-018.jpg',
        alt: 'Comic page 18 showing Orion reflecting on the plaque’s purpose not for conquest, but to share a peaceful message of human existence, curiosity, and learning with whatever intelligence might find it.',
        isPlaceholder: false,
      },
      {
        pageNumber: 19,
        imagePath: '/comic/chapter-06/page-019.jpg',
        alt: 'Comic page 19 showing Orion retrieving a beacon and beaming a radiant message into deep space: "To the people of Earth... if this message ever reaches you, know that your curiosity crossed the universe."',
        isPlaceholder: false,
      },
      {
        pageNumber: 20,
        imagePath: '/comic/chapter-06/page-020.jpg',
        alt: 'Comic page 20 showing a panoramic view of Pioneer 10 and Pioneer 11 silently traversing the starry cosmos into interstellar space, with closing narration honoring the enduring message left behind by human exploration.',
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
