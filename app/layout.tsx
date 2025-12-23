import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import AuthGuard from "@/components/auth/AuthGuard";
import { Code2, Heart } from "lucide-react";

const vazir = Vazirmatn({ 
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | آلفا سیستم',
    default: 'پنل مدیریت آلفا سیستم',
  },
  description: "سامانه یکپارچه مدیریت منابع سازمانی (ERP) - نسخه اینترپرایز",
  icons: {
    icon: '/favicon.svg',
  },
  // 👇 کد تایید گوگل جدید شما در اینجا قرار گرفت
  verification: {
    google: "889fIOlZo4jHk-UB3Sv_X-vuaJQa-YPzZKLPMqpcYEo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <AuthGuard>
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="mr-0 flex w-full flex-col justify-between p-4 pb-24 transition-all duration-300 md:mr-64 md:p-8 md:pb-8">
              
              <div className="w-full">
                {children}
              </div>

              <footer className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-zinc-800 pt-6 md:flex-row">
                
                <p className="text-sm text-zinc-500">
                  تمامی حقوق محفوظ است © ۱۴۰۳ <span className="font-bold text-zinc-300">آلفا سیستم</span>
                </p>

                <a 
                  href="https://kiyadev.ir" 
                  target="_blank"
                  className="group flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 transition-all duration-300 hover:border-blue-500/30 hover:bg-zinc-900"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-400">
                      Design & Engineering by
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-zinc-300 group-hover:text-white">
                      KiyaDev Team
                      <Code2 className="h-3 w-3 text-blue-500" />
                    </span>
                  </div>
                  
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 shadow-sm transition-colors group-hover:bg-blue-600">
                     <Heart className="h-4 w-4 fill-current text-zinc-600 transition-colors group-hover:text-white" />
                  </div>
                </a>

              </footer>
            </main>
          </div>

          <MobileNav />

          <Toaster 
            richColors 
            position="bottom-left" 
            dir="rtl"
            theme="dark"
            style={{ fontFamily: 'inherit' }}
          />
        </AuthGuard>
      </body>
    </html>
  );
}