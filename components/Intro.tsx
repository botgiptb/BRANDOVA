"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const letters = "Brandova".split("");

export default function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(t);
  }, []);

  const handleExitComplete = () => onDone();

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#FAFAF7] flex items-center justify-center overflow-hidden"
        >
          {/* Radial glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)" }}
          />

          {/* Scan line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="absolute w-full h-px bg-[#C9A84C] origin-left"
          />

          {/* Logo + letters */}
          <div className="relative flex items-center gap-1">
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
              className="mr-3"
            >
              <img src="/brandova.png" alt="Brandova" className="h-14 w-auto object-contain" />
            </motion.div>

            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.07 }}
                className="text-[56px] md:text-[80px] font-bold text-[#0D0D0D] tracking-[-0.04em]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.6 }}
            className="absolute bottom-[30%] text-[13px] text-black/30 tracking-[0.3em] uppercase font-medium"
          >
            Digital Marketing Agency
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
