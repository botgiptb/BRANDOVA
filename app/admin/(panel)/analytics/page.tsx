"use client";
import { useEffect, useState } from "react";
import { Eye, Users, Radio, Calendar } from "lucide-react";
import { LineChart, BarChart } from "@/components/admin/Charts";

type Analytics = {
  totalViews: number;
  uniqueVisitors: number;
  liveViewers: number;
  viewsToday: number;
  series: { label: string; views: number; visitors: number }[];
  hourly: { hour: number; views: number }[];
  topPages: { path: string; count: number }[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [tab, setTab] = useState<"views" | "visitors">("views");

  useEffect(() => {
    const load = () => {
      fetch("/api/admin/analytics").then((r) => r.json()).then(setData).catch(() => {});
    };
    // refresh often so "live viewers" stays current
    const id = setTimeout(load, 0);
    const t = setInterval(load, 5000);
    return () => {
      clearTimeout(id);
      clearInterval(t);
    };
  }, []);

  const stats = [
    { label: "Total Views", value: data?.totalViews ?? "—", icon: Eye, color: "#C9A84C" },
    { label: "Unique Visitors", value: data?.uniqueVisitors ?? "—", icon: Users, color: "#3B82F6" },
    { label: "Views Today", value: data?.viewsToday ?? "—", icon: Calendar, color: "#A855F7" },
    { label: "Live Viewers", value: data?.liveViewers ?? "—", icon: Radio, color: "#22C55E", live: true },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-bold text-[#0D0D0D] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Analytics
          </h1>
          <p className="text-black/40 text-[14px] mt-1">How visitors are engaging with your site.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[12px] font-semibold text-green-700">{data?.liveViewers ?? 0} live now</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-black/[0.06] rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${s.color}18` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div className="text-[28px] font-bold text-[#0D0D0D] leading-none tracking-tight flex items-center gap-2">
                {s.value}
                {s.live && (data?.liveViewers ?? 0) > 0 && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
              </div>
              <div className="text-[12px] text-black/40 mt-1.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main trend chart */}
      <div className="bg-white border border-black/[0.06] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-bold text-[#0D0D0D]">Traffic — Last 14 days</h2>
          <div className="flex items-center gap-1 bg-black/[0.04] rounded-xl p-1">
            {(["views", "visitors"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all ${
                  tab === t ? "bg-white text-[#0D0D0D] shadow-sm" : "text-black/40 hover:text-black"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {data && (
          <LineChart
            data={data.series.map((s) => ({ label: s.label, value: tab === "views" ? s.views : s.visitors }))}
            color={tab === "views" ? "#C9A84C" : "#3B82F6"}
            height={220}
          />
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hourly today */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6">
          <h2 className="text-[16px] font-bold text-[#0D0D0D] mb-1">Views by hour (today)</h2>
          <p className="text-[12px] text-black/40 mb-5">Live activity across the day.</p>
          {data && (
            <BarChart
              data={data.hourly.map((h) => ({ label: `${h.hour}`, value: h.views }))}
              color="#22C55E"
              height={160}
            />
          )}
        </div>

        {/* Top pages */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6">
          <h2 className="text-[16px] font-bold text-[#0D0D0D] mb-1">Top pages</h2>
          <p className="text-[12px] text-black/40 mb-5">Most viewed pages all-time.</p>
          <div className="space-y-3">
            {data?.topPages.length ? (
              data.topPages.map((p) => {
                const max = data.topPages[0].count || 1;
                return (
                  <div key={p.path}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] text-[#0D0D0D] font-medium truncate max-w-[70%]">{p.path}</span>
                      <span className="text-[13px] font-bold text-black/50">{p.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-full bg-[#C9A84C]" style={{ width: `${(p.count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-[13px] text-black/30">No page views recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
