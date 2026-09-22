"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BarChart3, Globe, Award, Rocket } from "lucide-react";

const perks = [
  "Data-driven strategies with proven ROI",
  "Dedicated account manager for every client",
  "Transparent reporting & real-time dashboards",
  "Agile team that moves at startup speed",
  "Full-funnel marketing expertise",
  "No long-term lock-in contracts",
];

const floatingCards = [
  { icon: BarChart3, label: "Traffic Up",   value: "+890%",        color: "#C9A84C", pos: "top-4 left-4"     },
  { icon: Globe,     label: "Global Reach", value: "50+ Countries", color: "#0D0D0D", pos: "top-4 right-4"    },
  { icon: Award,     label: "Top Agency",   value: "Clutch 2024",   color: "#C9A84C", pos: "bottom-4 left-4"  },
  { icon: Rocket,    label: "Campaigns",    value: "500+ Live",     color: "#0D0D0D", pos: "bottom-4 right-4" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-32 bg-[#F5F0E8] relative overflow-hidden">
      <div className="absolute top-0 right-[-80px] w-[500px] h-[500px] rounded-full bg-[#C9A84C]/08 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative">

            <div className="bg-white border border-black/[0.07] rounded-2xl p-10 relative overflow-hidden shadow-lg shadow-black/[0.04]">
              <div className="relative">
                <div className="text-[80px] font-bold leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg,#C9A84C,#E8C97A,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  8+
                </div>
                <div className="text-black/45 text-[15px] font-medium mb-8">Years dominating digital marketing</div>
                <div className="w-full h-px bg-black/[0.06] mb-8" />

                <div className="grid grid-cols-2 gap-5">
                  {[
                    { n: "500+",  l: "Clients Served",    bar: 85 },
                    { n: "98%",   l: "Retention Rate",    bar: 98 },
                    { n: "$50M+", l: "Revenue Generated", bar: 70 },
                    { n: "12×",   l: "Average ROI",       bar: 92 },
                  ].map((s, i) => (
                    <div key={s.l}>
                      <div className="text-[24px] font-bold text-[#0D0D0D] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
                      <div className="text-[12px] text-black/35 mb-2">{s.l}</div>
                      <div className="h-1 rounded-full bg-black/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${s.bar}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#C9A84C]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {floatingCards.map((c, i) => (
              <motion.div key={c.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 150 }}
                className={`absolute ${c.pos} bg-white border border-black/[0.08] rounded-xl px-3 py-2.5 shadow-lg flex items-center gap-2.5`}
                style={{ animation: `float ${4 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: c.color === "#C9A84C" ? "#C9A84C15" : "#0D0D0D08", border: `1px solid ${c.color}25` }}>
                  <c.icon size={13} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="text-[10px] text-black/35 leading-none mb-0.5">{c.label}</div>
                  <div className="text-[12px] font-bold text-[#0D0D0D] leading-none">{c.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-6">
              <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">About Brandova</span>
            </div>
            <h2 className="text-[42px] md:text-[50px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D] mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              We don&apos;t just market.<br />
              <span style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                We grow businesses.
              </span>
            </h2>
            <p className="text-black/45 text-[15px] leading-[1.85] mb-8">
              Brandova is a full-service digital marketing agency built for brands that refuse to be average. We combine creative brilliance with analytical precision to deliver campaigns that generate real, measurable business growth.
            </p>

            <div className="space-y-3 mb-10">
              {perks.map((p, i) => (
                <motion.div key={p}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  </div>
                  <span className="text-[14px] text-black/55 group-hover:text-black/80 transition-colors">{p}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-[#0D0D0D] hover:bg-[#C9A84C] rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#C9A84C]/30 hover:-translate-y-0.5">
              Work With Us <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
