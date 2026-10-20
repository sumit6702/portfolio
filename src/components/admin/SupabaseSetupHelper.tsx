'use client';

import React, { useState } from 'react';
import { Copy, Check, Database, Shield, HardDrive, KeyRound, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function SupabaseSetupHelper() {
  const [copied, setCopied] = useState(false);
  const isConnected = isSupabaseConfigured();

  const handleCopySql = async () => {
    try {
      const res = await fetch('/api/schema-sql');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl md:rounded-4xl border-2 border-mint p-6 sm:p-10 shadow-[0_8px_0_#99F6E4] space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-mint/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint text-deepTeal text-xs font-extrabold uppercase mb-2">
            <Database className="w-3.5 h-3.5 text-primary" />
            Supabase Integration Hub
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-deepTeal">
            Database, Auth & Storage Setup
          </h2>
          <p className="text-xs sm:text-sm text-deepTeal-muted font-medium mt-1">
            Connect your free Supabase project to enable persistent database storage, Row Level Security, and uploads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-xs font-bold text-deepTeal">
            {isConnected ? 'Supabase Connected' : 'Running in Local / Fallback Mode'}
          </span>
        </div>
      </div>

      {/* Step by Step Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-cream border-2 border-mint space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-display font-bold text-base text-deepTeal">
              Create Supabase Project
            </h4>
          </div>
          <p className="text-xs text-deepTeal-muted leading-relaxed font-medium">
            Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-primary underline font-bold">supabase.com</a>, create a free project named &lsquo;sumit-portfolio&rsquo;, and choose a region close to your target audience (e.g. South Asia / India or Singapore).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-cream border-2 border-mint space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coralPeach text-white flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-display font-bold text-base text-deepTeal">
              Run Schema & RLS SQL
            </h4>
          </div>
          <p className="text-xs text-deepTeal-muted leading-relaxed font-medium">
            Open <span className="font-bold text-deepTeal">SQL Editor</span> in your Supabase dashboard, click <span className="font-bold text-deepTeal">New Query</span>, paste the code from <code className="bg-white px-1.5 py-0.5 rounded border border-mint">supabase/schema.sql</code>, and click <span className="font-bold text-deepTeal">Run</span>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-cream border-2 border-mint space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-butterYellow text-deepTeal flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-display font-bold text-base text-deepTeal">
              Create Admin Auth User
            </h4>
          </div>
          <p className="text-xs text-deepTeal-muted leading-relaxed font-medium">
            Go to <span className="font-bold text-deepTeal">Authentication &gt; Users</span>, click <span className="font-bold text-deepTeal">Add User</span>, and enter <code className="font-bold text-deepTeal">sumitkdesigns@gmail.com</code> with your chosen admin password.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-cream border-2 border-mint space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mint text-deepTeal flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-display font-bold text-base text-deepTeal">
              Add Environment Variables
            </h4>
          </div>
          <p className="text-xs text-deepTeal-muted leading-relaxed font-medium">
            In Supabase <span className="font-bold text-deepTeal">Project Settings &gt; API</span>, copy the <code className="text-deepTeal font-bold">Project URL</code> and <code className="text-deepTeal font-bold">anon public key</code> into your local <code className="font-bold">.env.local</code> and Vercel Environment Variables.
          </p>
        </div>
      </div>

      {/* SQL Script Quick Copy Section */}
      <div className="p-6 rounded-3xl bg-mint-light border-2 border-mint space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-display font-bold text-lg text-deepTeal flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Complete SQL Script (`supabase/schema.sql`)
            </h4>
            <p className="text-xs text-deepTeal-muted font-medium">
              Creates 4 tables (`projects`, `videos`, `profile_settings`, `contact_inquiries`), Row Level Security policies, and 2 storage buckets (`portfolio-assets`, `resumes`).
            </p>
          </div>

          <a
            href="/api/schema-sql"
            download="supabase-schema.sql"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-[0_2px_0_#0D9488] transition-colors"
          >
            Download schema.sql
          </a>
        </div>
      </div>
    </div>
  );
}
