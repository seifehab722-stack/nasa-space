import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center mx-auto max-w-2xl' : 'md:flex-row md:items-end md:justify-between'
      } ${className}`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#35D5F2] mb-2.5">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#EAF4FF] leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-[#EAF4FF]/72 leading-relaxed max-w-[68ch]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
