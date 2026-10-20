'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
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
import ClayShape from '@/components/3d/ClayShape';
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
    <section id="contact" className="py-24 relative overflow-hidden bg-white dark:bg-[#071918] transition-colors duration-200">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-[8%] opacity-25 dark:opacity-10 pointer-events-none">
        <ClayShape type="sphere" color="yellow" size="lg" />
      </div>
      <div className="absolute bottom-10 right-[6%] opacity-25 dark:opacity-10 pointer-events-none">
        <ClayShape type="torus" color="teal" size="xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint text-xs font-extrabold uppercase tracking-wider border border-mint-border dark:border-[#1E615D] shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Start a Conversation</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-deepTeal dark:text-white tracking-tight">
            Let&apos;s Create Something Playful & Bold
          </h2>
          <p className="mt-3 text-base sm:text-lg text-deepTeal-muted dark:text-mint/70 font-medium">
            Have a project in mind, need 3D branding mockups, or want an AI-assisted video reel? Reach out below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Email Card */}
            <div className="bg-cream dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-6 shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-primary flex items-center justify-center shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase">Email Address</span>
                    <h4 className="font-display font-bold text-base text-deepTeal dark:text-white break-all">
                      {profile.email}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 py-2 px-4 rounded-xl bg-primary text-white text-xs font-bold text-center hover:bg-primary-hover shadow-[0_2px_0_#0D9488] transition-colors"
                >
                  Send Direct Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F] text-deepTeal dark:text-mint hover:bg-mint dark:hover:bg-[#113B39] text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="bg-cream dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-6 shadow-[0_6px_0_#99F6E4] dark:shadow-[0_6px_0_#071918]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm border border-emerald-200 dark:border-emerald-800">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase">Direct WhatsApp</span>
                  <h4 className="font-display font-bold text-base text-deepTeal dark:text-white">
                    {profile.phone}
                  </h4>
                </div>
              </div>

              <ClayButton
                variant="teal"
                size="sm"
                fullWidth
                href={profile.socialWhatsapp}
              >
                Chat on WhatsApp
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </ClayButton>
            </div>

            {/* Location & Response Card */}
            <div className="bg-white dark:bg-[#0D2625] rounded-3xl border-2 border-mint dark:border-[#1A4543] p-6 shadow-[0_4px_0_#99F6E4] dark:shadow-[0_4px_0_#071918] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-deepTeal-muted dark:text-mint/60 uppercase">Based in</span>
                  <p className="text-sm font-bold text-deepTeal dark:text-white">{profile.location}</p>
                </div>
              </div>

              <p className="text-xs text-deepTeal-muted dark:text-mint/70 leading-relaxed font-medium">
                Working with clients globally across all timezones. Fast communication via WhatsApp, Slack, and Google Meet.
              </p>

              {/* Social icons row */}
              <div className="pt-3 border-t border-mint dark:border-[#1A4543] flex items-center gap-2.5">
                <Social3DIcon platform="instagram" href={profile.socialInstagram} size="sm" />
                <Social3DIcon platform="behance" href={profile.socialBehance} size="sm" />
                <Social3DIcon platform="linkedin" href={profile.socialLinkedin} size="sm" />
                <Social3DIcon platform="whatsapp" href={profile.socialWhatsapp} size="sm" />
                <Social3DIcon platform="email" href={`mailto:${profile.email}`} size="sm" />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-cream dark:bg-[#0D2625] rounded-3xl md:rounded-4xl border-2 border-mint dark:border-[#1A4543] p-8 sm:p-10 shadow-[0_12px_0_#99F6E4,0_24px_40px_rgba(15,76,74,0.08)] dark:shadow-[0_12px_0_#071918,0_24px_40px_rgba(0,0,0,0.5)]">
              <h3 className="font-display font-extrabold text-2xl text-deepTeal dark:text-white mb-2">
                Send a Project Inquiry
              </h3>
              <p className="text-xs font-semibold text-deepTeal-muted dark:text-mint/70 mb-6">
                Fill in the details below and Sumit will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-white dark:bg-[#071918] border-2 border-emerald-400 text-center space-y-4 shadow-sm animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-deepTeal dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-deepTeal-muted dark:text-mint/70 max-w-md mx-auto font-medium">
                    Thank you for reaching out. Sumit will review your requirements and respond promptly at <span className="font-bold text-deepTeal dark:text-white">{formData.email || 'your email'}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-2xl bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint dark:focus:ring-teal-900 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint dark:focus:ring-teal-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                      Subject / Project Type
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. 3D Packaging Design, Motion Graphics Reel, Branding"
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint dark:focus:ring-teal-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your brand, timeline, and vision..."
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint dark:focus:ring-teal-900 transition-all resize-y"
                    />
                  </div>

                  <ClayButton
                    type="submit"
                    variant="coral"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-1" />
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
