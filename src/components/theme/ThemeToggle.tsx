'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, ChevronDown, Check } from 'lucide-react';
import { useTheme, ThemeMode } from './ThemeProvider';

interface ThemeToggleProps {
  variant?: 'button' | 'segmented';
  className?: string;
}

export default function ThemeToggle({ variant = 'button', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'system', label: 'System', icon: <Laptop className="w-4 h-4" /> },
    { mode: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-teal-400" /> },
  ];

  if (variant === 'segmented') {
    return (
      <div className={`flex items-center gap-1 p-1 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] shadow-inner ${className}`}>
        {options.map((opt) => {
          const isActive = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => setTheme(opt.mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-[0_2px_0_#0D9488]'
                  : 'text-deepTeal dark:text-mint/70 hover:text-primary'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Default: cute 3D compact toggle button with dropdown
  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Mode"
        title={`Theme: ${theme.toUpperCase()} (Click to change)`}
        className="w-10 h-10 rounded-2xl bg-white dark:bg-[#0D2625] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-mint flex items-center justify-center shadow-[0_3px_0_#99F6E4] dark:shadow-[0_3px_0_#071918] hover:border-primary transition-all duration-150 active:translate-y-0.5"
      >
        {theme === 'system' ? (
          <Laptop className="w-4 h-4 text-primary" />
        ) : resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 text-teal-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-[#0D2625] border-2 border-mint dark:border-[#1E524F] p-1.5 shadow-[0_8px_0_#99F6E4,0_16px_28px_rgba(15,76,74,0.12)] dark:shadow-[0_8px_0_#071918,0_16px_28px_rgba(0,0,0,0.4)] z-50 animate-scale-up">
          {options.map((opt) => {
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setTheme(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-mint dark:bg-[#153D3B] text-primary dark:text-mint'
                    : 'text-deepTeal dark:text-[#E6FFFA]/80 hover:bg-cream dark:hover:bg-[#113331]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
