"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, Trash2, HardDrive, ImageOff, AlertTriangle, X } from "lucide-react";
import { Donut } from "@/components/admin/Charts";

type Storage = { used: number; limit: number; percent: number };

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function WorkAdminPage() {
  const [images, setImages] = useState<string[]>([]);
  const [storage, setStorage] = useState<Storage | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/workimages");
      const data = await res.json();
      setImages(data.images ?? []);
      setStorage(data.storage ?? null);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(load, 0);
    return () => clearTimeout(id);
  }, []);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMessage(null);
    setUploading(true);

    const form = new FormData();
    Array.from(files).forEach((f) => form.append("files", f));

    try {
      const res = await fetch("/api/admin/workimages", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        // 413 = storage limit exceeded
        setMessage({ type: "error", text: data.detail || data.error || "Upload failed." });
        if (data.storage) setStorage(data.storage);
      } else {
        setMessage({ type: "success", text: `Uploaded ${data.saved?.length ?? 0} image(s).` });
        await load();
      }
    } catch {
      setMessage({ type: "error", text: "Upload failed. Please try again." });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async (name: string) => {
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/workimages?name=${encodeURIComponent(name)}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setConfirmDelete(null);
      await load();
      setMessage({ type: "success", text: "Image deleted." });
    } catch {
      setMessage({ type: "error", text: "Failed to delete image." });
    }
  };

  const near = (storage?.percent ?? 0) >= 90;

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-[30px] font-bold text-[#0D0D0D] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          Work Images
        </h1>
        <p className="text-black/40 text-[14px] mt-1">Upload and manage the images shown on your Work page.</p>
      </div>

      {/* Storage + upload */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-[15px] font-bold text-[#0D0D0D] mb-4 flex items-center gap-2 self-start">
            <HardDrive size={15} className="text-black/40" /> Storage Usage
          </h2>
          <Donut
            percent={storage?.percent ?? 0}
            label={`${(storage?.percent ?? 0).toFixed(0)}%`}
            sub={storage ? formatBytes(storage.used) : "—"}
          />
          <p className="text-[12px] text-black/40 mt-4">
            {storage ? `${formatBytes(storage.used)} of 5 GB used` : "Loading…"}
          </p>
          {near && (
            <div className="mt-3 flex items-center gap-2 text-[12px] text-red-600 font-medium">
              <AlertTriangle size={13} /> Nearly full
            </div>
          )}
        </div>

        {/* Upload area */}
        <div className="lg:col-span-2 bg-white border border-black/[0.06] rounded-2xl p-6">
          <h2 className="text-[15px] font-bold text-[#0D0D0D] mb-4">Upload Images</h2>
          <div
            onClick={() => !uploading && inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl h-[180px] flex flex-col items-center justify-center cursor-pointer transition-all ${
              uploading ? "border-[#C9A84C]/40 bg-[#C9A84C]/05 cursor-wait" : "border-black/[0.12] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/[0.03]"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/12 border border-[#C9A84C]/25 flex items-center justify-center mb-3">
              <Upload size={20} className="text-[#8B6914]" />
            </div>
            <p className="text-[14px] font-semibold text-[#0D0D0D]">
              {uploading ? "Uploading…" : "Click or drag images here"}
            </p>
            <p className="text-[12px] text-black/35 mt-1">JPG, PNG, WEBP, GIF, AVIF — max 5 GB total</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {message && (
            <div
              className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-[13px] font-medium ${
                message.type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {message.type === "error" && <AlertTriangle size={15} className="mt-0.5 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white border border-black/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-bold text-[#0D0D0D]">Gallery</h2>
          <span className="text-[13px] text-black/40">{images.length} image{images.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-black/[0.04] animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
              <ImageOff size={26} className="text-[#C9A84C]/60" />
            </div>
            <p className="text-black/40 text-[14px]">No images yet. Upload some above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img) => (
              <div key={img} className="relative aspect-square rounded-xl overflow-hidden group bg-black/[0.04] border border-black/[0.06]">
                <Image
                  src={`/workimage/${encodeURIComponent(img)}`}
                  alt={img}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <button
                    onClick={() => setConfirmDelete(img)}
                    className="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[17px] font-bold text-[#0D0D0D]">Delete image?</h3>
              <button onClick={() => setConfirmDelete(null)} className="text-black/30 hover:text-black">
                <X size={18} />
              </button>
            </div>
            <p className="text-[14px] text-black/50 mb-6">This will permanently remove the image from your Work page. This can&apos;t be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3 rounded-xl text-[14px] font-semibold text-black/60 border border-black/[0.1] hover:bg-black/[0.03] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-3 rounded-xl text-[14px] font-semibold text-white bg-red-600 hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
