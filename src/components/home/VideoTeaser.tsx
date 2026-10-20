import React from 'react';
import Link from 'next/link';
import { Play, Film, ArrowRight } from 'lucide-react';
import ClayButton from '@/components/3d/ClayButton';

export default function VideoTeaser() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-[#D9CCF2] via-[#B8C9F5] to-[#F9C9DC] dark:from-[#25203D] dark:via-[#1E2545] dark:to-[#382436] p-8 sm:p-12 md:p-16 overflow-hidden border-4 border-white/90 dark:border-white/10 shadow-[0_20px_50px_rgba(46,42,79,0.08)]">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-[#1E1B33]/80 border border-white/90 text-deepInk dark:text-lavender-light text-xs font-bold uppercase tracking-wider">
                <Film className="w-3.5 h-3.5 text-deepInk dark:text-lavender-light" />
                <span>Motion & 3D Showreel Hub</span>
              </div>

              <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-deepInk dark:text-white tracking-tight leading-tight">
                Bringing Brands to Life Through{' '}
                <span className="italic font-normal">Motion & 3D Depth</span>
              </h2>

              <p className="text-bodyText dark:text-white/85 text-base sm:text-lg max-w-2xl leading-relaxed">
                Explore our full video library featuring commercial 3D dental equipment reels, AI video generation pipelines using Veo and Kling 2.0, and dynamic After Effects motion graphics.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <ClayButton
                  variant="dark"
                  size="md"
                  href="/videos"
                >
                  <Play className="w-4 h-4 fill-white mr-1" />
                  Watch Video Showcase
                </ClayButton>

                <Link
                  href="/#contact"
                  className="text-sm font-bold text-deepInk dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
                >
                  Commission a Video Reel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right cute circular preview button */}
            <div className="lg:col-span-4 flex justify-center">
              <Link
                href="/videos"
                className="group relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/70 dark:bg-white/10 border-2 border-white/90 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_12px_30px_rgba(46,42,79,0.1)]"
                aria-label="Open Video Gallery"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-deepInk text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                  <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current ml-1" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
