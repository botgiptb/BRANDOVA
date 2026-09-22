import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";

const DAY = 24 * 60 * 60 * 1000;
const LIVE_WINDOW = 30 * 1000; // active in last 30s = "live"

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const store = readStore();
  const now = Date.now();

  const totalViews = store.pageViews.length;
  const uniqueVisitors = new Set(store.pageViews.map((v) => v.visitor)).size;

  // Live viewers = heartbeats within LIVE_WINDOW
  const liveViewers = Object.values(store.heartbeats).filter((ts) => now - ts <= LIVE_WINDOW).length;

  // Views today (since local midnight based on server time)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const viewsToday = store.pageViews.filter((v) => v.ts >= startOfDay.getTime()).length;

  // Daily series for the last 14 days: views + unique visitors per day
  const days = 14;
  const series: { date: string; label: string; views: number; visitors: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(dayStart.getDate() - i);
    const dayEnd = dayStart.getTime() + DAY;
    const inDay = store.pageViews.filter((v) => v.ts >= dayStart.getTime() && v.ts < dayEnd);
    series.push({
      date: dayStart.toISOString().slice(0, 10),
      label: dayStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: inDay.length,
      visitors: new Set(inDay.map((v) => v.visitor)).size,
    });
  }

  // Views by hour for today (24 buckets) — used for the live/hourly chart
  const hourly: { hour: number; views: number }[] = Array.from({ length: 24 }, (_, h) => ({ hour: h, views: 0 }));
  for (const v of store.pageViews) {
    if (v.ts >= startOfDay.getTime()) {
      const h = new Date(v.ts).getHours();
      hourly[h].views += 1;
    }
  }

  // Top pages
  const pathCounts: Record<string, number> = {};
  for (const v of store.pageViews) {
    pathCounts[v.path] = (pathCounts[v.path] ?? 0) + 1;
  }
  const topPages = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return NextResponse.json({
    totalViews,
    uniqueVisitors,
    liveViewers,
    viewsToday,
    series,
    hourly,
    topPages,
  });
}
