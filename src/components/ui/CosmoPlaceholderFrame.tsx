import React, { useState } from 'react';
import { COSMO_HERO_ASSET } from '../../data/comic';

interface CosmoPlaceholderFrameProps {
  className?: string;
  variant?: 'card' | 'hero-float';
}

/**
 * Reserved frame for COSMO's official uploaded character reference.
 * Never generates, redraws, or substitutes an alien character.
 * Swapping in COSMO_HERO_ASSET.imagePath keeps exact dimensions and layout.
 */
export const CosmoPlaceholderFrame: React.FC<CosmoPlaceholderFrameProps> = ({
  className = '',
  variant = 'card',
}) => {
  const [errored, setErrored] = useState(false);
  const hasRealImage = Boolean(COSMO_HERO_ASSET.imagePath) && !errored;

  if (variant === 'hero-float') {
    return (
      <div
        className={`relative flex items-end justify-center ${
          hasRealImage
            ? ''
            : 'aspect-[4/5] rounded-[18px] border border-dashed border-[#35D5F2]/35 bg-[#05080D]/80 shadow-[0_0_32px_rgba(53,213,242,0.16),inset_0_0_20px_rgba(22,119,255,0.08)] backdrop-blur-sm'
        } ${className}`}
      >
        {hasRealImage ? (
          <picture>
            {COSMO_HERO_ASSET.webpPath && (
              <source srcSet={COSMO_HERO_ASSET.webpPath} type="image/webp" />
            )}
            <img
              src={COSMO_HERO_ASSET.imagePath}
              alt={COSMO_HERO_ASSET.alt}
              width={COSMO_HERO_ASSET.width}
              height={COSMO_HERO_ASSET.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={() => setErrored(true)}
              draggable={false}
              className="block h-auto w-full object-contain select-none drop-shadow-[-3px_-2px_14px_rgba(53,213,242,0.45)] drop-shadow-[0_0_24px_rgba(22,119,255,0.28)]"
            />
          </picture>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#35D5F2]">
              COSMO
            </span>
            <p className="mt-1.5 text-[11px] sm:text-xs leading-snug text-[#EAF4FF]/75 max-w-[18ch]">
              {COSMO_HERO_ASSET.placeholderLabel}
            </p>
            <span className="mt-2 font-mono text-[10px] text-[#EAF4FF]/45">
              /public/characters/cosmo/
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-[20px] border border-[#35D5F2]/25 bg-[#05080D]/85 backdrop-blur-sm shadow-[0_0_48px_rgba(53,213,242,0.12),inset_0_1px_0_rgba(234,244,255,0.06)] overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(53, 213, 242, 0.14) 0%, rgba(22, 119, 255, 0.06) 45%, rgba(0, 0, 0, 0) 75%)',
        }}
        aria-hidden="true"
      />

      {hasRealImage ? (
        <picture className="relative z-10 h-full w-full flex items-center justify-center p-4">
          {COSMO_HERO_ASSET.webpPath && (
            <source srcSet={COSMO_HERO_ASSET.webpPath} type="image/webp" />
          )}
          <img
            src={COSMO_HERO_ASSET.imagePath}
            alt={COSMO_HERO_ASSET.alt}
            width={COSMO_HERO_ASSET.width}
            height={COSMO_HERO_ASSET.height}
            loading="lazy"
            decoding="async"
            onError={() => setErrored(true)}
            className="h-full w-full object-contain"
          />
        </picture>
      ) : (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <div className="relative flex h-56 w-56 sm:h-64 sm:w-64 items-center justify-center rounded-full border border-dashed border-[#35D5F2]/35">
            <div className="absolute inset-5 rounded-full border border-[#1677FF]/30" />
            <div className="flex flex-col items-center gap-3 px-4">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#35D5F2]">
                Character Frame
              </span>
              <p className="font-display text-lg font-semibold text-[#EAF4FF]">COSMO</p>
              <p className="text-xs leading-relaxed text-[#EAF4FF]/70 max-w-[20ch]">
                {COSMO_HERO_ASSET.placeholderLabel}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-[#EAF4FF]/55">
            <span>Slot: /public/characters/cosmo/</span>
            <span aria-hidden="true">·</span>
            <span>Aspect-preserved contain</span>
          </div>
        </div>
      )}
    </div>
  );
};
