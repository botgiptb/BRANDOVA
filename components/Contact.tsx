"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVICES = ["SEO", "Paid Advertising", "Web Development", "Branding", "Full Service"];

const EMPTY = { firstName: "", lastName: "", email: "", company: "", service: "", message: "" };

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (key: keyof typeof EMPTY, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("Please fill in your first name, last name and email.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid email (e.g. brandova@company.com).");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          service: form.service.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send. Please try again.");
      }
      setStatus("sent");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  const sent = status === "sent";
  const sending = status === "sending";

  return (
    <section id="contact" ref={ref} className="py-32 bg-[#F5F0E8] relative overflow-hidden">
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#C9A84C]/08 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/25 mb-5">
            <span className="text-[11px] font-bold text-[#8B6914] uppercase tracking-widest">Get In Touch</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Ready to grow?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="text-black/40 text-[15px] max-w-md mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a custom proposal.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail,   label: "Email",    value: "brandova69@gmail.com" },
              { icon: Phone,  label: "Phone",    value: "+91 90617 10023"     },
              { icon: MapPin, label: "Location", value: "KH Arcade, Mele, Pattambi, Kerala 679303"    },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-black/[0.06] rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-[#8B6914]" />
                </div>
                <div>
                  <div className="text-[11px] text-black/30 uppercase tracking-wider font-semibold mb-0.5">{item.label}</div>
                  <div className="text-[14px] text-[#0D0D0D] font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="bg-[#0D0D0D] rounded-xl p-6">
              <div className="text-[16px] font-semibold text-white mb-2">Free Strategy Call</div>
              <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                Book a 30-min call with our experts and get a free audit of your current marketing.
              </p>
              <a href="mailto:hello@brandova.agency"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-[#C9A84C] hover:bg-[#E8C97A] rounded-lg transition-all duration-200">
                Book Free Call <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
            className="lg:col-span-3">
            {sent ? (
              <div className="bg-white border border-emerald-200 rounded-2xl p-10 text-center shadow-lg shadow-black/[0.04]">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={30} className="text-emerald-600" />
                </div>
                <h3 className="text-[22px] font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Message sent successfully
                </h3>
                <p className="text-black/45 text-[14px] max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out. Your message has been received and we&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-[#0D0D0D] border border-black/[0.12] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/08 rounded-xl transition-all duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-white border border-black/[0.06] rounded-2xl p-8 space-y-5 shadow-lg shadow-black/[0.04]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-black/30 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Brand"
                    className="w-full bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#0D0D0D] placeholder-black/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-black/30 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Ova"
                    className="w-full bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#0D0D0D] placeholder-black/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black/30 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="brandova@company.com"
                  className="w-full bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#0D0D0D] placeholder-black/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black/30 uppercase tracking-wider mb-2">Company</label>
                <input type="text" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Your Company"
                  className="w-full bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#0D0D0D] placeholder-black/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black/30 uppercase tracking-wider mb-2">Service</label>
                <select value={form.service} onChange={(e) => set("service", e.target.value)}
                  className="w-full bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-black/60 focus:outline-none focus:border-[#C9A84C]/60 transition-colors">
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black/30 uppercase tracking-wider mb-2">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your project and goals..."
                  className="w-full bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#0D0D0D] placeholder-black/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors resize-none" />
              </div>

              {error && <p className="text-[13px] text-red-600 font-medium">{error}</p>}

              <button type="submit" disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-semibold transition-all duration-200 disabled:opacity-70 bg-[#0D0D0D] text-white hover:bg-[#C9A84C] hover:shadow-lg hover:shadow-[#C9A84C]/25">
                {sending ? "Sending…" : <><Send size={15} /> Send Message</>}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
