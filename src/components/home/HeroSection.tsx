'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  ArrowRight,
  Send,
  Check,
  Sparkles,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { ProfileSettings } from '@/lib/types';
import { submitContactInquiry } from '@/lib/data-service';
import Social3DIcon from '@/components/3d/Social3DIcon';
import {
  ClayPlant,
  ClayPencil,
  ClayPaperclip,
  ClayStickyNote,
  ClayCoffeeCup,
  ClayRulerAndHands,
  FloatingSideRibbon,
} from '@/components/3d/DeskElements';

interface HeroSectionProps {
  profile: ProfileSettings;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquire' | 'services' | 'chat'>('inquire');

  // Mini station form states
  const [formData, setFormData] = useState({
    name: '',
    projectType: '3D Packaging & Mockups',
    contact: '',
    source: 'Website / Portfolio',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact) return;

    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        name: formData.name || 'Anonymous Visitor',
        email: formData.contact,
        subject: `Hero Mini-Inquiry: ${formData.projectType}`,
        message: `Project Type: ${formData.projectType}\nSource: ${formData.source}\nDetails: ${formData.details || 'None provided'}`,
      });
      setIsSent(true);
      setFormData({
        name: '',
        projectType: '3D Packaging & Mockups',
        contact: '',
        source: 'Website / Portfolio',
        details: '',
      });
    } catch {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-6 pb-28 sm:pb-36 overflow-hidden">
      {/* Floating ribbon pinned to right screen edge (like beblessed.io) */}
      <FloatingSideRibbon />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* The Outer Desk Workstation Mat Container */}
        <div className="relative pt-8 sm:pt-12">
          {/* 3D Desk Accessories Surrounding the Mat */}
          {/* Top-Left: Succulent Plant */}
          <ClayPlant className="w-28 sm:w-36 md:w-44 absolute -top-4 sm:-top-8 -left-3 sm:-left-8 z-30 transform hover:scale-105 transition-transform duration-300" />

          {/* Left Middle: Clay Pencil */}
          <ClayPencil className="w-14 sm:w-18 md:w-22 absolute top-56 sm:top-64 -left-4 sm:-left-8 z-30 hidden sm:block" />

          {/* Left Edge: Paperclip */}
          <ClayPaperclip className="w-8 sm:w-10 absolute top-96 left-1 sm:-left-2 z-30 hidden md:block" color="#FF8A7A" />

          {/* Top-Right: Paperclips */}
          <ClayPaperclip className="w-8 sm:w-10 absolute -top-3 right-32 sm:right-48 z-30 hidden sm:block" color="#14B8A6" />

          {/* Right Top: Sticky Note with Pin */}
          <ClayStickyNote className="absolute -top-6 -right-3 sm:-right-8 z-30 hidden md:block" />

          {/* Right Middle: Clay Coffee Cup with Spilled Splash Puddle */}
          <ClayCoffeeCup className="w-32 sm:w-38 md:w-44 absolute top-48 sm:top-56 -right-6 sm:-right-12 z-30 hidden lg:block" />

          {/* ============================================================== */}
          {/* MAIN CENTER DESK MAT (Inspired by beblessed.io central canvas)  */}
          {/* ============================================================== */}
          <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#E6FFFA] via-[#CCFBF1] to-[#B2F5EA] dark:from-[#0D2E2B] dark:via-[#092220] dark:to-[#0A2624] p-6 sm:p-10 md:p-14 border-4 border-white/80 dark:border-[#1E524F]/80 shadow-[0_20px_0_#99F6E4,0_35px_60px_rgba(15,76,74,0.14)] dark:shadow-[0_20px_0_#071918,0_35px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Subtle inner mat highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-[2.5rem]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-20">
              {/* ================= LEFT COLUMN: HERO HEADLINE & ACTIONS ================= */}
              <div className="lg:col-span-7 space-y-6">
                {/* Social Circle Buttons + Cute Tooltip Speech Bubble */}
                <div className="flex items-center gap-3 relative">
                  <div className="flex items-center gap-2">
                    <Social3DIcon platform="behance" href={profile.socialBehance} size="sm" />
                    <Social3DIcon platform="instagram" href={profile.socialInstagram} size="sm" />
                    <Social3DIcon platform="linkedin" href={profile.socialLinkedin} size="sm" />
                    <Social3DIcon platform="whatsapp" href={profile.socialWhatsapp} size="sm" />
                    <Social3DIcon platform="email" href={`mailto:${profile.email}`} size="sm" />
                  </div>

                  {/* Speech Bubble Pill: "Click me or scroll ×" */}
                  {showTooltip && (
                    <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0D2625] border border-mint dark:border-[#1E524F] text-[11px] font-bold text-deepTeal dark:text-mint shadow-[0_2px_8px_rgba(15,76,74,0.08)] animate-bounce-subtle">
                      <span>Click me or scroll</span>
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="text-deepTeal-muted dark:text-mint/60 hover:text-coralPeach ml-0.5"
                        aria-label="Dismiss tooltip"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                {/* Big Typographic Lockup (Styled like Bless-a-Business — Extraordinarily) */}
                <div className="space-y-2">
                  <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-deepTeal dark:text-white tracking-tight leading-[1.08]">
                    Crafting Motion <br />
                    — <span className="font-serif italic font-normal text-primary">Extraordinarily</span>
                  </h1>

                  <p className="text-sm sm:text-base font-bold italic text-deepTeal-muted dark:text-mint/80 pt-1">
                    Or... <strong className="font-extrabold not-italic text-deepTeal dark:text-white">Sumit Kumar</strong> for short.
                  </p>
                </div>

                {/* Narrative Intro */}
                <p className="text-sm sm:text-base text-deepTeal/85 dark:text-[#E6FFFA]/85 leading-relaxed max-w-xl font-normal">
                  Graphic designer specializing in branding, layout, and 3D design, skilled in Blender, Adobe Creative Suite, and AI-assisted creative production pipelines.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  {/* Dark Deep Teal pill button */}
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-deepTeal dark:bg-primary text-white font-extrabold text-sm shadow-[0_4px_0_#092625] dark:shadow-[0_4px_0_#0D9488] hover:-translate-y-0.5 active:translate-y-1 transition-all"
                  >
                    <span>Explore Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Frosted Acrylic Glass pill button */}
                  <a
                    href={profile.resumeUrl || '/resume-sumit-kumar.pdf'}
                    download="Sumit-Kumar-Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md text-deepTeal dark:text-white font-extrabold text-sm border-2 border-white/80 dark:border-white/20 shadow-sm hover:bg-white dark:hover:bg-white/20 active:translate-y-0.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-primary" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: INTERACTIVE DESK STATION ================= */}
              {/* (Styled exactly like the "Nominate a business" interactive card on beblessed.io) */}
              <div className="lg:col-span-5">
                <div className="relative bg-white/85 dark:bg-[#0D2625]/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-2 border-white/95 dark:border-[#1E524F] shadow-[0_10px_25px_rgba(15,76,74,0.08)]">
                  {/* Top Segmented Tabs: [Nominate/Inquire] [Services] [Chat] */}
                  <div className="flex items-center gap-1.5 p-1 rounded-full bg-cream/80 dark:bg-[#071918]/80 border border-mint dark:border-[#1E524F] mb-5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquire')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                        activeTab === 'inquire'
                          ? 'bg-deepTeal text-white shadow-sm'
                          : 'text-deepTeal/70 dark:text-mint/70 hover:text-deepTeal'
                      }`}
                    >
                      Inquire
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('services')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                        activeTab === 'services'
                          ? 'bg-deepTeal text-white shadow-sm'
                          : 'text-deepTeal/70 dark:text-mint/70 hover:text-deepTeal'
                      }`}
                    >
                      Services
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('chat')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                        activeTab === 'chat'
                          ? 'bg-deepTeal text-white shadow-sm'
                          : 'text-deepTeal/70 dark:text-mint/70 hover:text-deepTeal'
                      }`}
                    >
                      WhatsApp
                    </button>
                  </div>

                  {activeTab === 'inquire' && (
                    <>
                      <div className="mb-4">
                        <h3 className="font-display font-extrabold text-xl text-deepTeal dark:text-white">
                          Start a project
                        </h3>
                        <p className="text-xs text-deepTeal-muted dark:text-mint/70 font-medium mt-1">
                          Know a brand whose visual identity needs 3D depth or motion? Point us their way — or email at{' '}
                          <a href={`mailto:${profile.email}`} className="text-primary underline">
                            {profile.email}
                          </a>
                          .
                        </p>
                      </div>

                      {isSent ? (
                        <div className="py-8 text-center space-y-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                            <Check className="w-6 h-6" />
                          </div>
                          <h4 className="font-display font-bold text-base text-deepTeal dark:text-white">
                            Inquiry Received!
                          </h4>
                          <p className="text-xs text-deepTeal-muted dark:text-mint/70">
                            Sumit will review your note and get in touch shortly.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsSent(false)}
                            className="text-xs font-bold text-primary hover:underline"
                          >
                            Send another note
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-deepTeal-muted dark:text-mint/60 mb-1">
                                Your Name (Optional)
                              </label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Alex Morgan"
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-xs font-medium focus:outline-none focus:border-primary"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-deepTeal-muted dark:text-mint/60 mb-1">
                                Project Type
                              </label>
                              <select
                                value={formData.projectType}
                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-xs font-medium focus:outline-none focus:border-primary"
                              >
                                <option value="3D Packaging & Mockups">3D Packaging & Mockups</option>
                                <option value="Motion Graphics Reel">Motion Graphics Reel</option>
                                <option value="AI Video Generation">AI Video Generation</option>
                                <option value="Brand Identity System">Brand Identity System</option>
                                <option value="E-Commerce Banners">E-Commerce Banners</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-deepTeal-muted dark:text-mint/60 mb-1">
                                Email or WhatsApp *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                placeholder="hello@company.com"
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-xs font-medium focus:outline-none focus:border-primary"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-deepTeal-muted dark:text-mint/60 mb-1">
                                How did you find me?
                              </label>
                              <select
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-xs font-medium focus:outline-none focus:border-primary"
                              >
                                <option value="Behance">Behance</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Referral / Friend">Referral / Friend</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-deepTeal-muted dark:text-mint/60 mb-1">
                              Brief Details & Timeline
                            </label>
                            <textarea
                              rows={2}
                              value={formData.details}
                              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                              placeholder="Tell me about your product or campaign vision..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-xs font-medium focus:outline-none focus:border-primary resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 rounded-xl bg-deepTeal dark:bg-primary text-white text-xs font-bold hover:bg-deepTeal/90 flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 transition-all"
                          >
                            <span>{isSubmitting ? 'Sending...' : 'Send inquiry'}</span>
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}
                    </>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-3 py-1">
                      <h4 className="font-display font-bold text-base text-deepTeal dark:text-white">
                        Specialized Creative Offerings
                      </h4>
                      <ul className="space-y-2 text-xs text-deepTeal/85 dark:text-mint/85">
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] flex items-center justify-between">
                          <span className="font-bold">3D Modeling & Blender Mockups</span>
                          <span className="text-[10px] font-extrabold text-primary">Blender Cycles</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] flex items-center justify-between">
                          <span className="font-bold">Motion Graphics & Kinetic Reels</span>
                          <span className="text-[10px] font-extrabold text-primary">After Effects</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] flex items-center justify-between">
                          <span className="font-bold">AI Video Pipelines</span>
                          <span className="text-[10px] font-extrabold text-primary">Veo & Kling 2.0</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] flex items-center justify-between">
                          <span className="font-bold">Brand Systems & Packaging</span>
                          <span className="text-[10px] font-extrabold text-primary">Dieline to 3D</span>
                        </li>
                      </ul>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-1"
                      >
                        Request custom project quote →
                      </Link>
                    </div>
                  )}

                  {activeTab === 'chat' && (
                    <div className="space-y-4 py-2 text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-deepTeal dark:text-white">
                          Direct WhatsApp Chat
                        </h4>
                        <p className="text-xs text-deepTeal-muted dark:text-mint/70 mt-1">
                          Fastest response time for freelance inquiries and collaborations.
                        </p>
                      </div>
                      <a
                        href={profile.socialWhatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md hover:bg-[#20ba5a] transition-colors"
                      >
                        <span>Open WhatsApp ({profile.phone})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ==================================================================== */}
            {/* BOTTOM FOREGROUND: ACRYLIC RULER HELD BY CLAY HANDS                   */}
            {/* (Exact match to the iconic measurement ruler in beblessed.io)        */}
            {/* ==================================================================== */}
            <div className="mt-12 sm:mt-16 flex justify-center">
              <ClayRulerAndHands />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
