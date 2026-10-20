'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import DecorSlot from '@/components/decor/DecorSlot';
import {
  INITIAL_EXPERIENCES,
  INITIAL_EDUCATION,
  INITIAL_CERTIFICATIONS,
  TOOLS_LIST,
  CORE_DESIGN_SKILLS,
} from '@/lib/initial-data';
import { ProfileSettings } from '@/lib/types';

interface AboutSectionProps {
  profile: ProfileSettings;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<'experience' | 'tools' | 'education'>('experience');

  return (
    <section id="about" className="py-24 relative overflow-hidden transition-colors duration-200">
      {/* 3D Decor Slots: Headphones & Donut in safe margins */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <DecorSlot slot="headphones" />
        <DecorSlot slot="donut" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-butterYellow-light dark:bg-butterYellow/20 text-deepInk dark:text-butterYellow-light text-xs font-bold uppercase tracking-wider border border-butterYellow-border/50 dark:border-butterYellow/20 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deepInk dark:text-butterYellow-light" />
            <span>Designer Profile</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-deepInk dark:text-white tracking-tight">
            About & Experience
          </h2>
          <p className="mt-3 text-base sm:text-lg text-bodyText dark:text-lavender-light/80 font-medium">
            Bridging brand identity with 3D tactile depth, precision layout, and AI-assisted creative workflows.
          </p>
        </div>

        {/* Narrative Bio Card with Card-Float & Shimmer */}
        <div className="mb-14">
          <div className="relative bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-8 sm:p-12 shadow-[0_12px_36px_rgba(46,42,79,0.06)] card-float card-shimmer">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-deepInk dark:text-white">
                  Creative Philosophy & Approach
                </h3>
                <p className="text-bodyText dark:text-lavender-light/90 text-base leading-relaxed">
                  {profile.aboutBio}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {CORE_DESIGN_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-xs font-bold text-deepInk dark:text-lavender-light transition-transform hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Summary Stats Pill */}
              <div className="lg:col-span-4 bg-lavender-soft dark:bg-[#161426] rounded-[28px] p-6 border border-lavender/50 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-3 transition-transform hover:translate-x-1">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1B33] text-deepInk dark:text-white flex items-center justify-center font-bold shadow-sm">
                    <MapPin className="w-5 h-5 text-periwinkle" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60 block uppercase">Location</span>
                    <span className="text-sm font-bold text-deepInk dark:text-white">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 transition-transform hover:translate-x-1">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1B33] text-deepInk dark:text-white flex items-center justify-center font-bold shadow-sm">
                    <Briefcase className="w-5 h-5 text-babyPink" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60 block uppercase">Current Role</span>
                    <span className="text-sm font-bold text-deepInk dark:text-white">Graphic Designer at ABA Tech</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 transition-transform hover:translate-x-1">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1B33] text-deepInk dark:text-white flex items-center justify-center font-bold shadow-sm">
                    <GraduationCap className="w-5 h-5 text-butterYellow" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60 block uppercase">Education</span>
                    <span className="text-sm font-bold text-deepInk dark:text-white">B.Com, Delhi University</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation with Fluid Water Fill Pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 shadow-sm">
            <button
              onClick={() => setActiveTab('experience')}
              className={`btn-water flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                activeTab === 'experience'
                  ? 'btn-water-dark bg-deepInk text-white shadow-sm'
                  : 'btn-water-white text-deepInk dark:text-lavender-light'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`btn-water flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                activeTab === 'tools'
                  ? 'btn-water-dark bg-deepInk text-white shadow-sm'
                  : 'btn-water-white text-deepInk dark:text-lavender-light'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Software & Tools</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`btn-water flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${
                activeTab === 'education'
                  ? 'btn-water-dark bg-deepInk text-white shadow-sm'
                  : 'btn-water-white text-deepInk dark:text-lavender-light'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Certs</span>
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {INITIAL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="relative bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm card-float card-shimmer"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-lavender/30 dark:border-white/10 mb-5">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-butterYellow-light dark:bg-butterYellow/20 text-deepInk dark:text-butterYellow-light border border-butterYellow-border/50 text-xs font-bold uppercase mb-1">
                      {exp.period}
                    </span>
                    <h4 className="font-serif font-black text-2xl text-deepInk dark:text-white">
                      {exp.role}{' '}
                      <span className="font-normal text-bodyText dark:text-lavender-light">@ {exp.company}</span>
                    </h4>
                    {exp.companySubtitle && (
                      <p className="text-xs font-semibold text-bodyText-muted dark:text-lavender-light/60 mt-0.5">
                        Platform: {exp.companySubtitle} • {exp.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-bodyText dark:text-lavender-light/90 leading-relaxed font-normal">
                      <span className="w-2 h-2 rounded-full bg-periwinkle mt-2 shrink-0 shadow-sm" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-lavender/30 dark:border-white/10">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-xs font-bold text-deepInk dark:text-lavender-light transition-transform hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Tools */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {TOOLS_LIST.map((tool) => (
              <div
                key={tool.name}
                className="bg-white dark:bg-[#1E1B33] rounded-[24px] border border-lavender/50 dark:border-white/10 p-5 shadow-soft-sm card-float card-shimmer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 block mb-1">
                    {tool.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                    {tool.name}
                  </h4>
                </div>
                <div className="mt-4 pt-2 border-t border-lavender/30 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-deepInk dark:text-lavender-light">{tool.level}</span>
                  <CheckCircle2 className="w-4 h-4 text-periwinkle" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Education & Certifications */}
        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Box */}
            <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm card-float card-shimmer">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light flex items-center justify-center shadow-inner">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-deepInk dark:text-white">
                    Academic Education
                  </h4>
                  <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase">
                    University Degree
                  </span>
                </div>
              </div>

              {INITIAL_EDUCATION.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 text-xs font-bold text-deepInk dark:text-lavender-light">
                    {edu.period}
                  </span>
                  <h5 className="font-serif font-bold text-lg text-deepInk dark:text-white">
                    {edu.degree}
                  </h5>
                  <p className="text-sm font-semibold text-deepInk dark:text-lavender-light">
                    {edu.institution}
                  </p>
                  {edu.details && (
                    <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium pt-1">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Certifications Box */}
            <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm card-float card-shimmer">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light flex items-center justify-center shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-deepInk dark:text-white">
                    Certifications
                  </h4>
                  <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase">
                    Professional Mastery
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {INITIAL_CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex items-center justify-between transition-transform hover:scale-[1.02]"
                  >
                    <div>
                      <h5 className="font-serif font-bold text-sm text-deepInk dark:text-white">
                        {cert.title}
                      </h5>
                      <span className="text-xs font-semibold text-deepInk dark:text-lavender-light">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-bodyText-muted dark:text-lavender-light/70 bg-white dark:bg-[#1E1B33] px-2.5 py-1 rounded-full border border-lavender/40">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
