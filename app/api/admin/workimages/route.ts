import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthed } from "@/lib/auth";
import {
  WORK_DIR,
  ensureWorkDir,
  listWorkImages,
  getStorageUsage,
  STORAGE_LIMIT_BYTES,
  IMAGE_EXTS,
  safeFileName,
} from "@/lib/storage";

function storageSummary() {
  const used = getStorageUsage();
  return {
    used,
    limit: STORAGE_LIMIT_BYTES,
    percent: Math.min(100, (used / STORAGE_LIMIT_BYTES) * 100),
  };
}

// GET — list images + storage usage (admin)
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ images: listWorkImages(), storage: storageSummary() });
}

// POST — upload one or more images, enforcing the 5GB cap
export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const files = form.getAll("files").filter((f): f is File => f instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    ensureWorkDir();

    // Validate extensions first.
    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) {
        return NextResponse.json(
          { error: `Unsupported file type: ${file.name}. Allowed: ${[...IMAGE_EXTS].join(", ")}` },
          { status: 400 }
        );
      }
    }

    // Enforce 5GB cap: current usage + incoming total must not exceed limit.
    const incomingTotal = files.reduce((sum, f) => sum + f.size, 0);
    const currentUsage = getStorageUsage();
    if (currentUsage + incomingTotal > STORAGE_LIMIT_BYTES) {
      const remaining = Math.max(0, STORAGE_LIMIT_BYTES - currentUsage);
      return NextResponse.json(
        {
          error: "Storage limit exceeded",
          detail: `Upload blocked. This would exceed the 5 GB limit. Only ${remaining} bytes remaining.`,
          storage: storageSummary(),
        },
        { status: 413 }
      );
    }

    const saved: string[] = [];
    for (const file of files) {
      let name = safeFileName(file.name);
      let dest = path.join(WORK_DIR, name);
      // Avoid overwriting existing files by suffixing.
      if (fs.existsSync(dest)) {
        const ext = path.extname(name);
        const base = name.slice(0, name.length - ext.length);
        name = `${base}_${Date.now().toString(36)}${ext}`;
        dest = path.join(WORK_DIR, name);
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      saved.push(name);
    }

    return NextResponse.json({ ok: true, saved, storage: storageSummary() });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// DELETE — remove a single image by name (?name=...)
export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const name = new URL(req.url).searchParams.get("name");
    if (!name) {
      return NextResponse.json({ error: "Missing file name" }, { status: 400 });
    }
    // Prevent path traversal: only operate within WORK_DIR on the basename.
    const target = path.join(WORK_DIR, path.basename(name));
    if (!target.startsWith(WORK_DIR) || !fs.existsSync(target)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    fs.unlinkSync(target);
    return NextResponse.json({ ok: true, storage: storageSummary() });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
