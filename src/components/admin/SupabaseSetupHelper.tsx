'use client';

import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function SupabaseSetupHelper() {
  const isConnected = isSupabaseConfigured();

  return (
    <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-10 shadow-soft-sm space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-lavender/30 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-light dark:bg-lavender/20 text-deepInk dark:text-lavender-light text-xs font-bold uppercase mb-2 border border-lavender-border/50">
            <Database className="w-3.5 h-3.5" />
            Supabase Integration Hub
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white">
            Database, Auth & Storage Setup
          </h2>
          <p className="text-xs sm:text-sm text-bodyText-muted dark:text-lavender-light/70 font-medium mt-1">
            Connect your free Supabase project to enable persistent database storage, Row Level Security, and uploads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-xs font-bold text-deepInk dark:text-lavender-light">
            {isConnected ? 'Supabase Connected' : 'Running in Local / Fallback Mode'}
          </span>
        </div>
      </div>

      {/* Step by Step Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[28px] bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
              Create Supabase Project
            </h4>
          </div>
          <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 leading-relaxed font-medium">
            Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-deepInk dark:text-white underline font-bold">supabase.com</a>, create a free project named &lsquo;sumit-portfolio&rsquo;, and choose a region close to your target audience (e.g. South Asia / India or Singapore).
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
              Run Schema & RLS SQL
            </h4>
          </div>
          <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 leading-relaxed font-medium">
            Open <span className="font-bold text-deepInk dark:text-white">SQL Editor</span> in your Supabase dashboard, click <span className="font-bold text-deepInk dark:text-white">New Query</span>, paste the code from <code className="bg-white dark:bg-[#1E1B33] px-1.5 py-0.5 rounded border border-lavender/40">supabase/schema.sql</code>, and click <span className="font-bold text-deepInk dark:text-white">Run</span>.
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-butterYellow-light dark:bg-butterYellow/20 text-deepInk dark:text-butterYellow-light flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
              Create Admin Auth User
            </h4>
          </div>
          <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 leading-relaxed font-medium">
            Go to <span className="font-bold text-deepInk dark:text-white">Authentication &gt; Users</span>, click <span className="font-bold text-deepInk dark:text-white">Add User</span>, and enter <code className="font-bold text-deepInk dark:text-white">sumitkdesigns@gmail.com</code> with your chosen admin password.
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mint-light dark:bg-mint/20 text-deepInk dark:text-mint-light flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-serif font-bold text-base text-deepInk dark:text-white">
              Add Environment Variables
            </h4>
          </div>
          <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 leading-relaxed font-medium">
            In Supabase <span className="font-bold text-deepInk dark:text-white">Project Settings &gt; API</span>, copy the <code className="text-deepInk dark:text-white font-bold">Project URL</code> and <code className="text-deepInk dark:text-white font-bold">anon public key</code> into your local <code className="font-bold">.env.local</code> and Vercel Environment Variables.
          </p>
        </div>
      </div>

      {/* SQL Script Quick Copy Section */}
      <div className="p-6 rounded-[28px] bg-lavender-soft dark:bg-[#161426] border border-lavender/50 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-serif font-bold text-lg text-deepInk dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5" />
              Complete SQL Script (`supabase/schema.sql`)
            </h4>
            <p className="text-xs text-bodyText-muted dark:text-lavender-light/70 font-medium">
              Creates 4 tables (`projects`, `videos`, `profile_settings`, `contact_inquiries`), Row Level Security policies, storage buckets (`portfolio-assets`, `resumes`), and theme settings columns.
            </p>
          </div>

          <a
            href="/api/schema-sql"
            download="supabase-schema.sql"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-deepInk text-white text-xs font-bold hover:bg-deepInk-hover transition-colors shadow-sm"
          >
            Download schema.sql
          </a>
        </div>

        {/* Quick Migration snippet for existing profile_settings tables */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1B33] border border-lavender/40 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-deepInk dark:text-white">
              SQL Migration for Appearance &amp; Theme Persistence:
            </span>
            <span className="text-[10px] font-bold text-bodyText-muted dark:text-lavender-light/60">
              Run once in Supabase SQL Editor
            </span>
          </div>
          <pre className="p-3 rounded-xl bg-bg dark:bg-[#110F20] border border-lavender/40 text-[11px] font-mono text-deepInk dark:text-lavender-light overflow-x-auto whitespace-pre">
{`-- 1. Ensure theme columns exist in profile_settings
ALTER TABLE public.profile_settings ADD COLUMN IF NOT EXISTS theme_mode TEXT DEFAULT 'system';
ALTER TABLE public.profile_settings ADD COLUMN IF NOT EXISTS categories JSONB DEFAULT '["3D Design", "Motion Graphics", "Packaging", "Branding", "AI Video"]'::jsonb;
ALTER TABLE public.profile_settings ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{}'::jsonb;

-- 2. Allow admin portal to save profile & appearance changes without RLS blockage
DROP POLICY IF EXISTS "Authenticated admin can manage profile settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Admin can manage profile settings" ON public.profile_settings;
CREATE POLICY "Admin can manage profile settings"
  ON public.profile_settings FOR ALL
  USING (true)
  WITH CHECK (true);`}
          </pre>
        </div>
      </div>
    </div>
  );
}
