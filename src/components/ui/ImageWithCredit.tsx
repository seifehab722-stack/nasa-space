import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ImageWithCreditProps {
  src: string;
  webpSrc?: string;
  alt: string;
  credit?: string;
  caption?: string;
  placeholderLabel?: string;
  expectedFolder?: string;
  aspectRatio?: '16/9' | '4/3' | '3/4' | 'auto';
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  objectPosition?: string;
}

export const ImageWithCredit: React.FC<ImageWithCreditProps> = ({
  src,
  webpSrc,
  alt,
  credit,
  caption,
  placeholderLabel = 'Historical NASA photograph: to be added',
  expectedFolder,
  aspectRatio = '16/9',
  priority = false,
  className = '',
  imgClassName = '',
  width,
  height,
  objectPosition,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showPlaceholder = !src || errored;

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '4/3'
        ? 'aspect-[4/3]'
        : aspectRatio === '3/4'
          ? 'aspect-[3/4]'
          : '';

  return (
    <figure className={`overflow-hidden ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-[12px] border ${
          showPlaceholder ? 'border-dashed border-[#35D5F2]/28' : 'border-[#35D5F2]/15'
        } bg-[#05080D] ${aspectClass}`}
      >
        {!loaded && !showPlaceholder && (
          <div className="skeleton-navy absolute inset-0" aria-hidden="true" />
        )}

        {showPlaceholder ? (
          <div
            role="img"
            aria-label={alt}
            className="flex h-full min-h-[190px] flex-col items-center justify-center gap-2.5 p-6 text-center bg-[#05080D]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#35D5F2]/25 bg-[#0A1626] text-[#35D5F2]">
              <Camera className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#35D5F2]">
              {placeholderLabel}
            </p>
            <p className="text-xs text-[#EAF4FF]/70 max-w-[36ch] leading-relaxed">{alt}</p>
            {expectedFolder && (
              <span className="font-mono text-[10px] text-[#EAF4FF]/40">{expectedFolder}</span>
            )}
          </div>
        ) : (
          <picture className="block h-full w-full">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              style={objectPosition ? { objectPosition } : undefined}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              } ${imgClassName}`}
            />
          </picture>
        )}
      </div>

      {(caption || credit) && (
        <figcaption className="mt-2.5 flex flex-col gap-1 text-xs text-[#EAF4FF]/68">
          {caption && <span>{caption}</span>}
          {credit && (
            <span className="font-mono text-[11px] text-[#EAF4FF]/55">Credit: {credit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
