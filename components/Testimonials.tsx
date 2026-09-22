"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { quote: "Brandova completely transformed our online presence. Within 6 months, our organic traffic tripled and revenue doubled. They're not just an agency — they're a true growth partner.", name: "Ajmal",  role: "Founder, GI Hostings",          initials: "AJ", metric: "+200% Revenue" },
  { quote: "The SEO results were beyond anything we expected. We went from page 5 to #1 for our main keywords in under 4 months. The team is brilliant and incredibly responsive.",            name: "Nizam",  role: "CEO, Botgi Empire of Laptop", initials: "NI", metric: "+890% Traffic" },
  { quote: "Our paid ad campaigns now run at 12× ROAS consistently. Brandova's data-driven approach and creative excellence is unmatched. Best investment we've ever made.",                   name: "Sumesh", role: "Manager, GI Power Solar",      initials: "SU", metric: "12× ROAS"      },
  { quote: "From brand identity to full-stack digital marketing, Brandova delivered on every front. Our conversion rate went up 220% in the first quarter alone.",                             name: "Sideek", role: "CEO, Botgi Automation",        initials: "SI", metric: "+220% CVR"     },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section id="testimonials" ref={ref} className="py-32 bg-[#FAFAF7] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/06 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
            <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">Testimonials</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D]"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Clients love us.
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="max-w-[800px] mx-auto">
          <div className="bg-white border border-black/[0.06] rounded-2xl p-10 md:p-14 relative overflow-hidden shadow-lg shadow-black/[0.04]">
            <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#C9A84C]/06 blur-[80px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/20 mb-8">
              <span className="text-[15px] font-bold text-[#8B6914]" style={{ fontFamily: "'Syne', sans-serif" }}>{t.metric}</span>
            </div>

            <motion.blockquote key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
              className="text-[19px] md:text-[22px] text-black/65 leading-[1.65] font-light mb-10 tracking-tight">
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>

            <div className="flex items-center justify-between">
              <motion.div key={`a-${idx}`} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[14px] text-white"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#0D0D0D]">{t.name}</div>
                  <div className="text-[13px] text-black/35">{t.role}</div>
                </div>
              </motion.div>

              <div className="flex items-center gap-2">
                <button onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-xl bg-[#F5F0E8] border border-black/[0.08] hover:border-[#C9A84C]/40 flex items-center justify-center text-black/40 hover:text-black transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-xl bg-[#F5F0E8] border border-black/[0.08] hover:border-[#C9A84C]/40 flex items-center justify-center text-black/40 hover:text-black transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-[#C9A84C]" : "w-4 bg-black/15"}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
