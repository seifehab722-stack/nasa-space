import React, { useState } from 'react';
import { BookOpen, Compass, RotateCcw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BADGE_DEFINITIONS } from '../../data/badges';
import { getPublishedChapters } from '../../data/comic';
import { NASA_TECHNOLOGY_ITEMS } from '../../data/nasaTechnology';
import { useProgress } from '../../store/progressStore';
import { launchImmersiveReader } from '../../utils/readerLaunch';
import { BadgeEmblem } from '../ui/BadgeEmblem';
import { Button } from '../ui/Button';
import { ModalSheet } from '../ui/ModalSheet';
import { ProgressBar } from '../ui/ProgressBar';

export const MissionLogDrawer: React.FC = () => {
  const {
    state,
    isMissionLogOpen,
    setMissionLogOpen,
    getChapterProgress,
    resetProgress,
  } = useProgress();
  const [confirmingReset, setConfirmingReset] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const chapters = getPublishedChapters();
  const unlockedCount = Object.keys(state.unlockedBadges).length;
  const discoveredCount = state.discoveredNasaTechSlugs.length;
  const totalTechItems = NASA_TECHNOLOGY_ITEMS.length;

  const continueUrl = state.lastRead
    ? `/comic/${state.lastRead.chapterSlug}/${state.lastRead.pageNumber}`
    : '/comic/chapter-01/1';

  return (
    <ModalSheet
      open={isMissionLogOpen}
      onClose={() => {
        setConfirmingReset(false);
        setMissionLogOpen(false);
      }}
      title="Mission Log"
      subtitle="Local Expedition Progress"
      variant="drawer-right"
    >
      <div className="flex flex-col gap-7">
        {/* Reading Status */}
        <section aria-labelledby="mission-log-reading">
          <div className="flex items-center justify-between mb-3">
            <h3
              id="mission-log-reading"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2]"
            >
              Comic Progress
            </h3>
            <span className="font-mono text-xs text-[#EAF4FF]/65 tabular-nums">
              {state.completedChapters.length} / {chapters.length} chapters
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {chapters.map((chapter) => {
              const prog = getChapterProgress(chapter.slug);
              return (
                <div
                  key={chapter.id}
                  className="rounded-[12px] border border-[#35D5F2]/15 bg-[#05080D]/60 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#EAF4FF]">
                      Chapter {chapter.number}: {chapter.title}
                    </span>
                    <span className="font-mono text-xs text-[#35D5F2] tabular-nums shrink-0">
                      {prog.pagesReadCount}/{prog.totalPages}
                    </span>
                  </div>
                  <ProgressBar
                    value={prog.pagesReadCount}
                    max={prog.totalPages}
                    label={`Chapter ${chapter.number} progress`}
                    className="mt-2.5"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                setMissionLogOpen(false);
                launchImmersiveReader(navigate, continueUrl, location.pathname);
              }}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>{state.lastRead ? 'Continue Reading' : 'Start Chapter 1'}</span>
            </Button>
          </div>
        </section>

        {/* NASA Technology Discovery Counter */}
        <section
          aria-labelledby="mission-log-explore"
          className="border-t border-[#35D5F2]/15 pt-6"
        >
          <div className="flex items-center justify-between mb-2.5">
            <h3
              id="mission-log-explore"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2]"
            >
              NASA Technology Discovery
            </h3>
            <span className="font-mono text-xs text-[#EAF4FF]/75 tabular-nums">
              {discoveredCount} of {totalTechItems} discovered
            </span>
          </div>
          <ProgressBar
            value={discoveredCount}
            max={totalTechItems}
            label="NASA Technology items discovered"
          />
          <div className="mt-3 flex items-center justify-end">
            <Button
              to="/explore"
              variant="ghost"
              size="sm"
              onClick={() => setMissionLogOpen(false)}
            >
              <Compass className="h-3.5 w-3.5 text-[#35D5F2]" aria-hidden="true" />
              <span>Explore NASA Technology</span>
            </Button>
          </div>
        </section>

        {/* Achievement Badges */}
        <section
          aria-labelledby="mission-log-badges"
          className="border-t border-[#35D5F2]/15 pt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              id="mission-log-badges"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2]"
            >
              Achievement Badges
            </h3>
            <span className="font-mono text-xs text-[#EAF4FF]/65 tabular-nums">
              {unlockedCount} / {BADGE_DEFINITIONS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {BADGE_DEFINITIONS.map((badge) => {
              const unlocked = Boolean(state.unlockedBadges[badge.id]);
              return (
                <div
                  key={badge.id}
                  className={`flex items-center gap-3.5 rounded-[12px] border p-3 transition-colors ${
                    unlocked
                      ? 'border-[#35D5F2]/30 bg-[#102A43]/45'
                      : 'border-[#35D5F2]/10 bg-[#05080D]/40 opacity-65'
                  }`}
                >
                  <BadgeEmblem badge={badge} unlocked={unlocked} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-sm font-semibold text-[#EAF4FF] truncate">
                        {badge.title}
                      </p>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider shrink-0 ${
                          unlocked ? 'text-[#35D5F2]' : 'text-[#EAF4FF]/45'
                        }`}
                      >
                        {unlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#EAF4FF]/68 leading-snug">
                      {unlocked ? badge.description : badge.criterion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reset Progress */}
        <section className="border-t border-[#35D5F2]/15 pt-5 pb-2">
          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-2 text-xs text-[#EAF4FF]/60 hover:text-[#35D5F2] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset progress</span>
            </button>
          ) : (
            <div className="rounded-[12px] border border-[#35D5F2]/30 bg-[#05080D] p-3.5">
              <p className="text-xs text-[#EAF4FF]/85 leading-relaxed">
                Clear all locally stored reading progress, discovered NASA Technology items, and badges?
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    resetProgress();
                    setConfirmingReset(false);
                  }}
                >
                  Confirm Reset
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setConfirmingReset(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </ModalSheet>
  );
};
