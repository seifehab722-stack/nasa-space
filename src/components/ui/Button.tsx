import React from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  to?: undefined;
}

interface ButtonAsLink extends BaseProps {
  to: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#1677FF] text-[#EAF4FF] border border-[#1677FF] hover:bg-[#2383FF] hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(53,213,242,0.32)] active:translate-y-0',
  secondary:
    'bg-transparent text-[#EAF4FF] border border-[#35D5F2]/45 hover:bg-[#102A43] hover:border-[#35D5F2]/80',
  ghost:
    'bg-transparent text-[#EAF4FF]/80 border border-transparent hover:bg-[#102A43]/70 hover:text-[#EAF4FF]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-[38px] px-4 py-1.5 text-sm rounded-[10px]',
  md: 'min-h-[44px] px-5 py-2.5 text-sm sm:text-base rounded-[11px]',
  lg: 'min-h-[48px] px-7 py-3 text-base rounded-[12px]',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap shrink-0 transition-all duration-200 ease-out cursor-pointer disabled:opacity-45 disabled:pointer-events-none';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link to={rest.to} aria-label={rest.ariaLabel} onClick={rest.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, 'variant' | 'size' | 'className' | 'children'>;
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  );
};
