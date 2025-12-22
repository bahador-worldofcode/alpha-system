"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Shield, Moon, Sun, Bell, Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // دریافت ایمیل کاربر لاگین شده از سوپابیس
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email || "");
    };
    getUser();
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // شبیه‌سازی ذخیره اطلاعات (چون جدول پروفایل جداگانه نساختیم)
    setTimeout(() => {
      setIsLoading(false);
      alert("تنظیمات با موفقیت ذخیره شد.");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-3xl font-bold text-white">تنظیمات سیستم</h1>
        <p className="text-zinc-400 mt-2">مدیریت حساب کاربری و پیکربندی پنل</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* ستون راست: فرم اطلاعات اصلی */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* کارت پروفایل */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white border-b border-zinc-800 pb-4">
              <User size={20} className="text-blue-500" />
              اطلاعات حساب کاربری
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">نام نمایشی</label>
                  <input type="text" defaultValue="مدیر سیستم" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">شماره موبایل</label>
                  <input type="text" defaultValue="09123456789" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">آدرس ایمیل (غیرقابل تغییر)</label>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-zinc-500 cursor-not-allowed">
                  <Mail size={18} />
                  <span className="font-mono dir-ltr">{email || "در حال بارگذاری..."}</span>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button disabled={isLoading} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-70">
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      در حال ذخیره...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      ذخیره تغییرات
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* کارت امنیت */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white border-b border-zinc-800 pb-4">
              <Shield size={20} className="text-purple-500" />
              امنیت و رمز عبور
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">رمز عبور فعلی</label>
                <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">رمز عبور جدید</label>
                  <input type="password" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">تکرار رمز جدید</label>
                  <input type="password" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ستون چپ: تنظیمات ظاهری و اعلان */}
        <div className="space-y-6">
          
          {/* ظاهر */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white border-b border-zinc-800 pb-4">
              <Sun size={20} className="text-yellow-500" />
              ظاهر پنل
            </h3>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-3 ring-1 ring-emerald-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-white">
                    <Moon size={16} />
                  </div>
                  <span className="text-sm font-medium text-white">حالت تاریک (Dark)</span>
                </div>
                <div className="h-4 w-4 rounded-full border-[3px] border-emerald-500 bg-emerald-500 shadow-sm"></div>
              </label>
              
              <label className="flex cursor-not-allowed items-center justify-between rounded-lg border border-zinc-800 p-3 opacity-50 grayscale hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-black">
                    <Sun size={16} />
                  </div>
                  <span className="text-sm text-zinc-300">حالت روشن (Light)</span>
                </div>
                <div className="h-4 w-4 rounded-full border-2 border-zinc-600"></div>
              </label>
            </div>
          </div>

          {/* اعلان‌ها */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white border-b border-zinc-800 pb-4">
              <Bell size={20} className="text-red-500" />
              تنظیمات اعلان
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">ایمیل‌های سیستمی</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-emerald-500 cursor-pointer rounded bg-zinc-800" />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-800/50 pt-4">
                <span className="text-sm text-zinc-300">ورودهای مشکوک</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-emerald-500 cursor-pointer rounded bg-zinc-800" />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-800/50 pt-4">
                <span className="text-sm text-zinc-300">آپدیت‌های نرم‌افزار</span>
                <input type="checkbox" className="h-5 w-5 accent-emerald-500 cursor-pointer rounded bg-zinc-800" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}