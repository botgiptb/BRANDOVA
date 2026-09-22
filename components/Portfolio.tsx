"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/workimages")
      .then((r) => r.json())
      .then((data) => setImages((data.images ?? []).slice(0, 6)));
  }, []);

  return (
    <section id="portfolio" ref={ref} className="py-32 bg-[#F5F0E8] relative overflow-hidden">
      <div className="absolute bottom-0 left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/08 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse inline-block" />
              <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">Our Works</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Results that<br />speak for themselves.
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-black/40 text-[15px] leading-relaxed max-w-[260px]">
            A snapshot of campaigns that delivered real, measurable growth.
          </motion.p>
        </div>

        {/* Grid — shows up to 6 images from the folder */}
        {images.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {images.map((img, i) => (
              <motion.div key={img}
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="bg-white border border-black/[0.06] hover:border-black/[0.14] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/[0.08]">
                <div className="h-[260px] relative overflow-hidden">
                  <Image
                    src={`/workimage/${encodeURIComponent(img)}`}
                    alt={img}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={15} className="text-black" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty state — shown while loading or if folder is empty */
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#C9A84C] text-lg">✦</span>
                  </div>
                  <p className="text-[13px] text-black/30">Coming soon</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-black/[0.06]">
          <p className="text-black/30 text-[14px]">
            {images.length > 0 ? `Showing ${images.length} of many projects` : "Upload images to the Work Images folder to display them here"}
          </p>
          <Link href="/work"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white bg-[#0D0D0D] hover:bg-[#C9A84C] rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#C9A84C]/30 hover:-translate-y-0.5 group">
            View All Works
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
