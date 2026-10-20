'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Wrench,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import ClayCard from '@/components/3d/ClayCard';
import ClayShape from '@/components/3d/ClayShape';
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
    <section id="about" className="py-24 relative overflow-hidden bg-cream-subtle/50 dark:bg-[#071918]/60 transition-colors duration-200">
      {/* Decorative background shapes */}
      <div className="absolute top-20 left-4 opacity-25 dark:opacity-10 pointer-events-none">
        <ClayShape type="torus" color="coral" size="lg" />
      </div>
      <div className="absolute bottom-20 right-8 opacity-25 dark:opacity-10 pointer-events-none">
        <ClayShape type="sphere" color="mint" size="xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint text-xs font-extrabold uppercase tracking-wider border border-mint-border dark:border-[#1E615D] shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Designer Profile</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-deepTeal dark:text-white tracking-tight">
            About & Experience
          </h2>
          <p className="mt-3 text-base sm:text-lg text-deepTeal-muted dark:text-mint/70 font-medium">
            Bridging brand identity with 3D tactile depth, precision layout, and AI-assisted creative workflows.
          </p>
        </div>

        {/* Narrative Bio Clay Card */}
        <div className="mb-14">
          <div className="relative bg-white dark:bg-[#0D2625] rounded-3xl md:rounded-4xl border-2 border-mint dark:border-[#1A4543] p-8 sm:p-12 shadow-[0_10px_0_#99F6E4,0_20px_35px_rgba(15,76,74,0.06)] dark:shadow-[0_10px_0_#071918,0_20px_35px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-deepTeal dark:text-white">
                  Creative Philosophy & Approach
                </h3>
                <p className="text-deepTeal/80 dark:text-[#E6FFFA]/85 text-base leading-relaxed">
                  {profile.aboutBio}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {CORE_DESIGN_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-cream dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-xs font-bold text-deepTeal dark:text-mint"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Summary Pill Stats */}
              <div className="lg:col-span-4 bg-mint/40 dark:bg-[#113B39]/50 rounded-3xl p-6 border-2 border-mint dark:border-[#1E615D] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 block uppercase">Location</span>
                    <span className="text-sm font-extrabold text-deepTeal dark:text-white">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coralPeach text-white flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 block uppercase">Current Role</span>
                    <span className="text-sm font-extrabold text-deepTeal dark:text-white">Graphic Designer at ABA Tech</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-butterYellow text-deepTeal flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 block uppercase">Education</span>
                    <span className="text-sm font-extrabold text-deepTeal dark:text-white">B.Com, Delhi University</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Detailed Sections */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#0D2625] border-2 border-mint dark:border-[#1E524F] shadow-[0_4px_0_#99F6E4] dark:shadow-[0_4px_0_#071918]">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                activeTab === 'experience'
                  ? 'bg-primary text-white shadow-[0_2px_0_#0D9488]'
                  : 'text-deepTeal dark:text-mint/70 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Professional Experience
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                activeTab === 'tools'
                  ? 'bg-primary text-white shadow-[0_2px_0_#0D9488]'
                  : 'text-deepTeal dark:text-mint/70 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <Wrench className="w-4 h-4" />
              Software & Tools
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                activeTab === 'education'
                  ? 'bg-primary text-white shadow-[0_2px_0_#0D9488]'
                  : 'text-deepTeal dark:text-mint/70 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Education & Certs
            </button>
          </div>
        </div>

        {/* Tab 1: Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {INITIAL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="relative bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-6 sm:p-8 shadow-[0_6px_0_#99F6E4,0_12px_24px_rgba(15,76,74,0.06)] dark:shadow-[0_6px_0_#071918,0_12px_24px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-mint/60 dark:border-[#1A4543]/60 mb-5">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-butterYellow-soft dark:bg-[#30260D] text-deepTeal dark:text-butterYellow border border-butterYellow dark:border-[#473913] text-xs font-black uppercase mb-1">
                      {exp.period}
                    </span>
                    <h4 className="font-display font-extrabold text-2xl text-deepTeal dark:text-white">
                      {exp.role}{' '}
                      <span className="text-primary font-bold">@ {exp.company}</span>
                    </h4>
                    {exp.companySubtitle && (
                      <p className="text-xs font-bold text-deepTeal-muted dark:text-mint/60">
                        Platform: {exp.companySubtitle} • {exp.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bullets directly from resume */}
                <ul className="space-y-3 mb-6">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-deepTeal/85 dark:text-[#E6FFFA]/80 leading-relaxed font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-sm" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-mint/40 dark:border-[#1A4543]/40">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-mint-light dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-xs font-bold text-deepTeal dark:text-mint"
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
                className="bg-white dark:bg-[#0D2625] rounded-2xl border-2 border-mint dark:border-[#1A4543] p-4 shadow-[0_4px_0_#99F6E4] dark:shadow-[0_4px_0_#071918] hover:-translate-y-1 hover:border-primary dark:hover:border-primary transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-deepTeal-muted dark:text-mint/60 block mb-1">
                    {tool.category}
                  </span>
                  <h4 className="font-display font-bold text-base text-deepTeal dark:text-white">
                    {tool.name}
                  </h4>
                </div>
                <div className="mt-4 pt-2 border-t border-mint/40 dark:border-[#1A4543]/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-primary">{tool.level}</span>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Education & Certifications */}
        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Box */}
            <div className="bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-6 sm:p-8 shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint flex items-center justify-center shadow-inner">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xl text-deepTeal dark:text-white">
                    Academic Education
                  </h4>
                  <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase">
                    University Degree
                  </span>
                </div>
              </div>

              {INITIAL_EDUCATION.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cream dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-xs font-extrabold text-deepTeal dark:text-mint">
                    {edu.period}
                  </span>
                  <h5 className="font-display font-bold text-lg text-deepTeal dark:text-white">
                    {edu.degree}
                  </h5>
                  <p className="text-sm font-semibold text-primary">
                    {edu.institution}
                  </p>
                  {edu.details && (
                    <p className="text-xs text-deepTeal-muted dark:text-mint/70 font-medium pt-1">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Certifications Box */}
            <div className="bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-6 sm:p-8 shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-coralPeach-soft dark:bg-[#381B18] text-coralPeach-dark dark:text-coralPeach-light flex items-center justify-center shadow-inner">
                  <Award className="w-6 h-6 text-coralPeach" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xl text-deepTeal dark:text-white">
                    Certifications
                  </h4>
                  <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase">
                    Professional Mastery
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {INITIAL_CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 rounded-2xl bg-cream dark:bg-[#071918] border border-mint dark:border-[#1E524F] flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-display font-bold text-sm text-deepTeal dark:text-white">
                        {cert.title}
                      </h5>
                      <span className="text-xs font-bold text-primary">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-deepTeal-muted dark:text-mint/70 bg-white dark:bg-[#0D2625] px-2 py-1 rounded-lg border border-mint dark:border-[#1E524F]">
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
