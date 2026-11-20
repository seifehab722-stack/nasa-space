import React, { useState } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ExploreTopic } from '../../data/types';
import { Card } from '../ui/Card';

interface TopicCardProps {
  topic: ExploreTopic;
  compact?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, compact = false }) => {
  const [revealed, setRevealed] = useState(false);

  if (compact) {
    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-[#EAF4FF]/10 bg-[#05080D]/80 transition-colors duration-200 hover:border-[#35D5F2]/30 hover:bg-[#0A1626]/55">
        <Link
          to={`/explore/${topic.slug}`}
          className="relative aspect-[16/9] w-full overflow-hidden bg-[#000000] block"
        >
          <img
            src={topic.heroImage.src}
            alt={topic.heroImage.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-base font-semibold text-[#EAF4FF]">
            {topic.name}
          </h3>
          <p className="mt-1.5 text-xs text-[#EAF4FF]/65 leading-relaxed flex-1">
            {topic.shortDescription}
          </p>
          <div className="mt-3.5 pt-3 border-t border-[#EAF4FF]/8 flex items-center justify-between gap-2">
            <Link
              to={`/explore/${topic.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#35D5F2] hover:underline"
            >
              <span>Read Topic</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <span className="font-mono text-[10px] text-[#EAF4FF]/40 truncate max-w-[14ch]">
              {topic.heroImage.credit}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      interactive
      className="group flex h-full flex-col overflow-hidden"
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#05080D]"
        tabIndex={0}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
      >
        <img
          src={topic.heroImage.src}
          alt={topic.heroImage.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#05080D] via-[#05080D]/30 to-transparent"
          aria-hidden="true"
        />

        <div
          className={`absolute inset-0 flex flex-col justify-end bg-[#05080D]/88 p-5 transition-opacity duration-200 ${
            revealed
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-focus-within:opacity-100'
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#35D5F2] mb-1.5">
            Cosmic Note
          </p>
          <p className="text-sm text-[#EAF4FF]/90 leading-relaxed">
            {topic.intriguingFact}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-[#EAF4FF]">
          {topic.name}
        </h3>

        <p className="mt-2 text-sm text-[#EAF4FF]/72 leading-relaxed flex-1">
          {topic.shortDescription}
        </p>

        <p className="mt-3 font-mono text-[11px] text-[#EAF4FF]/48 truncate" title={topic.heroImage.credit}>
          {topic.heroImage.credit}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Link
            to={`/explore/${topic.slug}`}
            className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#1677FF] px-4 py-1.5 text-sm font-medium text-[#EAF4FF] hover:bg-[#2383FF] transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-pressed={revealed}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-[10px] border border-[#35D5F2]/25 px-3 py-1.5 text-xs font-medium text-[#EAF4FF]/80 hover:bg-[#102A43] hover:text-[#35D5F2] md:hidden cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{revealed ? 'Hide fact' : 'Reveal fact'}</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
