import { ImageAssetInfo, SourceReference, TeamMember } from './types';

export const CHALLENGE_INFO = {
  event: 'NASA Space Apps Challenge',
  challengeName: '[CHALLENGE NAME — to be added by the team]',
};

/**
 * Team directory.
 * Replace bracketed placeholders with real member names, roles, and optional photos.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: '[TEAM MEMBER NAME]',
    role: '[ROLE — e.g., Story & Comic Illustration]',
  },
  {
    id: 'member-2',
    name: '[TEAM MEMBER NAME]',
    role: '[ROLE — e.g., Science Research & Verification]',
  },
  {
    id: 'member-3',
    name: '[TEAM MEMBER NAME]',
    role: '[ROLE — e.g., Product Design & Engineering]',
  },
  {
    id: 'member-4',
    name: '[TEAM MEMBER NAME]',
    role: '[ROLE — e.g., Educational Design & Outreach]',
  },
];

/**
 * Contact details.
 * Leave values empty to hide the contact block on the About page until real details are supplied.
 */
export const PROJECT_CONTACT = {
  email: '',
  github: '',
  website: '',
};

export interface SourceGroup {
  groupTitle: string;
  description: string;
  items: SourceReference[];
}

export const OFFICIAL_SOURCE_GROUPS: SourceGroup[] = [
  {
    groupTitle: 'NASA & Partner Observatories',
    description: 'Primary official space agency, mission archive, and observatory portals referenced across BEYOND RELICS.',
    items: [
      {
        publisher: 'NASA',
        title: 'National Aeronautics and Space Administration',
        url: 'https://www.nasa.gov',
      },
      {
        publisher: 'NASA Science',
        title: 'NASA Science — Universe, Missions & Planets',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'NASA NSSDCA',
        title: 'Apollo Lunar Roving Vehicle Archive',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html',
      },
      {
        publisher: 'NASA NSSDCA',
        title: 'Pioneer 10 & Pioneer 11 Archive',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/pioneer10-11.html',
      },
      {
        publisher: 'NASA Exoplanets',
        title: 'NASA Exoplanet Exploration',
        url: 'https://exoplanets.nasa.gov',
      },
      {
        publisher: 'NASA Exoplanet Archive',
        title: 'NASA Exoplanet Archive (Caltech/IPAC)',
        url: 'https://exoplanetarchive.ipac.caltech.edu',
      },
      {
        publisher: 'NASA Image Library',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
  {
    groupTitle: 'International Space Science & Mission Features',
    description: 'International astrophysics observatories, NASA historical features, and challenge portals.',
    items: [
      {
        publisher: 'NASA Science',
        title: 'Pioneer 11 Mission Page',
        url: 'https://science.nasa.gov/mission/pioneer-11/',
      },
      {
        publisher: 'NASA History',
        title: '45 Years Ago: Pioneer 11 Launched to Study Jupiter and Saturn',
        url: 'https://www.nasa.gov/history/45-years-ago-pioneer-11-launched-to-study-jupiter-and-saturn',
      },
      {
        publisher: 'NASA',
        title: '45 Years Ago: Pioneer 11 Explores Jupiter',
        url: 'https://www.nasa.gov/feature/45-years-ago-pioneer-11-explores-jupiter',
      },
      {
        publisher: 'NASA',
        title: '40 Years Ago: Pioneer 11 First to Explore Saturn',
        url: 'https://www.nasa.gov/feature/40-years-ago-pioneer-11-first-to-explore-saturn',
      },
      {
        publisher: 'ESA',
        title: 'European Space Agency',
        url: 'https://www.esa.int',
      },
      {
        publisher: 'STScI',
        title: 'James Webb Space Telescope Official Science Portal',
        url: 'https://webbtelescope.org',
      },
      {
        publisher: 'NASA Space Apps',
        title: 'NASA International Space Apps Challenge',
        url: 'https://www.spaceappschallenge.org',
      },
    ],
  },
];

export const IMAGE_CREDITS: ImageAssetInfo[] = [
  {
    src: '/characters/cosmo/cosmo-hero.png',
    alt: 'COSMO, the alien explorer of BEYOND RELICS',
    credit: 'Original BEYOND RELICS character artwork (provided by the team)',
    caption: 'Featured in the Home hero introducing COSMO’s cosmic exploration journey.',
  },
  {
    src: '/src/assets/images/earth_horizon_poster_1794874102848.jpg',
    alt: 'Planet Earth orbital horizon poster and 3D globe backdrop',
    credit:
      'BEYOND RELICS Procedural 3D Earth & Observatory Poster (supports team-supplied NASA Blue Marble / Visible Earth textures in /public/textures/earth/; no NASA endorsement implied)',
    caption: 'Used as the Home hero 3D Earth backdrop and static WebGL/reduced-motion fallback.',
  },
  {
    src: '/src/assets/images/space_star_photosphere_1794873116826.jpg',
    alt: 'Stellar photosphere and coronal loops',
    credit: 'Observatory space visualization slot (replace with credited NASA/ESA file in /public/explore/ if desired)',
    caption: 'Used in Stars under Explore More About Space.',
  },
  {
    src: '/src/assets/images/space_spiral_galaxy_1794873115788.jpg',
    alt: 'Grand design spiral galaxy',
    credit: 'Observatory space visualization slot (replace with credited NASA/ESA file in /public/explore/ if desired)',
    caption: 'Used in Galaxies under Explore More About Space.',
  },
  {
    src: '/src/assets/images/space_black_hole_disk_1794873113844.jpg',
    alt: 'Black hole accretion disk visualization',
    credit: 'Observatory space visualization slot (replace with credited NASA/EHT file in /public/explore/ if desired)',
    caption: 'Used in Black Holes under Explore More About Space.',
  },
  {
    src: '/src/assets/images/space_nebula_clouds_1794873113544.jpg',
    alt: 'Interstellar nebula gas and dust pillars',
    credit: 'Observatory space visualization slot (replace with credited NASA/ESA/STScI file in /public/explore/ if desired)',
    caption: 'Used in Nebulae under Explore More About Space.',
  },
  {
    src: '/src/assets/images/space_exoplanet_horizon_1794873112920.jpg',
    alt: 'Exoplanet atmospheric horizon backdrop',
    credit: 'Observatory space visualization slot (replace with credited NASA/ESA file in /public/explore/ if desired)',
    caption: 'Used in Exoplanets under Explore More About Space.',
  },
  {
    src: '/src/assets/images/space_planetary_system_1794873117033.jpg',
    alt: 'Planetary system orbiting a central star',
    credit: 'Observatory space visualization slot (replace with credited NASA/ESA file in /public/explore/ if desired)',
    caption: 'Used in Planetary Systems under Explore More About Space.',
  },
];
