import { NextRequest, NextResponse } from "next/server";
import { mutateStore, genId } from "@/lib/store";

// Keep at most this many pageview records to bound file size.
const MAX_PAGEVIEWS = 50000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const type: string = body.type ?? "pageview";
    const visitor: string = typeof body.visitor === "string" && body.visitor ? body.visitor : "anon";
    const pagePath: string = typeof body.path === "string" ? body.path.slice(0, 200) : "/";

    mutateStore((store) => {
      const now = Date.now();
      // Always refresh heartbeat so this visitor counts as "live".
      store.heartbeats[visitor] = now;

      if (type === "pageview") {
        store.pageViews.push({ id: genId(), path: pagePath, ts: now, visitor });
        if (store.pageViews.length > MAX_PAGEVIEWS) {
          store.pageViews = store.pageViews.slice(-MAX_PAGEVIEWS);
        }
      }

      // Prune heartbeats older than 5 minutes to keep the map small.
      const cutoff = now - 5 * 60 * 1000;
      for (const [id, ts] of Object.entries(store.heartbeats)) {
        if (ts < cutoff) delete store.heartbeats[id];
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
