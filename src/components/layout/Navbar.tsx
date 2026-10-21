'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { fetchProfileSettings } from '@/lib/data-service';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { themeConfig } = useTheme();
  const [activeResumeUrl, setActiveResumeUrl] = useState<string>(
    resumeUrl || '/resume-sumit-kumar.pdf'
  );

  useEffect(() => {
    if (resumeUrl && resumeUrl !== '/resume-sumit-kumar.pdf') {
      setActiveResumeUrl(resumeUrl);
    }
    fetchProfileSettings().then((prof) => {
      if (prof?.resumeUrl && prof.resumeUrl.trim()) {
        setActiveResumeUrl(prof.resumeUrl.trim());
      }
    });
  }, [resumeUrl]);

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
          
          {/* Brand Logo: customizable text or image from Theme Config */}
          <Link
            href="/"
            className="group flex items-baseline gap-1 no-underline select-none"
          >
            {themeConfig?.logo?.type === 'image' && themeConfig.logo.imageUrl ? (
              <div className="relative h-8 sm:h-9 w-28 sm:w-36 flex items-center">
                <Image
                  src={themeConfig.logo.imageUrl}
                  alt={themeConfig.logo.text || 'Sumit Kumar'}
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <>
                <span className="font-serif font-black text-4xl sm:text-5xl text-deepInk dark:text-white tracking-tighter leading-none group-hover:text-deepInk/80 transition-colors">
                  {themeConfig?.logo?.text || 's'}
                </span>
                {themeConfig?.logo?.dotColor ? (
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: themeConfig.logo.dotColor }}
                  />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-periwinkle group-hover:bg-lavender inline-block group-hover:scale-125 transition-transform" />
                )}
              </>
            )}
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
              href={activeResumeUrl || '/resume-sumit-kumar.pdf'}
              download="Sumit-Kumar-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile btn-tactile-white inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-white/10 text-deepInk dark:text-white text-xs font-bold border-2 border-white dark:border-white/20 shadow-[0_2px_8px_rgba(46,42,79,0.06)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
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
              href={activeResumeUrl || '/resume-sumit-kumar.pdf'}
              download="Sumit-Kumar-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-tactile btn-tactile-mint px-4 py-2.5 rounded-2xl text-sm font-bold bg-mint dark:bg-mint/20 text-deepInk dark:text-mint flex items-center justify-between"
            >
              <span className="relative z-10 flex items-center justify-between w-full">
                <span>Download Resume</span>
                <Download className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
