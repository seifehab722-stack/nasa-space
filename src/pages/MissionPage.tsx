import React from 'react';
import { ArrowRight, BookOpen, Compass, Rocket, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CHALLENGE_INFO } from '../data/about';
import { useProgress } from '../store/progressStore';
import { launchImmersiveReader } from '../utils/readerLaunch';
import { usePageMeta } from '../utils/seo';

const LEARNING_GOALS = [
  'Explore landmark NASA hardware and missions—Apollo Guidance Computer, Kepler, Sojourner, Lunar Roving Vehicles, and Pioneer 10 & 11—using verified agency documentation.',
  'Recognize core astronomical concepts—stars, galaxies, black holes, nebulae, exoplanets, and planetary systems—in plain language.',
  'Understand how astronomers and spacecraft engineers explore distant worlds using instruments, photometry, and deep-space probes.',
  'Cultivate curiosity that carries beyond the comic into official NASA and observatory resources.',
];

export const MissionPage: React.FC = () => {
  usePageMeta({
    title: 'Our Mission',
    description:
      'Why BEYOND RELICS combines comic storytelling with verified NASA space exploration for students, educators, and the NASA Space Apps Challenge.',
    path: '/mission',
  });

  const navigate = useNavigate();
  const { state } = useProgress();
  const readComicTarget = state.lastRead
    ? `/comic/${state.lastRead.chapterSlug}/${state.lastRead.pageNumber}`
    : '/comic/chapter-01/1';

  return (
    <div className="relative z-10 mx-auto max-w-[1040px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeader
        eyebrow="Our Mission"
        title="Opening Space Exploration Through Story"
        description="BEYOND RELICS brings together comic art, a full-screen digital reader, and sourced NASA hardware and astronomy archives so learners can experience wonder first—and explore the real technology behind spaceflight."
      />

      <div className="mt-12 space-y-10">
        {/* 1. Educational Challenge */}
        <section aria-labelledby="mission-challenge">
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
              01 · The Educational Challenge
            </p>
            <h2
              id="mission-challenge"
              className="font-display text-2xl font-semibold text-[#EAF4FF]"
            >
              Complex Science Often Feels Distant
            </h2>
            <p className="mt-3 text-base text-[#EAF4FF]/80 leading-relaxed max-w-[68ch]">
              Astronomy and aerospace engineering explore scales of space, time, and physics far removed from everyday life. When scientific topics are presented only through dense textbooks or abstract terminology, students and general readers can feel locked out before their curiosity even has a chance to take root.
            </p>
          </Card>
        </section>

        {/* 2 & 3. Why Comics & How Comics Help */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
              02 · Why Comics
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#EAF4FF]">
              Lowering the Barrier to Entry
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#EAF4FF]/78 leading-relaxed">
              Visual storytelling welcomes readers immediately. Instead of confronting walls of jargon, a reader follows a sequence of illustrated moments at their own pace, turning unfamiliar cosmic phenomena into memorable visual experiences.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
              03 · How Comics Make Science Clear
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#EAF4FF]">
              Context, Relationships, Connection
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm sm:text-base text-[#EAF4FF]/78 leading-relaxed">
              <li>
                <strong className="text-[#EAF4FF]">Visual relationships:</strong> Illustrations show how spacecraft navigate, how planets orbit stars, or how light travels through dust clouds.
              </li>
              <li>
                <strong className="text-[#EAF4FF]">Narrative memory hooks:</strong> Story scenes give learners a concrete moment to anchor new vocabulary.
              </li>
              <li>
                <strong className="text-[#EAF4FF]">Character connection:</strong> Following COSMO turns passive reading into an expedition shared with a guide.
              </li>
            </ul>
          </Card>
        </div>

        {/* 4. Who It Is For */}
        <section aria-labelledby="mission-audience">
          <Card className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-[#35D5F2]/25 bg-[#102A43] text-[#35D5F2]">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-1.5">
                  04 · Who It Is For
                </p>
                <h2
                  id="mission-audience"
                  className="font-display text-2xl font-semibold text-[#EAF4FF]"
                >
                  Designed for Learners and Educators
                </h2>
                <p className="mt-3 text-base text-[#EAF4FF]/80 leading-relaxed max-w-[68ch]">
                  BEYOND RELICS is built for students, teenagers, young adults, teachers looking for classroom conversation starters, and curious general readers who want accurate space exploration wrapped in an inviting visual format.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* 5. Learning Goals */}
        <section aria-labelledby="mission-goals">
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
              05 · Learning Goals
            </p>
            <h2
              id="mission-goals"
              className="font-display text-2xl font-semibold text-[#EAF4FF] mb-4"
            >
              What Visitors Take Away
            </h2>
            <ol className="space-y-3 text-sm sm:text-base text-[#EAF4FF]/80 leading-relaxed">
              {LEARNING_GOALS.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-[#35D5F2] pt-1 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        {/* 6. Creative & Technological Value */}
        <section aria-labelledby="mission-value">
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
              06 · Creative &amp; Technological Value
            </p>
            <h2
              id="mission-value"
              className="font-display text-2xl font-semibold text-[#EAF4FF]"
            >
              Art, Interactive Engineering, and Scientific Integrity
            </h2>
            <p className="mt-3 text-base text-[#EAF4FF]/80 leading-relaxed max-w-[68ch]">
              BEYOND RELICS pairs original comic illustration with a custom full-screen, aspect-preserving digital reader, curated NASA spacecraft and hardware archives, foundational space reference guides, and local browser progress—requiring no accounts or server storage.
            </p>
          </Card>
        </section>

        {/* 7. How It Works */}
        <section aria-labelledby="mission-flow">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
            07 · How It Works
          </p>
          <h2
            id="mission-flow"
            className="font-display text-2xl font-semibold text-[#EAF4FF] mb-5"
          >
            A Two-Part Exploration Loop
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="p-6">
              <BookOpen className="h-5 w-5 text-[#35D5F2] mb-3" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-[#EAF4FF]">
                1. Read the comic
              </h3>
              <p className="mt-2 text-sm text-[#EAF4FF]/72 leading-relaxed">
                Follow COSMO page by page inside an immersive, full-screen comic reader with pinch and cursor zoom and automatic progress tracking.
              </p>
            </Card>
            <Card className="p-6">
              <Rocket className="h-5 w-5 text-[#35D5F2] mb-3" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-[#EAF4FF]">
                2. Explore NASA technology &amp; space
              </h3>
              <p className="mt-2 text-sm text-[#EAF4FF]/72 leading-relaxed">
                Investigate landmark NASA spacecraft, rovers, and observatories alongside core space topics—with every technical detail cited to official NASA archives.
              </p>
            </Card>
          </div>
        </section>

        {/* 8. NASA Space Apps Challenge Note */}
        <section aria-labelledby="mission-challenge-note">
          <Card className="p-6 sm:p-8 border-[#35D5F2]/30">
            <Chip variant="cyan" className="mb-3">
              {CHALLENGE_INFO.event}
            </Chip>
            <h2
              id="mission-challenge-note"
              className="font-display text-xl sm:text-2xl font-semibold text-[#EAF4FF]"
            >
              Challenge Track: {CHALLENGE_INFO.challengeName}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#EAF4FF]/78 leading-relaxed max-w-[68ch]">
              BEYOND RELICS is an independent educational project created for the NASA Space Apps Challenge. It is not affiliated with or endorsed by NASA.
            </p>
          </Card>
        </section>

        {/* Closing CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#35D5F2]/15 pt-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#EAF4FF]">
              Ready to join COSMO’s expedition?
            </h2>
            <p className="mt-1 text-sm text-[#EAF4FF]/70">
              Start reading the comic or explore landmark NASA technology.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() => launchImmersiveReader(navigate, readComicTarget, '/mission')}
            >
              <span>Read the Comic</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/explore" variant="secondary" size="lg">
              <Compass className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
              <span>Explore NASA Tech</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
