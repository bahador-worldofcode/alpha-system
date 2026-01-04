"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck, Network, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("اطلاعات ورود اشتباه است"); 
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black p-4">
      
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl">
        
        {/* لوگو و تیتر */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">ورود به امپراتوری</h1>
          <p className="mt-2 text-sm text-zinc-400">برای دسترسی به پنل مدیریت، وارد شوید</p>
        </div>

        {/* فرم ورود */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">ایمیل مدیر</label>
            <input
              type="email"
              required
              placeholder="admin@alpha.com"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">رمز عبور</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                در حال بررسی...
              </div>
            ) : (
              "ورود به سیستم"
            )}
          </button>
        </form>

      </div>

      {/* ✅ بخش لینک شبکه همکاران (SEO Link) */}
      <Link 
        href="/partners" 
        className="mt-8 group flex items-center gap-2 text-zinc-500 transition-colors hover:text-white"
        title="مشاهده شبکه همکاران و پروژه‌های دیگر"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-zinc-600 transition-colors">
            <Network size={16} />
        </div>
        <span className="text-sm font-medium">شبکه همکاران تجاری</span>
        <ArrowLeft size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </Link>

    </div>
  );
}