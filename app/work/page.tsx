"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ArrowRight, Grid3X3, LayoutGrid, ImageOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type LightboxState = { images: string[]; index: number } | null;

export default function WorkPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    fetch("/api/workimages")
      .then((r) => r.json())
      .then((data) => {
        setImages(data.images ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((lb) => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb);
  const next = () => setLightbox((lb) => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb);

  // keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <main className="min-h-screen bg-[#FAFAF7] relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/06 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F0E8] blur-[120px] pointer-events-none" />

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 group-hover:bg-[#C9A84C]/20 transition-colors">
              <ArrowLeft size={14} className="text-[#8B6914] group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-[13px] font-medium text-black/40 group-hover:text-black/70 transition-colors">Back to Home</span>
          </Link>
          <img src="/brandova.png" alt="Brandova" className="h-8 w-auto object-contain" />
          <Link href="/#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-[#0D0D0D] hover:bg-[#C9A84C] rounded-lg transition-all duration-200">
            Start a Project <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ── HERO HEADER ── */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse inline-block" />
                <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">Our Portfolio</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-[1.0] text-[#0D0D0D] mb-5"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Work that<br />
                <span style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  speaks for itself.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-black/45 text-[16px] max-w-[500px] leading-relaxed">
                {loading ? "Loading creatives…" : images.length > 0
                  ? `${images.length} creatives — posters, social media, branding & more.`
                  : "Upload images to the Work Images folder to display them here."}
              </motion.p>
            </div>

            {/* Stats strip */}
            {!loading && images.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex gap-8 lg:gap-10 shrink-0">
                {[
                  { n: `${images.length}+`, l: "Creatives" },
                  { n: "100%",              l: "Delivered" },
                ].map((s) => (
                  <div key={s.l} className="text-center lg:text-right">
                    <div className="text-[32px] font-bold text-[#0D0D0D] leading-none tracking-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
                    <div className="text-[12px] text-black/35 mt-1">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 h-px bg-gradient-to-r from-[#C9A84C]/40 via-black/10 to-transparent origin-left" />
        </div>

        {/* ── TOOLBAR ── */}
        {!loading && images.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-8">
            <p className="text-[13px] text-black/35">{images.length} images</p>
            <div className="flex items-center gap-1 bg-white border border-black/[0.08] rounded-xl p-1">
              <button onClick={() => setCompact(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${!compact ? "bg-[#0D0D0D] text-white" : "text-black/30 hover:text-black"}`}>
                <LayoutGrid size={14} />
              </button>
              <button onClick={() => setCompact(true)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${compact ? "bg-[#0D0D0D] text-white" : "text-black/30 hover:text-black"}`}>
                <Grid3X3 size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── GALLERY ── */}
        {loading ? (
          /* Skeleton */
          <div className={`grid gap-3 ${compact ? "grid-cols-4 md:grid-cols-6 lg:grid-cols-8" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-[#F5F0E8] border border-black/[0.05] animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-6">
              <ImageOff size={32} className="text-[#C9A84C]/60" />
            </div>
            <h3 className="text-[22px] font-bold text-[#0D0D0D] mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              No images yet
            </h3>
            <p className="text-black/40 text-[15px] max-w-sm leading-relaxed">
              Add images to the <span className="font-semibold text-black/60">public/workimage</span> folder and they will automatically appear here.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className={`grid gap-3 ${compact ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
            {images.map((img, i) => (
              <motion.div key={img}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.01, 0.3) }}
                onClick={() => openLightbox(i)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-[#F5F0E8] border border-black/[0.06] hover:border-[#C9A84C]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.08]">
                <Image
                  src={`/workimage/${encodeURIComponent(img)}`}
                  alt={img}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] font-bold text-black">
                    {i + 1}/{images.length}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── CTA BANNER ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-24 relative overflow-hidden rounded-2xl bg-[#0D0D0D] p-12 md:p-16">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/12 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-[#C9A84C]/06 blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 mb-5">
                <span className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-widest">Let&apos;s Work Together</span>
              </div>
              <h2 className="text-[34px] md:text-[46px] font-bold tracking-[-0.03em] text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Ready to be our next<br />
                <span style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  success story?
                </span>
              </h2>
              <p className="text-white/40 text-[15px] max-w-md">Let&apos;s build creatives that get real results for your brand.</p>
            </div>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-[15px] font-semibold text-white bg-[#C9A84C] hover:bg-[#E8C97A] rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#C9A84C]/30 hover:-translate-y-0.5 shrink-0">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-[13px] text-black/25">© 2025 Brandova Agency · All rights reserved.</p>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(13,13,13,0.96)" }}
            onClick={closeLightbox}>

            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 border-b border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                <span className="text-[13px] font-semibold text-white">Brandova Works</span>
                <span className="text-[12px] text-white/30">{lightbox.index + 1} / {lightbox.images.length}</span>
              </div>
              <button onClick={closeLightbox}
                className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-11 h-11 rounded-xl bg-white/[0.06] hover:bg-[#C9A84C] flex items-center justify-center text-white/60 hover:text-white transition-all z-10">
              <ChevronLeft size={20} />
            </button>

            <motion.div key={lightbox.index} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-20 mt-16"
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={`/workimage/${encodeURIComponent(lightbox.images[lightbox.index])}`}
                alt="work"
                width={1200}
                height={900}
                className="object-contain max-h-[80vh] w-full rounded-xl"
              />
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-11 h-11 rounded-xl bg-white/[0.06] hover:bg-[#C9A84C] flex items-center justify-center text-white/60 hover:text-white transition-all z-10">
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-6 inset-x-0 flex justify-center gap-1.5 px-6"
              onClick={(e) => e.stopPropagation()}>
              {lightbox.images.length <= 20
                ? lightbox.images.map((_, i) => (
                    <button key={i} onClick={() => setLightbox((lb) => lb ? { ...lb, index: i } : lb)}
                      className={`h-1 rounded-full transition-all duration-300 ${i === lightbox.index ? "w-6 bg-[#C9A84C]" : "w-1.5 bg-white/20"}`} />
                  ))
                : <span className="text-[12px] text-white/30">{lightbox.index + 1} of {lightbox.images.length}</span>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
