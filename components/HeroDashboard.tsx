"use client";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const metrics = [
  { label: "Organic Traffic",  value: 84320,  delta: "+12.4%", color: "#C9A84C" },
  { label: "Conversion Rate",  value: 6.8,    delta: "+2.1%",  color: "#10b981", decimal: true },
  { label: "Ad Spend ROAS",    value: 12.3,   delta: "+0.8×",  color: "#0D0D0D", decimal: true },
  { label: "Revenue (MoM)",    value: 142500, delta: "+34%",   color: "#8B6914" },
];

function AnimatedBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  return (
    <motion.div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </motion.div>
  );
}

function SparkLine({ color }: { color: string }) {
  const points = [20, 35, 28, 45, 38, 55, 48, 62, 58, 72, 65, 80];
  const w = 80, h = 28;
  const min = Math.min(...points), max = Math.max(...points);
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={coords} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
    </svg>
  );
}

export default function HeroDashboard() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  useAnimationFrame((t) => {
    if (t - elapsed.current > 2000) { elapsed.current = t; setTick((n) => n + 1); }
  });

  const live = metrics.map((m, i) => ({
    ...m,
    display: mounted
      ? m.decimal
        ? (m.value + Math.sin(tick * 0.3 + i) * 0.2).toFixed(1)
        : String(Math.round(m.value + Math.sin(tick * 0.2 + i) * m.value * 0.005)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : m.decimal ? m.value.toFixed(1) : String(m.value).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-[420px] mx-auto lg:mx-0"
    >
      <div className="absolute inset-0 rounded-2xl bg-[#C9A84C]/15 blur-[60px] scale-95 pointer-events-none" />

      <div className="relative bg-white border border-black/[0.08] rounded-2xl overflow-hidden shadow-xl shadow-black/[0.08]">

        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-semibold text-black/50">Live Dashboard</span>
          </div>
          <span className="text-[11px] text-black/25 font-mono">brandova.io/analytics</span>
        </div>

        <div className="p-5 space-y-4">
          {live.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] text-black/45 font-medium">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-600">{m.delta}</span>
                  <span className="text-[13px] font-bold text-black font-mono">{m.display}</span>
                </div>
              </div>
              <AnimatedBar pct={40 + i * 15} color={m.color} delay={1.1 + i * 0.1} />
            </motion.div>
          ))}
        </div>

        <div className="px-5 pb-5 grid grid-cols-2 gap-3">
          {[
            { label: "SEO Growth",   color: "#C9A84C" },
            { label: "Paid ROI",     color: "#0D0D0D" },
            { label: "Social Reach", color: "#10b981" },
            { label: "Email Opens",  color: "#8B6914" },
          ].map((c, i) => (
            <motion.div key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.08 }}
              className="bg-[#F5F0E8] border border-black/[0.05] rounded-xl p-3"
            >
              <div className="text-[11px] text-black/35 mb-2">{c.label}</div>
              <SparkLine color={c.color} />
            </motion.div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-[11px] text-black/25">Updated just now</span>
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#C9A84C]/60" />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 2.0, type: "spring", stiffness: 120 }}
        style={{ animation: "float 4s ease-in-out infinite", animationDelay: "2s" }}
        className="absolute -bottom-5 -left-6 bg-white border border-black/[0.08] rounded-xl px-4 py-3 shadow-xl flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
          <span className="text-emerald-600 text-[12px]">↑</span>
        </div>
        <div>
          <div className="text-[12px] font-semibold text-black">New conversion!</div>
          <div className="text-[11px] text-black/35">$4,200 deal closed</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
        style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}
        className="absolute -top-4 -right-4 bg-[#0D0D0D] rounded-xl px-3 py-2 shadow-xl"
      >
        <div className="text-[11px] font-bold text-[#C9A84C]">12× ROAS</div>
      </motion.div>
    </motion.div>
  );
}
