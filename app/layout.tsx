import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import AuthGuard from "@/components/auth/AuthGuard";
import AppShell from "@/components/layout/AppShell"; // ✅ اضافه شد

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
  // 👇 تنظیمات آیکون‌ها
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
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
        url: '/icon-512.png',
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
  
  // 👇 داده‌های ساختار یافته (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "آلفا سیستم",
    "url": SITE_URL,
    "logo": `${SITE_URL}/icon-512.png`,
    "sameAs": [
      "https://kiyadev.ir"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${vazir.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <AuthGuard>
          {/* ✅ اینجا AppShell وظیفه چیدمان رو به عهده می‌گیره */}
          <AppShell>
            {children}
          </AppShell>

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