import type { Metadata, Viewport } from "next";
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

// آدرس اصلی سایت
const SITE_URL = "https://alpha-system-eight.vercel.app";

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | آلفا سیستم',
    default: 'پنل مدیریت آلفا سیستم',
  },
  description: "سامانه یکپارچه مدیریت منابع سازمانی (ERP) - نسخه اینترپرایز",
  // 👇 تنظیمات جدید آیکون‌ها برای گوگل
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }, // گوگل اینو دوست داره
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: "889fIOlZo4jHk-UB3Sv_X-vuaJQa-YPzZKLPMqpcYEo",
  },
  openGraph: {
    title: 'پنل مدیریت آلفا سیستم',
    description: 'سامانه یکپارچه مدیریت منابع سازمانی',
    url: SITE_URL,
    siteName: 'Alpha Systems',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/icon-512.png', // استفاده از لوگوی بزرگ برای لینک‌های اشتراک‌گذاری
        width: 512,
        height: 512,
        alt: 'Alpha Systems Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 👇 داده‌های ساختار یافته برای گوگل (JSON-LD)
  // این کد باعث میشه گوگل دقیقا بدونه لوگوی شما کدومه
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "آلفا سیستم",
    "url": SITE_URL,
    "logo": `${SITE_URL}/icon-512.png`,
    "sameAs": [
      "https://kiyadev.ir" // اگر لینک اینستاگرام یا لینکدین دارید اینجا اضافه کنید
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+98-21-00000000",
      "contactType": "customer support"
    }
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* تزریق جیسون-ال‌دی به هد */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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