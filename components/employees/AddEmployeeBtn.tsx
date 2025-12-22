"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, X, Loader2, UploadCloud, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddEmployeeBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null); // ذخیره فایل انتخاب شده
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // پیش‌نمایش عکس
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    salary: "",
  });

  // هندل کردن انتخاب فایل
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // ساخت لینک موقت برای نمایش
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let avatarUrl = "";

    // 1. اگر عکسی انتخاب شده بود، آپلود کن
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`; // اسم رندوم برای جلوگیری از تکرار
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars') // اسم باکتی که ساختی
        .upload(filePath, file);

      if (uploadError) {
        toast.error("خطا در آپلود عکس!");
        console.error(uploadError);
        setIsLoading(false);
        return;
      }

      // گرفتن لینک عمومی عکس
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      avatarUrl = data.publicUrl;
    } else {
      // اگر عکسی انتخاب نکرد، همون آواتار رندوم رو بذار
      avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.first_name}${formData.last_name}`;
    }

    // 2. ارسال اطلاعات به دیتابیس
    const { error } = await supabase.from("employees").insert([
      {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: formData.role,
        salary: Number(formData.salary),
        status: "فعال",
        image: avatarUrl, // ذخیره لینک عکس (چه آپلودی، چه رندوم)
      },
    ]);

    setIsLoading(false);

    if (error) {
      console.error(error);
      toast.error("خطا در ثبت اطلاعات!");
    } else {
      setIsOpen(false);
      setFormData({ first_name: "", last_name: "", email: "", role: "", salary: "" });
      setFile(null);
      setPreviewUrl(null);
      router.refresh();
      toast.success("کارمند با تصویر پروفایل جدید استخدام شد 📸");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
      >
        <Plus size={18} />
        افزودن کارمند جدید
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white">پرونده پرسنلی جدید</h2>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* بخش آپلود عکس */}
              <div className="flex flex-col items-center gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-700 bg-zinc-900 transition-colors hover:border-blue-500 hover:bg-zinc-800"
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <UploadCloud className="text-zinc-500" size={32} />
                  )}
                </div>
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {previewUrl ? "تغییر تصویر پروفایل" : "آپلود تصویر پروفایل"}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">نام</label>
                  <input required type="text" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                    value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">نام خانوادگی</label>
                  <input required type="text" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                    value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-400">آدرس ایمیل</label>
                <input required type="email" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">سمت شغلی</label>
                  <input required placeholder="مثلا: برنامه نویس" type="text" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                    value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">حقوق (تومان)</label>
                  <input required type="number" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                    value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white">انصراف</button>
                <button type="submit" disabled={isLoading} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-500/20">
                  {isLoading ? <><Loader2 size={18} className="animate-spin" /> در حال آپلود...</> : "استخدام و ذخیره"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}