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
      // لیست صفحاتی که عموم آزادند ببینند
      const publicRoutes = ["/login", "/partners", "/blog"];
      
      // اگر کاربر در یکی از صفحات عمومی است، نیازی به چک کردن سشن نیست
      if (publicRoutes.includes(pathname)) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // چک کردن وضعیت لاگین برای بقیه صفحات
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // اگر لاگین نبود، بفرستش به لاگین
        router.replace("/login");
      } else {
        // اگر لاگین بود، اجازه بده
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

  return isAuthorized ? <>{children}</> : null;
}