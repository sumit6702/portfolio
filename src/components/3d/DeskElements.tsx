'use client';

import React from 'react';

/**
 * Slim vertical side tab on right viewport edge ("Available for work")
 * Mint badge with deep ink text per style specifications
 */
export function FloatingSideRibbon() {
  return (
    <aside
      aria-label="Available for work status badge"
      className="fixed top-1/2 -right-1 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
    >
      <a
        href="#contact"
        className="group flex flex-col items-center gap-2 py-4 px-2.5 rounded-l-2xl bg-mint text-deepInk shadow-[0_8px_20px_rgba(207,241,224,0.6)] border-l-2 border-y-2 border-white/90 hover:-translate-x-1 active:scale-95 transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-deepInk animate-ping" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-bold uppercase tracking-widest text-deepInk">
          Available for work
        </span>
      </a>
    </aside>
  );
}
