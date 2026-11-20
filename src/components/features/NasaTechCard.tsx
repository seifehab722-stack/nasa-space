import React, { useState } from 'react';
import { ArrowRight, Camera, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NasaTechItem } from '../../data/types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface NasaTechCardProps {
  item: NasaTechItem;
  discovered: boolean;
}

export const NasaTechCard: React.FC<NasaTechCardProps> = ({ item, discovered }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const cover = item.coverImage ?? item.heroImage;
  const showPlaceholder = !cover.src || errored;

  return (
    <Card
      interactive
      className="group flex h-full flex-col overflow-hidden"
    >
      <Link
        to={`/explore/${item.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#05080D] border-b border-[#35D5F2]/12 block"
      >
        {!loaded && !showPlaceholder && (
          <div className="skeleton-navy absolute inset-0" aria-hidden="true" />
        )}

        {showPlaceholder ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-6 text-center bg-[#05080D]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#35D5F2]/25 bg-[#0A1626] text-[#35D5F2]">
              <Camera className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#35D5F2]">
              {cover.placeholderLabel ?? 'Historical NASA photograph: to be added'}
            </p>
            <p className="font-mono text-[11px] text-[#EAF4FF]/50">
              Credit: {cover.credit}
            </p>
          </div>
        ) : (
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width ?? 1024}
            height={cover.height ?? 640}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            style={{ objectPosition: cover.objectPosition ?? 'center' }}
            className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[11px] text-[#35D5F2]">
          <span className="truncate">{item.eraLabel}</span>
          {discovered && (
            <span className="inline-flex items-center gap-1 uppercase tracking-wider shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Discovered</span>
            </span>
          )}
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#EAF4FF]">
          {item.name}
        </h3>

        <p className="mt-2.5 text-sm text-[#EAF4FF]/76 leading-relaxed flex-1">
          {item.shortDescription}
        </p>

        <p
          className="mt-4 font-mono text-[11px] text-[#EAF4FF]/48 truncate"
          title={`Credit: ${cover.credit}`}
        >
          Credit: {cover.credit}
        </p>

        <div className="mt-5">
          <Button to={`/explore/${item.slug}`} size="sm" className="w-full">
            <span>Inspect Mission &amp; Hardware</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
