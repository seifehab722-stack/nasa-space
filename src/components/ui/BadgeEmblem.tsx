import React from 'react';
import { BadgeDefinition } from '../../data/types';

interface BadgeEmblemProps {
  badge: BadgeDefinition;
  unlocked: boolean;
  size?: 'sm' | 'md';
}

export const BadgeEmblem: React.FC<BadgeEmblemProps> = ({
  badge,
  unlocked,
  size = 'md',
}) => {
  const dim = size === 'sm' ? 40 : 52;
  const stroke = unlocked ? '#35D5F2' : '#EAF4FF';
  const ringStroke = unlocked ? '#1677FF' : '#EAF4FF';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 ${
        unlocked
          ? 'opacity-100 shadow-[0_0_20px_rgba(53,213,242,0.24)]'
          : 'opacity-35 grayscale'
      }`}
      style={{ width: dim, height: dim }}
      aria-hidden="true"
    >
      <svg width={dim} height={dim} viewBox="0 0 52 52" fill="none">
        <circle
          cx="26"
          cy="26"
          r="23"
          fill={unlocked ? '#0A1626' : '#05080D'}
          stroke={ringStroke}
          strokeOpacity={unlocked ? 0.85 : 0.3}
          strokeWidth="1.5"
        />
        <circle
          cx="26"
          cy="26"
          r="18"
          stroke={stroke}
          strokeOpacity={unlocked ? 0.45 : 0.2}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {badge.iconType === 'rocket' && (
          <path
            d="M26 14L31 24L29 33H23L21 24L26 14ZM23 33L20 37M29 33L32 37M26 22V26"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {badge.iconType === 'chapter' && (
          <path
            d="M17 17H24C25.1 17 26 17.9 26 19V35C26 34 25 33.5 23.8 33.5H17V17ZM35 17H28C26.9 17 26 17.9 26 19V35C26 34 27 33.5 28.2 33.5H35V17Z"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {badge.iconType === 'telescope' && (
          <path
            d="M16 25L33 17L36 22L19 30L16 25ZM25 27L22 36M27 26L31 36"
            stroke={stroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};
