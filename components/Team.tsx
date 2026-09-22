"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const team = [
  {
    name: "Ashraf",
    role: "Founder",
    bio: "The mind behind Brandova, leading strategy and ensuring every project delivers real results.",
    color: "#C9A84C",
    image: "https://image.gihostings.com/i/5769adb982e8586c.jpeg",
    tags: ["Leadership", "Strategy", "Client Growth"],
  },
  {
    name: "Rishal",
    role: "Co-Founder",
    bio: "Co-founder who drives partnerships, operations, and makes sure every client gets results.",
    color: "#C9A84C",
    image: "https://image.gihostings.com/i/696abe180da626e2.jpeg",
    tags: ["Operations", "Partnerships", "Business Dev"],
  },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" ref={ref} className="py-32 bg-[#FAFAF7] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#C9A84C]/06 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse inline-block" />
            <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">The Team</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Our Expert Team
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-black/40 text-[15px] max-w-md mx-auto leading-relaxed">
            The founders behind Brandova — obsessed with one thing: growing your business faster than you thought possible.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {team.map((member, i) => (
            <motion.div key={member.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="group relative bg-white border border-black/[0.06] hover:border-[#C9A84C]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.08]">

              {/* Portrait */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F0E8]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 340px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Name + role over image */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#E8C97A] mb-1">
                    {member.role}
                  </div>
                  <h3 className="text-[22px] font-bold text-white leading-none tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-[13px] text-black/45 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#8B6914] bg-[#C9A84C]/10 border border-[#C9A84C]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
          className="mt-14 text-center">
          <p className="text-black/30 text-[14px] mb-4">Want to join our team?</p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-[#0D0D0D] border border-black/[0.12] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/08 rounded-xl transition-all duration-200">
            We&apos;re Hiring →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
