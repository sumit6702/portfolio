'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Lock, ArrowUpRight } from 'lucide-react';
import ClayButton from '@/components/3d/ClayButton';

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
    { name: 'Home', href: '/' },
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
          ? 'bg-cream/90 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(15,76,74,0.06)] border-b border-mint/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with 3D badge */}
          <Link
            href="/"
            className="group flex items-center gap-3 no-underline"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-bold text-xl shadow-[0_4px_0_#0D9488] group-hover:scale-105 transition-transform duration-200">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-deepTeal tracking-tight group-hover:text-primary transition-colors">
                Sumit Kumar
              </span>
              <span className="text-xs font-semibold text-deepTeal-muted flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Motion & 3D Designer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-mint shadow-[0_4px_12px_rgba(15,76,74,0.04)]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-primary text-white shadow-[0_3px_0_#0D9488]'
                      : 'text-deepTeal hover:text-primary hover:bg-mint/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              aria-label="Admin Portal"
              title="Admin Portal"
              className="w-10 h-10 rounded-2xl bg-white border-2 border-mint text-deepTeal-muted flex items-center justify-center shadow-[0_3px_0_#99F6E4] hover:text-primary hover:border-primary transition-all duration-150 active:translate-y-0.5"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <ClayButton
              variant="coral"
              size="sm"
              href="/#contact"
              className="text-xs uppercase tracking-wider"
            >
              Let&apos;s Talk
              <ArrowUpRight className="w-4 h-4" />
            </ClayButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-2 text-deepTeal-muted rounded-xl border border-mint bg-white"
              aria-label="Admin"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-white border-2 border-mint text-deepTeal shadow-[0_3px_0_#99F6E4] active:translate-y-0.5"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 mt-2 mx-4 bg-white rounded-3xl border-2 border-mint shadow-[0_12px_30px_rgba(15,76,74,0.12)]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-mint text-deepTeal'
                    : 'text-deepTeal hover:bg-cream'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-mint flex flex-col gap-2">
              <ClayButton
                variant="coral"
                fullWidth
                href="/#contact"
                onClick={() => setIsOpen(false)}
              >
                Get In Touch
                <ArrowUpRight className="w-5 h-5 ml-1" />
              </ClayButton>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-center text-xs text-deepTeal-muted font-medium py-2 hover:text-primary"
              >
                Admin Dashboard Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
