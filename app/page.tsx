import { supabase } from "@/lib/supabase";
import { Users, DollarSign, Activity, Briefcase } from "lucide-react";
import SalaryChart from "@/components/dashboard/SalaryChart";
import ProjectChart from "@/components/dashboard/ProjectChart";

export const revalidate = 0;

export default async function Home() {
  // 1. دریافت اطلاعات کارمندان
  const { data: employees } = await supabase
    .from("employees")
    .select("*")
    .order("id", { ascending: false }); // برای لیست فعالیت‌های اخیر

  // 2. دریافت اطلاعات پروژه‌ها
  const { data: projects } = await supabase
    .from("projects")
    .select("*");

  if (!employees || !projects) {
    return <div>خطا در دریافت اطلاعات</div>;
  }

  // --- محاسبات کارمندان ---
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'فعال').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  
  // داده برای نمودار ستونی (۵ نفر آخر برای شلوغ نشدن)
  const salaryChartData = employees.slice(0, 10).map(e => ({
    last_name: e.last_name,
    salary: e.salary
  }));

  // --- محاسبات پروژه‌ها ---
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  
  // داده برای نمودار دایره‌ای
  const projectStatusData = [
    { name: 'در حال انجام', value: projects.filter(p => p.status === 'in_progress').length },
    { name: 'تکمیل شده', value: projects.filter(p => p.status === 'done').length },
    { name: 'برای انجام', value: projects.filter(p => p.status === 'todo').length },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* تیتر */}
      <div>
        <h1 className="text-3xl font-bold text-white">داشبورد مدیریتی</h1>
        <p className="text-zinc-400 mt-2">خلاصه وضعیت سازمان و منابع انسانی</p>
      </div>

      {/* کارت‌های آمار (Stats Grid) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* کارت 1: کل پرسنل */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">کل پرسنل</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{totalEmployees} نفر</h3>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-500">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* کارت 2: بودجه پروژه‌ها (جدید) */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">بودجه پروژه‌ها</p>
              <h3 className="mt-2 text-xl font-bold text-white">
                {new Intl.NumberFormat('fa-IR').format(totalBudget / 1000000)} <span className="text-sm font-normal">میلیون</span>
              </h3>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-500">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* کارت 3: پرداختی حقوق */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">حقوق ماهانه</p>
              <h3 className="mt-2 text-xl font-bold text-white">
                {new Intl.NumberFormat('fa-IR').format(totalSalary / 1000000)} <span className="text-sm font-normal">میلیون</span>
              </h3>
            </div>
            <div className="rounded-lg bg-yellow-500/10 p-3 text-yellow-500">
              <Activity size={24} />
            </div>
          </div>
        </div>

        {/* کارت 4: کل پروژه‌ها (واقعی شده) */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">پروژه‌های فعال</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{totalProjects} پروژه</h3>
            </div>
            <div className="rounded-lg bg-purple-500/10 p-3 text-purple-500">
              <Briefcase size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* بخش نمودارها */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* ستون چپ: نمودار حقوق */}
        <div className="col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">تحلیل حقوق پرداختی</h3>
          <SalaryChart data={salaryChartData} />
        </div>

        {/* ستون راست: نمودار وضعیت پروژه‌ها (جدید) */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">وضعیت پروژه‌ها</h3>
          {/* اگر پروژه‌ای نباشد پیام می‌دهد */}
          {totalProjects > 0 ? (
            <ProjectChart data={projectStatusData} />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-zinc-500 text-sm">
              داده‌ای برای نمایش نیست
            </div>
          )}
        </div>
      </div>

      {/* لیست آخرین استخدام‌ها (واقعی شده) */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">آخرین استخدام‌ها</h3>
        <div className="space-y-4">
          {employees.slice(0, 4).map((emp) => (
            <div key={emp.id} className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <img src={emp.image} alt="avatar" className="h-8 w-8 rounded-full bg-zinc-800" />
                <div>
                  <p className="text-sm font-medium text-white">{emp.first_name} {emp.last_name}</p>
                  <p className="text-xs text-zinc-500">{emp.role}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-500">
                {new Date(emp.created_at).toLocaleDateString('fa-IR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}