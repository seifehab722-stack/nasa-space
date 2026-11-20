import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  dashed?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  interactive = false,
  dashed = false,
}) => {
  return (
    <div
      className={`rounded-[16px] bg-[#05080D]/92 ${
        dashed
          ? 'border border-dashed border-[#35D5F2]/22'
          : 'border border-[#102A43]/85'
      } shadow-[inset_0_1px_0_rgba(234,244,255,0.04)] ${
        interactive
          ? 'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#35D5F2]/40 hover:bg-[#0A1626]/75 hover:shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(22,119,255,0.12)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
