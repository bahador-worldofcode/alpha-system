"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, Settings } from "lucide-react";

const navItems = [
  { name: 'داشبورد', icon: LayoutDashboard, path: '/' },
  { name: 'کارمندان', icon: Users, path: '/employees' },
  { name: 'پروژه‌ها', icon: FolderKanban, path: '/projects' },
  { name: 'تنظیمات', icon: Settings, path: '/settings' },
];

export default function MobileNav() {
  const pathname = usePathname();
  
  // در صفحه لاگین نشان نده
  if (pathname === '/login') return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 transition-all ${
                isActive 
                  ? "text-emerald-500 bg-emerald-500/10" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}