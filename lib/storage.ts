import fs from "fs";
import path from "path";

export const WORK_DIR = path.join(process.cwd(), "public", "workimage");

export const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

// 5 GB cap
export const STORAGE_LIMIT_BYTES = 5 * 1024 * 1024 * 1024;

export function ensureWorkDir() {
  if (!fs.existsSync(WORK_DIR)) {
    fs.mkdirSync(WORK_DIR, { recursive: true });
  }
}

export function listWorkImages(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs.readdirSync(WORK_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext);
  });
}

/** Total bytes used by the work image folder. */
export function getStorageUsage(): number {
  if (!fs.existsSync(WORK_DIR)) return 0;
  let total = 0;
  for (const f of fs.readdirSync(WORK_DIR)) {
    try {
      const stat = fs.statSync(path.join(WORK_DIR, f));
      if (stat.isFile()) total += stat.size;
    } catch {
      /* ignore unreadable files */
    }
  }
  return total;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/** Sanitize an uploaded file name to avoid path traversal. */
export function safeFileName(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_");
  return base || `upload_${Date.now()}`;
}
