import "server-only";
import { createHash } from "node:crypto";
import { getServiceClient } from "./supabase-service";

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Salted hash of the visitor IP. The raw IP is never stored. */
export function ipHashFromRequest(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
  return sha256(`${process.env.RATE_LIMIT_SALT ?? ""}:${ip}`);
}

export function contentHash(text: string): string {
  return sha256(text.toLowerCase().replace(/\s+/g, " ").trim());
}

/** True when this visitor has already inserted `max` rows into `table` within the last `windowMinutes`. */
export async function isRateLimited(table: "pledges" | "feedback", ipHash: string, max: number, windowMinutes: number) {
  const db = getServiceClient();
  if (!db) return false;
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { count } = await db
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  return (count ?? 0) >= max;
}
