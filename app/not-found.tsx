import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
      {/* پس‌زمینه با افکت نوری */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[70%] w-[70%] rounded-full bg-emerald-500/5 blur-[120px]"></div>
        <div className="absolute -bottom-[30%] -right-[10%] h-[70%] w-[70%] rounded-full bg-blue-500/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center p-6">
        {/* آیکون بزرگ */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-2xl shadow-emerald-500/10 rotate-3">
          <FileQuestion size={48} className="text-emerald-500" />
        </div>

        {/* متن خطا */}
        <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-white">صفحه مورد نظر یافت نشد!</h2>
        <p className="mt-2 text-zinc-400 max-w-md">
          آدرسی که وارد کردید در سیستم ثبت نشده است یا دسترسی به آن امکان‌پذیر نمی‌باشد.
        </p>

        {/* دکمه بازگشت */}
        <Link 
          href="/" 
          className="mt-8 flex items-center gap-2 rounded-full bg-white px-8 py-3 font-bold text-black transition-transform hover:scale-105 hover:bg-emerald-400"
        >
          <Home size={20} />
          بازگشت به داشبورد
        </Link>
      </div>

      {/* فوتر کوچک */}
      <div className="absolute bottom-8 text-xs text-zinc-600 font-mono">
        ALPHA SYSTEMS SECURITY PROTOCOL
      </div>
    </div>
  );
}