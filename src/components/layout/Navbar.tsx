'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Lock, Download } from 'lucide-react';
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
    { name: 'Projects', href: '/projects', pastel: 'hover:bg-periwinkle-light' },
    { name: 'Videos', href: '/videos', pastel: 'hover:bg-babyPink-light' },
    { name: 'About', href: '/#about', pastel: 'hover:bg-butterYellow-light' },
    { name: 'Contact', href: '/#contact', pastel: 'hover:bg-mint-light' },
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
          ? 'bg-bg/85 dark:bg-[#161426]/85 backdrop-blur-md py-3 border-b border-lavender/30 dark:border-white/10 shadow-sm'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo: 's.' in bold serif with periwinkle/lavender dot */}
          <Link
            href="/"
            className="group flex items-baseline gap-1 no-underline select-none"
          >
            <span className="font-serif font-black text-4xl sm:text-5xl text-deepInk dark:text-white tracking-tighter leading-none group-hover:text-deepInk/80 transition-colors">
              s
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-periwinkle group-hover:bg-lavender inline-block group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {/* Pill container with pastel link pills */}
            <nav className="flex items-center gap-1.5 bg-white/80 dark:bg-[#1E1B33]/80 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-lavender/40 dark:border-white/10 shadow-[0_2px_8px_rgba(46,42,79,0.04)]">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`btn-tactile px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      active
                        ? 'btn-tactile-dark bg-deepInk text-white shadow-sm'
                        : `text-deepInk dark:text-lavender-light ${link.pastel} dark:hover:bg-white/10`
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* White-outlined Resume Pill with tactile spring */}
            <a
              href="/resume-sumit-kumar.pdf"
              download="Sumit-Kumar-Resume.pdf"
              className="btn-tactile btn-tactile-white inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-white/10 text-deepInk dark:text-white text-xs font-bold border-2 border-white dark:border-white/20 shadow-[0_2px_8px_rgba(46,42,79,0.06)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </span>
            </a>

            {/* Admin shortcut round button with tactile spring */}
            <Link
              href="/admin"
              aria-label="Admin Portal"
              title="Admin Portal"
              className="btn-tactile btn-tactile-white w-9 h-9 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 text-bodyText-muted dark:text-lavender-light hover:text-deepInk flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-white shadow-sm active:translate-y-0.5"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 mt-2 mx-4 bg-white dark:bg-[#1E1B33] rounded-3xl border border-lavender/50 dark:border-white/10 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-lavender-light dark:bg-white/15 text-deepInk dark:text-white'
                    : 'text-deepInk dark:text-white hover:bg-bg dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="/resume-sumit-kumar.pdf"
              download="Sumit-Kumar-Resume.pdf"
              onClick={() => setIsOpen(false)}
              className="btn-water btn-water-mint px-4 py-2.5 rounded-2xl text-sm font-bold bg-mint dark:bg-mint/20 text-deepInk dark:text-mint flex items-center justify-between"
            >
              <span className="relative z-10 flex items-center justify-between w-full">
                <span>Download Resume</span>
                <Download className="w-4 h-4" />
              </span>
            </a>

            <div className="pt-3 border-t border-lavender/40 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-bodyText-muted dark:text-lavender-light/70 uppercase">Theme Mode</span>
              <ThemeToggle variant="segmented" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
