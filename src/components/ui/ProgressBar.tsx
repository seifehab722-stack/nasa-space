import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  className = '',
}) => {
  const pct = max > 0 ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-[#102A43] ${className}`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#1677FF] to-[#35D5F2] transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};
