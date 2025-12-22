"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Users, FolderKanban, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { name: 'داشبورد', icon: LayoutDashboard, path: '/' },
  { name: 'کارمندان', icon: Users, path: '/employees' },
  { name: 'پروژه‌ها', icon: FolderKanban, path: '/projects' },
  { name: 'تنظیمات', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/login') return null;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/login');
    }
  };

  return (
    // تغییر مهم: اضافه شدن hidden md:flex (در موبایل مخفی، در دسکتاپ نمایش)
    <aside className="hidden md:flex fixed right-0 top-0 z-40 h-screen w-64 flex-col border-l border-zinc-800 bg-black text-white">
      
      {/* بخش لوگو */}
      <div className="flex h-20 items-center justify-center border-b border-zinc-800 bg-zinc-950/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image 
              src="/favicon.svg" 
              alt="Alpha Systems Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-wide text-white">
              آلفا <span className="text-emerald-500">سیستم</span>
            </h1>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Alpha Systems Inc.</span>
          </div>
        </div>
      </div>

      {/* لینک‌های منو */}
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                isActive 
                  ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* فوتر / خروج */}
      <div className="absolute bottom-4 left-0 w-full px-4">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition-all hover:bg-red-950/30 hover:text-red-300"
        >
          <LogOut size={20} />
          <span className="font-medium">خروج از سیستم</span>
        </button>
      </div>
    </aside>
  );
}