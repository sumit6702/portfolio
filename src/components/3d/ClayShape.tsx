import React from 'react';

interface ClayShapeProps {
  type: 'sphere' | 'torus' | 'star' | 'cube' | 'pill' | 'sparkle';
  color?: 'teal' | 'coral' | 'yellow' | 'mint' | 'deepTeal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export default function ClayShape({
  type,
  color = 'teal',
  size = 'md',
  className = '',
  animate = true,
}: ClayShapeProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  };

  const colorPalettes = {
    teal: {
      gradStart: '#2DD4BF',
      gradMid: '#14B8A6',
      gradEnd: '#0F766E',
      highlight: '#CCFBF1',
      shadow: '#093231',
    },
    coral: {
      gradStart: '#FFA092',
      gradMid: '#FF8A7A',
      gradEnd: '#E55C4A',
      highlight: '#FFEBE7',
      shadow: '#9E2A1E',
    },
    yellow: {
      gradStart: '#FFF3C9',
      gradMid: '#FFE69A',
      gradEnd: '#E6B83B',
      highlight: '#FFFFFF',
      shadow: '#A17D16',
    },
    mint: {
      gradStart: '#E6FFFA',
      gradMid: '#CCFBF1',
      gradEnd: '#5EEAD4',
      highlight: '#FFFFFF',
      shadow: '#115E59',
    },
    deepTeal: {
      gradStart: '#1E6B68',
      gradMid: '#0F4C4A',
      gradEnd: '#082827',
      highlight: '#5EEAD4',
      shadow: '#031212',
    },
  };

  const p = colorPalettes[color];
  const animClass = animate ? 'animate-float-gentle' : '';

  if (type === 'sphere') {
    return (
      <div className={`relative inline-block ${sizeMap[size]} ${animClass} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id={`sphereGrad-${color}`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor={p.highlight} />
              <stop offset="35%" stopColor={p.gradMid} />
              <stop offset="85%" stopColor={p.gradEnd} />
              <stop offset="100%" stopColor={p.shadow} />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill={`url(#sphereGrad-${color})`} />
          <ellipse cx="38" cy="30" rx="14" ry="8" fill="#ffffff" opacity="0.45" transform="rotate(-20 38 30)" />
        </svg>
      </div>
    );
  }

  if (type === 'torus') {
    return (
      <div className={`relative inline-block ${sizeMap[size]} ${animClass} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <radialGradient id={`torusGrad-${color}`} cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor={p.highlight} />
              <stop offset="45%" stopColor={p.gradMid} />
              <stop offset="85%" stopColor={p.gradEnd} />
              <stop offset="100%" stopColor={p.shadow} />
            </radialGradient>
          </defs>
          <path
            d="M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z M 50 28 A 22 22 0 1 1 50 72 A 22 22 0 1 1 50 28 Z"
            fill={`url(#torusGrad-${color})`}
            fillRule="evenodd"
          />
          <ellipse cx="34" cy="24" rx="8" ry="4" fill="#ffffff" opacity="0.5" transform="rotate(-30 34 24)" />
        </svg>
      </div>
    );
  }

  if (type === 'star') {
    return (
      <div className={`relative inline-block ${sizeMap[size]} ${animClass} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id={`starGrad-${color}`} cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor={p.highlight} />
              <stop offset="50%" stopColor={p.gradMid} />
              <stop offset="90%" stopColor={p.gradEnd} />
              <stop offset="100%" stopColor={p.shadow} />
            </radialGradient>
          </defs>
          <path
            d="M50 8 L58 35 L86 38 L65 57 L72 85 L49 71 L27 85 L34 57 L13 38 L41 35 Z"
            fill={`url(#starGrad-${color})`}
            stroke={p.highlight}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="45" cy="40" r="6" fill="#ffffff" opacity="0.4" />
        </svg>
      </div>
    );
  }

  if (type === 'pill') {
    return (
      <div className={`relative inline-block ${sizeMap[size]} ${animClass} ${className}`}>
        <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id={`pillGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={p.highlight} />
              <stop offset="30%" stopColor={p.gradMid} />
              <stop offset="85%" stopColor={p.gradEnd} />
              <stop offset="100%" stopColor={p.shadow} />
            </linearGradient>
          </defs>
          <rect x="5" y="10" width="110" height="40" rx="20" fill={`url(#pillGrad-${color})`} />
          <rect x="18" y="14" width="70" height="8" rx="4" fill="#ffffff" opacity="0.4" />
        </svg>
      </div>
    );
  }

  // Sparkle / cross
  return (
    <div className={`relative inline-block ${sizeMap[size]} ${animClass} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <path
          d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z"
          fill={p.gradMid}
        />
        <circle cx="50" cy="50" r="10" fill={p.highlight} opacity="0.75" />
      </svg>
    </div>
  );
}
