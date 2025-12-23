"use client";

import { ExternalLink, BookOpen, Globe, Code2, ShoppingBag, ShoppingCart, Gem, Truck } from "lucide-react";

// لیست سایت‌هایی که می‌خوای معرفی کنی (بک‌لینک‌ها)
const blogPosts = [
  {
    id: 1,
    title: "کیا دِو | امپراتوری نرم‌افزار",
    description: "تیم توسعه‌دهنده نخبه در زمینه طراحی وب‌سایت‌های اختصاصی، اپلیکیشن‌های موبایل (Flutter & React Native)، بلاکچین و هوش مصنوعی. ما رویاهای شما را کدنویسی می‌کنیم.",
    features: ["طراحی سایت اختصاصی (Next.js)", "برنامه‌نویسی بلاکچین و Web3", "هوش مصنوعی و اتوماسیون"],
    url: "https://kiyadev.ir", 
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    border: "hover:border-blue-500/50"
  },
  {
    id: 2,
    title: "فروشگاه آنلاین کوکونات",
    description: "بازار آنلاین میوه و پروتئین شهر پرند. خرید آنلاین تازه‌ترین میوه، سبزیجات، گوشت و مرغ با تحویل فوری درب منزل. تجربه‌ای راحت و سریع برای شهروندان پرند.",
    features: ["تحویل فوری در پرند", "تضمین تازگی و کیفیت", "تنوع بی‌نظیر محصولات"],
    url: "https://cocodelivery.ir", 
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    border: "hover:border-green-500/50"
  },
  {
    id: 3,
    title: "گالری جواهرات اَلِف جِم",
    description: "طراحی و ساخت جواهرات دست‌ساز با طلای ۱۸ عیار و سنگ‌های قیمتی اصل (یاقوت، زمرد، عقیق). ترکیب هنر مینیمال و مدرن برای خلق آثاری ماندگار و لوکس.",
    features: ["جواهرات دست‌ساز سفارشی", "سنگ‌های قیمتی شناسنامه‌دار", "گارانتی مادام‌العمر"],
    url: "https://alefgem.com", 
    icon: Gem,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    border: "hover:border-purple-500/50"
  },
  {
    id: 4,
    title: "فروشگاه بین‌المللی سوغات شاپ",
    description: "اولین پلتفرم ارسال هدیه به ایران با پرداخت ارزی و کریپتو (تتر/سولانا). ارسال آجیل، صنایع دستی و گل به سراسر ایران برای ایرانیان خارج از کشور.",
    features: ["پرداخت با ارز دیجیتال", "ارسال به سراسر ایران", "ضمانت بازگشت وجه"],
    url: "https://soughat.shop", 
    icon: ShoppingBag,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    border: "hover:border-rose-500/50"
  }
];

export default function BlogPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* هدر صفحه */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-yellow-500" />
          معرفی پروژه‌های برتر
        </h1>
        <p className="text-zinc-400 max-w-2xl leading-7">
          در این بخش، مجموعه‌ای از پروژه‌های موفق و استارتاپ‌های فعال که توسط تیم فنی پشتیبانی و توسعه داده شده‌اند را معرفی می‌کنیم. این وب‌سایت‌ها نمونه‌ای از کیفیت و نوآوری در دنیای دیجیتال هستند.
        </p>
      </div>

      {/* گرید کارت‌ها */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {blogPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="dofollow noreferrer" // dofollow برای تاثیر مثبت سئو
            className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 ${post.border}`}
          >
            <div>
              {/* هدر کارت: آیکون و تایتل */}
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${post.bgColor} ${post.color}`}>
                  <post.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="rounded-full bg-zinc-950 border border-zinc-800 px-3 py-1">
                  <span className="text-[10px] text-zinc-500 font-mono">Verified Project</span>
                </div>
              </div>

              <h2 className="mb-3 text-xl font-bold text-white group-hover:text-zinc-200">
                {post.title}
              </h2>
              
              <p className="text-sm leading-7 text-zinc-400 mb-6 text-justify">
                {post.description}
              </p>

              {/* ویژگی‌ها */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.features.map((feature, idx) => (
                  <span key={idx} className="text-[11px] bg-zinc-950 text-zinc-500 border border-zinc-800 px-2 py-1 rounded-md">
                    # {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* فوتر کارت: لینک */}
            <div className="mt-auto border-t border-zinc-800 pt-4 flex items-center justify-between">
              <span className={`text-xs font-bold transition-colors ${post.color}`}>
                مشاهده وب‌سایت
              </span>
              <div className="flex items-center gap-1 text-zinc-600 group-hover:text-white transition-colors">
                <span className="text-xs font-mono">{post.url.replace('https://', '')}</span>
                <ExternalLink size={14} />
              </div>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}