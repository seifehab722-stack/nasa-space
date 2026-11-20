import React from 'react';
import { NasaTechCard } from '../components/features/NasaTechCard';
import { TopicCard } from '../components/features/TopicCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SectionHeader } from '../components/ui/SectionHeader';
import { EXPLORE_TOPICS } from '../data/explore';
import { NASA_TECHNOLOGY_ITEMS } from '../data/nasaTechnology';
import { useProgress } from '../store/progressStore';
import { usePageMeta } from '../utils/seo';

export const ExploreIndexPage: React.FC = () => {
  usePageMeta({
    title: 'Explore — NASA Technology & Space Topics',
    description:
      'Explore historic NASA spacecraft, computers, telescopes, and rovers, plus foundational cosmic topics in BEYOND RELICS.',
    path: '/explore',
  });

  const { state } = useProgress();
  const discoveredCount = state.discoveredNasaTechSlugs.length;
  const totalCount = NASA_TECHNOLOGY_ITEMS.length;

  return (
    <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Main Feature Section: NASA TECHNOLOGY */}
      <section aria-labelledby="nasa-tech-heading">
        <SectionHeader
          eyebrow="Featured Hardware & Missions"
          title="NASA TECHNOLOGY"
          description="Five landmark NASA spacecraft, onboard computers, space observatories, and planetary rovers. Inspect their design, instruments, missions, and verified NASA records to earn your Cosmic Explorer badge."
          action={
            <div className="w-full sm:w-56 rounded-[12px] border border-[#35D5F2]/20 bg-[#0A1626] p-3.5">
              <div className="flex items-center justify-between font-mono text-xs text-[#EAF4FF] tabular-nums mb-2">
                <span className="text-[#EAF4FF]/70">Progress</span>
                <span className="text-[#35D5F2]">
                  {discoveredCount} of {totalCount} discovered
                </span>
              </div>
              <ProgressBar
                value={discoveredCount}
                max={totalCount}
                label="NASA technology items discovered"
              />
            </div>
          }
        />

        {/* Equal-weight large cards centered cleanly across rows */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {NASA_TECHNOLOGY_ITEMS.map((item) => (
            <div
              key={item.slug}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex"
            >
              <div className="w-full">
                <NasaTechCard
                  item={item}
                  discovered={state.discoveredNasaTechSlugs.includes(item.slug)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thin Divider & Secondary Section: EXPLORE MORE ABOUT SPACE */}
      <section
        aria-labelledby="more-space-heading"
        className="mt-16 sm:mt-20 border-t border-[#EAF4FF]/10 pt-12 sm:pt-14"
      >
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#EAF4FF]/55 mb-2">
            Cosmic Reference
          </p>
          <h2
            id="more-space-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF]"
          >
            EXPLORE MORE ABOUT SPACE
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#EAF4FF]/65 leading-relaxed">
            Continue exploring six foundational phenomena across the universe: Stars, Galaxies, Black Holes, Nebulae, Exoplanets, and Planetary Systems.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} compact />
          ))}
        </div>
      </section>
    </div>
  );
};
