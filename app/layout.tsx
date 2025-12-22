import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import AuthGuard from "@/components/auth/AuthGuard"; // ایمپورت نگهبان

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} bg-zinc-950 text-zinc-100 antialiased`}>
        {/* فعال‌سازی گارد امنیتی روی کل برنامه */}
        <AuthGuard>
          <div className="flex min-h-screen">
            {/* سایدبار (فقط دسکتاپ) */}
            <Sidebar />

            {/* محتوای اصلی */}
            <main className="mr-0 w-full p-4 pb-24 md:mr-64 md:p-8 md:pb-8 transition-all duration-300">
              {children}
            </main>
          </div>

          {/* منوی پایین (فقط موبایل) */}
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