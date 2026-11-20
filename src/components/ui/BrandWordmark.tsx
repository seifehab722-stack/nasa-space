import React from 'react';

interface BrandWordmarkProps {
  compact?: boolean;
  className?: string;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ compact = false, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="13.5"
          ry="5.5"
          transform="rotate(-24 16 16)"
          stroke="#35D5F2"
          strokeWidth="1.6"
        />
        <circle cx="16" cy="16" r="5.2" fill="#0A1626" stroke="#1677FF" strokeWidth="1.6" />
        <circle cx="25.5" cy="11.2" r="1.8" fill="#35D5F2" />
      </svg>
      {!compact && (
        <span className="font-display text-base sm:text-lg font-bold tracking-[0.06em] text-[#EAF4FF]">
          BEYOND RELICS
        </span>
      )}
    </span>
  );
};
