import React from 'react';
import Link from 'next/link';
import { Play, Sparkles, Film, ArrowRight } from 'lucide-react';
import ClayButton from '@/components/3d/ClayButton';
import ClayShape from '@/components/3d/ClayShape';

export default function VideoTeaser() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl md:rounded-4xl bg-gradient-to-br from-deepTeal to-[#0A3836] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_16px_0_#062322,0_28px_50px_rgba(15,76,74,0.3)] border-2 border-primary/30">
          {/* Decorative background shapes */}
          <div className="absolute top-4 right-8 opacity-20 pointer-events-none hidden sm:block">
            <ClayShape type="torus" color="teal" size="xl" />
          </div>
          <div className="absolute -bottom-8 -left-8 opacity-20 pointer-events-none hidden md:block">
            <ClayShape type="sphere" color="coral" size="xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-mint text-xs font-bold uppercase tracking-wider">
                <Film className="w-3.5 h-3.5 text-primary" />
                <span>Motion & 3D Showreel Hub</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                Bringing Brands to Life Through{' '}
                <span className="text-primary-light">Motion & 3D Depth</span>
              </h2>

              <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed">
                Explore our full video library featuring commercial 3D dental equipment reels, AI video generation pipelines using Veo and Kling 2.0, and dynamic After Effects motion graphics.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <ClayButton
                  variant="teal"
                  size="md"
                  href="/videos"
                  className="shadow-[0_4px_0_#0D9488]"
                >
                  <Play className="w-4 h-4 fill-white mr-1" />
                  Watch Video Showcase
                </ClayButton>

                <Link
                  href="/#contact"
                  className="text-sm font-bold text-mint hover:text-white underline underline-offset-4 flex items-center gap-1"
                >
                  Commission a Video Reel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right cute preview icon */}
            <div className="lg:col-span-4 flex justify-center">
              <Link
                href="/videos"
                className="group relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary shadow-[0_0_40px_rgba(20,184,166,0.4)]"
                aria-label="Open Video Gallery"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary group-hover:bg-white text-white group-hover:text-deepTeal flex items-center justify-center shadow-lg transition-colors">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
