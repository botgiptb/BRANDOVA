"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Discovery",  desc: "We deep-dive into your brand, audience, and competitive landscape to uncover real opportunities." },
  { num: "02", title: "Strategy",   desc: "A custom roadmap with clear KPIs, channel mix, and growth milestones tailored to your goals." },
  { num: "03", title: "Execution",  desc: "Campaigns launched with precision — creative, targeting, and technology all working in sync." },
  { num: "04", title: "Optimize",   desc: "Continuous testing and iteration to squeeze maximum performance from every dollar spent." },
  { num: "05", title: "Scale",      desc: "Once we find what works, we pour fuel on the fire and scale your results exponentially." },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" ref={ref} className="py-32 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
            <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">How We Work</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D]"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Our proven process.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-black/[0.06] hover:border-[#C9A84C]/40 rounded-2xl p-6 group transition-all duration-300 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.05]">
              <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors">
                <span className="text-[14px] font-bold text-[#8B6914]" style={{ fontFamily: "'Syne', sans-serif" }}>{step.num}</span>
              </div>
              <h3 className="text-[16px] font-semibold text-[#0D0D0D] mb-3">{step.title}</h3>
              <p className="text-[13px] text-black/35 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
