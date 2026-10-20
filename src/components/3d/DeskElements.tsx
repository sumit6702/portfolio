import React from 'react';

/**
 * Cute Clay Potted Succulent Plant (top-left desk prop)
 */
export function ClayPlant({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none drop-shadow-[0_15px_15px_rgba(15,76,74,0.18)] ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          {/* Terracotta/Teal pot gradient */}
          <radialGradient id="potGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFA092" />
            <stop offset="60%" stopColor="#E55C4A" />
            <stop offset="100%" stopColor="#9E2A1E" />
          </radialGradient>
          {/* Succulent petal gradients */}
          <radialGradient id="leafDarkGrad" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </radialGradient>
          <radialGradient id="leafLightGrad" cx="35%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#CCFBF1" />
            <stop offset="45%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </radialGradient>
          <radialGradient id="leafCenterGrad" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFF8F0" />
            <stop offset="40%" stopColor="#99F6E4" />
            <stop offset="100%" stopColor="#14B8A6" />
          </radialGradient>
          <filter id="clayShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Pot Base */}
        <ellipse cx="80" cy="80" rx="72" ry="72" fill="#093231" opacity="0.1" />
        <ellipse cx="80" cy="80" rx="66" ry="66" fill="url(#potGrad)" />
        <ellipse cx="80" cy="80" rx="58" ry="58" fill="#115E59" opacity="0.3" />

        {/* Outer Ring of Succulent Petals */}
        <g filter="url(#clayShadow)">
          {/* Petal North */}
          <ellipse cx="80" cy="38" rx="20" ry="24" fill="url(#leafDarkGrad)" />
          {/* Petal NE */}
          <ellipse cx="112" cy="48" rx="22" ry="22" fill="url(#leafDarkGrad)" transform="rotate(45 112 48)" />
          {/* Petal East */}
          <ellipse cx="122" cy="80" rx="24" ry="20" fill="url(#leafDarkGrad)" />
          {/* Petal SE */}
          <ellipse cx="112" cy="112" rx="22" ry="22" fill="url(#leafDarkGrad)" transform="rotate(-45 112 112)" />
          {/* Petal South */}
          <ellipse cx="80" cy="122" rx="20" ry="24" fill="url(#leafDarkGrad)" />
          {/* Petal SW */}
          <ellipse cx="48" cy="112" rx="22" ry="22" fill="url(#leafDarkGrad)" transform="rotate(45 48 112)" />
          {/* Petal West */}
          <ellipse cx="38" cy="80" rx="24" ry="20" fill="url(#leafDarkGrad)" />
          {/* Petal NW */}
          <ellipse cx="48" cy="48" rx="22" ry="22" fill="url(#leafDarkGrad)" transform="rotate(-45 48 48)" />
        </g>

        {/* Middle Ring of Leaves */}
        <g filter="url(#clayShadow)">
          <ellipse cx="80" cy="52" rx="16" ry="20" fill="url(#leafLightGrad)" />
          <ellipse cx="102" cy="60" rx="17" ry="17" fill="url(#leafLightGrad)" transform="rotate(45 102 60)" />
          <ellipse cx="108" cy="80" rx="20" ry="16" fill="url(#leafLightGrad)" />
          <ellipse cx="102" cy="100" rx="17" ry="17" fill="url(#leafLightGrad)" transform="rotate(-45 102 100)" />
          <ellipse cx="80" cy="108" rx="16" ry="20" fill="url(#leafLightGrad)" />
          <ellipse cx="58" cy="100" rx="17" ry="17" fill="url(#leafLightGrad)" transform="rotate(45 58 100)" />
          <ellipse cx="52" cy="80" rx="20" ry="16" fill="url(#leafLightGrad)" />
          <ellipse cx="58" cy="60" rx="17" ry="17" fill="url(#leafLightGrad)" transform="rotate(-45 58 60)" />
        </g>

        {/* Center Bud Leaves */}
        <g>
          <ellipse cx="80" cy="68" rx="11" ry="14" fill="url(#leafCenterGrad)" />
          <ellipse cx="92" cy="80" rx="14" ry="11" fill="url(#leafCenterGrad)" />
          <ellipse cx="80" cy="92" rx="11" ry="14" fill="url(#leafCenterGrad)" />
          <ellipse cx="68" cy="80" rx="14" ry="11" fill="url(#leafCenterGrad)" />
          <circle cx="80" cy="80" r="8" fill="#FFF8F0" opacity="0.9" />
          <circle cx="78" cy="78" r="4" fill="#ffffff" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Cute Clay Pencil with eraser (left desk prop)
 */
export function ClayPencil({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none drop-shadow-[0_12px_12px_rgba(15,76,74,0.14)] ${className}`}>
      <svg viewBox="0 0 60 160" className="w-full h-full" style={{ transform: 'rotate(-25deg)' }}>
        <defs>
          <linearGradient id="pencilWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDE7B" />
            <stop offset="50%" stopColor="#FFE69A" />
            <stop offset="100%" stopColor="#E6B83B" />
          </linearGradient>
          <linearGradient id="pencilEraser" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8A7A" />
            <stop offset="50%" stopColor="#FFA092" />
            <stop offset="100%" stopColor="#E55C4A" />
          </linearGradient>
          <linearGradient id="pencilFerrule" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Eraser */}
        <path d="M 16 12 Q 16 2 30 2 Q 44 2 44 12 L 44 26 L 16 26 Z" fill="url(#pencilEraser)" />
        {/* Metal Ferrule */}
        <rect x="15" y="26" width="30" height="12" rx="2" fill="url(#pencilFerrule)" />
        <line x1="15" y1="32" x2="45" y2="32" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Pencil Body */}
        <rect x="16" y="38" width="28" height="85" fill="url(#pencilWood)" />
        {/* Hexagonal ridges */}
        <line x1="25" y1="38" x2="25" y2="123" stroke="#F5CE59" strokeWidth="1.5" />
        <line x1="35" y1="38" x2="35" y2="123" stroke="#D99E18" strokeWidth="1.5" />
        {/* Sharpened Wood Cone */}
        <path d="M 16 123 L 30 152 L 44 123 Z" fill="#FDF4E7" />
        {/* Graphite Tip */}
        <path d="M 26 144 L 30 152 L 34 144 Z" fill="#0F4C4A" />
      </svg>
    </div>
  );
}

/**
 * Cute Clay Paperclip
 */
export function ClayPaperclip({ className = '', color = '#14B8A6' }: { className?: string; color?: string }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none drop-shadow-[0_4px_6px_rgba(15,76,74,0.12)] ${className}`}>
      <svg viewBox="0 0 40 80" className="w-full h-full">
        <path
          d="M 12 70 L 12 24 A 12 12 0 0 1 32 24 L 32 58 A 8 8 0 0 1 18 58 L 18 28 A 4 4 0 0 1 26 28 L 26 54"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Cute Clay Sticky Note with Pushpin (right desk prop)
 */
export function ClayStickyNote({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none drop-shadow-[0_12px_18px_rgba(15,76,74,0.14)] ${className}`}>
      <div className="w-36 h-36 sm:w-40 sm:h-40 bg-[#FFF8C9] dark:bg-[#1E382B] rounded-2xl p-4 border border-[#FFE885] dark:border-[#2D5A45] shadow-inner transform rotate-6 flex flex-col justify-between relative overflow-hidden">
        {/* Pushpin at top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-coralPeach shadow-[0_2px_4px_rgba(0,0,0,0.25)] border-2 border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        </div>

        {/* Cute heart sticker / badge */}
        <div className="pt-4 flex items-center justify-center gap-1.5 text-deepTeal dark:text-mint">
          <span className="text-sm font-black tracking-tight font-display">Sumit Kumar</span>
        </div>

        {/* Scribbled note lines */}
        <div className="space-y-1.5 px-1">
          <div className="h-1.5 bg-[#E6D472] dark:bg-[#2A4D3B] rounded-full w-4/5 mx-auto" />
          <div className="h-1.5 bg-[#E6D472] dark:bg-[#2A4D3B] rounded-full w-full" />
          <div className="h-1.5 bg-[#E6D472] dark:bg-[#2A4D3B] rounded-full w-3/4 mx-auto" />
        </div>

        <div className="text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94760C] dark:text-[#5EEAD4]">
            Motion • 3D Lab
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Cute Clay Takeaway Coffee Cup with spilled splash puddle underneath (right-middle desk prop)
 */
export function ClayCoffeeCup({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none drop-shadow-[0_14px_16px_rgba(15,76,74,0.16)] ${className}`}>
      <svg viewBox="0 0 140 160" className="w-full h-full">
        <defs>
          <linearGradient id="cupBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6FFFA" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CCFBF1" />
          </linearGradient>
          <linearGradient id="cupSleeve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5CE59" />
            <stop offset="50%" stopColor="#FFE69A" />
            <stop offset="100%" stopColor="#E6B83B" />
          </linearGradient>
          <radialGradient id="cupLid" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="70%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </radialGradient>
          <radialGradient id="coffeeSplash" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#5E3023" />
            <stop offset="80%" stopColor="#3B1E16" />
            <stop offset="100%" stopColor="#26130E" />
          </radialGradient>
        </defs>

        {/* Coffee Spilled Splash Puddle on Desk */}
        <path
          d="M 30 145 C 10 135 15 110 35 115 C 45 105 70 100 85 110 C 100 95 130 110 125 130 C 135 145 115 160 85 155 C 55 160 35 155 30 145 Z"
          fill="url(#coffeeSplash)"
          opacity="0.85"
        />
        {/* Splash droplet beads */}
        <circle cx="18" cy="118" r="4" fill="url(#coffeeSplash)" />
        <circle cx="132" cy="122" r="3.5" fill="url(#coffeeSplash)" />
        <circle cx="120" cy="152" r="3" fill="url(#coffeeSplash)" />

        {/* Cup Lid (Top View / Beveled Angle) */}
        <ellipse cx="70" cy="50" rx="38" ry="18" fill="url(#cupLid)" />
        <ellipse cx="70" cy="46" rx="26" ry="10" fill="#0D9488" />
        <ellipse cx="70" cy="45" rx="14" ry="5" fill="#093231" opacity="0.3" />

        {/* Cup Body (Tapered) */}
        <path d="M 38 52 L 46 128 Q 70 136 94 128 L 102 52 Z" fill="url(#cupBody)" />

        {/* Cardboard Heat Sleeve */}
        <path d="M 41 72 L 44 106 Q 70 114 96 106 L 99 72 Q 70 80 41 72 Z" fill="url(#cupSleeve)" />
        <circle cx="70" cy="90" r="7" fill="#0F4C4A" opacity="0.1" />
      </svg>
    </div>
  );
}

/**
 * Cute Clay Character Hands holding the Translucent Acrylic Ruler across bottom of Hero Card
 * (Inspired directly by the beblessed.io bottom hero element!)
 */
export function ClayRulerAndHands({ className = '' }: { className?: string }) {
  // 13 centimeter tick marks like the ruler in beblessed.io
  const ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Translucent Acrylic 3D Ruler */}
      <div className="relative w-[340px] sm:w-[500px] md:w-[680px] h-14 sm:h-16 rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-md border-2 border-white/80 dark:border-white/20 shadow-[0_10px_25px_rgba(15,76,74,0.15)] flex items-start justify-between px-6 pt-1 z-10 overflow-hidden">
        {/* Subtle glass reflection highlight */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {/* Ruler Tick Marks */}
        {ticks.map((num) => (
          <div key={num} className="flex flex-col items-center">
            {/* Major tick mark */}
            <div className="w-[1.5px] h-4 bg-deepTeal/60 dark:bg-mint/60" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-deepTeal/75 dark:text-mint/75 mt-0.5">
              {num}
            </span>
            {/* Mini ticks between numbers */}
            <div className="hidden sm:flex items-center gap-1.5 mt-1 opacity-50">
              <div className="w-[1px] h-2 bg-deepTeal/40 dark:bg-mint/40" />
              <div className="w-[1px] h-2.5 bg-deepTeal/40 dark:bg-mint/40" />
              <div className="w-[1px] h-2 bg-deepTeal/40 dark:bg-mint/40" />
            </div>
          </div>
        ))}
      </div>

      {/* Left Clay Hand holding the ruler */}
      <div className="absolute -bottom-4 left-6 sm:left-14 md:left-24 z-20 flex items-end">
        {/* 4 Clay fingers curled over ruler edge */}
        <div className="flex gap-1 -mb-1">
          <div className="w-5 sm:w-6 h-9 sm:h-11 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
          <div className="w-5 sm:w-6 h-11 sm:h-13 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
          <div className="w-5 sm:w-6 h-11 sm:h-13 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
        </div>
      </div>

      {/* Right Clay Hand holding the ruler */}
      <div className="absolute -bottom-4 right-6 sm:right-14 md:right-24 z-20 flex items-end">
        <div className="flex gap-1 -mb-1">
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
          <div className="w-5 sm:w-6 h-11 sm:h-13 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
          <div className="w-5 sm:w-6 h-11 sm:h-13 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
          <div className="w-5 sm:w-6 h-9 sm:h-11 rounded-t-full bg-gradient-to-b from-[#FFE0C2] to-[#F5B895] shadow-md border-t border-white/60" />
        </div>
      </div>
    </div>
  );
}

/**
 * Floating ribbon on viewport right edge (like "W. Nominee" in beblessed.io)
 */
export function FloatingSideRibbon() {
  return (
    <aside aria-label="Available for hire badge" className="fixed top-1/2 -right-1 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      <a
        href="#contact"
        className="group flex flex-col items-center gap-2 py-4 px-2.5 rounded-l-2xl bg-primary text-white shadow-[0_6px_16px_rgba(20,184,166,0.35)] border-l-2 border-y-2 border-white/50 hover:-translate-x-1 transition-transform"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-extrabold uppercase tracking-widest">
          Available For Work
        </span>
      </a>
    </aside>
  );
}
