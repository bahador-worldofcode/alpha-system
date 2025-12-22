import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* تیتر و خوش‌آمدگویی فیک */}
      <div>
        <div className="h-8 w-48 rounded-lg bg-zinc-800"></div>
        <div className="mt-2 h-4 w-64 rounded-lg bg-zinc-900"></div>
      </div>

      {/* کارت‌های آمار (Stats Grid) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-zinc-800"></div>
                <div className="h-8 w-16 rounded bg-zinc-800"></div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-zinc-800"></div>
            </div>
          </div>
        ))}
      </div>

      {/* بخش نمودار و گزارش */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* ستون بزرگ: جای نمودار */}
        <div className="col-span-2 h-[400px] rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-6 h-6 w-32 rounded bg-zinc-800"></div>
          {/* میله‌های فیک نمودار */}
          <div className="flex h-full items-end justify-between gap-2 px-4 pb-4">
            <div className="h-[60%] w-full rounded-t bg-zinc-800/50"></div>
            <div className="h-[40%] w-full rounded-t bg-zinc-800/50"></div>
            <div className="h-[80%] w-full rounded-t bg-zinc-800/50"></div>
            <div className="h-[50%] w-full rounded-t bg-zinc-800/50"></div>
            <div className="h-[70%] w-full rounded-t bg-zinc-800/50"></div>
          </div>
        </div>

        {/* ستون کوچک: فعالیت‌های اخیر */}
        <div className="h-[400px] rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="mb-6 h-6 w-32 rounded bg-zinc-800"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-zinc-800" />
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded bg-zinc-800"></div>
                  <div className="h-3 w-20 rounded bg-zinc-900"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}