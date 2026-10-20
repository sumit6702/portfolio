'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import Social3DIcon from '@/components/3d/Social3DIcon';
import ClayShape from '@/components/3d/ClayShape';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white border-t-2 border-mint/60 pt-16 pb-12 overflow-hidden">
      {/* Decorative background clay shapes */}
      <div className="absolute top-6 left-10 opacity-25 pointer-events-none">
        <ClayShape type="sphere" color="mint" size="lg" animate={false} />
      </div>
      <div className="absolute bottom-6 right-10 opacity-20 pointer-events-none">
        <ClayShape type="torus" color="yellow" size="lg" animate={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-bold text-xl shadow-[0_4px_0_#0D9488]">
                S
              </div>
              <span className="font-display font-bold text-2xl text-deepTeal">
                Sumit Kumar
              </span>
            </div>
            <p className="text-deepTeal-muted text-sm leading-relaxed max-w-md font-medium">
              Graphic designer specializing in branding, layout, motion graphics, and 3D design.
              Bridging identity design with visual depth through Blender, After Effects, and AI video generation.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Social3DIcon platform="instagram" href="https://instagram.com/sumitkdesigns" size="sm" />
              <Social3DIcon platform="behance" href="https://behance.net/sumitdesigns" size="sm" />
              <Social3DIcon platform="linkedin" href="https://linkedin.com/in/sumitk02" size="sm" />
              <Social3DIcon platform="whatsapp" href="https://wa.me/919891997885" size="sm" />
              <Social3DIcon platform="email" href="mailto:sumitkdesigns@gmail.com" size="sm" />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display font-bold text-base text-deepTeal uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="text-deepTeal-muted hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-deepTeal-muted hover:text-primary transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-deepTeal-muted hover:text-primary transition-colors">
                  Motion & 3D Video Showcase
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-deepTeal-muted hover:text-primary transition-colors">
                  About & Experience
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-deepTeal-muted hover:text-primary transition-colors">
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Details & Admin */}
          <div>
            <h4 className="font-display font-bold text-base text-deepTeal uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-deepTeal-muted font-medium">
              <p>
                <span className="font-bold text-deepTeal">Email:</span>{' '}
                <a href="mailto:sumitkdesigns@gmail.com" className="hover:text-primary underline">
                  sumitkdesigns@gmail.com
                </a>
              </p>
              <p>
                <span className="font-bold text-deepTeal">Phone:</span>{' '}
                <a href="tel:+919891997885" className="hover:text-primary underline">
                  +91 9891997885
                </a>
              </p>
              <p>
                <span className="font-bold text-deepTeal">Location:</span> Gurugram & Delhi, India
              </p>
              <div className="pt-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream border border-mint text-xs font-bold text-deepTeal hover:bg-mint transition-colors"
                >
                  Admin Portal & Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-mint/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-deepTeal-muted">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Sumit Kumar. Crafted with{' '}
            <Heart className="w-3.5 h-3.5 text-coralPeach fill-coralPeach inline" /> in Next.js & Supabase.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint text-deepTeal font-bold hover:bg-primary hover:text-white transition-all shadow-[0_2px_0_#99F6E4] active:translate-y-0.5"
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
