"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const WHATSAPP_NUMBER = "919061710023";
const WHATSAPP_MSG = encodeURIComponent("Hi Brandova! I'd like to discuss a project.");

const botReplies: Record<string, string> = {
  hi:      "Hey there! 👋 How can Brandova help you grow today?",
  hello:   "Hey there! 👋 How can Brandova help you grow today?",
  pricing: "Our packages start from $999/mo. Want a custom quote? Drop your email and we'll send a proposal!",
  seo:     "We've helped clients grow organic traffic by up to 890%. Tell us about your site and goals!",
  ads:     "Our paid media team manages Google & Meta campaigns with an average 12× ROAS. Want a free audit?",
  web:     "We build high-performance Next.js sites engineered to convert. Want to see our work?",
  default: "Thanks for reaching out! Our team will get back to you within 24 hours. 🚀",
};

function getBotReply(msg: string) {
  const lower = msg.toLowerCase();
  for (const key of Object.keys(botReplies)) {
    if (lower.includes(key)) return botReplies[key];
  }
  return botReplies.default;
}

interface Message { from: "user" | "bot"; text: string; }

export default function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! 👋 I'm Brandova's assistant. Ask me about our services, pricing, or how we can grow your business!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: getBotReply(text) }]);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="w-[340px] bg-white border border-black/[0.08] rounded-2xl shadow-2xl shadow-black/[0.12] overflow-hidden"
              >
                <div className="bg-[#0D0D0D] px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                      <Bot size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-[14px]">Brandova Assistant</div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                        <span className="text-white/50 text-[11px]">Online now</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setChatOpen(false)} className="text-white/50 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="h-[280px] overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF7]">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                      {m.from === "bot" && (
                        <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                          <Bot size={11} className="text-[#8B6914]" />
                        </div>
                      )}
                      <div className={`max-w-[220px] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                        m.from === "user"
                          ? "bg-[#0D0D0D] text-white rounded-br-sm"
                          : "bg-white border border-black/[0.06] text-black/70 rounded-bl-sm"
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                        <Bot size={11} className="text-[#8B6914]" />
                      </div>
                      <div className="bg-white border border-black/[0.06] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce"
                            style={{ animationDelay: `${d * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="px-4 py-3 border-t border-black/[0.06] flex gap-2 bg-white">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#F5F0E8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-black placeholder-black/30 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  />
                  <button onClick={send}
                    className="w-10 h-10 rounded-xl bg-[#0D0D0D] hover:bg-[#C9A84C] flex items-center justify-center transition-colors shrink-0">
                    <Send size={14} className="text-white" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-black/20 relative"
            style={{ background: "#25D366" }}
            title="Chat on WhatsApp"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
          </motion.a>

          {/* Chat button */}
          <motion.button
            onClick={() => setChatOpen((v) => !v)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-[#0D0D0D] hover:bg-[#C9A84C] flex items-center justify-center shadow-xl shadow-black/20 transition-colors relative"
            title="Chat with us"
          >
            <AnimatePresence mode="wait">
              {chatOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} className="text-white" /></motion.div>
                : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle size={22} className="text-white" /></motion.div>
              }
            </AnimatePresence>
            {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A84C] border-2 border-white animate-pulse" />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
