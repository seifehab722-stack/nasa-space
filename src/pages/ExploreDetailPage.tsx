import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  ExternalLink,
  Lightbulb,
  Sparkles,
  Telescope,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { ImageWithCredit } from '../components/ui/ImageWithCredit';
import { EXPLORE_TOPICS, getExploreTopicBySlug } from '../data/explore';
import { NASA_TECHNOLOGY_ITEMS, getNasaTechBySlug } from '../data/nasaTechnology';
import { NasaTechItem, ExploreTopic } from '../data/types';
import { useProgress } from '../store/progressStore';
import { usePageMeta } from '../utils/seo';

const NasaTechDetailView: React.FC<{ item: NasaTechItem }> = ({ item }) => {
  const { recordNasaTechDiscovered } = useProgress();
  const [activePioneerTab, setActivePioneerTab] = useState<'left' | 'right'>('left');

  useEffect(() => {
    recordNasaTechDiscovered(item.slug);
  }, [item.slug, recordNasaTechDiscovered]);

  const currentIdx = NASA_TECHNOLOGY_ITEMS.findIndex((t) => t.slug === item.slug);
  const prevItem =
    NASA_TECHNOLOGY_ITEMS[
      (currentIdx - 1 + NASA_TECHNOLOGY_ITEMS.length) % NASA_TECHNOLOGY_ITEMS.length
    ];
  const nextItem = NASA_TECHNOLOGY_ITEMS[(currentIdx + 1) % NASA_TECHNOLOGY_ITEMS.length];

  return (
    <article className="relative z-10 mx-auto max-w-[1120px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Explore', to: '/explore' },
          { label: item.name },
        ]}
      />

      {/* Header & Hero Archive Slot */}
      <header className="grid gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <Chip variant="cyan">{item.categoryLabel}</Chip>
            <span className="font-mono text-xs text-[#EAF4FF]/60">{item.eraLabel}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#EAF4FF]">
            {item.name}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EAF4FF]/80 leading-relaxed max-w-[58ch]">
            {item.shortDescription}
          </p>

          <Card className="mt-6 p-5 border-[#35D5F2]/28 bg-[#0A1626]/85">
            <div className="flex items-start gap-3">
              <Cpu className="h-5 w-5 shrink-0 text-[#35D5F2] mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#35D5F2]">
                  Mission Highlight
                </p>
                <p className="mt-1.5 text-sm text-[#EAF4FF]/85 leading-relaxed">
                  {item.keyHighlight}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <ImageWithCredit
            src={item.heroImage.src}
            alt={item.heroImage.alt}
            credit={item.heroImage.credit}
            caption={item.heroImage.caption}
            placeholderLabel={item.heroImage.placeholderLabel}
            expectedFolder={item.heroImage.expectedFolder}
            aspectRatio="4/3"
            width={item.heroImage.width}
            height={item.heroImage.height}
            objectPosition={item.heroImage.objectPosition}
            priority
          />
        </div>
      </header>

      {/* Overview & Core Technical Sections */}
      <div className="mt-12 space-y-10 border-t border-[#35D5F2]/15 pt-10">
        <section aria-labelledby="tech-overview-heading">
          <h2
            id="tech-overview-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF] mb-4"
          >
            Overview
          </h2>
          <div className="space-y-4 text-base text-[#EAF4FF]/82 leading-relaxed max-w-[70ch]">
            {item.introParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {item.sections.map((sec) => (
            <Card key={sec.id} className="p-6 sm:p-7 flex flex-col">
              <h2 className="font-display text-xl font-semibold text-[#EAF4FF] mb-3">
                {sec.title}
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#EAF4FF]/78 leading-relaxed">
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="mt-4 space-y-2.5 border-t border-[#35D5F2]/12 pt-4 text-sm text-[#EAF4FF]/80">
                  {sec.bullets.map((b, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {b.label && (
                        <strong className="text-[#35D5F2] font-medium">{b.label}: </strong>
                      )}
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>

        {/* Notable Missions Sub-Blocks (e.g., Apollo 15, 16, 17 LRV) */}
        {item.notableMissions && (
          <section aria-labelledby="notable-missions-heading" className="pt-2">
            <h2
              id="notable-missions-heading"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF]"
            >
              {item.notableMissions.sectionTitle}
            </h2>
            {item.notableMissions.intro && (
              <p className="mt-2 text-sm sm:text-base text-[#EAF4FF]/74 max-w-[70ch]">
                {item.notableMissions.intro}
              </p>
            )}

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {item.notableMissions.items.map((mission) => (
                <Card key={mission.id} className="p-6 border-[#35D5F2]/25 flex flex-col">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2]">
                    {mission.title}
                  </p>
                  {mission.subtitle && (
                    <p className="mt-1 text-xs text-[#EAF4FF]/60">{mission.subtitle}</p>
                  )}
                  <p className="mt-3 text-sm text-[#EAF4FF]/80 leading-relaxed flex-1">
                    {mission.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-[#35D5F2]/12 pt-3 font-mono text-xs text-[#EAF4FF]/78 tabular-nums">
                    {mission.highlights.map((h, i) => (
                      <li key={i}>· {h}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Parallel Twin Missions (Pioneer 10 & Pioneer 11: Side-by-Side Desktop / Tabbed Mobile) */}
        {item.parallelMissions && (
          <section aria-labelledby="parallel-missions-heading" className="pt-2">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h2
                id="parallel-missions-heading"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF]"
              >
                {item.parallelMissions.sectionTitle}
              </h2>

              {/* Mobile tab toggle */}
              <div
                className="flex md:hidden rounded-[10px] border border-[#35D5F2]/25 bg-[#05080D] p-1"
                role="tablist"
                aria-label="Compare Pioneer 10 and Pioneer 11"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePioneerTab === 'left'}
                  onClick={() => setActivePioneerTab('left')}
                  className={`px-3.5 py-1.5 rounded-[7px] text-xs font-medium transition-colors cursor-pointer ${
                    activePioneerTab === 'left'
                      ? 'bg-[#1677FF] text-[#EAF4FF]'
                      : 'text-[#EAF4FF]/70 hover:text-[#EAF4FF]'
                  }`}
                >
                  Pioneer 10
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePioneerTab === 'right'}
                  onClick={() => setActivePioneerTab('right')}
                  className={`px-3.5 py-1.5 rounded-[7px] text-xs font-medium transition-colors cursor-pointer ${
                    activePioneerTab === 'right'
                      ? 'bg-[#1677FF] text-[#EAF4FF]'
                      : 'text-[#EAF4FF]/70 hover:text-[#EAF4FF]'
                  }`}
                >
                  Pioneer 11
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { key: 'left' as const, data: item.parallelMissions.left },
                { key: 'right' as const, data: item.parallelMissions.right },
              ].map(({ key, data }) => (
                <Card
                  key={data.id}
                  className={`p-6 sm:p-7 border-[#35D5F2]/25 flex-col ${
                    activePioneerTab === key ? 'flex' : 'hidden md:flex'
                  }`}
                >
                  <Chip variant="cyan" className="mb-3 self-start">
                    {data.subtitle}
                  </Chip>
                  <h3 className="font-display text-2xl font-semibold text-[#EAF4FF]">
                    {data.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#EAF4FF]/80 leading-relaxed">
                    {data.summary}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-[#35D5F2]/12 pt-4 text-sm text-[#EAF4FF]/78">
                    {data.highlights.map((h, idx) => (
                      <li key={idx} className="leading-relaxed">
                        · {h}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Table (Pioneer 10 vs Pioneer 11) */}
        {item.comparisonTable && (
          <section aria-labelledby="comparison-table-heading" className="pt-2">
            <h2
              id="comparison-table-heading"
              className="font-display text-2xl font-semibold text-[#EAF4FF] mb-4"
            >
              {item.comparisonTable.sectionTitle}
            </h2>
            <Card className="overflow-hidden border-[#35D5F2]/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#35D5F2]/20 bg-[#05080D]">
                      <th className="py-3.5 px-4 sm:px-5 font-mono text-xs uppercase tracking-wider text-[#EAF4FF]/60 w-1/4">
                        Mission Metric
                      </th>
                      <th className="py-3.5 px-4 sm:px-5 font-display text-base font-semibold text-[#35D5F2] w-[37.5%]">
                        {item.comparisonTable.leftHeader}
                      </th>
                      <th className="py-3.5 px-4 sm:px-5 font-display text-base font-semibold text-[#35D5F2] w-[37.5%]">
                        {item.comparisonTable.rightHeader}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#35D5F2]/10">
                    {item.comparisonTable.rows.map((row) => (
                      <tr key={row.feature} className="hover:bg-[#102A43]/35 transition-colors">
                        <th
                          scope="row"
                          className="py-3.5 px-4 sm:px-5 font-medium text-[#EAF4FF] align-top"
                        >
                          {row.feature}
                        </th>
                        <td className="py-3.5 px-4 sm:px-5 text-[#EAF4FF]/80 align-top leading-relaxed">
                          {row.leftValue}
                        </td>
                        <td className="py-3.5 px-4 sm:px-5 text-[#EAF4FF]/80 align-top leading-relaxed">
                          {row.rightValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}

        {/* Symbolic Artifact Spotlight (The Pioneer Plaque) */}
        {item.artifactSpotlight && (
          <section aria-labelledby="artifact-spotlight-heading" className="pt-2">
            <Card className="p-6 sm:p-8 border-[#35D5F2]/30 bg-gradient-to-br from-[#0A1626] to-[#05080D]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#35D5F2] mb-2">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>{item.artifactSpotlight.sectionTitle}</span>
              </div>
              <h2
                id="artifact-spotlight-heading"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF]"
              >
                {item.artifactSpotlight.title}
              </h2>
              <div className="mt-4 space-y-3 text-sm sm:text-base text-[#EAF4FF]/82 leading-relaxed max-w-[72ch]">
                {item.artifactSpotlight.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              {item.artifactSpotlight.elementsList && (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 border-t border-[#35D5F2]/15 pt-5 text-sm text-[#EAF4FF]/80">
                  {item.artifactSpotlight.elementsList.map((el, idx) => (
                    <li
                      key={idx}
                      className="rounded-[10px] border border-[#35D5F2]/15 bg-[#05080D]/80 p-3.5 leading-relaxed"
                    >
                      <span className="font-mono text-xs text-[#35D5F2] mr-2">0{idx + 1}.</span>
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </section>
        )}

        {/* Historical NASA Photograph Slots */}
        {item.gallery.length > 0 && (
          <section aria-labelledby="nasa-gallery-heading" className="pt-2">
            <h2
              id="nasa-gallery-heading"
              className="font-display text-2xl font-semibold text-[#EAF4FF] mb-5"
            >
              Historical NASA Archive
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((img, i) => (
                <ImageWithCredit
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  credit={img.credit}
                  caption={img.caption}
                  placeholderLabel={img.placeholderLabel}
                  expectedFolder={img.expectedFolder}
                  aspectRatio="4/3"
                />
              ))}
            </div>
          </section>
        )}

        {/* Official NASA Sources */}
        <section
          aria-labelledby="nasa-sources-heading"
          className="border-t border-[#35D5F2]/15 pt-8"
        >
          <h2
            id="nasa-sources-heading"
            className="font-display text-xl font-semibold text-[#EAF4FF] mb-4"
          >
            Official NASA Sources
          </h2>
          <ul className="space-y-2.5">
            {item.sources.map((src, idx) => (
              <li key={idx}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-wrap items-center gap-2 text-sm text-[#EAF4FF]/80 hover:text-[#35D5F2] transition-colors"
                >
                  <span className="font-mono text-xs text-[#35D5F2]">{src.publisher}</span>
                  <span aria-hidden="true">·</span>
                  <span>{src.title}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Previous / Next NASA Technology Navigation */}
      <nav
        aria-label="NASA Technology navigation"
        className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#35D5F2]/15 pt-8"
      >
        <Link
          to={`/explore/${prevItem.slug}`}
          className="group flex items-center gap-3 rounded-[12px] border border-[#35D5F2]/15 bg-[#0A1626] px-5 py-4 hover:border-[#35D5F2]/45 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#EAF4FF]/55">
              Previous NASA Technology
            </p>
            <p className="font-display text-base font-semibold text-[#EAF4FF] group-hover:text-[#35D5F2]">
              {prevItem.name}
            </p>
          </div>
        </Link>

        <Link
          to={`/explore/${nextItem.slug}`}
          className="group flex items-center justify-end gap-3 rounded-[12px] border border-[#35D5F2]/15 bg-[#0A1626] px-5 py-4 text-right hover:border-[#35D5F2]/45 transition-colors"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#EAF4FF]/55">
              Next NASA Technology
            </p>
            <p className="font-display text-base font-semibold text-[#EAF4FF] group-hover:text-[#35D5F2]">
              {nextItem.name}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
};

const SpaceTopicDetailView: React.FC<{ topic: ExploreTopic }> = ({ topic }) => {
  const currentIdx = EXPLORE_TOPICS.findIndex((t) => t.slug === topic.slug);
  const prevTopic =
    EXPLORE_TOPICS[(currentIdx - 1 + EXPLORE_TOPICS.length) % EXPLORE_TOPICS.length];
  const nextTopic = EXPLORE_TOPICS[(currentIdx + 1) % EXPLORE_TOPICS.length];

  return (
    <article className="relative z-10 mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Explore', to: '/explore' },
          { label: topic.name },
        ]}
      />

      {/* Cinematic Hero Frame */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#35D5F2]/20 bg-[#0A1626]">
        <div className="relative aspect-[16/9] max-h-[480px] w-full overflow-hidden">
          <img
            src={topic.heroImage.src}
            alt={topic.heroImage.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#05080D] via-[#05080D]/45 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#35D5F2] mb-2">
              Explore More About Space
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#EAF4FF]">
              {topic.name}
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-[#EAF4FF]/85 max-w-[60ch]">
              {topic.shortDescription}
            </p>
          </div>
        </div>
        <div className="border-t border-[#35D5F2]/10 bg-[#05080D]/70 px-6 py-2.5 font-mono text-[11px] text-[#EAF4FF]/55">
          Credit: {topic.heroImage.credit}
        </div>
      </div>

      {/* Overview & Key Concepts */}
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8">
          <section aria-labelledby="topic-overview-heading">
            <h2
              id="topic-overview-heading"
              className="font-display text-2xl font-semibold text-[#EAF4FF] mb-4"
            >
              Overview
            </h2>
            <div className="space-y-4 text-base text-[#EAF4FF]/82 leading-relaxed max-w-[65ch]">
              {topic.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="topic-study-heading">
            <div className="flex items-center gap-2.5 mb-4">
              <Telescope className="h-5 w-5 text-[#35D5F2]" aria-hidden="true" />
              <h2
                id="topic-study-heading"
                className="font-display text-2xl font-semibold text-[#EAF4FF]"
              >
                How Scientists Study {topic.name}
              </h2>
            </div>
            <div className="space-y-4 text-base text-[#EAF4FF]/80 leading-relaxed max-w-[65ch]">
              {topic.howScientistsStudy.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-[#EAF4FF] mb-4">
              Key Concepts
            </h2>
            <div className="space-y-4">
              {topic.keyConcepts.map((concept, idx) => (
                <div
                  key={concept.title}
                  className="border-b border-[#35D5F2]/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="font-mono text-[11px] text-[#35D5F2] mb-1">
                    0{idx + 1}. {concept.title}
                  </p>
                  <p className="text-sm text-[#EAF4FF]/75 leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-[#35D5F2]/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 shrink-0 text-[#35D5F2] mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2]">
                  Did You Know?
                </p>
                <p className="mt-2 text-sm text-[#EAF4FF]/85 leading-relaxed">
                  {topic.didYouKnow.fact}
                </p>
                <a
                  href={topic.didYouKnow.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-[#35D5F2] hover:underline"
                >
                  <span>{topic.didYouKnow.source.publisher}</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Card>
        </aside>
      </div>

      {/* Image Gallery */}
      {topic.gallery.length > 0 && (
        <section aria-labelledby="topic-gallery-heading" className="mt-12">
          <h2
            id="topic-gallery-heading"
            className="font-display text-2xl font-semibold text-[#EAF4FF] mb-5"
          >
            Observatory Gallery
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {topic.gallery.map((img, i) => (
              <ImageWithCredit
                key={i}
                src={img.src}
                alt={img.alt}
                credit={img.credit}
                caption={img.caption}
                aspectRatio="4/3"
              />
            ))}
          </div>
        </section>
      )}

      {/* Official Sources */}
      <div className="mt-12 border-t border-[#35D5F2]/15 pt-10">
        <h2 className="font-display text-xl font-semibold text-[#EAF4FF] mb-4">
          Official Sources
        </h2>
        <ul className="space-y-3">
          {topic.sources.map((src, idx) => (
            <li key={idx}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#EAF4FF]/80 hover:text-[#35D5F2] transition-colors"
              >
                <span className="font-mono text-xs text-[#35D5F2]">{src.publisher}</span>
                <span aria-hidden="true">·</span>
                <span>{src.title}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Previous / Next Topic Navigation */}
      <nav
        aria-label="Topic navigation"
        className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#35D5F2]/15 pt-8"
      >
        <Link
          to={`/explore/${prevTopic.slug}`}
          className="group flex items-center gap-3 rounded-[12px] border border-[#35D5F2]/15 bg-[#0A1626] px-5 py-4 hover:border-[#35D5F2]/45 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#EAF4FF]/55">
              Previous Topic
            </p>
            <p className="font-display text-base font-semibold text-[#EAF4FF] group-hover:text-[#35D5F2]">
              {prevTopic.name}
            </p>
          </div>
        </Link>

        <Link
          to={`/explore/${nextTopic.slug}`}
          className="group flex items-center justify-end gap-3 rounded-[12px] border border-[#35D5F2]/15 bg-[#0A1626] px-5 py-4 text-right hover:border-[#35D5F2]/45 transition-colors"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#EAF4FF]/55">
              Next Topic
            </p>
            <p className="font-display text-base font-semibold text-[#EAF4FF] group-hover:text-[#35D5F2]">
              {nextTopic.name}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
};

export const ExploreDetailPage: React.FC = () => {
  const { slug = '' } = useParams();
  const techItem = getNasaTechBySlug(slug);
  const topic = techItem ? undefined : getExploreTopicBySlug(slug);

  usePageMeta({
    title: techItem
      ? `${techItem.name} — NASA Technology`
      : topic
        ? `${topic.name} — Explore More About Space`
        : 'Topic Not Found',
    description:
      techItem?.shortDescription ??
      topic?.shortDescription ??
      'Explore NASA technology and space topics in BEYOND RELICS.',
    path: `/explore/${slug}`,
  });

  if (techItem) {
    return <NasaTechDetailView item={techItem} />;
  }

  if (topic) {
    return <SpaceTopicDetailView topic={topic} />;
  }

  return (
    <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="font-display text-3xl font-semibold text-[#EAF4FF]">Topic Not Found</h1>
      <p className="mt-3 text-[#EAF4FF]/70">
        This destination could not be found in NASA Technology or Explore More About Space.
      </p>
      <div className="mt-6">
        <Button to="/explore">Back to Explore</Button>
      </div>
    </div>
  );
};
