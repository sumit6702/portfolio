'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { loginAdmin, checkAdminSession } from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import ClayButton from '@/components/3d/ClayButton';
import ClayShape from '@/components/3d/ClayShape';

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
    } catch (err: any) {
      setErrorMessage('Unexpected login error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-12 left-10 opacity-20 pointer-events-none">
        <ClayShape type="torus" color="teal" size="xl" />
      </div>
      <div className="absolute bottom-12 right-10 opacity-20 pointer-events-none">
        <ClayShape type="sphere" color="coral" size="lg" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl md:rounded-4xl border-2 border-mint p-8 sm:p-10 shadow-[0_12px_0_#99F6E4,0_24px_45px_rgba(15,76,74,0.1)]">
          {/* Top Logo / Lock Badge */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-mint text-deepTeal border-2 border-mint-border flex items-center justify-center mx-auto mb-4 shadow-[0_4px_0_#99F6E4]">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-deepTeal">
              Admin Portal
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-deepTeal-muted">
              Manage projects, videos, profile details & resume
            </p>

            {/* Supabase connection indicator */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-mint text-[11px] font-bold text-deepTeal">
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
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sumitkdesigns@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border-2 border-mint text-deepTeal text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint transition-all"
                />
                <Mail className="w-4 h-4 text-deepTeal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-deepTeal mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border-2 border-mint text-deepTeal text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-mint transition-all"
                />
                <KeyRound className="w-4 h-4 text-deepTeal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <ClayButton
                type="submit"
                variant="teal"
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

          {/* Quick Guidance Box */}
          <div className="mt-8 pt-6 border-t border-mint text-center text-xs text-deepTeal-muted space-y-2">
            <p className="font-semibold">
              <ShieldCheck className="w-4 h-4 inline mr-1 text-primary" />
              Protected by Supabase Row Level Security
            </p>
            <p className="text-[11px] text-deepTeal-muted">
              Demo access: use <span className="font-bold text-deepTeal">sumitkdesigns@gmail.com</span> with any password (min 6 chars) or configure Supabase Auth.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="text-primary font-bold hover:underline"
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
