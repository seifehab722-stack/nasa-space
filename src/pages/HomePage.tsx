import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Camera,
  Compass,
  Cpu,
  Rocket,
  Sparkles,
  Telescope,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { CosmoPlaceholderFrame } from '../components/ui/CosmoPlaceholderFrame';
import { SectionHeader } from '../components/ui/SectionHeader';
import { getPublishedChapters } from '../data/comic';
import { NASA_TECHNOLOGY_ITEMS } from '../data/nasaTechnology';
import { useProgress } from '../store/progressStore';
import { launchImmersiveReader } from '../utils/readerLaunch';
import { usePageMeta } from '../utils/seo';

const Earth3DCanvas = lazy(() =>
  import('../components/features/Earth3DCanvas').then((m) => ({ default: m.Earth3DCanvas }))
);

const GOALS = [
  {
    icon: BookOpen,
    title: 'Make space science accessible',
    description:
      'Translate big astronomical ideas into clear visual sequences that welcome students and curious readers alike.',
  },
  {
    icon: Rocket,
    title: 'Spotlight real NASA missions',
    description:
      'Connect COSMO’s journey with historic spacecraft, computers, telescopes, and planetary rovers built for exploration.',
  },
  {
    icon: Compass,
    title: 'Learn through visual discovery',
    description:
      'Explore cosmic destinations and mission archives at your own pace with sourced NASA facts and visual context.',
  },
  {
    icon: Telescope,
    title: 'Inspire lasting curiosity',
    description:
      'Invite young explorers to move from reading a story to asking how engineers and astronomers study the universe.',
  },
];

interface ShootingStreak {
  id: number;
  top: string;
  left: string;
}

export const HomePage: React.FC = () => {
  usePageMeta({
    title: 'BEYOND RELICS — Discover the Universe. Uncover Its Secrets.',
    description:
      'BEYOND RELICS is an educational scientific comic and interactive space exploration platform following COSMO across the universe.',
    path: '/',
  });

  const navigate = useNavigate();
  const { state, setMissionLogOpen } = useProgress();
  const [scrollRatio, setScrollRatio] = useState(0);
  const [earth3DReady, setEarth3DReady] = useState(false);
  const [usePosterOnly, setUsePosterOnly] = useState(false);
  const [mount3D, setMount3D] = useState(false);
  const [streak, setStreak] = useState<ShootingStreak | null>(null);

  const chapter1 = getPublishedChapters()[0];
  const readComicTarget = state.lastRead
    ? `/comic/${state.lastRead.chapterSlug}/${state.lastRead.pageNumber}`
    : '/comic/chapter-01/1';

  // Defer 3D initialization slightly so poster & text paint first
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setUsePosterOnly(true);
      return;
    }
    const timer = window.setTimeout(() => setMount3D(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  // Scroll drift (max ~8%) and pure-black transition darkening
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onScroll = () => {
      const vh = Math.max(1, window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / vh));
      setScrollRatio(ratio);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Subtle shooting-star streak every 9-14 seconds (disabled for reduced motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let timeoutId = 0;
    let clearId = 0;
    const spots = [
      { top: '18%', left: '78%' },
      { top: '26%', left: '28%' },
      { top: '14%', left: '62%' },
    ];
    let counter = 0;

    const scheduleStreak = () => {
      const delay = 9000 + (counter % 3) * 2400;
      timeoutId = window.setTimeout(() => {
        const spot = spots[counter % spots.length];
        counter += 1;
        setStreak({ id: counter, top: spot.top, left: spot.left });
        clearId = window.setTimeout(() => setStreak(null), 1400);
        scheduleStreak();
      }, delay);
    };

    scheduleStreak();
    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(clearId);
    };
  }, []);

  const earthDriftY = scrollRatio * 44; // subtle downward drift
  const earthScale = 1 + scrollRatio * 0.07; // <= 8% scale

  return (
    <div className="relative z-10">
      {/* 1. FULL-VIEWPORT HERO ON NEAR-BLACK WITH 3D EARTH HORIZON */}
      <section
        aria-label="Introduction"
        className="relative min-h-screen -mt-16 sm:-mt-[72px] pt-24 sm:pt-28 pb-44 sm:pb-24 flex flex-col items-center justify-start overflow-hidden"
      >
        {/* Pure black edge & bottom vignette ensuring >= 75% black dominance while letting sparse stars show */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 78% 68% at 50% 46%, rgba(5, 8, 13, 0.15) 0%, rgba(0, 0, 0, 0.86) 80%)',
          }}
          aria-hidden="true"
        />

        {/* Faint micro-grid (<= 2.5% opacity) */}
        <div
          className="hero-micro-grid pointer-events-none absolute inset-0 z-0 opacity-70"
          aria-hidden="true"
        />

        {/* Rare subtle shooting star streak */}
        {streak && (
          <span
            key={streak.id}
            style={{ top: streak.top, left: streak.left }}
            className="shooting-star pointer-events-none absolute z-[2] h-[1.5px] w-24 rounded-full bg-gradient-to-r from-[#EAF4FF] via-[#35D5F2]/70 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Earth Layer: Static Poster immediate + 3D Three.js Earth cross-fading in */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          style={{
            transform: `translate3d(0, ${earthDriftY}px, 0) scale(${earthScale})`,
            transformOrigin: '50% 78%',
          }}
          aria-hidden="true"
        >
          {/* Static high-quality Earth poster (immediate paint + reduced-motion / WebGL fallback) */}
          <div
            className={`absolute inset-0 flex items-end justify-center transition-opacity duration-700 ${
              earth3DReady && !usePosterOnly ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <img
              src="/src/assets/images/earth_horizon_poster_1794874102848.jpg"
              alt=""
              className="w-[140vw] sm:w-[110vw] md:w-full max-w-none h-[58vh] sm:h-[62vh] md:h-[66vh] object-cover object-top opacity-95"
            />
          </div>

          {/* Real 3D Three.js Earth */}
          {mount3D && !usePosterOnly && (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                earth3DReady ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Suspense fallback={null}>
                <Earth3DCanvas
                  onReady={() => setEarth3DReady(true)}
                  onFallback={() => setUsePosterOnly(true)}
                />
              </Suspense>
            </div>
          )}
        </div>

        {/* Seamless pure black bottom transition + scroll darkening */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 sm:h-36 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[6] bg-[#000000] transition-opacity duration-150"
          style={{ opacity: scrollRatio * 0.72 }}
          aria-hidden="true"
        />

        {/* Centered Typography & Pill Controls Above the Earth */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 text-center sm:px-6">
          <h1 className="font-display font-light uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[40px] sm:text-[62px] lg:text-[78px] leading-[1.06] text-[#EAF4FF] select-none">
            <span>BEYOND </span>
            <span className="bg-gradient-to-r from-[#EAF4FF] via-[#EAF4FF]/75 to-[#EAF4FF]/40 bg-clip-text text-transparent">
              RELICS
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 font-display text-sm sm:text-base font-medium tracking-[0.04em] text-[#35D5F2]">
            Discover the Universe. Uncover Its Secrets.
          </p>

          <p className="mt-3 max-w-[66ch] text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#EAF4FF]/74">
            An educational scientific comic following COSMO across distant worlds.
            <br className="hidden sm:inline" /> Explore real NASA spacecraft and verified cosmic discoveries alongside the story.
          </p>

          {/* Hero CTA Pills */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/explore"
              className="group inline-flex h-11 sm:h-12 items-center gap-4 rounded-full border border-[#EAF4FF]/24 bg-[#05080D]/90 pl-5 pr-1.5 text-xs sm:text-sm font-medium tracking-[0.06em] text-[#EAF4FF] backdrop-blur-md transition-all duration-200 hover:border-[#35D5F2]/60 hover:shadow-[0_0_28px_rgba(22,119,255,0.42)] whitespace-nowrap shrink-0"
            >
              <span>START EXPLORING</span>
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[10px] bg-[#1677FF] text-[#EAF4FF] shadow-[0_0_14px_rgba(22,119,255,0.55)] transition-transform duration-200 group-hover:scale-105">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => launchImmersiveReader(navigate, readComicTarget, '/')}
              className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full border border-[#EAF4FF]/45 bg-transparent px-6 text-xs sm:text-sm font-medium tracking-[0.04em] text-[#EAF4FF] transition-all duration-200 hover:border-[#EAF4FF]/85 hover:bg-[#0A1626]/55 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
              <span>{state.lastRead ? 'CONTINUE THE COMIC' : 'READ THE COMIC'}</span>
            </button>
          </div>
        </div>

        {/* COSMO Floating in Lower Right, Slightly Overlapping Earth Edge */}
        <div className="cosmo-float pointer-events-none absolute -bottom-1.5 right-3 sm:right-7 lg:right-12 z-20 w-[138px] sm:w-[184px] lg:w-[clamp(210px,21vw,290px)]">
          <CosmoPlaceholderFrame variant="hero-float" className="w-full" />
        </div>
      </section>

      {/* 2. PROJECT GOALS */}
      <section
        id="project-goals"
        className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 border-t border-[#EAF4FF]/8"
      >
        <SectionHeader
          eyebrow="Project Goals"
          title="Built for Curiosity and Scientific Clarity"
          description="Four principles guide every page of COSMO’s expedition and every NASA hardware archive on the platform."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            return (
              <Card key={goal.title} className="p-6 flex flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#35D5F2]/20 bg-[#0A1626] text-[#35D5F2]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#EAF4FF]">
                  {goal.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#EAF4FF]/72 leading-relaxed">
                  {goal.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. PLATFORM HIGHLIGHTS */}
      <section className="border-y border-[#EAF4FF]/10 bg-[#05080D]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeader
            eyebrow="Platform Pillars"
            title="Three Connected Ways to Explore"
            description="Move fluidly between full-screen comic storytelling, historic NASA engineering archives, and foundational space topics."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <Card interactive className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <Chip variant="cyan" className="mb-4">
                  Pillar 01
                </Chip>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF]">
                  The Comic Universe
                </h3>
                <p className="mt-3 text-base text-[#EAF4FF]/78 leading-relaxed max-w-[54ch]">
                  Read COSMO’s expedition inside an immersive, full-screen comic reader built to preserve every page’s exact proportions, with pinch and wheel zoom, keyboard shortcuts, and seamless chapter navigation.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#35D5F2]/12 flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#EAF4FF]/55">
                  Full-screen aspect-preserving reader
                </span>
                <Button to="/comic" size="sm">
                  <span>Open Library</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </Card>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <Card interactive className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <Chip variant="blue" className="mb-3">
                    Pillar 02
                  </Chip>
                  <h3 className="font-display text-xl font-semibold text-[#EAF4FF]">
                    NASA Technology Archive
                  </h3>
                  <p className="mt-2 text-sm text-[#EAF4FF]/74 leading-relaxed">
                    Inspect real NASA computers, telescopes, rovers, and outer-planet probes—from the Apollo Guidance Computer and Kepler to Pioneer 10 &amp; 11—alongside verified mission records.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#35D5F2] hover:underline"
                  >
                    <span>Explore NASA Technology</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Card>

              <Card interactive className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <Chip variant="blue" className="mb-3">
                    Pillar 03
                  </Chip>
                  <h3 className="font-display text-xl font-semibold text-[#EAF4FF]">
                    Space Topics &amp; Mission Log
                  </h3>
                  <p className="mt-2 text-sm text-[#EAF4FF]/74 leading-relaxed">
                    Discover foundational astrophysics—Stars, Galaxies, Black Holes, Nebulae, Exoplanets, and Planetary Systems—while tracking your progress and badges locally.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => setMissionLogOpen(true)}>
                    <Award className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
                    <span>View Mission Log</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COMIC PREVIEW */}
      {chapter1 && (
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Card className="overflow-hidden border-[#35D5F2]/20">
            <div className="grid items-center lg:grid-cols-12">
              <div className="lg:col-span-5 bg-[#000000] p-6 sm:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#35D5F2]/12">
                <img
                  src={chapter1.coverImage}
                  alt={chapter1.coverAlt}
                  loading="lazy"
                  className="max-h-[380px] w-auto rounded-[12px] border border-[#35D5F2]/22 object-contain shadow-[0_18px_50px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12">
                <Chip variant="cyan" className="mb-4">
                  Featured Chapter
                </Chip>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#EAF4FF]">
                  Chapter {chapter1.number}: {chapter1.title}
                </h2>
                <p className="mt-3 text-base text-[#EAF4FF]/78 leading-relaxed max-w-[56ch]">
                  {chapter1.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-[#EAF4FF]/60">
                  <span>{chapter1.pages.length} pages</span>
                  <span aria-hidden="true">·</span>
                  <span>Full-screen reader</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => launchImmersiveReader(navigate, `/comic/${chapter1.slug}/1`, '/')}
                  >
                    <span>Start Chapter 1</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button to="/comic" variant="secondary" size="lg">
                    <span>All Chapters</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* 5. EXPLORE TEASER: NASA TECHNOLOGY */}
      <section className="border-t border-[#EAF4FF]/10 bg-[#05080D]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeader
            eyebrow="Explore NASA Technology"
            title="Five Landmark Missions &amp; Spacecraft"
            description="Inspect real NASA spacecraft, flight computers, observatories, and planetary rovers alongside verified agency records."
            action={
              <Button to="/explore" variant="secondary">
                <Cpu className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
                <span>Explore NASA Technology</span>
              </Button>
            }
          />

          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {NASA_TECHNOLOGY_ITEMS.map((item) => {
              const cover = item.coverImage ?? item.heroImage;
              return (
                <Link
                  key={item.slug}
                  to={`/explore/${item.slug}`}
                  className="group min-w-[260px] sm:min-w-[290px] flex-1 snap-start"
                >
                  <Card interactive className="h-full overflow-hidden flex flex-col">
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#000000] border-b border-[#35D5F2]/12">
                      {cover.src ? (
                        <img
                          src={cover.src}
                          alt={cover.alt}
                          width={cover.width ?? 1024}
                          height={cover.height ?? 640}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          style={{ objectPosition: cover.objectPosition ?? 'center' }}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center bg-[#05080D]">
                          <Camera className="h-5 w-5 text-[#35D5F2]/75" aria-hidden="true" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#35D5F2]">
                            {cover.placeholderLabel ?? 'Historical NASA photograph: to be added'}
                          </span>
                          <span className="font-mono text-[10px] text-[#EAF4FF]/45">
                            Credit: {cover.credit}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#35D5F2] mb-1">
                        {item.eraLabel}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-[#EAF4FF] group-hover:text-[#35D5F2] transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#EAF4FF]/70 line-clamp-2 flex-1">
                        {item.shortDescription}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. MISSION TEASER & CLOSING CALL TO ACTION */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Card className="relative overflow-hidden p-8 sm:p-12 lg:p-14 border-[#35D5F2]/20">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <Chip variant="cyan" className="mb-4">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                <span>Our Mission</span>
              </Chip>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#EAF4FF]">
                Turning Complex Space Science Into Visual Discovery
              </h2>
              <p className="mt-3 text-base text-[#EAF4FF]/78 leading-relaxed">
                Created for the NASA Space Apps Challenge, BEYOND RELICS blends comic storytelling with transparent NASA sourcing for students, teachers, and curious readers everywhere.
              </p>
              <Link
                to="/mission"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#35D5F2] hover:underline"
              >
                <span>Read Our Full Mission</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Button to="/explore" size="lg">
                <span>START EXPLORING</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => launchImmersiveReader(navigate, readComicTarget, '/')}
              >
                <span>READ THE COMIC</span>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
