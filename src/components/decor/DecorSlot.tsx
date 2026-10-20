'use client';

import React, { useState } from 'react';
import { DECOR_SLOTS, SHOW_PLACEHOLDERS, DecorSlotConfig } from '@/config/decor';

interface DecorSlotProps {
  slot: string | DecorSlotConfig;
  className?: string;
  forceShowPlaceholder?: boolean;
}

export default function DecorSlot({
  slot,
  className = '',
  forceShowPlaceholder = false,
}: DecorSlotProps) {
  const config: DecorSlotConfig | undefined =
    typeof slot === 'string' ? DECOR_SLOTS[slot] : slot;

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!config) {
    return null;
  }

  // If user dropped image and it failed (or hasn't been added yet)
  const showPlaceholderBox = (hasError || !isLoaded || forceShowPlaceholder) && (SHOW_PLACEHOLDERS || forceShowPlaceholder);

  // If placeholders are globally disabled and no valid image loaded, render nothing
  if (!SHOW_PLACEHOLDERS && hasError && !forceShowPlaceholder) {
    return null;
  }

  return (
    <div
      className={`absolute pointer-events-none select-none transition-all duration-300 ${config.positionClass} ${className}`}
      style={{
        zIndex: config.zIndex,
      }}
      aria-hidden="true"
    >
      <div
        className="relative w-full h-full flex items-center justify-center animate-float-gentle"
        style={{
          transform: `rotate(${config.rotation}deg)`,
          animationDuration: config.floatDuration,
          animationDelay: config.floatDelay,
        }}
      >
        {/* Real Transparent PNG (Attempt to load) */}
        {!forceShowPlaceholder && (
          <img
            src={config.imagePath}
            alt={config.label}
            onError={() => setHasError(true)}
            onLoad={() => {
              setIsLoaded(true);
              setHasError(false);
            }}
            className={`w-full h-full object-contain filter drop-shadow-[0_16px_24px_rgba(46,42,79,0.18)] transition-opacity duration-300 ${
              isLoaded && !hasError ? 'opacity-100' : 'opacity-0 absolute'
            }`}
          />
        )}

        {/* Soft Pastel Dashed Placeholder Box Fallback */}
        {showPlaceholderBox && (
          <div
            className={`w-full h-full rounded-2xl border-2 border-dashed border-lavender-border/80 bg-white/70 backdrop-blur-sm shadow-[0_8px_20px_rgba(217,204,242,0.35)] p-2.5 flex flex-col items-center justify-center text-center transition-all duration-300 ${
              isLoaded && !hasError ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-lavender/60 text-deepInk flex items-center justify-center mb-1 text-[10px] font-bold">
              ✦
            </div>
            <span className="font-mono text-[11px] font-bold text-deepInk tracking-tight truncate max-w-full">
              {config.label}
            </span>
            <span className="text-[9px] font-semibold text-deepInk-muted mt-0.5 opacity-80">
              {config.recommendedSize.width}×{config.recommendedSize.height}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
