'use client';

import React from 'react';
import {
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

// Precision Behance vector icon
function BehanceIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.87 13.56c.86 0 1.48-.44 1.48-1.28 0-.74-.52-1.15-1.34-1.15H5.43v2.43h2.44zm.2-4.56c.7 0 1.25-.37 1.25-1.07 0-.66-.46-1.03-1.17-1.03H5.43V9h2.64zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-11.7 1.83c1.23-.39 2.06-1.34 2.06-2.61 0-1.13-.67-1.95-1.74-2.25 1-.41 1.54-1.21 1.54-2.19 0-1.77-1.42-2.78-3.47-2.78H3.5v11.75h5.45c2.32 0 3.85-1.24 3.85-3.32 0-1.2-.55-2.09-1.5-2.6zm6.86-1.98c-1.45 0-2.36 1.05-2.45 2.5h4.84c-.1-1.48-.96-2.5-2.39-2.5zm0-1.45c2.6 0 4.3 1.8 4.3 4.4 0 .34-.03.73-.08.97h-6.7c.18 1.5 1.23 2.37 2.65 2.37 1.02 0 1.95-.44 2.45-1.28l1.45.9c-.83 1.34-2.28 2.03-3.9 2.03-2.9 0-4.8-2.06-4.8-4.7s1.95-4.69 4.63-4.69zm-2.75-2.55h5.5v1.3h-5.5v-1.3z" />
    </svg>
  );
}

interface Social3DIconProps {
  platform: 'instagram' | 'behance' | 'linkedin' | 'whatsapp' | 'email' | 'website';
  href: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Social3DIcon({
  platform,
  href,
  label,
  size = 'md',
  className = '',
}: Social3DIconProps) {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-12 h-12',
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  const platformConfig = {
    instagram: {
      name: 'Instagram',
      icon: <Instagram className={iconSizeMap[size]} />,
      accent: 'hover:text-[#E1306C]',
    },
    behance: {
      name: 'Behance',
      icon: <BehanceIcon className={iconSizeMap[size]} />,
      accent: 'hover:text-[#0057FF]',
    },
    linkedin: {
      name: 'LinkedIn',
      icon: <Linkedin className={iconSizeMap[size]} />,
      accent: 'hover:text-[#0A66C2]',
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: <MessageCircle className={iconSizeMap[size]} />,
      accent: 'hover:text-[#25D366]',
    },
    email: {
      name: 'Email',
      icon: <Mail className={iconSizeMap[size]} />,
      accent: 'hover:text-deepInk',
    },
    website: {
      name: 'Website',
      icon: <ExternalLink className={iconSizeMap[size]} />,
      accent: 'hover:text-deepInk',
    },
  };

  const current = platformConfig[platform] || platformConfig.email;
  const isMailOrTel = href.startsWith('mailto:') || href.startsWith('tel:');

  return (
    <a
      href={href}
      target={isMailOrTel ? undefined : '_blank'}
      rel={isMailOrTel ? undefined : 'noopener noreferrer'}
      aria-label={label || current.name}
      title={label || current.name}
      className={`group relative inline-flex items-center justify-center rounded-full bg-white dark:bg-[#252240] text-deepInk dark:text-white border border-white/90 dark:border-[#38345C] shadow-[0_4px_12px_rgba(46,42,79,0.08)] hover:shadow-[0_8px_20px_rgba(46,42,79,0.14)] sm:hover:-translate-y-1 active:scale-95 active:translate-y-0.5 transition-all duration-200 ${sizeMap[size]} ${className}`}
    >
      <div className={`transition-transform duration-200 group-hover:scale-110 ${current.accent}`}>
        {current.icon}
      </div>

      {/* Tooltip */}
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-deepInk px-2.5 py-0.5 text-[10px] font-bold text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 z-30">
        {label || current.name}
      </span>
    </a>
  );
}
