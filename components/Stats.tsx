"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { TrendingUp, Users, Zap, Award } from "lucide-react";

const results = [
  { icon: TrendingUp, value: 890,  suffix: "%", label: "Avg Traffic Increase",  sub: "across all SEO clients",      color: "#C9A84C" },
  { icon: Users,      value: 500,  suffix: "+", label: "Brands Scaled",         sub: "across 12+ industries",       color: "#0D0D0D" },
  { icon: Zap,        value: 12,   suffix: "×", label: "Average ROAS",          sub: "on paid media campaigns",     color: "#C9A84C" },
  { icon: Award,      value: 98,   suffix: "%", label: "Client Retention Rate", sub: "year over year",              color: "#0D0D0D" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, to, { duration: 2, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-[#F5F0E8] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#C9A84C]/08 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 mb-5">
            <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">Real Results</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D]"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Numbers that prove it.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {results.map((r, i) => (
            <motion.div key={r.label}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-black/[0.06] rounded-2xl p-7 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: r.color === "#C9A84C" ? "#C9A84C18" : "#0D0D0D08", border: `1px solid ${r.color}25` }}>
                <r.icon size={18} style={{ color: r.color }} />
              </div>
              <div className="text-[42px] font-bold tracking-tight leading-none mb-2 text-[#0D0D0D]"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                <Counter to={r.value} suffix={r.suffix} />
              </div>
              <div className="text-[14px] font-semibold text-[#0D0D0D] mb-1">{r.label}</div>
              <div className="text-[12px] text-black/35">{r.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
