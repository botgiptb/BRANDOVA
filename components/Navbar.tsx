"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work",     href: "/work" },
  { label: "About",    href: "#about" },
  { label: "Process",  href: "#process" },
  { label: "Pricing",  href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06] shadow-sm" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

        <a href="/" className="flex items-center">
          <img src="/brandova.png" alt="Brandova" className="h-9 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.label} href={l.href}
              className="px-4 py-2 text-[13px] font-medium text-black/50 hover:text-black rounded-lg hover:bg-black/[0.04] transition-all duration-200">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact"
            className="px-5 py-2.5 text-[13px] font-medium text-black/60 hover:text-black border border-black/[0.12] hover:border-black/30 rounded-lg transition-all duration-200">
            Contact
          </a>
          <a href="#contact"
            className="px-5 py-2.5 text-[13px] font-semibold text-white bg-[#0D0D0D] hover:bg-[#C9A84C] rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#C9A84C]/30">
            Get a Proposal
          </a>
        </div>

        <button onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-black/10 text-black/60 hover:text-black">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white border-b border-black/[0.06]">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="px-4 py-3 text-[14px] text-black/60 hover:text-black rounded-lg hover:bg-black/[0.04] transition-all">
                  {l.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-black/[0.06]">
                <a href="#contact" onClick={() => setOpen(false)}
                  className="block text-center py-3 text-[14px] font-semibold text-white bg-[#0D0D0D] rounded-lg">
                  Get a Proposal
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
