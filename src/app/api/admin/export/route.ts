import { getAdminUser } from "@/lib/admin";
import { getServiceClient } from "@/lib/supabase-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = { display_name: string | null; action_category: string; commitment: string; frequency: string; selected_sdgs: number[]; created_at: string };

/** Neutralise spreadsheet formula injection, then quote the cell. */
function cell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return new Response("Unauthorized", { status: 401 });
  const db = getServiceClient();
  if (!db) return new Response("Database not configured", { status: 503 });

  const { data, error } = await db
    .from("pledges")
    .select("display_name, action_category, commitment, frequency, selected_sdgs, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) return new Response("Export failed", { status: 500 });

  const header = ["Display name", "Action category", "Commitment", "Frequency", "SDGs", "Created at"];
  const lines = (data as Row[]).map((r) =>
    [r.display_name ?? "Anonymous", r.action_category, r.commitment, r.frequency, r.selected_sdgs.join(" "), r.created_at].map(cell).join(",")
  );
  const csv = [header.map(cell).join(","), ...lines].join("\r\n");

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="eco-choice-approved-pledges.csv"',
      "Cache-Control": "no-store",
    },
  });
}
