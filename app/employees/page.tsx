"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Employee } from "@/types";
import AddEmployeeBtn from "@/components/employees/AddEmployeeBtn";
import EmployeeActions from "@/components/employees/EmployeeActions";
import { Search, Filter, Loader2, Users, Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { toast } from "sonner";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // دریافت داده‌ها
  const fetchEmployees = async () => {
    setLoading(true);
    let query = supabase.from("employees").select("*").order("id", { ascending: false });

    if (searchQuery) {
      query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,role.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (data) setEmployees(data as Employee[]);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // خروجی اکسل
  const handleExport = () => {
    if (employees.length === 0) {
      toast.error("داده‌ای برای خروجی وجود ندارد!");
      return;
    }

    const excelData = employees.map(emp => ({
      "شناسه": emp.id,
      "نام": emp.first_name,
      "نام خانوادگی": emp.last_name,
      "ایمیل": emp.email,
      "سمت": emp.role,
      "حقوق (تومان)": emp.salary,
      "وضعیت": emp.status,
      "تاریخ استخدام": new Date(emp.created_at).toLocaleDateString('fa-IR')
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "لیست کارمندان");
    XLSX.writeFile(workbook, "Alpha-Employees.xlsx");
    
    toast.success("فایل اکسل با موفقیت دانلود شد 📊");
  };

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">مدیریت کارمندان</h1>
          <p className="text-zinc-400 text-sm mt-1">لیست پرسنل و مدیریت دسترسی‌ها</p>
        </div>
        <AddEmployeeBtn />
      </div>

      {/* نوار ابزار (جستجو و اکسل) */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input 
            type="text" 
            placeholder="جستجو بر اساس نام، نام خانوادگی یا سمت..." 
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-10 pl-4 text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-emerald-600/10 px-4 py-2.5 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all"
          title="دانلود لیست اکسل"
        >
          <Download size={18} />
          <span className="hidden md:inline font-medium">خروجی اکسل</span>
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
          <Filter size={18} />
        </button>
      </div>

      {/* جدول نمایش داده‌ها */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-xl">
        <table className="w-full text-right text-sm text-zinc-400">
          <thead className="bg-zinc-950/50 text-xs uppercase text-zinc-500 font-medium">
            <tr>
              <th className="px-6 py-4">کارمند</th>
              <th className="px-6 py-4">سمت شغلی</th>
              <th className="px-6 py-4">وضعیت</th>
              <th className="px-6 py-4">حقوق ماهانه</th>
              <th className="px-6 py-4 text-left">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
               <tr>
                 <td colSpan={5} className="px-6 py-12 text-center">
                   <div className="flex flex-col items-center justify-center gap-2 text-emerald-500">
                     <Loader2 size={32} className="animate-spin" />
                     <span className="text-sm text-zinc-400">در حال دریافت اطلاعات...</span>
                   </div>
                 </td>
               </tr>
            ) : employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
                         <img src={employee.image} alt={employee.last_name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {employee.first_name} {employee.last_name}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">{employee.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    <span className="rounded-md bg-zinc-800/50 px-2 py-1 text-xs border border-zinc-700/50">
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        employee.status === "فعال"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : "border-red-500/20 bg-red-500/10 text-red-500"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${employee.status === "فعال" ? "bg-emerald-500" : "bg-red-500"}`}></span>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-lg font-bold text-white tracking-wide">
                        {new Intl.NumberFormat("fa-IR").format(employee.salary)}
                     </span>
                     <span className="mr-1 text-xs text-zinc-500">تومان</span>
                  </td>
                  <td className="px-6 py-4">
                    {/* اینجا تغییر اصلی انجام شد: کل آبجکت کارمند ارسال میشه */}
                    <EmployeeActions employee={employee} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                   <div className="flex flex-col items-center justify-center gap-3 text-zinc-500">
                     <div className="rounded-full bg-zinc-900 p-4">
                       <Users size={32} className="opacity-50" />
                     </div>
                     <p className="text-lg font-medium text-zinc-400">نتیجه‌ای یافت نشد!</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}