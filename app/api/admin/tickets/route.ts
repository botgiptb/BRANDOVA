import { NextRequest, NextResponse } from "next/server";
import { readStore, mutateStore } from "@/lib/store";
import { isAuthed } from "@/lib/auth";

// GET — admin: list all tickets (newest first).
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const store = readStore();
  const tickets = [...store.tickets].sort((a, b) => b.ts - a.ts);
  return NextResponse.json({ tickets, newCount: tickets.filter((t) => t.status === "new").length });
}

// PATCH — admin: mark a ticket read/new. Body: { id, status }
export async function PATCH(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const status = body.status === "read" ? "read" : "new";
  const ok = mutateStore((store) => {
    const t = store.tickets.find((x) => x.id === id);
    if (!t) return false;
    t.status = status;
    return true;
  });
  return NextResponse.json({ ok });
}

// DELETE — admin: delete a ticket (?id=...)
export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const ok = mutateStore((store) => {
    const before = store.tickets.length;
    store.tickets = store.tickets.filter((t) => t.id !== id);
    return store.tickets.length < before;
  });
  return NextResponse.json({ ok });
}
