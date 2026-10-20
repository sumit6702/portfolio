'use client';

import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Check,
  Copy,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import ClayButton from '@/components/3d/ClayButton';
import Social3DIcon from '@/components/3d/Social3DIcon';
import { ProfileSettings } from '@/lib/types';
import { submitContactInquiry } from '@/lib/data-service';

interface ContactSectionProps {
  profile: ProfileSettings;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });

      if (res.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(res.error || 'Failed to send message. Please try again or WhatsApp directly.');
      }
    } catch {
      setErrorMessage('Something went wrong. Please connect via email or WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-light dark:bg-mint/20 text-deepInk dark:text-mint-light text-xs font-bold uppercase tracking-wider border border-mint-border/50 dark:border-mint/20 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deepInk dark:text-mint-light" />
            <span>Start a Conversation</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-deepInk dark:text-white tracking-tight">
            Let&apos;s Create Something Playful & Bold
          </h2>
          <p className="mt-3 text-base sm:text-lg text-bodyText dark:text-lavender-light/80 font-medium">
            Have a project in mind, need 3D branding mockups, or want an AI-assisted video reel? Reach out below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-7 shadow-soft-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light flex items-center justify-center shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase">Email Address</span>
                  <h4 className="font-serif font-bold text-base text-deepInk dark:text-white break-all">
                    {profile.email}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 py-2 px-4 rounded-full bg-deepInk dark:bg-white text-white dark:text-deepInk text-xs font-bold text-center hover:bg-deepInk-hover transition-colors shadow-sm"
                >
                  Send Direct Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 px-3 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light hover:bg-lavender-light text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-7 shadow-soft-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F8EE] text-[#25D366] flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase">Direct WhatsApp</span>
                  <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
                    {profile.phone}
                  </h4>
                </div>
              </div>

              <ClayButton
                variant="mint"
                size="sm"
                fullWidth
                href={profile.socialWhatsapp}
              >
                Chat on WhatsApp
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </ClayButton>
            </div>

            {/* Location & Response Card */}
            <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] border border-lavender/50 dark:border-white/10 p-6 sm:p-7 shadow-soft-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mint-light text-deepInk flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60 uppercase">Based in</span>
                  <p className="text-sm font-bold text-deepInk dark:text-white">{profile.location}</p>
                </div>
              </div>

              <p className="text-xs text-bodyText dark:text-lavender-light/70 leading-relaxed font-normal">
                Working with clients globally across all timezones. Fast communication via WhatsApp, Slack, and Google Meet.
              </p>

              {/* Social icons row */}
              <div className="pt-3 border-t border-lavender/30 dark:border-white/10 flex items-center gap-2">
                <Social3DIcon platform="instagram" href={profile.socialInstagram} size="sm" />
                <Social3DIcon platform="behance" href={profile.socialBehance} size="sm" />
                <Social3DIcon platform="linkedin" href={profile.socialLinkedin} size="sm" />
                <Social3DIcon platform="whatsapp" href={profile.socialWhatsapp} size="sm" />
                <Social3DIcon platform="email" href={`mailto:${profile.email}`} size="sm" />
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-8 sm:p-10 shadow-[0_12px_36px_rgba(46,42,79,0.06)]">
              <h3 className="font-serif font-black text-2xl text-deepInk dark:text-white mb-1.5">
                Send a Project Inquiry
              </h3>
              <p className="text-xs font-semibold text-bodyText-muted dark:text-lavender-light/70 mb-6">
                Fill in the details below and Sumit will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-[28px] bg-mint-light dark:bg-mint/10 border border-mint-border text-center space-y-4 shadow-sm animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-mint text-deepInk flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-2xl text-deepInk dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-bodyText dark:text-lavender-light/80 max-w-md mx-auto font-normal">
                    Thank you for reaching out. Sumit will review your requirements and respond promptly at <span className="font-bold text-deepInk dark:text-white">{formData.email || 'your email'}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-deepInk text-white font-bold text-xs uppercase tracking-wider hover:bg-deepInk-hover transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-2xl bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold leading-relaxed">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-medium focus:outline-none focus:border-deepInk transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-medium focus:outline-none focus:border-deepInk transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                      Subject / Project Type
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. 3D Packaging Design, Motion Graphics Reel, Branding"
                      className="w-full px-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-medium focus:outline-none focus:border-deepInk transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your brand, timeline, and vision..."
                      className="w-full px-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-medium focus:outline-none focus:border-deepInk transition-all resize-y"
                    />
                  </div>

                  <ClayButton
                    type="submit"
                    variant="dark"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        Send Inquiry
                      </>
                    )}
                  </ClayButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
