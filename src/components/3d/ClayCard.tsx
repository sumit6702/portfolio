import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'mint' | 'cream' | 'dark';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function ClayCard({
  children,
  className = '',
  variant = 'white',
  hoverEffect = true,
  padding = 'lg',
}: ClayCardProps) {
  const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10 md:p-12',
  };

  const variantMap = {
    white: 'clay-card',
    mint: 'clay-mint-card',
    cream: 'bg-[#FFFDF8] border-2 border-[#FFEED9] shadow-[0_8px_0_#F5DBC1,0_16px_30px_rgba(15,76,74,0.06)]',
    dark: 'bg-deepTeal text-white border-2 border-deepTeal-light shadow-[0_8px_0_#093231,0_20px_35px_rgba(9,50,49,0.35)]',
  };

  const hoverClass = hoverEffect && variant !== 'white' ? 'transition-transform duration-200 hover:-translate-y-1.5' : '';

  return (
    <div
      className={`relative rounded-3xl ${variantMap[variant]} ${paddingMap[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
