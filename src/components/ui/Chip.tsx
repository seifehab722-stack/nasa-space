import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'cyan' | 'blue' | 'muted';
  className?: string;
}

const variantMap = {
  default: 'border-[#35D5F2]/25 bg-[#0A1626]/90 text-[#EAF4FF]/85',
  cyan: 'border-[#35D5F2]/45 bg-[#35D5F2]/10 text-[#35D5F2]',
  blue: 'border-[#1677FF]/45 bg-[#1677FF]/15 text-[#EAF4FF]',
  muted: 'border-[#EAF4FF]/15 bg-[#0A1626]/70 text-[#EAF4FF]/65',
};

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] whitespace-nowrap shrink-0 ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
