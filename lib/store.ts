import fs from "fs";
import path from "path";

/**
 * Simple JSON-file backed data store.
 *
 * NOTE: This persists to disk under /data. It works on any host with a
 * writable, persistent filesystem (local dev, a VPS, a container with a
 * mounted volume). It will NOT persist on read-only / ephemeral serverless
 * platforms (e.g. Vercel). For those, swap this out for a real database.
 */

export type PageView = {
  id: string;
  path: string;
  ts: number; // epoch ms
  visitor: string; // anonymous visitor id
};

export type Ticket = {
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

type StoreShape = {
  pageViews: PageView[];
  tickets: Ticket[];
  // visitorId -> last heartbeat epoch ms (for live viewer counting)
  heartbeats: Record<string, number>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

const EMPTY: StoreShape = { pageViews: [], tickets: [], heartbeats: {} };

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readStore(): StoreShape {
  try {
    ensureDir();
    if (!fs.existsSync(STORE_FILE)) return { ...EMPTY };
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<StoreShape>;
    return {
      pageViews: parsed.pageViews ?? [],
      tickets: parsed.tickets ?? [],
      heartbeats: parsed.heartbeats ?? {},
    };
  } catch {
    return { ...EMPTY };
  }
}

export function writeStore(store: StoreShape) {
  ensureDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function mutateStore<T>(fn: (store: StoreShape) => T): T {
  const store = readStore();
  const result = fn(store);
  writeStore(store);
  return result;
}

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
