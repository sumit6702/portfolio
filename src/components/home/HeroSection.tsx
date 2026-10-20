'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  ArrowRight,
  Send,
  Check,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { ProfileSettings } from '@/lib/types';
import { submitContactInquiry } from '@/lib/data-service';
import Social3DIcon from '@/components/3d/Social3DIcon';
import DecorSlot from '@/components/decor/DecorSlot';
import { FloatingSideRibbon } from '@/components/3d/DeskElements';

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
      // Handled gracefully
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-4 sm:pt-6 pb-20 sm:pb-28 overflow-hidden">
      {/* Slim vertical side tab on right viewport edge (Mint with dark text) */}
      <FloatingSideRibbon />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Outer relative container that hosts the hero card + edge decor slots */}
        <div className="relative pt-6 sm:pt-10">

          {/* ==================================================================== */}
          {/* 3D DECORATIVE PLACEHOLDER SLOTS (Strictly outside text safe zones)   */}
          {/* ==================================================================== */}
          {/* Top-Left: Succulent Plant */}
          <DecorSlot slot="plant" />

          {/* Left Margin: Pencil */}
          <DecorSlot slot="pencil" />

          {/* Top Negative Space: Paperclips */}
          <DecorSlot slot="paperclips" />

          {/* Top-Right: Sticky Note */}
          <DecorSlot slot="sticky-note" />

          {/* Bottom-Right: Coffee Cup (Positioned outside form card) */}
          <DecorSlot slot="coffee-cup" />

          {/* ==================================================================== */}
          {/* MAIN HERO CARD (Large ~40px rounded pastel gradient card)            */}
          {/* ==================================================================== */}
          <div className="relative rounded-[2.25rem] sm:rounded-[2.75rem] md:rounded-[40px] bg-gradient-to-br from-[#D9CCF2] via-[#B8C9F5] to-[#F9C9DC] dark:from-[#25203D] dark:via-[#1E2545] dark:to-[#382436] p-6 sm:p-10 md:p-14 lg:p-16 border-4 border-white/90 dark:border-white/10 shadow-[0_24px_50px_rgba(46,42,79,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Subtle inner mat highlight glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-[36px]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-20">
              
              {/* ================= LEFT COLUMN: HERO HEADLINE & ACTIONS ================= */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Social Icon Row + Handwritten Speech Bubble */}
                <div className="flex flex-wrap items-center gap-3 relative">
                  <div className="flex items-center gap-2">
                    <Social3DIcon platform="behance" href={profile.socialBehance} size="sm" />
                    <Social3DIcon platform="instagram" href={profile.socialInstagram} size="sm" />
                    <Social3DIcon platform="linkedin" href={profile.socialLinkedin} size="sm" />
                    <Social3DIcon platform="whatsapp" href={profile.socialWhatsapp} size="sm" />
                    <Social3DIcon platform="email" href={`mailto:${profile.email}`} size="sm" />
                  </div>

                  {/* Handwritten-style speech bubble ("Click me or scroll") */}
                  {showTooltip && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-[#1E1B33] border border-lavender/50 text-xs font-handwriting text-deepInk dark:text-lavender-light shadow-soft-sm animate-bounce-subtle">
                      <span className="text-sm font-semibold">Click me or scroll</span>
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="text-bodyText-muted hover:text-deepInk text-xs leading-none"
                        aria-label="Dismiss note"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                {/* Bold Serif Headline with ONE Italic Serif Word */}
                <div className="space-y-2 pt-1">
                  <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-deepInk dark:text-white tracking-tight leading-[1.08]">
                    Crafting Motion <br />
                    — <span className="italic font-normal text-deepInk dark:text-lavender-light">Extraordinarily</span>
                  </h1>

                  <p className="text-sm sm:text-base font-serif italic text-bodyText dark:text-lavender-light/90 pt-1">
                    Or... <strong className="font-extrabold not-italic text-deepInk dark:text-white">Sumit Kumar</strong> for short.
                  </p>
                </div>

                {/* Clean Narrative Intro */}
                <p className="text-sm sm:text-base text-bodyText dark:text-white/85 leading-relaxed max-w-xl font-normal">
                  Graphic designer specializing in branding, layout, and 3D design, skilled in Blender, Adobe Creative Suite, and AI-assisted creative production pipelines.
                </p>

                {/* Action Buttons: Deep Ink Pill + Frosted White-Outlined Resume Pill */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Deep Ink pill button */}
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-deepInk dark:bg-white text-white dark:text-deepInk font-bold text-sm shadow-[0_4px_14px_rgba(46,42,79,0.2)] hover:bg-deepInk-hover hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>Explore Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Frosted Acrylic White-Outlined Resume pill */}
                  <a
                    href={profile.resumeUrl || '/resume-sumit-kumar.pdf'}
                    download="Sumit-Kumar-Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md text-deepInk dark:text-white font-bold text-sm border-2 border-white/95 dark:border-white/20 shadow-sm hover:bg-white dark:hover:bg-white/20 active:translate-y-0.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-deepInk dark:text-lavender-light" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: FROSTED GLASS INQUIRY CARD ================= */}
              <div className="lg:col-span-5">
                <div className="relative bg-white/80 dark:bg-[#1E1B33]/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/90 dark:border-white/10 shadow-[0_14px_35px_rgba(46,42,79,0.07)]">
                  
                  {/* Pastel Segmented Tabs: [Inquire] [Services] [WhatsApp] */}
                  <div className="flex items-center gap-1.5 p-1 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 mb-5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquire')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                        activeTab === 'inquire'
                          ? 'bg-deepInk text-white shadow-sm'
                          : 'text-bodyText-muted hover:text-deepInk dark:text-lavender-light/70'
                      }`}
                    >
                      Inquire
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('services')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                        activeTab === 'services'
                          ? 'bg-deepInk text-white shadow-sm'
                          : 'text-bodyText-muted hover:text-deepInk dark:text-lavender-light/70'
                      }`}
                    >
                      Services
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('chat')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                        activeTab === 'chat'
                          ? 'bg-deepInk text-white shadow-sm'
                          : 'text-bodyText-muted hover:text-deepInk dark:text-lavender-light/70'
                      }`}
                    >
                      WhatsApp
                    </button>
                  </div>

                  {/* TAB 1: INQUIRE FORM */}
                  {activeTab === 'inquire' && (
                    <>
                      <div className="mb-4">
                        <h3 className="font-serif font-bold text-xl text-deepInk dark:text-white">
                          Start a project
                        </h3>
                        <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium mt-1">
                          Have a brand that needs 3D depth or motion? Connect below — or email directly at{' '}
                          <a href={`mailto:${profile.email}`} className="text-deepInk dark:text-lavender font-bold underline">
                            {profile.email}
                          </a>
                          .
                        </p>
                      </div>

                      {isSent ? (
                        <div className="py-8 text-center space-y-3">
                          <div className="w-12 h-12 rounded-full bg-mint text-deepInk flex items-center justify-center mx-auto shadow-sm">
                            <Check className="w-6 h-6" />
                          </div>
                          <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                            Inquiry Received!
                          </h4>
                          <p className="text-xs text-bodyText-muted dark:text-lavender-light/70">
                            Sumit will review your note and get in touch shortly.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsSent(false)}
                            className="text-xs font-bold text-deepInk dark:text-lavender-light hover:underline"
                          >
                            Send another note
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-1">
                                Your Name (Optional)
                              </label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Alex Morgan"
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-medium focus:outline-none focus:border-deepInk"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-1">
                                Project Type
                              </label>
                              <select
                                value={formData.projectType}
                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-medium focus:outline-none focus:border-deepInk"
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
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-1">
                                Email or WhatsApp *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                placeholder="hello@company.com"
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-medium focus:outline-none focus:border-deepInk"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-1">
                                How did you find me?
                              </label>
                              <select
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-medium focus:outline-none focus:border-deepInk"
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
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/60 mb-1">
                              Brief Details & Timeline
                            </label>
                            <textarea
                              rows={2}
                              value={formData.details}
                              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                              placeholder="Tell me about your product or campaign vision..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-xs font-medium focus:outline-none focus:border-deepInk resize-none"
                            />
                          </div>

                          {/* Deep Ink Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 rounded-xl bg-deepInk dark:bg-white text-white dark:text-deepInk text-xs font-bold hover:bg-deepInk-hover flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 transition-all"
                          >
                            <span>{isSubmitting ? 'Sending note...' : 'Send inquiry'}</span>
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}
                    </>
                  )}

                  {/* TAB 2: SERVICES */}
                  {activeTab === 'services' && (
                    <div className="space-y-3 py-1">
                      <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                        Specialized Creative Offerings
                      </h4>
                      <ul className="space-y-2 text-xs text-bodyText dark:text-white/80">
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex items-center justify-between">
                          <span className="font-bold">3D Modeling & Blender Mockups</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-periwinkle-light text-deepInk">Blender Cycles</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex items-center justify-between">
                          <span className="font-bold">Motion Graphics & Kinetic Reels</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-babyPink-light text-deepInk">After Effects</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex items-center justify-between">
                          <span className="font-bold">AI Video Pipelines</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-light text-deepInk">Veo & Kling 2.0</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-[#161426] border border-lavender/40 dark:border-white/10 flex items-center justify-between">
                          <span className="font-bold">Brand Systems & Packaging</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-butterYellow-light text-deepInk">Dieline to 3D</span>
                        </li>
                      </ul>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center gap-1 text-xs font-bold text-deepInk dark:text-lavender-light hover:underline pt-1"
                      >
                        Request custom project quote →
                      </Link>
                    </div>
                  )}

                  {/* TAB 3: WHATSAPP CHAT */}
                  {activeTab === 'chat' && (
                    <div className="space-y-4 py-2 text-center">
                      <div className="w-12 h-12 rounded-full bg-mint text-deepInk flex items-center justify-center mx-auto shadow-sm">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                          Direct WhatsApp Chat
                        </h4>
                        <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 mt-1">
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
          </div>
        </div>
      </div>
    </section>
  );
}
