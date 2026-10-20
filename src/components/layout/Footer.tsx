'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import Social3DIcon from '@/components/3d/Social3DIcon';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white/80 dark:bg-[#121021] border-t border-lavender/40 dark:border-white/10 pt-16 pb-12 overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-deepInk text-white flex items-center justify-center font-serif font-black text-xl shadow-sm">
                S
              </div>
              <span className="font-serif font-bold text-2xl text-deepInk dark:text-white">
                Sumit Kumar
              </span>
            </div>
            <p className="text-bodyText-muted dark:text-lavender-light/70 text-sm leading-relaxed max-w-md font-medium">
              Graphic designer specializing in branding, layout, motion graphics, and 3D design.
              Bridging identity design with visual depth through Blender, After Effects, and AI video generation.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Social3DIcon platform="instagram" href="https://instagram.com/sumitkdesigns" size="sm" />
              <Social3DIcon platform="behance" href="https://behance.net/sumitdesigns" size="sm" />
              <Social3DIcon platform="linkedin" href="https://linkedin.com/in/sumitk02" size="sm" />
              <Social3DIcon platform="whatsapp" href="https://wa.me/919891997885" size="sm" />
              <Social3DIcon platform="email" href="mailto:sumitkdesigns@gmail.com" size="sm" />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif font-bold text-base text-deepInk dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-periwinkle" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="text-bodyText-muted dark:text-lavender-light/70 hover:text-deepInk dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-bodyText-muted dark:text-lavender-light/70 hover:text-deepInk dark:hover:text-white transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-bodyText-muted dark:text-lavender-light/70 hover:text-deepInk dark:hover:text-white transition-colors">
                  Motion & 3D Video Showcase
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-bodyText-muted dark:text-lavender-light/70 hover:text-deepInk dark:hover:text-white transition-colors">
                  About & Experience
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-bodyText-muted dark:text-lavender-light/70 hover:text-deepInk dark:hover:text-white transition-colors">
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Details & Admin */}
          <div>
            <h4 className="font-serif font-bold text-base text-deepInk dark:text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-bodyText-muted dark:text-lavender-light/70 font-medium">
              <p>
                <span className="font-bold text-deepInk dark:text-white">Email:</span>{' '}
                <a href="mailto:sumitkdesigns@gmail.com" className="hover:text-deepInk underline">
                  sumitkdesigns@gmail.com
                </a>
              </p>
              <p>
                <span className="font-bold text-deepInk dark:text-white">Phone:</span>{' '}
                <a href="tel:+919891997885" className="hover:text-deepInk underline">
                  +91 9891997885
                </a>
              </p>
              <p>
                <span className="font-bold text-deepInk dark:text-white">Location:</span> Gurugram & Delhi, India
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 text-xs font-bold text-deepInk dark:text-lavender-light hover:bg-lavender-light transition-colors"
                >
                  Admin Portal
                </Link>

                <ThemeToggle variant="segmented" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-lavender/30 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Sumit Kumar. Crafted with{' '}
            <Heart className="w-3.5 h-3.5 text-babyPink fill-babyPink inline" /> in Next.js & Supabase.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#1E1B33] text-deepInk dark:text-white font-bold border border-lavender/40 dark:border-white/10 hover:bg-lavender-light transition-all shadow-sm active:translate-y-0.5"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
