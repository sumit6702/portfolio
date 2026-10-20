'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import { loginAdmin, checkAdminSession } from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import ClayButton from '@/components/3d/ClayButton';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('sumitkdesigns@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  useEffect(() => {
    setIsSupabaseLive(isSupabaseConfigured());
    checkAdminSession().then((user) => {
      if (user) {
        router.push('/admin');
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch {
      setErrorMessage('Unexpected login error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-8 sm:p-10 shadow-[0_16px_40px_rgba(46,42,79,0.08)]">
          
          {/* Top Logo / Lock Badge */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-lavender-light dark:bg-lavender/20 text-deepInk dark:text-lavender-light border border-lavender-border/50 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white">
              Admin Portal
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-bodyText-muted dark:text-lavender-light/70">
              Manage projects, videos, profile details & resume
            </p>

            {/* Supabase connection indicator */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 text-[11px] font-bold text-deepInk dark:text-lavender-light">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSupabaseLive ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              {isSupabaseLive
                ? 'Supabase Auth Connected'
                : 'Local / Fallback Mode Active'}
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sumitkdesigns@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk transition-all"
                />
                <Mail className="w-4 h-4 text-bodyText-muted dark:text-lavender-light/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bodyText-muted dark:text-lavender-light/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk transition-all"
                />
                <KeyRound className="w-4 h-4 text-bodyText-muted dark:text-lavender-light/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <ClayButton
                type="submit"
                variant="dark"
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  'Verifying...'
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </ClayButton>
            </div>
          </form>

          {/* Guidance Box */}
          <div className="mt-8 pt-6 border-t border-lavender/30 dark:border-white/10 text-center text-xs text-bodyText-muted dark:text-lavender-light/60 space-y-2">
            <p className="font-semibold">
              <ShieldCheck className="w-4 h-4 inline mr-1 text-periwinkle" />
              Protected by Supabase Row Level Security
            </p>
            <p className="text-[11px]">
              Demo access: use <span className="font-bold text-deepInk dark:text-white">sumitkdesigns@gmail.com</span> with any password (min 6 chars) or configure Supabase Auth.
            </p>
            <div className="pt-2 flex items-center justify-center gap-4">
              <Link
                href="/"
                className="text-deepInk dark:text-lavender-light font-bold hover:underline"
              >
                ← Return to Public Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
