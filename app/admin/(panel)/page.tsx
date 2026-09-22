"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Users, Radio, Inbox, HardDrive, ArrowRight } from "lucide-react";
import { LineChart } from "@/components/admin/Charts";

type Analytics = {
  totalViews: number;
  uniqueVisitors: number;
  liveViewers: number;
  viewsToday: number;
  series: { label: string; views: number }[];
};

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [newTickets, setNewTickets] = useState(0);
  const [storage, setStorage] = useState<{ used: number; percent: number } | null>(null);

  useEffect(() => {
    const load = () => {
      fetch("/api/admin/analytics").then((r) => r.json()).then(setAnalytics).catch(() => {});
      fetch("/api/admin/tickets").then((r) => r.json()).then((d) => {
        setTicketCount(d.tickets?.length ?? 0);
        setNewTickets(d.newCount ?? 0);
      }).catch(() => {});
      fetch("/api/admin/workimages").then((r) => r.json()).then((d) => setStorage(d.storage)).catch(() => {});
    };
    const id = setTimeout(load, 0);
    const t = setInterval(load, 10000);
    return () => {
      clearTimeout(id);
      clearInterval(t);
    };
  }, []);

  const cards = [
    { label: "Total Views", value: analytics?.totalViews ?? "—", icon: Eye, color: "#C9A84C" },
    { label: "Unique Visitors", value: analytics?.uniqueVisitors ?? "—", icon: Users, color: "#3B82F6" },
    { label: "Live Now", value: analytics?.liveViewers ?? "—", icon: Radio, color: "#22C55E", live: true },
    { label: "Open Tickets", value: newTickets, icon: Inbox, color: "#A855F7" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-[30px] font-bold text-[#0D0D0D] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-black/40 text-[14px] mt-1">Overview of your site activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white border border-black/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${c.color}18` }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                {c.live && (analytics?.liveViewers ?? 0) > 0 && (
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
              <div className="text-[28px] font-bold text-[#0D0D0D] leading-none tracking-tight">{c.value}</div>
              <div className="text-[12px] text-black/40 mt-1.5">{c.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-black/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[16px] font-bold text-[#0D0D0D]">Views — Last 14 days</h2>
              <p className="text-[12px] text-black/40">{analytics?.viewsToday ?? 0} views today</p>
            </div>
            <Link href="/admin/analytics" className="text-[12px] font-semibold text-[#8B6914] flex items-center gap-1 hover:gap-2 transition-all">
              Details <ArrowRight size={13} />
            </Link>
          </div>
          {analytics && <LineChart data={analytics.series.map((s) => ({ label: s.label, value: s.views }))} />}
        </div>

        <div className="bg-white border border-black/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-bold text-[#0D0D0D] flex items-center gap-2">
              <HardDrive size={15} className="text-black/40" /> Storage
            </h2>
            <Link href="/admin/work" className="text-[12px] font-semibold text-[#8B6914]">Manage</Link>
          </div>
          {storage && (
            <>
              <div className="text-[24px] font-bold text-[#0D0D0D]">{formatBytes(storage.used)}</div>
              <div className="text-[12px] text-black/40 mb-3">of 5 GB used</div>
              <div className="h-2.5 rounded-full bg-black/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${storage.percent}%`, background: storage.percent >= 90 ? "#DC2626" : "#C9A84C" }}
                />
              </div>
              <div className="text-[11px] text-black/35 mt-2">{storage.percent.toFixed(1)}% full</div>
            </>
          )}
          <Link
            href="/admin/tickets"
            className="mt-6 flex items-center justify-between bg-[#F5F0E8] rounded-xl px-4 py-3 hover:bg-[#EFE7D8] transition-colors"
          >
            <span className="text-[13px] font-medium text-[#0D0D0D]">Tickets</span>
            <span className="text-[13px] font-bold text-[#8B6914]">{ticketCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
