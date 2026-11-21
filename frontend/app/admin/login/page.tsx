'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mountain, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@suyashfood.in');
  const [password, setPassword] = useState('Admin@Suyash2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      login(res.token, res.user);
      router.push('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-2xl border border-forest-light/30 space-y-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Image
            src="/images/logo.png"
            alt="Suyash Food Industries"
            width={220}
            height={76}
            className="h-16 w-auto mx-auto object-contain"
            priority
          />
          <h1 className="font-serif font-bold text-xl text-forest pt-1">
            Suyash Admin Portal
          </h1>
          <p className="text-xs text-charcoal/60">
            Sign in to manage products, categories, website CMS, and customer WhatsApp enquiries.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-charcoal block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@suyashfood.in"
                className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-charcoal block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition disabled:opacity-60"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-beige text-center">
          <p className="text-[11px] text-charcoal/50">
            Protected management portal • Solan, HP.
          </p>
        </div>

      </div>
    </div>
  );
}
