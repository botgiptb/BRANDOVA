"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "brandova_visitor";

function getVisitorId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function send(type: "pageview" | "heartbeat", path: string) {
  const visitor = getVisitorId();
  const body = JSON.stringify({ type, path, visitor });
  // Use sendBeacon when possible so it survives navigation/unload.
  if (type === "heartbeat" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages as customer views.
    if (pathname?.startsWith("/admin")) return;

    send("pageview", pathname || "/");

    // Heartbeat every 15s to mark this visitor as "live".
    const interval = setInterval(() => send("heartbeat", pathname || "/"), 15000);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
