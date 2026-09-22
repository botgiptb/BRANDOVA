"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroDashboard from "./HeroDashboard";

const clients = Array(20).fill("Brandova");

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[72px] bg-[#FAFAF7]">

      {/* Background orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[#C9A84C]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[450px] h-[450px] rounded-full bg-[#F5F0E8]/80 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#E8C97A]/05 blur-[180px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.6) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse inline-block" />
              <span className="text-[12px] font-semibold text-[#8B6914] uppercase tracking-widest">Award-Winning Digital Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[52px] md:text-[64px] lg:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] mb-6 text-[#0D0D0D]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              We Build Brands<br />
              <span style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                That Win.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
              className="text-[16px] md:text-[18px] text-black/50 leading-[1.8] max-w-[480px] mb-10">
              Brandova is a full-service digital marketing agency that turns ambitious brands into market leaders through strategy, creativity, and data.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap items-center gap-4 mb-14">
              <a href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-[#0D0D0D] hover:bg-[#C9A84C] rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#C9A84C]/30 hover:-translate-y-0.5">
                Start a Project <ArrowRight size={16} />
              </a>
              <a href="#portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium text-black/60 hover:text-black border border-black/[0.12] hover:border-black/30 rounded-lg transition-all duration-200 hover:bg-black/[0.03]">
                View Our Work
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.3 }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-black/[0.08]">
              {[
                { n: "500+", l: "Projects"   },
                { n: "98%",  l: "Retention"  },
                { n: "12×",  l: "Avg ROI"    },
                { n: "2yr",  l: "Experience" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-[26px] font-bold text-[#0D0D0D] tracking-tight leading-none mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
                  <div className="text-[12px] text-black/35">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center justify-end">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-black/[0.06] py-4 overflow-hidden bg-[#F5F0E8]">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {clients.map((c, i) => (
            <span key={i} className="text-[11px] font-bold text-black/20 tracking-[0.25em] uppercase mx-10 shrink-0">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
