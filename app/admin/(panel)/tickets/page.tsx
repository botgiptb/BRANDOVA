"use client";
import { useEffect, useState } from "react";
import { Mail, Trash2, Inbox, Check, Circle, Building2, Tag, MessageSquare, ChevronDown } from "lucide-react";

type Ticket = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  message?: string;
  ts: number;
  status: "new" | "read";
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/tickets");
      const data = await res.json();
      setTickets(data.tickets ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(load, 0);
    const t = setInterval(load, 15000);
    return () => {
      clearTimeout(id);
      clearInterval(t);
    };
  }, []);

  const toggleRead = async (t: Ticket) => {
    const next = t.status === "new" ? "read" : "new";
    setTickets((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)));
    await fetch("/api/admin/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, status: next }),
    }).catch(() => {});
  };

  const remove = async (id: string) => {
    setTickets((prev) => prev.filter((x) => x.id !== id));
    await fetch(`/api/admin/tickets?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  };

  const shown = filter === "new" ? tickets.filter((t) => t.status === "new") : tickets;
  const newCount = tickets.filter((t) => t.status === "new").length;

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-[#0D0D0D] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Tickets
          </h1>
          <p className="text-black/40 text-[14px] mt-1">Messages submitted through your contact forms.</p>
        </div>
        <div className="flex items-center gap-1 bg-black/[0.04] rounded-xl p-1">
          {(["all", "new"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all ${
                filter === f ? "bg-white text-[#0D0D0D] shadow-sm" : "text-black/40 hover:text-black"
              }`}
            >
              {f === "new" ? `New (${newCount})` : "All"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-black/[0.04] animate-pulse" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-black/[0.06] rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
            <Inbox size={26} className="text-[#C9A84C]/60" />
          </div>
          <p className="text-black/40 text-[14px]">
            {filter === "new" ? "No new tickets." : "No tickets yet. Messages will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map((t) => {
            const isOpen = expanded === t.id;
            const hasDetails = Boolean(t.company || t.service || t.message);
            return (
              <div
                key={t.id}
                className={`bg-white border rounded-2xl transition-all ${
                  t.status === "new" ? "border-[#C9A84C]/40 shadow-sm" : "border-black/[0.06]"
                }`}
              >
                <div className="p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/12 border border-[#C9A84C]/20 flex items-center justify-center shrink-0 text-[15px] font-bold text-[#8B6914]">
                    {t.firstName[0]?.toUpperCase()}
                    {t.lastName[0]?.toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-[#0D0D0D] truncate">
                        {t.firstName} {t.lastName}
                      </span>
                      {t.status === "new" && (
                        <span className="text-[10px] font-bold text-[#8B6914] bg-[#C9A84C]/15 px-2 py-0.5 rounded-full uppercase tracking-wide">
                          New
                        </span>
                      )}
                      {t.service && (
                        <span className="text-[10px] font-semibold text-black/50 bg-black/[0.05] px-2 py-0.5 rounded-full truncate hidden sm:inline">
                          {t.service}
                        </span>
                      )}
                    </div>
                    <a href={`mailto:${t.email}`} className="text-[13px] text-black/50 hover:text-[#8B6914] flex items-center gap-1.5 mt-0.5 w-fit">
                      <Mail size={12} /> {t.email}
                    </a>
                  </div>

                  <span className="text-[12px] text-black/30 shrink-0 hidden md:block">{timeAgo(t.ts)}</span>

                  <div className="flex items-center gap-1 shrink-0">
                    {hasDetails && (
                      <button
                        onClick={() => {
                          setExpanded(isOpen ? null : t.id);
                          if (!isOpen && t.status === "new") toggleRead(t);
                        }}
                        title="View details"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-black/40 hover:text-[#8B6914] hover:bg-[#C9A84C]/10 transition-all ${isOpen ? "bg-[#C9A84C]/10 text-[#8B6914]" : ""}`}
                      >
                        <ChevronDown size={17} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                    <button
                      onClick={() => toggleRead(t)}
                      title={t.status === "new" ? "Mark as read" : "Mark as new"}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-black/40 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                    >
                      {t.status === "new" ? <Check size={16} /> : <Circle size={15} />}
                    </button>
                    <button
                      onClick={() => remove(t.id)}
                      title="Delete"
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-black/40 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {isOpen && hasDetails && (
                  <div className="border-t border-black/[0.06] px-5 py-4 space-y-3">
                    {t.company && (
                      <div className="flex items-start gap-2.5">
                        <Building2 size={15} className="text-black/30 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-semibold text-black/30 uppercase tracking-wider">Company</div>
                          <div className="text-[14px] text-[#0D0D0D]">{t.company}</div>
                        </div>
                      </div>
                    )}
                    {t.service && (
                      <div className="flex items-start gap-2.5">
                        <Tag size={15} className="text-black/30 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-semibold text-black/30 uppercase tracking-wider">Service</div>
                          <div className="text-[14px] text-[#0D0D0D]">{t.service}</div>
                        </div>
                      </div>
                    )}
                    {t.message && (
                      <div className="flex items-start gap-2.5">
                        <MessageSquare size={15} className="text-black/30 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] font-semibold text-black/30 uppercase tracking-wider">Message</div>
                          <p className="text-[14px] text-[#0D0D0D] leading-relaxed whitespace-pre-wrap">{t.message}</p>
                        </div>
                      </div>
                    )}
                    <div className="text-[12px] text-black/30 pt-1">
                      Received {new Date(t.ts).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
