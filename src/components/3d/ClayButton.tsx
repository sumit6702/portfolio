'use client';

import React from 'react';
import Link from 'next/link';

interface ClayButtonProps {
  children: React.ReactNode;
  variant?: 'teal' | 'coral' | 'yellow' | 'cream' | 'mint' | 'dark';
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
  variant = 'dark',
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
    sm: 'px-4 py-2 text-xs rounded-full font-bold gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-full font-bold gap-2',
    lg: 'px-7 py-3.5 text-base rounded-full font-extrabold gap-2.5',
  };

  const variantClasses = {
    dark: 'btn-tactile btn-tactile-dark bg-deepInk text-white shadow-[0_4px_14px_rgba(46,42,79,0.18)]',
    teal: 'btn-tactile btn-tactile-dark bg-deepInk text-white shadow-[0_4px_14px_rgba(46,42,79,0.18)]',
    coral: 'btn-tactile btn-tactile-peach bg-peach text-deepInk border border-peach-border shadow-[0_4px_12px_rgba(255,211,184,0.4)]',
    yellow: 'btn-tactile btn-tactile-yellow bg-butterYellow text-deepInk border border-butterYellow-border shadow-[0_4px_12px_rgba(255,233,168,0.4)]',
    cream: 'btn-tactile btn-tactile-white bg-white/85 dark:bg-white/10 backdrop-blur-md text-deepInk dark:text-white border-2 border-white/90 dark:border-white/20 shadow-sm',
    mint: 'btn-tactile btn-tactile-mint bg-mint text-deepInk border border-mint-border shadow-[0_4px_12px_rgba(207,241,224,0.5)]',
  };

  const baseClasses = `inline-flex items-center justify-center select-none cursor-pointer text-center no-underline transition-all ${
    fullWidth ? 'w-full' : ''
  } ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.dark} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`;

  const innerContent = (
    <span className="relative z-10 inline-flex items-center justify-center gap-inherit w-full">
      {children}
    </span>
  );

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
          {innerContent}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
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
      {innerContent}
    </button>
  );
}
