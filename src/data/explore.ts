import { ExploreTopic } from './types';

export const EXPLORE_TOPICS: ExploreTopic[] = [
  {
    slug: 'stars',
    name: 'Stars',
    shortDescription: 'Giant balls of hot gas powered by nuclear fusion deep inside their cores.',
    intriguingFact:
      'Stars are giant balls of hot gas that produce energy through nuclear fusion, balancing outward energy pressure against their own gravity.',
    heroImage: {
      src: '/src/assets/images/space_star_photosphere_1794873116826.jpg',
      alt: 'Detailed view of a star photosphere showing glowing plasma granulation and coronal loops',
      credit: 'BEYOND RELICS Observatory Visualization Slot (replace with credited NASA/ESA imagery)',
      caption: 'Active stellar surface with glowing coronal loops in space.',
    },
    overview: [
      'Stars are giant balls of hot gas that produce energy through nuclear fusion. From our Sun to distant supergiants, stars illuminate galaxies and drive the conditions around orbiting planets.',
      'A star’s life cycle—from its birth inside a nebula to its final stages—depends strongly on how much mass it begins with.',
    ],
    keyConcepts: [
      {
        title: 'Nuclear Fusion Engines',
        description:
          'Extreme core pressure and heat fuse lighter nuclei into heavier elements, releasing steady light and thermal energy.',
      },
      {
        title: 'Color and Temperature',
        description:
          'Hotter stars shine blue-white, moderate stars like our Sun appear yellow-white, and cooler stars glow redder.',
      },
      {
        title: 'Stellar Life Cycles',
        description:
          'Stars form in nebulae, spend most of their lives fusing fuel steadily, and eventually shed outer layers or explode depending on their mass.',
      },
    ],
    howScientistsStudy: [
      'Solar observatories monitor our Sun directly, while space and ground telescopes study the brightness, color, and spectra of distant stars.',
      'By analyzing stellar light spectra, astronomers determine a star’s temperature, composition, and motion.',
    ],
    gallery: [
      {
        src: '/src/assets/images/space_star_photosphere_1794873116826.jpg',
        alt: 'Glowing stellar photosphere and corona',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Granular plasma cells and magnetic loops above a star’s surface.',
      },
    ],
    didYouKnow: {
      fact: 'Nearly every heavy element found on rocky planets—including the carbon and oxygen essential to life—was forged inside stars or during stellar explosions.',
      source: {
        publisher: 'NASA Science',
        title: 'NASA Science — Stars & Stellar Evolution',
        url: 'https://science.nasa.gov',
      },
    },
    sources: [
      {
        publisher: 'NASA Science',
        title: 'NASA Science — Stars',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'NASA',
        title: 'NASA Official Portal',
        url: 'https://www.nasa.gov',
      },
    ],
  },
  {
    slug: 'galaxies',
    name: 'Galaxies',
    shortDescription: 'Enormous cosmic systems of stars, gas, and dust bound together by gravity.',
    intriguingFact:
      'Galaxies are enormous systems of stars, gas, and dust held together by gravity, appearing in spiral, elliptical, and irregular shapes.',
    heroImage: {
      src: '/src/assets/images/space_spiral_galaxy_1794873115788.jpg',
      alt: 'Grand design spiral galaxy with luminous core and sweeping star-forming spiral arms',
      credit: 'BEYOND RELICS Observatory Visualization Slot (replace with credited NASA/ESA imagery)',
      caption: 'Spiral galaxy displaying a bright central bulge and blue star-forming arms.',
    },
    overview: [
      'Galaxies are enormous systems of stars, gas, and dust held together by gravity. They are the grand building blocks of the large-scale universe.',
      'Our Sun and all the planets of our Solar System belong to one spiral galaxy—the Milky Way—amid a universe filled with countless other galaxies.',
    ],
    keyConcepts: [
      {
        title: 'Spiral, Elliptical, Irregular',
        description:
          'Galaxies take distinct forms—from flat, rotating spiral disks with bright arms to rounded elliptical systems and irregular shapes.',
      },
      {
        title: 'Cosmic Recycling',
        description:
          'Gas and dust within a galaxy continually feed the birth of new stars, while older stars return heavy elements back into interstellar space.',
      },
      {
        title: 'Gravitational Groups',
        description:
          'Galaxies rarely sit completely alone; gravity draws many into pairs, groups, and vast galaxy clusters.',
      },
    ],
    howScientistsStudy: [
      'Deep-field space telescope surveys capture light from galaxies near and far, letting astronomers compare how galaxies look and evolve over cosmic history.',
      'Radio, infrared, and optical observations map the motion of stars and cold gas across entire galactic disks.',
    ],
    gallery: [
      {
        src: '/src/assets/images/space_spiral_galaxy_1794873115788.jpg',
        alt: 'Spiral galaxy in deep space',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Dark dust lanes winding alongside young blue star clusters.',
      },
    ],
    didYouKnow: {
      fact: 'Because light takes time to travel across space, observing very distant galaxies lets astronomers see them as they appeared long ago in cosmic history.',
      source: {
        publisher: 'Webb Space Telescope',
        title: 'STScI Webb Telescope — Galaxies',
        url: 'https://webbtelescope.org',
      },
    },
    sources: [
      {
        publisher: 'NASA Science',
        title: 'NASA Science — Galaxies',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'Webb Space Telescope',
        title: 'STScI Webb Telescope',
        url: 'https://webbtelescope.org',
      },
    ],
  },
  {
    slug: 'black-holes',
    name: 'Black Holes',
    shortDescription: 'Regions of extreme gravity where nothing—not even light—can escape once inside.',
    intriguingFact:
      'Black holes are regions of space where gravity is so strong that nothing, not even light, can escape past their event horizon.',
    heroImage: {
      src: '/src/assets/images/space_black_hole_disk_1794873113844.jpg',
      alt: 'Black hole event horizon shadow framed by a glowing accretion disk of superheated plasma',
      credit: 'BEYOND RELICS Observatory Visualization Slot (replace with credited NASA/EHT imagery)',
      caption: 'Relativistic accretion disk glowing around a black hole shadow.',
    },
    overview: [
      'Black holes are regions of space where gravity is so strong that nothing, not even light, can escape. The boundary around a black hole beyond which escape is impossible is called the event horizon.',
      'Although a black hole itself emits no light, the space just outside it can be remarkably bright when nearby gas spirals inward and heats up.',
    ],
    keyConcepts: [
      {
        title: 'The Event Horizon',
        description:
          'The boundary surrounding a black hole where the pull of gravity becomes strong enough to trap even light.',
      },
      {
        title: 'Glowing Accretion Disks',
        description:
          'Gas pulled toward a black hole swirls into a flat, fast-moving disk outside the event horizon, heating up and shining brightly.',
      },
      {
        title: 'Gravitational Lensing',
        description:
          'Extreme gravity bends the path of passing light from background stars or surrounding gas, distorting how the region appears.',
      },
    ],
    howScientistsStudy: [
      'Scientists track the orbits of stars circling invisible massive objects and measure high-energy radiation such as X-rays from glowing accretion disks.',
      'Global radio telescope arrays and gravitational-wave observatories also reveal black holes by capturing silhouette shadows and ripples in spacetime.',
    ],
    gallery: [
      {
        src: '/src/assets/images/space_black_hole_disk_1794873113844.jpg',
        alt: 'Accretion disk swirling around a black hole',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Superheated matter spiraling outside the event horizon.',
      },
    ],
    didYouKnow: {
      fact: 'A black hole does not act like a cosmic vacuum cleaner; objects orbiting safely outside the event horizon can stay in stable orbits just as planets orbit a star.',
      source: {
        publisher: 'NASA Science',
        title: 'NASA Science — Black Holes',
        url: 'https://science.nasa.gov',
      },
    },
    sources: [
      {
        publisher: 'NASA Science',
        title: 'NASA Science — Black Holes',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'ESA',
        title: 'European Space Agency',
        url: 'https://www.esa.int',
      },
    ],
  },
  {
    slug: 'nebulae',
    name: 'Nebulae',
    shortDescription: 'Vast interstellar clouds of gas and dust where stars take shape and aging stars leave luminous trails.',
    intriguingFact:
      'Nebulae are vast clouds of gas and dust in space; some act as nurseries for newborn stars while others form from material shed by dying stars.',
    heroImage: {
      src: '/src/assets/images/space_nebula_clouds_1794873113544.jpg',
      alt: 'Deep-space nebula featuring dark pillars of cosmic dust and glowing gas clouds',
      credit: 'BEYOND RELICS Observatory Visualization Slot (replace with credited NASA/ESA/STScI imagery)',
      caption: 'Luminous gas and dense dust pillars inside a star-forming nebula.',
    },
    overview: [
      'Nebulae are vast clouds of gas and dust in space. Spread across interstellar regions, they serve as both cosmic nurseries and cosmic recycling zones.',
      'Bright stars embedded within or near a nebula energize the surrounding gas, making the clouds glow, while dense dust lanes scatter or block light in dramatic silhouettes.',
    ],
    keyConcepts: [
      {
        title: 'Star-Forming Nurseries',
        description:
          'Inside dense, cold regions of a nebula, gravity pulls clumps of gas and dust together until new stars ignite.',
      },
      {
        title: 'Stellar Remnants',
        description:
          'Some nebulae form when aging stars gently shed outer layers or when massive stars end in energetic explosions.',
      },
      {
        title: 'Emission and Reflection',
        description:
          'Some nebulae emit their own light when energized by nearby stars, while others shine by reflecting starlight off dust grains.',
      },
    ],
    howScientistsStudy: [
      'Astronomers observe nebulae across multiple wavelengths—especially infrared light, which penetrates dense dust to reveal young stars forming inside.',
      'Spectroscopy identifies the elements present in the gas clouds, showing how material from older stars enriches future stellar generations.',
    ],
    gallery: [
      {
        src: '/src/assets/images/space_nebula_clouds_1794873113544.jpg',
        alt: 'Pillar-shaped cosmic dust and ionized gas nebula',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Dust pillars sculpted by radiation from bright young stars.',
      },
    ],
    didYouKnow: {
      fact: 'Dark dust clouds inside nebulae that appear opaque in visible light can become transparent in infrared images, revealing hidden young stars inside.',
      source: {
        publisher: 'Webb Space Telescope',
        title: 'Webb Space Telescope — Cosmic Origins',
        url: 'https://webbtelescope.org',
      },
    },
    sources: [
      {
        publisher: 'Webb Space Telescope',
        title: 'STScI Webb Telescope',
        url: 'https://webbtelescope.org',
      },
      {
        publisher: 'NASA Image Gallery',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
  {
    slug: 'exoplanets',
    name: 'Exoplanets',
    shortDescription: 'Worlds orbiting stars far beyond our Solar System, diverse in size, orbit, and atmosphere.',
    intriguingFact:
      'Exoplanets are planets that orbit stars other than our Sun, and astronomers often detect them by measuring tiny, repeating dips in a star’s brightness.',
    heroImage: {
      src: '/src/assets/images/space_exoplanet_horizon_1794873112920.jpg',
      alt: 'Curved blue-lit atmospheric horizon of a distant exoplanet in deep space',
      credit: 'BEYOND RELICS Observatory Visualization Slot (replace with credited NASA/ESA imagery)',
      caption: 'Observatory visualization of a distant rocky exoplanet horizon.',
    },
    overview: [
      'Exoplanets are planets that orbit stars other than our Sun. For centuries, people wondered whether other stars also hosted worlds like those in our Solar System.',
      'Modern observatories have revealed a remarkable variety of exoplanets—from gas giants orbiting close to their host stars to rocky worlds circling cooler, smaller suns.',
    ],
    keyConcepts: [
      {
        title: 'Beyond Our Solar System',
        description:
          'Unlike Earth, Mars, or Jupiter, which orbit the Sun, exoplanets belong to entirely separate stellar systems across our galaxy.',
      },
      {
        title: 'Transit Detection',
        description:
          'When an exoplanet crosses in front of its star from our viewpoint, it blocks a small fraction of starlight, leaving a detectable dip in brightness.',
      },
      {
        title: 'Gravitational Wobble',
        description:
          'A planet’s gravity tugs gently on its host star, causing the star to wobble slightly—a subtle shift astronomers can track in starlight.',
      },
      {
        title: 'Atmospheric Clues',
        description:
          'When starlight filters through an exoplanet’s atmosphere during a transit, telescopes can study which wavelengths are absorbed.',
      },
    ],
    howScientistsStudy: [
      'Space telescopes and ground-based observatories monitor starlight continuously to catch repeating transit dips and measure orbital periods.',
      'Spectrographs split light into component wavelengths to detect subtle stellar motion and examine the chemical fingerprints of planetary atmospheres.',
    ],
    gallery: [
      {
        src: '/src/assets/images/space_exoplanet_horizon_1794873112920.jpg',
        alt: 'Atmospheric horizon of a distant exoplanet',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Thin atmospheric scattering along a rocky exoplanet limb.',
      },
      {
        src: '/src/assets/images/space_planetary_system_1794873117033.jpg',
        alt: 'Planetary system orbiting a distant host star',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Worlds arranged across inner and outer orbital zones around a star.',
      },
    ],
    didYouKnow: {
      fact: 'Because stars shine vastly brighter than planets, astronomers usually discover exoplanets by watching how a planet affects its host star’s light or motion.',
      source: {
        publisher: 'NASA Exoplanets',
        title: 'NASA Exoplanet Exploration',
        url: 'https://exoplanets.nasa.gov',
      },
    },
    sources: [
      {
        publisher: 'NASA Exoplanets',
        title: 'NASA Exoplanet Exploration Portal',
        url: 'https://exoplanets.nasa.gov',
      },
      {
        publisher: 'NASA Exoplanet Archive',
        title: 'NASA Exoplanet Archive',
        url: 'https://exoplanetarchive.ipac.caltech.edu',
      },
    ],
  },
  {
    slug: 'planetary-systems',
    name: 'Planetary Systems',
    shortDescription: 'A host star together with the planets, moons, asteroids, and dust orbiting around it.',
    intriguingFact:
      'Planetary systems consist of a star together with the planets, moons, and other objects that orbit it, all shaped by gravity and orbital motion.',
    heroImage: {
      src: '/src/assets/images/space_planetary_system_1794873117033.jpg',
      alt: 'Wide view of a planetary system showing a central star, rocky and gas planets, and dust rings',
      credit: 'BEYOND RELICS Observatory Visualization Slot (replace with credited NASA/ESA imagery)',
      caption: 'A central star surrounded by orbiting worlds and dust belts.',
    },
    overview: [
      'A planetary system is a star together with the planets, moons, and other objects that orbit it. Planetary systems take shape inside disks of gas and dust surrounding newborn stars.',
      'Studying both our own Solar System and distant systems around other stars helps scientists understand how worlds form and settle into stable orbits.',
    ],
    keyConcepts: [
      {
        title: 'Born in Circumstellar Disks',
        description:
          'When a new star forms, leftover gas and dust flatten into a spinning disk where small grains gradually clump into planets.',
      },
      {
        title: 'Gravitational Choreography',
        description:
          'The central star’s gravity dominates the system, while planets and moons also interact subtly with one another along their orbits.',
      },
      {
        title: 'Diverse Architectures',
        description:
          'Other planetary systems do not always look like our Solar System—some feature tightly packed inner worlds or giant planets close to their star.',
      },
    ],
    howScientistsStudy: [
      'Planetary scientists send robotic spacecraft to explore planets, moons, asteroids, and comets in our own Solar System.',
      'Observatories also image young protoplanetary disks around newborn stars and track exoplanet orbits in distant systems.',
    ],
    gallery: [
      {
        src: '/src/assets/images/space_planetary_system_1794873117033.jpg',
        alt: 'Planetary system with orbiting worlds',
        credit: 'BEYOND RELICS Observatory Visualization Slot',
        caption: 'Multiple worlds tracing orbits around a central star.',
      },
    ],
    didYouKnow: {
      fact: 'Moons, asteroids, comets, and dust belts are all essential parts of a planetary system, preserving clues about how the system first formed.',
      source: {
        publisher: 'NASA Science',
        title: 'NASA Science — Solar System & Beyond',
        url: 'https://science.nasa.gov',
      },
    },
    sources: [
      {
        publisher: 'NASA Science',
        title: 'NASA Science — Planetary Systems',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'ESA',
        title: 'European Space Agency',
        url: 'https://www.esa.int',
      },
    ],
  },
];

export function getExploreTopicBySlug(slug: string): ExploreTopic | undefined {
  return EXPLORE_TOPICS.find((t) => t.slug === slug);
}
