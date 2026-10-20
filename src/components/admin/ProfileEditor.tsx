'use client';

import React, { useState } from 'react';
import {
  Save,
  Upload,
  FileText,
  Download,
  Check,
  Sparkles,
  Link as LinkIcon,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { ProfileSettings } from '@/lib/types';
import { uploadResumeFile } from '@/lib/storage';
import ClayButton from '@/components/3d/ClayButton';

interface ProfileEditorProps {
  initialProfile: ProfileSettings;
  onSave: (profile: ProfileSettings) => Promise<void>;
}

export default function ProfileEditor({
  initialProfile,
  onSave,
}: ProfileEditorProps) {
  const [profile, setProfile] = useState<ProfileSettings>(initialProfile);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
    setErrorMessage('');

    const res = await uploadResumeFile(file);
    setIsUploadingResume(false);

    if (res.url) {
      setProfile((prev) => ({ ...prev, resumeUrl: res.url! }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setErrorMessage(res.error || 'Failed to upload resume to Supabase Storage.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    try {
      await onSave(profile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save profile settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0D2625] rounded-3xl md:rounded-4xl border-2 border-mint dark:border-[#1A4543] p-6 sm:p-10 shadow-[0_8px_0_#99F6E4] dark:shadow-[0_8px_0_#071918]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-mint/60 dark:border-[#1A4543]/60 mb-8">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-deepTeal dark:text-white">
            Profile, Contact & Resume Settings
          </h2>
          <p className="text-xs sm:text-sm text-deepTeal-muted dark:text-mint/70 font-medium mt-1">
            Update your portfolio headlines, contact details, social links, and upload your latest resume.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-700">
            <Check className="w-4 h-4" />
            Changes Saved Successfully!
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Resume Upload to Supabase Storage */}
        <div className="p-6 rounded-3xl bg-mint/30 dark:bg-[#113B39]/40 border-2 border-mint dark:border-[#1E615D] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
                <FileText className="w-4 h-4" />
                Resume Document (Supabase Storage)
              </span>
              <h3 className="font-display font-bold text-lg text-deepTeal dark:text-white">
                Replace or Upload Resume PDF
              </h3>
              <p className="text-xs text-deepTeal-muted dark:text-mint/70 font-medium">
                Uploaded PDFs are stored in Supabase Storage bucket &lsquo;resumes&rsquo; and update the public Download button.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold cursor-pointer hover:bg-primary-hover shadow-[0_3px_0_#0D9488] active:translate-y-0.5 transition-all">
              <Upload className="w-4 h-4" />
              {isUploadingResume ? 'Uploading PDF...' : 'Upload New Resume PDF'}
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleResumeUpload}
                disabled={isUploadingResume}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#071918] border border-mint dark:border-[#1E524F]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-mint dark:bg-[#113B39] text-deepTeal dark:text-mint flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-bold text-deepTeal-muted dark:text-mint/60 block">
                  Active Resume File URL:
                </span>
                <span className="text-xs font-mono font-bold text-deepTeal dark:text-white truncate block max-w-lg">
                  {profile.resumeUrl || 'Not uploaded yet'}
                </span>
              </div>
            </div>

            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream dark:bg-[#0D2625] border border-mint dark:border-[#1E524F] text-xs font-bold text-deepTeal dark:text-mint hover:bg-mint dark:hover:bg-[#113B39] transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                Preview Current Resume
              </a>
            )}
          </div>
        </div>

        {/* Section 2: Name & Intro */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-deepTeal dark:text-white border-b border-mint/40 dark:border-[#1A4543]/40 pb-2">
            General Information & Bio
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Role Tagline
              </label>
              <input
                type="text"
                required
                value={profile.roleTitle}
                onChange={(e) => setProfile({ ...profile, roleTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
              Hero Intro (Profile summary)
            </label>
            <textarea
              rows={3}
              value={profile.intro}
              onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
              Extended About Narrative
            </label>
            <textarea
              rows={4}
              value={profile.aboutBio}
              onChange={(e) => setProfile({ ...profile, aboutBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Section 3: Contact & Direct Channels */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-deepTeal dark:text-white border-b border-mint/40 dark:border-[#1A4543]/40 pb-2">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Links */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-deepTeal dark:text-white border-b border-mint/40 dark:border-[#1A4543]/40 pb-2">
            Social & Portfolio Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Behance URL
              </label>
              <input
                type="text"
                value={profile.socialBehance}
                onChange={(e) => setProfile({ ...profile, socialBehance: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={profile.socialLinkedin}
                onChange={(e) => setProfile({ ...profile, socialLinkedin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Instagram URL
              </label>
              <input
                type="text"
                value={profile.socialInstagram}
                onChange={(e) => setProfile({ ...profile, socialInstagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                WhatsApp Chat Link
              </label>
              <input
                type="text"
                value={profile.socialWhatsapp}
                onChange={(e) => setProfile({ ...profile, socialWhatsapp: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal dark:text-mint mb-1.5">
                Personal Website URL
              </label>
              <input
                type="text"
                value={profile.socialWebsite}
                onChange={(e) => setProfile({ ...profile, socialWebsite: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream dark:bg-[#071918] border-2 border-mint dark:border-[#1E524F] text-deepTeal dark:text-white text-sm font-semibold focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-mint dark:border-[#1A4543]/60 flex items-center justify-end">
          <ClayButton
            type="submit"
            variant="teal"
            size="lg"
            disabled={isSaving}
          >
            {isSaving ? 'Saving Changes...' : 'Save Profile & Settings'}
          </ClayButton>
        </div>
      </form>
    </div>
  );
}
