import { NextResponse } from "next/server";
import { listWorkImages, getStorageUsage, STORAGE_LIMIT_BYTES } from "@/lib/storage";

export async function GET() {
  try {
    const images = listWorkImages();
    const used = getStorageUsage();
    return NextResponse.json({
      images,
      storage: {
        used,
        limit: STORAGE_LIMIT_BYTES,
        percent: Math.min(100, (used / STORAGE_LIMIT_BYTES) * 100),
      },
    });
  } catch {
    return NextResponse.json({ images: [], storage: { used: 0, limit: STORAGE_LIMIT_BYTES, percent: 0 } });
  }
}
