"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Share2, Megaphone, Palette, Video, PenTool, BarChart2 } from "lucide-react";

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "We handle your Instagram, Facebook, and LinkedIn — from content planning and daily posting to community engagement that builds a loyal audience around your brand.",
    num: "01", color: "#C9A84C",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    desc: "Meta and Google ad campaigns built to convert. We research, create, launch, and optimise every ad so your budget works harder and your returns keep climbing.",
    num: "02", color: "#0D0D0D",
  },
  {
    icon: Palette,
    title: "Graphic Design & Posters",
    desc: "Eye-catching posters, promotional creatives, and branded visuals designed to stop the scroll. Every design is crafted to reflect your brand and speak to your audience.",
    num: "03", color: "#C9A84C",
  },
  {
    icon: Video,
    title: "Content Creation",
    desc: "Reels, stories, product shoots, and short-form videos that feel native to each platform. We produce content that gets watched, shared, and remembered.",
    num: "04", color: "#0D0D0D",
  },
  {
    icon: PenTool,
    title: "Brand Identity & Strategy",
    desc: "Logo design, colour systems, typography, and brand guidelines that give your business a consistent, professional look across every touchpoint — online and offline.",
    num: "05", color: "#C9A84C",
  },
  {
    icon: BarChart2,
    title: "Performance & Analytics",
    desc: "Monthly reports, growth tracking, and data-backed decisions. We measure what matters — reach, engagement, leads, and conversions — so you always know your ROI.",
    num: "06", color: "#0D0D0D",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="py-32 bg-[#FAFAF7] relative overflow-hidden">
      <div className="absolute top-1/2 right-[-100px] w-[500px] h-[500px] rounded-full bg-[#C9A84C]/06 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
              <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">What We Do</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Services built<br />for growth.
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-black/40 text-[15px] leading-relaxed max-w-[300px]">
            Every service is engineered to deliver measurable results and sustainable growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="bg-[#FAFAF7] hover:bg-white p-8 group transition-all duration-300 cursor-default relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${s.color}06, transparent 60%)` }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: s.color === "#C9A84C" ? "#C9A84C15" : "#0D0D0D08", border: `1px solid ${s.color}25` }}>
                    <s.icon size={20} style={{ color: s.color }} />
                  </div>
                  <span className="text-[11px] font-bold text-black/15 tracking-widest">{s.num}</span>
                </div>
                <h3 className="text-[17px] font-semibold text-[#0D0D0D] mb-3 tracking-tight">{s.title}</h3>
                <p className="text-[14px] text-black/40 leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: s.color }}>
                  Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
