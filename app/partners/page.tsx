"use client";

import { 
  ExternalLink, 
  Network, 
  Briefcase, 
  Bitcoin, 
  Rocket, 
  Code2, 
  Bot, 
  Shirt, 
  Gem, 
  ShoppingBag, 
  ArrowRight,
  Truck
} from "lucide-react";
import Link from "next/link";

// لیست همکاران (آلفا سیستم حذف شده چون خودش میزبان است)
const partners = [
  {
    id: 1,
    title: "تیوان اکس | صرافی ارز دیجیتال",
    description: "پلتفرم معاملاتی نسل ۳ با امنیت سایبری نظامی. خرید و فروش بیت‌کوین و تتر با موتور مچینگ فراصوت و کیف پول سرد اختصاصی.",
    features: ["امنیت نظامی", "مچینگ فراصوت", "احراز هویت هوشمند"],
    url: "https://tivan-ex.vercel.app", 
    icon: Bitcoin,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    border: "hover:border-emerald-500/50",
    glow: "group-hover:shadow-emerald-500/10"
  },
  {
    id: 2,
    title: "نکسوس سولانا | توکن‌ساز",
    description: "اولین پلتفرم ساخت ارز دیجیتال و میم‌کوین روی شبکه سولانا بدون کدنویسی. ساخت توکن با کمترین کارمزد و سرعت بالا.",
    features: ["شبکه سولانا", "ساخت توکن", "بدون کدنویسی"],
    url: "https://nexus-solana-taupe.vercel.app",
    icon: Rocket,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    border: "hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/10"
  },
  {
    id: 3,
    title: "کیا دِو | امپراتوری نرم‌افزار",
    description: "تیم توسعه‌دهنده نخبه در زمینه طراحی وب‌سایت‌های اختصاصی، اپلیکیشن‌های موبایل (Flutter & React Native)، بلاکچین و هوش مصنوعی.",
    features: ["توسعه دهنده اصلی", "بلاکچین و Web3", "هوش مصنوعی"],
    url: "https://kiyadev.ir", 
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    border: "hover:border-blue-500/50",
    glow: "group-hover:shadow-blue-500/10"
  },
  {
    id: 4,
    title: "مایند اُربیت | دستیار هوشمند AI",
    description: "چت‌بات پیشرفته فارسی مبتنی بر مدل‌های زبانی گوگل (Gemini). دستیاری قدرتمند برای تولید محتوا، برنامه‌نویسی و پاسخ به سوالات پیچیده.",
    features: ["هوش مصنوعی", "چت هوشمند", "تولید محتوا"],
    url: "https://mind-orbit-lyart.vercel.app",
    icon: Bot,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    border: "hover:border-cyan-500/50",
    glow: "group-hover:shadow-cyan-500/10"
  },
  {
    id: 5,
    title: "لوکس شاپ | مد و استایل",
    description: "مرجع تخصصی خرید آنلاین پوشاک و اکسسوری‌های لوکس. جدیدترین کالکشن‌های مد و فشن با ضمانت اصالت کالا و ارسال سریع.",
    features: ["پوشاک برند", "ضمانت اصالت", "ارسال رایگان"],
    url: "https://luxe-shop-ten.vercel.app", 
    icon: Shirt,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    border: "hover:border-indigo-500/50",
    glow: "group-hover:shadow-indigo-500/10"
  },
  {
    id: 6,
    title: "فروشگاه آنلاین کوکونات",
    description: "بازار آنلاین میوه و پروتئین شهر پرند. خرید آنلاین تازه‌ترین میوه، سبزیجات، گوشت و مرغ با تحویل فوری درب منزل.",
    features: ["تحویل فوری در پرند", "تضمین تازگی", "تنوع بی‌نظیر"],
    url: "https://cocodelivery.ir", 
    icon: Truck,
    color: "text-green-500", // کمی متفاوت برای تمایز با نکسوس
    bgColor: "bg-green-500/10",
    border: "hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/10"
  },
  {
    id: 7,
    title: "گالری جواهرات اَلِف جِم",
    description: "طراحی و ساخت جواهرات دست‌ساز با طلای ۱۸ عیار و سنگ‌های قیمتی اصل. ترکیب هنر مینیمال و مدرن برای خلق آثاری ماندگار و لوکس.",
    features: ["جواهرات دست‌ساز", "سنگ‌های قیمتی", "گارانتی مادام‌العمر"],
    url: "https://alefgem.com", 
    icon: Gem,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    border: "hover:border-purple-500/50",
    glow: "group-hover:shadow-purple-500/10"
  },
  {
    id: 8,
    title: "فروشگاه بین‌المللی سوغات شاپ",
    description: "اولین پلتفرم ارسال هدیه به ایران با پرداخت ارزی و کریپتو. ارسال آجیل، صنایع دستی و گل به سراسر ایران برای ایرانیان خارج از کشور.",
    features: ["پرداخت کریپتو", "ارسال به سراسر ایران", "ضمانت بازگشت وجه"],
    url: "https://soughat.shop", 
    icon: ShoppingBag,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/10"
  }
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans overflow-hidden relative">
      
      {/* بک‌گراند نوری مشابه پنل */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* هدر صفحه */}
        <div className="flex flex-col gap-6 mb-12 border-b border-zinc-800 pb-8">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm w-fit"
            >
                <ArrowRight className="w-4 h-4" />
                بازگشت به صفحه ورود
            </Link>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 mb-4">
                <Network className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />
                شبکه همکاران تجاری
              </h1>
              <p className="text-zinc-400 max-w-3xl leading-8 text-lg text-justify">
                آلفا سیستم مفتخر است که بخشی از یک اکوسیستم بزرگ دیجیتال است. در اینجا مجموعه‌ای از پلتفرم‌های برتر و استارتاپ‌های موفقی که با ما همکاری استراتژیک دارند را معرفی می‌کنیم.
              </p>
            </div>
        </div>

        {/* گرید کارت‌ها */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="dofollow noreferrer" // dofollow برای سئو بسیار مهم است
              className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 ${partner.border} ${partner.glow}`}
            >
              <div>
                {/* هدر کارت */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${partner.bgColor} ${partner.color}`}>
                    <partner.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="rounded-full bg-zinc-950 border border-zinc-800 px-3 py-1 flex items-center gap-1">
                     <Briefcase size={12} className="text-zinc-500" />
                    <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">Partner</span>
                  </div>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {partner.title}
                </h2>
                
                <p className="text-sm leading-7 text-zinc-400 mb-6 text-justify opacity-90">
                  {partner.description}
                </p>

                {/* ویژگی‌ها */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {partner.features.map((feature, idx) => (
                    <span key={idx} className="text-[11px] bg-zinc-950 text-zinc-500 border border-zinc-800 px-2.5 py-1 rounded-md">
                      # {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* فوتر کارت */}
              <div className="mt-auto border-t border-zinc-800 pt-4 flex items-center justify-between">
                <span className={`text-xs font-bold transition-colors ${partner.color}`}>
                  مشاهده وب‌سایت
                </span>
                <div className="flex items-center gap-1 text-zinc-600 group-hover:text-white transition-colors">
                  <span className="text-xs font-mono hidden sm:inline-block dir-ltr">{partner.url.replace('https://', '')}</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* کپی رایت ساده */}
        <div className="mt-12 text-center border-t border-zinc-800 pt-8">
            <p className="text-xs text-zinc-600 font-mono">
                © {new Date().getFullYear()} Alpha Systems Network. All Rights Reserved.
            </p>
        </div>

      </div>
    </div>
  );
}