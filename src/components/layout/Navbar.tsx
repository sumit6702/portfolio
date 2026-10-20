'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Lock, Download, ArrowUpRight } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Videos', href: '/videos' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/80 dark:bg-[#071918]/85 backdrop-blur-md py-3 border-b border-mint/40 dark:border-[#1A4543]/40 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo in the style of beblessed.io ('b.') -> ('s.') */}
          <Link
            href="/"
            className="group flex items-baseline gap-1.5 no-underline select-none"
          >
            <span className="font-display font-black text-4xl sm:text-5xl text-deepTeal dark:text-white tracking-tighter leading-none group-hover:text-primary transition-colors">
              s
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Navigation Pills */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1.5 bg-white/70 dark:bg-[#0D2625]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-mint/60 dark:border-[#1E524F]/60 shadow-[0_2px_8px_rgba(15,76,74,0.04)]">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      active
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-deepTeal/80 dark:text-mint/80 hover:text-primary hover:bg-mint/40 dark:hover:bg-[#113B39]/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Resume Button */}
            <a
              href="/resume-sumit-kumar.pdf"
              download="Sumit-Kumar-Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint text-xs font-extrabold border border-mint-border dark:border-[#1E615D] hover:bg-primary hover:text-white transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>

            {/* Admin shortcut */}
            <Link
              href="/admin"
              aria-label="Admin Portal"
              title="Admin Portal"
              className="w-9 h-9 rounded-full bg-white dark:bg-[#0D2625] border border-mint/60 dark:border-[#1E524F]/60 text-deepTeal-muted dark:text-mint/70 flex items-center justify-center hover:text-primary transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#0D2625] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white shadow-sm active:translate-y-0.5"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 mt-2 mx-4 bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1E524F] shadow-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-mint dark:bg-[#153D3B] text-deepTeal dark:text-mint'
                    : 'text-deepTeal dark:text-white hover:bg-cream dark:hover:bg-[#113331]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="/resume-sumit-kumar.pdf"
              download="Sumit-Kumar-Resume.pdf"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-2xl text-sm font-bold bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint flex items-center justify-between"
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </a>

            <div className="pt-3 border-t border-mint dark:border-[#1E524F]/60 flex items-center justify-between text-xs">
              <span className="font-bold text-deepTeal-muted dark:text-mint/70 uppercase">Theme Mode</span>
              <ThemeToggle variant="segmented" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
