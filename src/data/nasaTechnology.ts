import { NasaTechItem } from './types';

/**
 * NASA TECHNOLOGY collection (data-driven).
 * Adding a new spacecraft, instrument, or mission here automatically renders
 * its card on /explore and its full detail page at /explore/:slug.
 *
 * Historical NASA photographs:
 * Store uploaded files under /public/explore/nasa/<item-folder>/ and set `src`
 * to `/explore/nasa/<item-folder>/<filename>`. Keep `src` empty until real NASA
 * photos are added so the labeled archive slot renders without broken requests.
 */
export const NASA_TECHNOLOGY_ITEMS: NasaTechItem[] = [
  {
    slug: 'apollo-guidance-computer',
    name: 'Apollo Guidance Computer',
    categoryLabel: 'Human Spaceflight Avionics',
    eraLabel: 'Apollo Program · 1960s–1970s',
    shortDescription:
      'The onboard digital flight computer and DSKY interface that guided Apollo spacecraft to the Moon and back.',
    keyHighlight:
      'Built by the MIT Instrumentation Laboratory, the Block II AGC paired a 70-pound computer with a 17.5-pound DSKY interface using numeric Verb and Noun commands.',
    coverImage: {
      src: '/explore/nasa/apollo-guidance-computer/cover.webp',
      alt: 'Apollo Guidance Computer gold electronics enclosure positioned beside the DSKY display and keyboard unit on a light blue background',
      credit: 'NASA',
      width: 1024,
      height: 700,
      objectPosition: 'center center',
    },
    heroImage: {
      src: '/explore/nasa/apollo-guidance-computer/cover.webp',
      placeholderLabel: 'Historical NASA photograph: to be added',
      expectedFolder: '/public/explore/nasa/apollo-guidance-computer/',
      alt: 'Apollo Guidance Computer gold electronics enclosure positioned beside the DSKY display and keyboard unit on a light blue background',
      credit: 'NASA',
      caption: 'Apollo Guidance Computer (AGC) and DSKY Display and Keyboard unit.',
      width: 1024,
      height: 700,
      objectPosition: 'center center',
    },
    introParagraphs: [
      'The Apollo Guidance Computer (AGC) was a compact digital computer developed by the MIT Instrumentation Laboratory for NASA’s Apollo program.',
      'Installed aboard both the Apollo Command Module and the Lunar Module, the AGC handled real-time guidance, navigation, and spacecraft control throughout lunar missions.',
    ],
    sections: [
      {
        id: 'agc-architecture',
        title: 'Design & Main Components',
        paragraphs: [
          'The standardized Block II flight computer weighed approximately 70 pounds and used early integrated circuits to achieve compact reliability for human spaceflight.',
          'Its fixed programs were woven into non-volatile magnetic core rope memory so software instructions remained intact even if power was interrupted, paired with erasable magnetic core memory for mission data.',
        ],
        bullets: [
          {
            label: 'Block II Standardization',
            text: 'Identical Block II DSKY panels were flown across the Command Module (two units) and the Lunar Module (one unit).',
          },
          {
            label: 'DSKY Dimensions',
            text: 'Each Display and Keyboard unit measured roughly 8 × 8 × 7 inches and weighed about 17.5 pounds.',
          },
        ],
      },
      {
        id: 'agc-dsky',
        title: 'The DSKY Interface & Operation',
        paragraphs: [
          'Astronauts communicated with the computer through the DSKY (Display and Keyboard), pressing numeric codes organized around two-digit Verbs (actions to perform) and two-digit Nouns (data to inspect or modify).',
          'Indicator lights, PROCEED, ENTER, and CLEAR keys, and three illuminated multi-digit numeric registers kept crew members informed of spacecraft state during critical maneuvers.',
        ],
      },
      {
        id: 'agc-apollo-11',
        title: 'Priority Scheduling During Apollo 11',
        paragraphs: [
          'During Apollo 11’s powered lunar descent on July 20, 1969, the Lunar Module computer triggered 1202 and 1201 executive overflow alarms.',
          'Because the AGC software used priority scheduling, it preserved essential guidance and engine-control tasks while shedding lower-priority work, allowing the Eagle to complete its landing.',
        ],
      },
    ],
    gallery: [
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/apollo-guidance-computer/',
        alt: 'Apollo Block II Display and Keyboard (DSKY) panel inside a spacecraft cabin',
        credit: 'NASA',
        caption: 'Block II DSKY panel showing numeric displays and Verb/Noun keypad.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/apollo-guidance-computer/',
        alt: 'Apollo Guidance Computer hardware module prepared for spacecraft installation',
        credit: 'NASA',
        caption: 'Apollo Guidance Computer avionics enclosure.',
      },
    ],
    sources: [
      {
        publisher: 'NASA',
        title: 'National Aeronautics and Space Administration',
        url: 'https://www.nasa.gov',
      },
      {
        publisher: 'NASA Science',
        title: 'NASA Science',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'NASA Image Library',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
  {
    slug: 'kepler-space-telescope',
    name: 'Kepler Space Telescope',
    categoryLabel: 'Exoplanet Observatory',
    eraLabel: '2009–2018',
    shortDescription:
      'NASA’s dedicated planet-hunting space telescope that revealed thousands of worlds orbiting other stars.',
    keyHighlight:
      'Launched on March 7, 2009 and retired on October 30, 2018, Kepler monitored over 150,000 stars via transit photometry, proving planets outnumber stars in our galaxy.',
    coverImage: {
      src: '/explore/nasa/kepler-space-telescope/cover.webp',
      alt: 'Kepler Space Telescope floating in starry space with golden thermal blankets, solar array, and the Earth and Moon in the background',
      credit: 'NASA',
      width: 1024,
      height: 750,
      objectPosition: 'center center',
    },
    heroImage: {
      src: '/explore/nasa/kepler-space-telescope/cover.webp',
      placeholderLabel: 'Historical NASA photograph: to be added',
      expectedFolder: '/public/explore/nasa/kepler-space-telescope/',
      alt: 'Kepler Space Telescope floating in starry space with golden thermal blankets, solar array, and the Earth and Moon in the background',
      credit: 'NASA',
      caption: 'NASA Kepler Space Telescope observatory.',
      width: 1024,
      height: 750,
      objectPosition: 'center center',
    },
    introParagraphs: [
      'The Kepler Space Telescope was a NASA space observatory built to survey a region of the Milky Way to discover Earth-size and smaller planets orbiting in or near the habitable zones of Sun-like stars.',
      'Launched on March 7, 2009, Kepler operated in deep space for more than nine years before NASA retired the spacecraft on October 30, 2018 after it depleted its fuel.',
    ],
    sections: [
      {
        id: 'kepler-photometer',
        title: 'Spacecraft & Photometer Design',
        paragraphs: [
          'Rather than capturing detailed photographs of planets themselves, Kepler carried a specialized wide-field photometer engineered to measure tiny, continuous variations in starlight.',
          'During its prime mission, the telescope stared steadily at more than 150,000 main-sequence stars in a fixed patch of sky spanning the constellations Cygnus and Lyra.',
        ],
      },
      {
        id: 'kepler-transits',
        title: 'The Transit Photometry Method',
        paragraphs: [
          'Kepler detected exoplanets using the transit method: when an orbiting planet crosses directly in front of its host star along our line of sight, it blocks a small fraction of starlight.',
          'Measuring repeating brightness dips allowed astronomers to calculate each planet’s orbital period and infer its size relative to its host star.',
        ],
      },
      {
        id: 'kepler-k2-legacy',
        title: 'Prime Mission, K2 & Scientific Legacy',
        paragraphs: [
          'After mechanical reaction-wheel failures ended prime pointing stability in 2013, engineers repurposed the observatory for the extended K2 mission using solar radiation pressure for stabilization across different regions along the ecliptic plane.',
          'Across its prime and K2 missions, Kepler discovered thousands of confirmed exoplanets and demonstrated that planets outnumber stars across our galaxy.',
        ],
      },
    ],
    gallery: [
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/kepler-space-telescope/',
        alt: 'Kepler Space Telescope photometer assembly during spacecraft testing',
        credit: 'NASA',
        caption: 'Kepler spacecraft hardware prior to launch.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/kepler-space-telescope/',
        alt: 'Kepler launch vehicle liftoff in March 2009',
        credit: 'NASA',
        caption: 'Launch of the Kepler mission on March 7, 2009.',
      },
    ],
    sources: [
      {
        publisher: 'NASA Science',
        title: 'NASA Science',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'NASA Exoplanets',
        title: 'NASA Exoplanet Exploration',
        url: 'https://exoplanets.nasa.gov',
      },
      {
        publisher: 'NASA Image Library',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
  {
    slug: 'sojourner-rover',
    name: 'Sojourner Rover',
    categoryLabel: 'Mars Surface Robotics',
    eraLabel: 'Mars Pathfinder · 1997',
    shortDescription:
      'The first wheeled robotic rover to operate on Mars, demonstrating mobile surface science on another planet.',
    keyHighlight:
      'Landing on July 4, 1997 with Mars Pathfinder, the six-wheeled Sojourner rover operated for 83 sols (85 Earth days) and traveled more than 100 meters.',
    coverImage: {
      src: '/explore/nasa/sojourner-rover/cover.webp',
      alt: 'Six-wheeled robotic rover on the reddish-brown Martian surface with camera mast and solar panel array deployed',
      credit: 'NASA',
      width: 1024,
      height: 819,
      objectPosition: 'center 40%',
    },
    heroImage: {
      src: '/explore/nasa/sojourner-rover/cover.webp',
      placeholderLabel: 'Historical NASA photograph: to be added',
      expectedFolder: '/public/explore/nasa/sojourner-rover/',
      alt: 'Six-wheeled robotic rover on the reddish-brown Martian surface with camera mast and solar panel array deployed',
      credit: 'NASA',
      caption: 'Sojourner rover inspecting Martian rocks during Mars Pathfinder.',
      width: 1024,
      height: 819,
      objectPosition: 'center 40%',
    },
    introParagraphs: [
      'Sojourner was the robotic rover carried by NASA’s Mars Pathfinder mission, which landed on Mars on July 4, 1997.',
      'As the first wheeled vehicle to operate on another planet, Sojourner established the mobility and engineering foundations for NASA’s subsequent Mars rovers.',
    ],
    sections: [
      {
        id: 'sojourner-mobility',
        title: 'Six-Wheel Rocker-Bogie Mobility',
        paragraphs: [
          'Sojourner rolled on six independently driven aluminum wheels fitted with stainless steel cleats mounted to a rocker-bogie suspension.',
          'This suspension geometry kept all six wheels in contact with uneven terrain while allowing the compact rover to climb over rocky obstacles higher than 20 centimeters (8 inches).',
        ],
      },
      {
        id: 'sojourner-apxs',
        title: 'Scientific Instruments & APXS',
        paragraphs: [
          'Mounted on the rear of the rover was the Alpha Proton X-Ray Spectrometer (APXS), which pressed gently against Martian rocks and soil to determine their elemental chemical composition.',
          'Forward cameras and laser hazard-avoidance sensors also returned surface imagery and assisted autonomous obstacle navigation.',
        ],
      },
      {
        id: 'sojourner-endurance',
        title: 'Mission Endurance',
        paragraphs: [
          'Originally planned as a 7-sol technology demonstration, Sojourner operated on Mars for 83 sols (85 Earth days), traveling more than 100 meters before the mission’s final transmission in late September 1997.',
        ],
      },
    ],
    gallery: [
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/sojourner-rover/',
        alt: 'Sojourner rover positioned beside a Martian boulder with APXS deployed',
        credit: 'NASA',
        caption: 'Sojourner analyzing Martian rock composition with the APXS.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/sojourner-rover/',
        alt: 'Mars Pathfinder lander petals and Sojourner tracks on the Martian surface',
        credit: 'NASA',
        caption: 'Sojourner driving off the Mars Pathfinder lander ramp.',
      },
    ],
    sources: [
      {
        publisher: 'NASA Science',
        title: 'NASA Science',
        url: 'https://science.nasa.gov',
      },
      {
        publisher: 'NASA',
        title: 'National Aeronautics and Space Administration',
        url: 'https://www.nasa.gov',
      },
      {
        publisher: 'NASA Image Library',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
  {
    slug: 'lunar-roving-vehicles',
    name: 'Lunar Roving Vehicles',
    categoryLabel: 'Lunar Surface Mobility',
    eraLabel: 'Apollo 15, 16 & 17 · 1971–1972',
    shortDescription:
      'Electric, foldable lunar rovers built for Apollo 15, 16, and 17 astronauts to explore kilometers across the Moon.',
    keyHighlight:
      'Used on Apollo 15, 16, and 17, each 210 kg electric rover carried two astronauts and equipment up to 490 kg across rough lunar terrain at speeds up to ~16 km/h.',
    coverImage: {
      src: '/explore/nasa/lunar-roving-vehicles/cover.webp',
      alt: 'Apollo Lunar Roving Vehicle parked on the lunar surface with two astronauts seated in white spacesuits',
      credit: 'NASA',
      width: 1024,
      height: 682,
      objectPosition: 'center center',
    },
    heroImage: {
      src: '/explore/nasa/lunar-roving-vehicles/cover.webp',
      placeholderLabel: 'Historical NASA photograph: to be added',
      expectedFolder: '/public/explore/nasa/lunar-roving-vehicles/',
      alt: 'Apollo Lunar Roving Vehicle parked on the lunar surface with two astronauts seated in white spacesuits',
      credit: 'NASA',
      caption: 'Apollo Lunar Roving Vehicle deployed on the Moon.',
      width: 1024,
      height: 682,
      objectPosition: 'center center',
    },
    introParagraphs: [
      'The Apollo Lunar Roving Vehicle (LRV) was an electric, four-wheeled vehicle built to carry Apollo 15, Apollo 16, and Apollo 17 astronauts—along with their life-support gear, cameras, tools, and rock samples—across the lunar surface.',
      'Managed by NASA’s Marshall Space Flight Center with prime contractor Boeing and major subcontractor Delco, the flight rovers were designed, built, tested, and delivered in 17 months.',
    ],
    sections: [
      {
        id: 'lrv-design',
        title: 'Design & Main Components',
        paragraphs: [
          'The LRV had an empty mass of 210 kg and was engineered to carry a total operational payload of 490 kg on the Moon.',
          'Its chassis was a three-part foldable frame built from aluminum alloy 2219 tubing, measuring 3.1 meters long with a 2.3-meter wheelbase and a maximum height of 1.14 meters. The entire vehicle folded compactly into Quad 1 of the Lunar Module descent stage and could be deployed by a single astronaut.',
        ],
        bullets: [
          {
            label: 'Empty Mass & Payload',
            text: '210 kg empty mass; engineered to carry 490 kg of crew, equipment, and lunar samples.',
          },
          {
            label: 'Foldable Frame',
            text: 'Three-part aluminum alloy 2219 chassis stored inside Lunar Module descent stage bay Quad 1.',
          },
        ],
      },
      {
        id: 'lrv-mobility',
        title: 'Mobility System & Wheels',
        paragraphs: [
          'Instead of air-filled rubber tires, which would burst or degrade in the lunar vacuum and extreme temperatures, each of the four wheels used a spun aluminum hub surrounded by a woven mesh of zinc-coated piano wire fitted with titanium tread strips in a chevron pattern.',
          'Each wheel measured 82 cm (32 inches) in diameter and 23 cm (9 inches) wide and was powered independently by a 0.25-horsepower direct-current electric motor through a harmonic drive reduction unit, giving the LRV a top speed of roughly 16 km/h (10 mph) on flat terrain.',
        ],
      },
      {
        id: 'lrv-operation',
        title: 'Operation & Handcontroller',
        paragraphs: [
          'The rover had no traditional steering wheel or floor pedals. Both speed and steering were controlled from a single T-bar handcontroller mounted between the two crew seats so either astronaut could drive.',
          'Pushing the T-bar forward accelerated the vehicle, tilting it left or right steered the front and rear wheels, and pulling it back engaged dynamic and parking brakes; releasing the controller automatically returned it to neutral and applied the brakes.',
        ],
      },
      {
        id: 'lrv-exploration-range',
        title: 'Expanding Lunar Exploration Range',
        paragraphs: [
          'On earlier Apollo landings without a rover, astronauts explored on foot within walking distance of the Lunar Module. Carrying crew members and scientific tools aboard the LRV dramatically increased both traverse distance and sample capacity during each three-day lunar stay.',
          'As a safety rule documented by NASA, astronauts were not permitted to drive farther from the Lunar Module than the distance they could safely walk back if the vehicle broke down.',
        ],
      },
    ],
    notableMissions: {
      sectionTitle: 'Notable Missions & Achievements',
      intro:
        'Each flight LRV supported three separate geology traverses during its mission stay. Distance and driving figures below are recorded in NASA’s NSSDCA Lunar Roving Vehicle archive.',
      items: [
        {
          id: 'lrv-apollo-15',
          title: 'Apollo 15',
          subtitle: 'Drivers: David Scott & Jim Irwin',
          summary:
            'First crewed deployment of the Lunar Roving Vehicle, enabling astronauts to investigate the Hadley-Apennine region across three traverses.',
          highlights: [
            'Total distance traversed: 27.8 km',
            'Total driving time: 3 hours, 2 minutes',
            'Longest single traverse: 12.5 km',
            'Maximum range from Lunar Module: 5.0 km',
          ],
        },
        {
          id: 'lrv-apollo-16',
          title: 'Apollo 16',
          subtitle: 'Drivers: John Young & Charles Duke',
          summary:
            'Second LRV deployment in the Descartes Highlands, transporting crew and geological tools across rugged lunar highland terrain.',
          highlights: [
            'Total distance traversed: 26.7 km',
            'Total driving time: 3 hours, 26 minutes',
            'Longest single traverse: 11.6 km',
            'Maximum range from Lunar Module: 4.5 km',
          ],
        },
        {
          id: 'lrv-apollo-17',
          title: 'Apollo 17',
          subtitle: 'Drivers: Gene Cernan & Harrison Schmitt',
          summary:
            'Final Apollo mission and longest LRV expedition, exploring the Taurus-Littrow valley across three extended traverses.',
          highlights: [
            'Total distance traversed: 35.9 km',
            'Total driving time: 4 hours, 26 minutes',
            'Longest single traverse: 20.1 km',
            'Maximum range from Lunar Module: 7.6 km',
          ],
        },
      ],
    },
    gallery: [
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/lunar-roving-vehicle/',
        alt: 'Apollo 15 Lunar Roving Vehicle on the lunar surface near Hadley Rille',
        credit: 'NASA',
        caption: 'Apollo 15 Lunar Roving Vehicle during lunar surface operations.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/lunar-roving-vehicle/',
        alt: 'Apollo 16 Lunar Roving Vehicle parked in the Descartes Highlands',
        credit: 'NASA',
        caption: 'Apollo 16 Lunar Roving Vehicle showing wire-mesh wheels and high-gain antenna.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/lunar-roving-vehicle/',
        alt: 'Apollo 17 Lunar Roving Vehicle in the Taurus-Littrow valley',
        credit: 'NASA',
        caption: 'Apollo 17 Lunar Roving Vehicle during final geological traverse.',
      },
    ],
    sources: [
      {
        publisher: 'NASA NSSDCA',
        title: 'Apollo Lunar Roving Vehicle Archive',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html',
      },
      {
        publisher: 'NASA Image Library',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
  {
    slug: 'pioneer-10-11',
    name: 'Pioneer 10 & 11',
    categoryLabel: 'Outer Solar System Probes',
    eraLabel: '1972–2003',
    shortDescription:
      'Twin NASA robotic scouts that crossed the asteroid belt first, explored Jupiter and Saturn, and carry the Pioneer Plaque.',
    keyHighlight:
      'Pioneer 10 became the first spacecraft to fly past Jupiter (Dec 1973); twin probe Pioneer 11 explored Jupiter (Dec 1974) and became the first spacecraft to visit Saturn (Sept 1, 1979).',
    coverImage: {
      src: '/explore/nasa/pioneer-10-11/cover.webp',
      alt: 'Pioneer spacecraft with large high-gain dish antenna and instrument booms in starry space beside the swirling atmosphere of Jupiter',
      credit: 'NASA',
      width: 1024,
      height: 686,
      objectPosition: 'center center',
    },
    heroImage: {
      src: '/explore/nasa/pioneer-10-11/cover.webp',
      placeholderLabel: 'Historical NASA photograph: to be added',
      expectedFolder: '/public/explore/nasa/pioneer-10-11/',
      alt: 'Pioneer spacecraft with large high-gain dish antenna and instrument booms in starry space beside the swirling atmosphere of Jupiter',
      credit: 'NASA',
      caption: 'Twin Pioneer outer-planet spacecraft showing its high-gain dish antenna.',
      width: 1024,
      height: 686,
      objectPosition: 'center center',
    },
    introParagraphs: [
      'Pioneer 10 and Pioneer 11 were twin robotic NASA spacecraft designed to brave the asteroid belt for the first time and perform humanity’s opening close-up survey of the outer Solar System.',
      'Originally built as Pioneer 10’s identical backup, Pioneer 11 was retargeted after Pioneer 10’s success at Jupiter to use Jupiter’s gravity for a dramatic trajectory swing across the Solar System to Saturn.',
    ],
    sections: [
      {
        id: 'pioneer-design',
        title: 'Spacecraft Design & Main Components',
        paragraphs: [
          'Both probes were spin-stabilized spacecraft centered around a large parabolic high-gain dish antenna used to beam faint radio signals back across billions of kilometers to Earth.',
          'Because sunlight grows far too weak in the outer Solar System for solar arrays, both spacecraft were powered by four SNAP-19 radioisotope thermoelectric generators (RTGs). Pioneer 11 also carried an additional triaxial fluxgate magnetometer not flown on Pioneer 10 to measure intense planetary magnetic fields.',
        ],
      },
      {
        id: 'pioneer-instruments',
        title: 'Scientific Instruments Carried',
        paragraphs: [
          'Both spacecraft carried a suite of lightweight instruments built to study magnetic fields, solar wind plasma, radiation belts, cosmic rays, micrometeoroids, and planetary atmospheres:',
        ],
        bullets: [
          {
            label: 'Imaging & Thermal',
            text: 'Imaging Photopolarimeter (IPP), Infrared Radiometer, and Ultraviolet Photometer.',
          },
          {
            label: 'Magnetospheres & Plasma',
            text: 'Helium Vector Magnetometer (HVM), Quadrispherical Plasma Analyzer, and (on Pioneer 11) a Triaxial Fluxgate Magnetometer.',
          },
          {
            label: 'Radiation & Cosmic Rays',
            text: 'Charged Particle Instrument (CPI), Cosmic Ray Telescope (CRT), Geiger Tube Telescope (GTT), and Trapped Radiation Detector (TRD).',
          },
          {
            label: 'Dust & Meteoroids',
            text: 'Sisyphus Asteroid/Meteoroid Detector (AMD) and pressure-cell Meteoroid Detectors.',
          },
        ],
      },
      {
        id: 'pioneer-objectives',
        title: 'Mission Objectives',
        paragraphs: [
          'Key engineering and scientific goals included proving whether a spacecraft could pass safely through the asteroid belt without catastrophic micrometeoroid damage, mapping Jupiter’s intense radiation environment ahead of later missions, studying the solar wind far from the Sun, and—for Pioneer 11—testing a safe passage near Saturn’s rings.',
        ],
      },
    ],
    parallelMissions: {
      sectionTitle: 'Twin Probes, Distinct Outer-Planet Journeys',
      left: {
        id: 'pioneer-10-card',
        title: 'Pioneer 10: Jupiter',
        subtitle: 'Launched March 2, 1972 (01:49:04 UT)',
        summary:
          'Launched from Cape Canaveral Launch Complex 36A aboard an Atlas-Centaur vehicle, Pioneer 10 became the first spacecraft to cross the asteroid belt and fly past Jupiter (closest approach December 3–4, 1973 UT).',
        highlights: [
          'Returned the first close-up images of Jupiter and charted its intense radiation belts and magnetosphere.',
          'Became the first human-made object placed on an escape trajectory out of the Solar System.',
          'Routine science operations ended March 31, 1997; NASA’s Deep Space Network detected its last faint signal on January 23, 2003.',
        ],
      },
      right: {
        id: 'pioneer-11-card',
        title: 'Pioneer 11: Jupiter and Saturn',
        subtitle: 'Launched April 6, 1973 UTC (April 5 local time)',
        summary:
          'Launched from Cape Canaveral Launch Complex 36B aboard an Atlas-Centaur (AC-30), Pioneer 11 flew past Jupiter in December 1974 (Dec 2–3, 1974 UT) and swung onward to make the first spacecraft encounter with Saturn on September 1, 1979.',
        highlights: [
          'Passed three times closer to Jupiter’s cloud tops than Pioneer 10, returning the first images of Jupiter’s polar regions and detailed views of the Great Red Spot.',
          'Passed within 21,000 kilometers (13,000 miles) of Saturn’s cloud tops, discovering Saturn’s faint F ring and testing ring-plane safety for Voyager.',
          'Routine mission operations ended September 30, 1995, with final engineering data received on November 24, 1995.',
        ],
      },
    },
    comparisonTable: {
      sectionTitle: 'Pioneer 10 vs Pioneer 11',
      leftHeader: 'Pioneer 10',
      rightHeader: 'Pioneer 11',
      rows: [
        {
          feature: 'Launch Date (NASA UT/UTC)',
          leftValue: 'March 2, 1972 at 01:49:04 UT',
          rightValue: 'April 6, 1973 at 02:11:00 UTC (April 5 in US local summaries)',
        },
        {
          feature: 'Launch Site & Vehicle',
          leftValue: 'Cape Canaveral Launch Complex 36A · Atlas-Centaur',
          rightValue: 'Cape Canaveral Launch Complex 36B · Atlas-Centaur (AC-30)',
        },
        {
          feature: 'Outer Planets Visited',
          leftValue: 'Jupiter (December 3–4, 1973 UT)',
          rightValue: 'Jupiter (December 2–3, 1974 UT) & Saturn (September 1, 1979)',
        },
        {
          feature: 'Key Historical Firsts',
          leftValue: 'First spacecraft to cross the asteroid belt, fly past Jupiter, and enter a solar-system escape trajectory',
          rightValue: 'First close-up views of Jupiter’s polar regions; first spacecraft to fly past Saturn and discover the F ring',
        },
        {
          feature: 'End of Mission / Last Contact',
          leftValue: 'Routine science ended March 31, 1997; last faint signal received January 23, 2003',
          rightValue: 'Routine contact ended September 30, 1995; final engineering data received November 24, 1995',
        },
      ],
    },
    artifactSpotlight: {
      sectionTitle: 'Symbolic Interstellar Message',
      title: 'The Pioneer Plaque',
      paragraphs: [
        'Both Pioneer 10 and Pioneer 11 carry an identical gold-anodized aluminum plaque bolted to their antenna support struts, intended as a greeting and cosmic map for any intelligent civilization that might someday encounter the spacecraft in interstellar space.',
        'Conceived by astronomer Carl Sagan and astronomer Frank Drake, with scientific artwork drawn by Linda Salzman Sagan, the engraved diagram encodes human scale and Earth’s location using universal astrophysical reference markers.',
      ],
      elementsList: [
        'Line drawings of a human man and woman standing beside an outline of the Pioneer spacecraft for scale.',
        'A schematic of the hyperfine transition of neutral hydrogen, providing a universal physical unit of length and time.',
        'A radial pulsar map showing the direction and timing frequencies of 14 pulsars to pinpoint the Sun’s position in the Milky Way.',
        'A diagram of our Solar System illustrating the spacecraft’s trajectory departing Earth and passing Jupiter.',
      ],
    },
    gallery: [
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/pioneer-10-11/',
        alt: 'NASA archival photograph of Pioneer 10 / 11 spacecraft assembly with dish antenna and RTG booms',
        credit: 'NASA',
        caption: 'Pioneer spacecraft configuration with parabolic dish and SNAP-19 RTG booms.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/pioneer-10-11/',
        alt: 'Gold-anodized aluminum Pioneer Plaque carried by Pioneer 10 and Pioneer 11',
        credit: 'NASA',
        caption: 'The Pioneer Plaque designed by Carl Sagan, Frank Drake, and Linda Salzman Sagan.',
      },
      {
        src: '',
        placeholderLabel: 'Historical NASA photograph: to be added',
        expectedFolder: '/public/explore/nasa/pioneer-10-11/',
        alt: 'Pioneer 11 archival close-up image of Saturn and its rings captured in September 1979',
        credit: 'NASA',
        caption: 'Pioneer 11 Saturn encounter archive image (1979).',
      },
    ],
    sources: [
      {
        publisher: 'NASA NSSDCA',
        title: 'Pioneer 10 & Pioneer 11 Archive',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/pioneer10-11.html',
      },
      {
        publisher: 'NASA Science',
        title: 'Pioneer 11 Mission Overview',
        url: 'https://science.nasa.gov/mission/pioneer-11/',
      },
      {
        publisher: 'NASA',
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
        publisher: 'NASA Image Library',
        title: 'NASA Image and Video Library',
        url: 'https://images.nasa.gov',
      },
    ],
  },
];

export function getNasaTechBySlug(slug: string): NasaTechItem | undefined {
  return NASA_TECHNOLOGY_ITEMS.find((item) => item.slug === slug);
}
