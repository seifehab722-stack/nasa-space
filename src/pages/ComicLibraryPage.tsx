import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { ProgressBar } from '../components/ui/ProgressBar';
import { SectionHeader } from '../components/ui/SectionHeader';
import { COMIC_CHAPTERS, getChapterBySlug } from '../data/comic';
import { useProgress } from '../store/progressStore';
import { launchImmersiveReader } from '../utils/readerLaunch';
import { usePageMeta } from '../utils/seo';

export const ComicLibraryPage: React.FC = () => {
  usePageMeta({
    title: 'The Comic Universe',
    description:
      'Browse BEYOND RELICS chapters following COSMO across the universe and launch directly into the full-screen comic reader.',
    path: '/comic',
  });

  const navigate = useNavigate();
  const { state, getChapterProgress } = useProgress();
  const lastReadChapter = state.lastRead
    ? getChapterBySlug(state.lastRead.chapterSlug)
    : undefined;
  const lastReadProg = lastReadChapter
    ? getChapterProgress(lastReadChapter.slug)
    : undefined;

  return (
    <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeader
        eyebrow="The Comic Universe"
        title="Read COSMO’s Expedition"
        description="Select any chapter to launch directly into the full-screen comic reader. Your last-read page and chapter completion progress are saved locally in your Mission Log."
      />

      {/* Continue Reading Card */}
      {state.lastRead && lastReadChapter && lastReadProg && (
        <Card className="mt-10 p-5 sm:p-6 border-[#35D5F2]/30">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-32 w-24 shrink-0 overflow-hidden rounded-[10px] border border-[#35D5F2]/20 bg-[#000000] p-1">
              <img
                src={lastReadChapter.coverImage}
                alt={lastReadChapter.coverAlt}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Chip variant="cyan" className="mb-2">
                Continue Reading
              </Chip>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#EAF4FF]">
                Chapter {lastReadChapter.number}: {lastReadChapter.title}
              </h2>
              <p className="mt-1 text-sm text-[#EAF4FF]/72">
                Last visited Page {state.lastRead.pageNumber} of {lastReadChapter.pages.length}
              </p>
              <div className="mt-4 max-w-md">
                <ProgressBar
                  value={lastReadProg.pagesReadCount}
                  max={lastReadProg.totalPages}
                  label="Chapter progress"
                />
                <p className="mt-1.5 font-mono text-xs text-[#EAF4FF]/55 tabular-nums">
                  {lastReadProg.pagesReadCount} of {lastReadProg.totalPages} pages viewed ({lastReadProg.percent}%)
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                size="lg"
                onClick={() =>
                  launchImmersiveReader(
                    navigate,
                    `/comic/${lastReadChapter.slug}/${state.lastRead?.pageNumber ?? 1}`,
                    '/comic'
                  )
                }
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Resume Page {state.lastRead.pageNumber}</span>
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Chapter Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COMIC_CHAPTERS.map((chapter) => {
          if (chapter.isComingSoon) {
            return (
              <Card
                key={chapter.id}
                dashed
                className="flex h-full flex-col overflow-hidden opacity-80"
              >
                <div className="relative aspect-[3/4] max-h-64 w-full overflow-hidden bg-[#05080D] border-b border-[#35D5F2]/10 flex items-center justify-center p-6 text-center">
                  <div>
                    <Clock className="mx-auto h-7 w-7 text-[#35D5F2]/55 mb-3" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#35D5F2]/80">
                      Coming Soon
                    </span>
                    <p className="mt-2 font-display text-lg font-semibold text-[#EAF4FF]">
                      Chapter {chapter.number}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#EAF4FF]/50 mb-1.5">
                    Chapter {chapter.number} · In Production
                  </p>
                  <h2 className="font-display text-xl font-semibold text-[#EAF4FF]/85">
                    {chapter.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#EAF4FF]/60 leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              </Card>
            );
          }

          const prog = getChapterProgress(chapter.slug);
          const targetPage = prog.pagesReadCount > 0 ? prog.lastPageInChapter : 1;
          const targetRoute = `/comic/${chapter.slug}/${targetPage}`;

          return (
            <Card key={chapter.id} interactive className="flex h-full flex-col overflow-hidden">
              <button
                type="button"
                onClick={() => launchImmersiveReader(navigate, targetRoute, '/comic')}
                aria-label={`Read Chapter ${chapter.number}: ${chapter.title}`}
                className="group relative aspect-[3/4] max-h-72 w-full overflow-hidden bg-[#000000] border-b border-[#35D5F2]/15 flex items-center justify-center p-2 cursor-pointer text-left"
              >
                <img
                  src={chapter.coverImage}
                  alt={chapter.coverAlt}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#EAF4FF]/85 tabular-nums">
                    {chapter.pages.length} pages
                  </span>
                  {prog.isCompleted && (
                    <Chip variant="cyan">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      <span>Completed</span>
                    </Chip>
                  )}
                </div>
              </button>

              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-1.5">
                  Chapter {chapter.number}
                </p>
                <h2 className="font-display text-xl font-semibold text-[#EAF4FF]">
                  {chapter.title}
                </h2>
                <p className="mt-2 text-sm text-[#EAF4FF]/72 leading-relaxed flex-1">
                  {chapter.description}
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between font-mono text-xs text-[#EAF4FF]/60 tabular-nums mb-1.5">
                    <span>Reading progress</span>
                    <span>
                      {prog.pagesReadCount}/{prog.totalPages}
                    </span>
                  </div>
                  <ProgressBar
                    value={prog.pagesReadCount}
                    max={prog.totalPages}
                    label={`Chapter ${chapter.number} progress`}
                  />
                </div>

                <div className="mt-5">
                  <Button
                    className="w-full"
                    onClick={() => launchImmersiveReader(navigate, targetRoute, '/comic')}
                  >
                    <span>{prog.pagesReadCount > 0 ? 'Continue Chapter' : 'Read'}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
