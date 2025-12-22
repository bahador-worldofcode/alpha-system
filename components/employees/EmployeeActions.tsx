"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Loader2, Edit, X, UploadCloud, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Employee } from "@/types"; 

export default function EmployeeActions({ employee }: { employee: Employee }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  // استیت فرم ویرایش
  const [formData, setFormData] = useState({
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    role: employee.role,
    salary: employee.salary, // اینجا عدده
    status: employee.status,
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(employee.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let newImageUrl = employee.image;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        toast.error("خطا در آپلود تصویر جدید!");
        setIsLoading(false);
        return;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      newImageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("employees")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: formData.role,
        salary: Number(formData.salary), // اطمینان از ارسال عدد
        status: formData.status, 
        image: newImageUrl,
      })
      .eq("id", employee.id);

    setIsLoading(false);

    if (error) {
      console.error(error);
      toast.error("خطا در ویرایش اطلاعات.");
    } else {
      setIsEditOpen(false);
      router.refresh();
      toast.success("اطلاعات کارمند با موفقیت بروزرسانی شد 🔄");
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("آیا مطمئن هستید که می‌خواهید این کارمند را حذف کنید؟");
    if (!isConfirmed) return;

    setIsLoading(true);
    const { error } = await supabase.from("employees").delete().eq("id", employee.id);

    if (error) {
      toast.error("مشکلی پیش آمد! حذف نشد.");
    } else {
      router.refresh();
      toast.success("کارمند حذف شد 🗑️", { style: { border: '1px solid #ef4444', color: '#f87171' } });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        <button 
          onClick={() => setIsEditOpen(true)}
          className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors" 
          title="ویرایش"
        >
          <Edit size={18} />
        </button>

        <button 
          onClick={handleDelete}
          disabled={isLoading}
          className="rounded-md p-2 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors disabled:opacity-50"
          title="حذف پرسنل"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 text-right">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white">ویرایش اطلاعات پرسنلی</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-700 bg-zinc-900 transition-colors hover:border-emerald-500 hover:bg-zinc-800"
                >
                  <img src={previewUrl || ""} alt="Preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <UploadCloud className="text-white" size={24} />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <p className="text-xs text-zinc-500">برای تغییر عکس کلیک کنید</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">نام</label>
                  <input required type="text" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                    value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">نام خانوادگی</label>
                  <input required type="text" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                    value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-400">ایمیل</label>
                <input required type="email" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">سمت شغلی</label>
                  <input required type="text" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                    value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">حقوق (تومان)</label>
                  {/* تغییر مهم: اضافه کردن Number() برای رفع خطا */}
                  <input required type="number" className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                    value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-400">وضعیت</label>
                <select 
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="فعال">فعال</option>
                  <option value="غیرفعال">غیرفعال</option>
                  <option value="مرخصی">مرخصی</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setIsEditOpen(false)} className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white">لغو</button>
                <button type="submit" disabled={isLoading} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50 shadow-lg shadow-emerald-500/20">
                  {isLoading ? <><Loader2 size={18} className="animate-spin" /> در حال ذخیره...</> : <><Save size={18} /> ذخیره تغییرات</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}