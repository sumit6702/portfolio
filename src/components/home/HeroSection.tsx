'use client';

import React from 'react';
import Link from 'next/link';
import { Download, Sparkles, ArrowRight, Play, Eye } from 'lucide-react';
import ClayButton from '@/components/3d/ClayButton';
import Social3DIcon from '@/components/3d/Social3DIcon';
import ClayShape from '@/components/3d/ClayShape';
import { ProfileSettings } from '@/lib/types';

interface HeroSectionProps {
  profile: ProfileSettings;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Decorative floating 3D shapes */}
      <div className="absolute top-10 left-[5%] pointer-events-none hidden lg:block">
        <ClayShape type="torus" color="teal" size="lg" />
      </div>
      <div className="absolute top-24 right-[8%] pointer-events-none hidden md:block">
        <ClayShape type="sphere" color="coral" size="md" />
      </div>
      <div className="absolute bottom-12 left-[12%] pointer-events-none hidden md:block">
        <ClayShape type="pill" color="yellow" size="md" />
      </div>
      <div className="absolute bottom-20 right-[15%] pointer-events-none hidden lg:block">
        <ClayShape type="star" color="mint" size="lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Cute Greeting Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint text-deepTeal border-2 border-mint-border shadow-[0_3px_0_#99F6E4] font-bold text-xs uppercase tracking-wider animate-bounce-subtle">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Available for Freelance & Full-time Roles</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-deepTeal tracking-tight leading-[1.1]">
              Hi, I&apos;m{' '}
              <span className="relative inline-block text-primary">
                {profile.fullName}
                {/* Playful curved underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full text-butterYellow"
                  height="12"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q50,0 100,7"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-bold text-deepTeal-muted">
              {profile.roleTitle}
            </p>

            {/* Profile Intro from resume */}
            <p className="text-base sm:text-lg text-deepTeal/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profile.intro}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Prominent Download Resume Button */}
              <ClayButton
                variant="teal"
                size="lg"
                href={profile.resumeUrl || '/resume-sumit-kumar.pdf'}
                download="Sumit-Kumar-Resume.pdf"
                className="group"
              >
                <Download className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                Download Resume
              </ClayButton>

              <ClayButton
                variant="cream"
                size="lg"
                href="/projects"
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </ClayButton>
            </div>

            {/* Easy-Access 3D Social Buttons */}
            <div className="pt-4 border-t border-mint/70 flex flex-col items-center lg:items-start gap-3">
              <span className="text-xs font-bold text-deepTeal-muted uppercase tracking-wider">
                Connect Directly:
              </span>
              <div className="flex items-center gap-3">
                <Social3DIcon platform="instagram" href={profile.socialInstagram} />
                <Social3DIcon platform="behance" href={profile.socialBehance} />
                <Social3DIcon platform="linkedin" href={profile.socialLinkedin} />
                <Social3DIcon platform="whatsapp" href={profile.socialWhatsapp} />
                <Social3DIcon platform="email" href={`mailto:${profile.email}`} />
              </div>
            </div>
          </div>

          {/* Right Column: Cute 3D Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-mint via-butterYellow to-coralPeach-soft rounded-[3rem] blur-2xl opacity-60 animate-pulse-subtle" />

              {/* Main Clay Card with 3D Illustration / Visual Reel */}
              <div className="relative bg-white border-4 border-mint-border rounded-[2.5rem] p-6 shadow-[0_16px_0_#99F6E4,0_30px_50px_rgba(15,76,74,0.14)]">
                {/* Cute Badge Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-coralPeach shadow-[0_0_8px_#FF8A7A]" />
                    <span className="w-3 h-3 rounded-full bg-butterYellow" />
                    <span className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-mint text-deepTeal text-xs font-extrabold uppercase tracking-wider">
                    3D & Motion Lab
                  </span>
                </div>

                {/* Visual Preview Box */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-mint via-cream to-butterYellow-soft border-2 border-mint flex items-center justify-center group shadow-inner">
                  {/* Visual 3D scene elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-44 h-44 animate-spin-slow">
                      <ClayShape type="torus" color="teal" size="xl" className="opacity-90" />
                    </div>
                  </div>

                  <div className="absolute z-10 flex flex-col items-center text-center p-6 bg-white/85 backdrop-blur-md rounded-2xl border-2 border-mint shadow-lg max-w-[85%] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-2 shadow-[0_4px_0_#0D9488]">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                    <span className="font-display font-bold text-deepTeal text-base">
                      Motion Graphics & 3D
                    </span>
                    <span className="text-xs text-deepTeal-muted font-semibold mt-1">
                      Blender • After Effects • Kling 2.0 • Veo
                    </span>
                    <Link
                      href="/videos"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-deepTeal transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Watch Motion Showreel
                    </Link>
                  </div>
                </div>

                {/* Floating stickers on card */}
                <div className="mt-4 pt-4 border-t border-mint flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-deepTeal">
                      Fast Turnaround
                    </span>
                  </div>
                  <span className="text-xs font-bold text-deepTeal-muted">
                    Delhi / Gurugram • Remote
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
