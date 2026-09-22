import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Very small session scheme for the admin panel.
 *
 * The password is read from the ADMIN_PASSWORD env var (falls back to a
 * default for local dev — CHANGE THIS in production via .env.local).
 * On successful login we set an httpOnly cookie containing an HMAC token so
 * it can't be forged without knowing the secret.
 */

export const ADMIN_COOKIE = "brandova_admin";

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "brandova-admin";
}

function getSecret(): string {
  return process.env.ADMIN_SECRET || "brandova-dev-secret-change-me";
}

export function makeToken(): string {
  const payload = "admin";
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (payload !== "admin" || !sig) return false;
  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = getPassword();
  try {
    return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}

/** Server-side check for use in route handlers / server components. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
