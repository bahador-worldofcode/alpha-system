"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. چک کردن وضعیت لاگین
      const { data: { session } } = await supabase.auth.getSession();

      // اگر کاربر در صفحه لاگین است، نیاز به چک کردن نیست (آزاد است)
      if (pathname === "/login") {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // 2. اگر سشن نداشت (لاگین نبود) -> برو به لاگین
      if (!session) {
        router.replace("/login");
      } else {
        // 3. اگر لاگین بود -> اجازه ورود بده
        setIsAuthorized(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // گوش دادن به تغییرات وضعیت (مثلاً اگر در تب دیگر لاگ‌اوت کرد)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  // تا زمانی که داره چک می‌کنه، صفحه لودینگ نشون بده (که صفحه اصلی نپره)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-emerald-500" />
          <p className="text-sm font-medium text-zinc-400">در حال بررسی امنیتی...</p>
        </div>
      </div>
    );
  }

  // اگر مجاز بود، محتوا رو نشون بده
  return isAuthorized ? <>{children}</> : null;
}