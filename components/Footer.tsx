"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const nav = {
  Services: ["SEO & Content", "Paid Media", "Web Development", "Brand Identity", "Email Automation"],
  Company:  ["About Us", "Portfolio", "Process", "Careers", "Blog"],
  Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email (e.g. brand@company.com).");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send.");
      }
      setStatus("sent");
      setFirstName("");
      setLastName("");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[#0D0D0D] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] rounded-full bg-[#C9A84C]/08 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* CTA Banner */}
        <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl p-10 md:p-14 mb-16 relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[100px] pointer-events-none" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[32px] md:text-[42px] font-bold tracking-[-0.03em] text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Ready to dominate<br />your market?
              </h2>
              <p className="text-white/40 text-[15px]">Leave your details and we&apos;ll reach out within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
              </div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="brand@company.com"
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />

              {error && <p className="text-[13px] text-red-400 font-medium">{error}</p>}

              <button type="submit" disabled={status === "sending"}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[14px] font-semibold transition-all duration-200 disabled:opacity-70 ${
                  status === "sent" ? "bg-emerald-600 text-white" : "bg-[#C9A84C] text-[#0D0D0D] hover:bg-[#E8C97A] hover:shadow-xl hover:shadow-[#C9A84C]/30"
                }`}>
                {status === "sent" ? "Sent ✓ We'll be in touch" : status === "sending" ? "Sending…" : <>Get Started <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <a href="/" className="flex items-center mb-5">
              <img src="/footer.JPEG" alt="Brandova" className="h-9 w-auto object-contain" />
            </a>
            <p className="text-[13px] text-white/35 leading-relaxed">
              Full-service digital marketing agency for brands that refuse to be average.
            </p>
          </div>

          {Object.entries(nav).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/25">© 2025 Brandova Agency. All rights reserved.</p>
          <p className="text-[13px] text-white/20">Built for brands that dare to be different.</p>
        </div>
      </div>
    </footer>
  );
}
