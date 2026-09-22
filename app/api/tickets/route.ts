import { NextRequest, NextResponse } from "next/server";
import { mutateStore, genId } from "@/lib/store";

// Reasonably strict email format check.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// POST — public: create a ticket from the contact form.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const service = String(body.service ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "First name, last name and email are required." }, { status: 400 });
    }
    if (firstName.length > 80 || lastName.length > 80 || email.length > 200) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }
    if (company.length > 120 || service.length > 60 || message.length > 4000) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const ticket = mutateStore((store) => {
      const t = {
        id: genId(),
        firstName,
        lastName,
        email,
        company: company || undefined,
        service: service || undefined,
        message: message || undefined,
        ts: Date.now(),
        status: "new" as const,
      };
      store.tickets.push(t);
      return t;
    });

    return NextResponse.json({ ok: true, id: ticket.id });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
