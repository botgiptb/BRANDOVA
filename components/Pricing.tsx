"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, Phone } from "lucide-react";

const features = [
  "Social Media Management (Instagram, Facebook, LinkedIn)",
  "Graphic Design & Custom Poster Creation",
  "Paid Advertising (Meta & Google Ads)",
  "Short-form Video & Reels Production",
  "Brand Identity & Visual Strategy",
  "Monthly Performance Reports & Analytics",
  "Dedicated Account Manager",
  "Flexible scope — scale up or down anytime",
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="py-32 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
            <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">Pricing</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Built around your brand.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-black/40 text-[15px] max-w-md mx-auto leading-relaxed">
            Every brand is different. We build a custom package around your goals, budget, and timeline — no rigid tiers, no paying for things you don&apos;t need.
          </motion.p>
        </div>

        {/* Main card */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-[#0D0D0D] rounded-3xl overflow-hidden">

          {/* Gold dot grid texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* Glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/12 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-[#C9A84C]/06 blur-[80px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-0">

            {/* LEFT — features */}
            <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 mb-8">
                <span className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-widest">What&apos;s Included</span>
              </div>

              <div className="space-y-4">
                {features.map((f, i) => (
                  <motion.div key={f}
                    initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.06 }}
                    className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-[#C9A84C]" />
                    </div>
                    <span className="text-[14px] text-white/65 leading-snug">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT — CTA */}
            <div className="p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-widest mb-4">Custom Package</div>
                <div className="text-[64px] md:text-[80px] font-bold text-white leading-none tracking-tight mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Custom
                </div>
                <p className="text-white/40 text-[15px] leading-relaxed mb-10">
                  Pricing is tailored to your brand&apos;s specific needs. Tell us what you&apos;re working towards and we&apos;ll put together a proposal within 24 hours.
                </p>

                {/* Trust signals */}
                <div className="space-y-3 mb-10">
                  {[
                    "No long-term lock-in contracts",
                    "Response within 24 hours",
                    "Free strategy call included",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                      <span className="text-[13px] text-white/45">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contact"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-semibold text-white bg-[#C9A84C] hover:bg-[#E8C97A] transition-all duration-200 hover:shadow-xl hover:shadow-[#C9A84C]/25 hover:-translate-y-0.5">
                  Get a Free Proposal <ArrowRight size={15} />
                </a>
                <a href="#contact"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[14px] font-semibold text-white/60 hover:text-white border border-white/[0.1] hover:border-white/25 transition-all duration-200">
                  <Phone size={14} /> Book a Call
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          className="text-center text-[13px] text-black/30 mt-8">
          Not sure what you need? Just reach out — we&apos;ll guide you through it.
        </motion.p>
      </div>
    </section>
  );
}
