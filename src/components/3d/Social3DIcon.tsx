import React from 'react';
import {
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

// Custom Behance SVG icon for precision
function BehanceIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
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
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-14 h-14 rounded-3xl',
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const platformConfig = {
    instagram: {
      name: 'Instagram',
      icon: <Instagram className={iconSizeMap[size]} />,
      accent: 'hover:border-coralPeach hover:text-coralPeach hover:shadow-[0_6px_0_#FF8A7A,0_12px_18px_rgba(255,138,122,0.25)]',
    },
    behance: {
      name: 'Behance',
      icon: <BehanceIcon className={iconSizeMap[size]} />,
      accent: 'hover:border-primary hover:text-primary hover:shadow-[0_6px_0_#14B8A6,0_12px_18px_rgba(20,184,166,0.25)]',
    },
    linkedin: {
      name: 'LinkedIn',
      icon: <Linkedin className={iconSizeMap[size]} />,
      accent: 'hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-[0_6px_0_#0A66C2,0_12px_18px_rgba(10,102,194,0.25)]',
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: <MessageCircle className={iconSizeMap[size]} />,
      accent: 'hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_6px_0_#25D366,0_12px_18px_rgba(37,211,102,0.25)]',
    },
    email: {
      name: 'Email',
      icon: <Mail className={iconSizeMap[size]} />,
      accent: 'hover:border-deepTeal hover:text-deepTeal hover:shadow-[0_6px_0_#0F4C4A,0_12px_18px_rgba(15,76,74,0.25)]',
    },
    website: {
      name: 'Website',
      icon: <ExternalLink className={iconSizeMap[size]} />,
      accent: 'hover:border-primary hover:text-primary hover:shadow-[0_6px_0_#14B8A6,0_12px_18px_rgba(20,184,166,0.25)]',
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
      className={`group relative inline-flex items-center justify-center bg-white border-2 border-mint text-deepTeal shadow-[0_4px_0_#99F6E4,0_8px_14px_rgba(15,76,74,0.08)] transition-all duration-150 active:translate-y-1 active:shadow-[0_1px_0_#99F6E4] hover:-translate-y-1 ${current.accent} ${sizeMap[size]} ${className}`}
    >
      <div className="transition-transform duration-200 group-hover:scale-110">
        {current.icon}
      </div>

      {/* Cute micro-tooltip on hover */}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-deepTeal px-2 py-0.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 z-30">
        {label || current.name}
      </span>
    </a>
  );
}
