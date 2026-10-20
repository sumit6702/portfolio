'use client';

import React from 'react';
import Link from 'next/link';

interface ClayButtonProps {
  children: React.ReactNode;
  variant?: 'teal' | 'coral' | 'yellow' | 'cream' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  download?: boolean | string;
}

export default function ClayButton({
  children,
  variant = 'teal',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  target,
  rel,
  fullWidth = false,
  download,
}: ClayButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl font-medium gap-1.5',
    md: 'px-6 py-3 text-base rounded-2xl font-semibold gap-2',
    lg: 'px-8 py-4 text-lg rounded-3xl font-bold gap-2.5',
  };

  const variantClasses = {
    teal: 'btn-3d-teal',
    coral: 'btn-3d-coral',
    yellow: 'btn-3d-yellow',
    cream: 'btn-3d-cream',
    mint: 'bg-mint text-deepTeal border-2 border-mint-border shadow-[0_5px_0_#5EEAD4,0_10px_16px_rgba(15,76,74,0.12)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#5EEAD4,0_14px_20px_rgba(15,76,74,0.15)] active:translate-y-1 active:shadow-[0_2px_0_#5EEAD4]',
  };

  const baseClasses = `inline-flex items-center justify-center select-none cursor-pointer text-center no-underline transition-all duration-150 ${
    fullWidth ? 'w-full' : ''
  } ${sizeClasses[size]} ${variantClasses[variant]} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal || download) {
      return (
        <a
          href={href}
          target={target || (isExternal ? '_blank' : undefined)}
          rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
          download={download}
          className={baseClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
