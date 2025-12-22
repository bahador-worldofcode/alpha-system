"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, X, Loader2, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ایمپورت‌های تقویم فارسی
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"; // تم تاریک

export default function AddProjectBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    deadline: "", // اینجا تاریخ شمسی ذخیره میشه
    budget: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // اعتبارسنجی دستی برای تاریخ (چون کامپوننت دیت پیکر required استاندارد نداره)
    if (!formData.deadline) {
      toast.error("لطفاً تاریخ تحویل پروژه را مشخص کنید");
      return;
    }

    setIsLoading(true);

    const tagsArray = formData.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const { error } = await supabase.from("projects").insert([
      {
        title: formData.title,
        client: formData.client,
        deadline: formData.deadline, // ذخیره به صورت رشته شمسی (مثلا: 1403/10/02)
        budget: Number(formData.budget),
        status: "todo",
        tags: tagsArray,
      },
    ]);

    setIsLoading(false);

    if (error) {
      console.error(error);
      toast.error("خطا در ایجاد پروژه!");
    } else {
      setIsOpen(false);
      setFormData({ title: "", client: "", deadline: "", budget: "", tags: "" });
      router.refresh();
      toast.success("پروژه جدید با موفقیت تعریف شد 📂");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
      >
        <Plus size={18} />
        پروژه جدید
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl overflow-visible">
            <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white">تعریف پروژه جدید</h2>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">عنوان پروژه</label>
                <input
                  required
                  placeholder="مثلا: طراحی اپلیکیشن اندروید"
                  type="text"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">نام کارفرما</label>
                  <input
                    required
                    placeholder="مثلا: شرکت X"
                    type="text"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-all"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>
                
                {/* بخش تقویم فارسی */}
                <div className="flex flex-col">
                  <label className="mb-1 block text-sm text-zinc-400">تاریخ تحویل (ددلاین)</label>
                  <div className="relative w-full">
                    <DatePicker
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      value={formData.deadline}
                      onChange={(date) => {
                        // تبدیل تاریخ انتخاب شده به متن
                        setFormData({ ...formData, deadline: date?.toString() || "" });
                      }}
                      containerClassName="w-full"
                      inputClass="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-all cursor-pointer font-mono"
                      placeholder="۱۴۰۳/xx/xx"
                      className="bg-dark" // کلاس تم تاریک
                    />
                    <CalendarDays className="absolute left-3 top-2.5 text-zinc-500 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">بودجه (تومان)</label>
                  <input
                    required
                    type="number"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-all"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">تکنولوژی‌ها (با ویرگول)</label>
                  <input
                    placeholder="React, Node.js, ..."
                    type="text"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-all"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      در حال ساخت...
                    </>
                  ) : (
                    "ایجاد پروژه"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}