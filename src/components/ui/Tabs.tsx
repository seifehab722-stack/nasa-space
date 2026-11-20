import React from 'react';

export interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface TabsProps<T extends string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className = '',
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`min-h-[40px] rounded-[10px] border px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
              active
                ? 'border-[#35D5F2]/70 bg-[#102A43] text-[#35D5F2] shadow-[0_0_16px_rgba(53,213,242,0.14)]'
                : 'border-[#35D5F2]/15 bg-[#0A1626] text-[#EAF4FF]/72 hover:border-[#35D5F2]/35 hover:text-[#EAF4FF]'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
