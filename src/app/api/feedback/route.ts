import { NextResponse } from "next/server";
import { feedbackSchema } from "@/lib/validation";
import { contentHash, ipHashFromRequest, isRateLimited } from "@/lib/abuse";
import { getServiceClient } from "@/lib/supabase-service";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (typeof raw === "object" && raw && typeof (raw as { website?: unknown }).website === "string" && (raw as { website: string }).website !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = feedbackSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Please check your entries." }, { status: 400 });
  }
  const v = parsed.data;

  const db = getServiceClient();
  if (!db) return NextResponse.json({ message: "Feedback is temporarily unavailable. Please try again later." }, { status: 503 });

  const ipHash = ipHashFromRequest(req);
  if (await isRateLimited("feedback", ipHash, 3, 60)) {
    return NextResponse.json({ message: "You have sent several messages recently. Please try again later." }, { status: 429 });
  }

  const { error } = await db.from("feedback").insert({
    name: v.name || null,
    email: v.email || null,
    category: v.category,
    message: v.message,
    ip_hash: ipHash,
    content_hash: contentHash(v.message),
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "It looks like you already sent this message." }, { status: 409 });
    }
    console.error("feedback insert failed", error.code);
    return NextResponse.json({ message: "We could not send your message. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
