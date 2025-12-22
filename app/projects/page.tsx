"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types";
import { Clock, MoreHorizontal, Search, Filter, Loader2, Briefcase } from "lucide-react";
import AddProjectBtn from "@/components/projects/AddProjectBtn";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // دریافت پروژه‌ها
  const fetchProjects = async () => {
    setLoading(true);
    
    let query = supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    // اعمال جستجو (در عنوان پروژه یا نام کارفرما)
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,client.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (data) setProjects(data as Project[]);
    setLoading(false);
  };

  // هر وقت سرچ تغییر کرد، دوباره بگیر
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // تابع کمکی برای جدا کردن پروژه‌ها بر اساس وضعیت
  const getProjectsByStatus = (status: string) => 
    projects.filter((p) => p.status === status);

  // کامپوننت کارت پروژه
  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm hover:border-zinc-700 transition-all cursor-pointer group animate-in zoom-in duration-300">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-400 border border-blue-500/20">
          {project.client}
        </span>
        <button className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <h3 className="mt-3 font-bold text-white text-sm">{project.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags?.map((tag) => (
          <span key={tag} className="text-[10px] text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <Clock size={14} />
          <span>{project.deadline}</span>
        </div>
        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded">
          {new Intl.NumberFormat('fa-IR').format(project.budget / 1000000)} M
        </span>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* هدر صفحه و جستجو */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">مدیریت پروژه‌ها</h1>
          <p className="text-zinc-400 text-sm mt-1">نمای برد کانبان (Kanban Board)</p>
        </div>
        <AddProjectBtn />
      </div>

      {/* نوار ابزار جستجو */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input 
            type="text" 
            placeholder="جستجو در نام پروژه یا کارفرما..." 
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-10 pl-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* محتوای اصلی */}
      {loading ? (
        <div className="flex h-64 w-full items-center justify-center text-blue-500">
          <Loader2 size={40} className="animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-zinc-500 gap-4">
           <div className="rounded-full bg-zinc-900 p-4">
             <Briefcase size={32} className="opacity-50" />
           </div>
           <p>پروژه‌ای با این مشخصات یافت نشد.</p>
        </div>
      ) : (
        /* ستون‌های کانبان */
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3 overflow-y-auto pb-10">
          
          {/* ستون 1: برای انجام */}
          <div className="flex flex-col h-fit rounded-2xl bg-zinc-900/30 p-4 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <div className="mb-4 flex items-center justify-between px-1">
              <h3 className="font-bold text-zinc-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zinc-500"></span>
                برای انجام
              </h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs text-white">
                {getProjectsByStatus('todo').length}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {getProjectsByStatus('todo').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* ستون 2: در حال انجام */}
          <div className="flex flex-col h-fit rounded-2xl bg-zinc-900/30 p-4 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <div className="mb-4 flex items-center justify-between px-1">
              <h3 className="font-bold text-blue-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                در حال انجام
              </h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">
                {getProjectsByStatus('in_progress').length}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {getProjectsByStatus('in_progress').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* ستون 3: تکمیل شده */}
          <div className="flex flex-col h-fit rounded-2xl bg-zinc-900/30 p-4 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <div className="mb-4 flex items-center justify-between px-1">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                 <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                تکمیل شده
              </h3>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                {getProjectsByStatus('done').length}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {getProjectsByStatus('done').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}