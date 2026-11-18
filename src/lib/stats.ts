import "server-only";
import { getServiceClient } from "./supabase-service";

export type CommunityStats = {
  configured: boolean;
  totalPledges: number;
  participants: number;
  categories: { name: string; count: number }[];
  sdgCounts: { sdg: number; count: number }[];
  frequencies: { name: string; count: number }[];
  topCategory: string | null;
  topCommitments: { name: string; count: number }[];
  recent: { name: string; category: string; commitment: string; frequency: string; createdAt: string }[];
};

const empty: CommunityStats = {
  configured: false,
  totalPledges: 0,
  participants: 0,
  categories: [],
  sdgCounts: [],
  frequencies: [],
  topCategory: null,
  topCommitments: [],
  recent: [],
};

type Row = {
  display_name: string | null;
  action_category: string;
  commitment: string;
  frequency: string;
  selected_sdgs: number[];
  ip_hash: string;
  created_at: string;
};

/** Aggregates APPROVED pledges only. Participants = distinct anonymous (hashed) submitters. */
export async function getCommunityStats(): Promise<CommunityStats> {
  const db = getServiceClient();
  if (!db) return empty;
  const { data, error } = await db
    .from("pledges")
    .select("display_name, action_category, commitment, frequency, selected_sdgs, ip_hash, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error || !data) return { ...empty, configured: true };
  const rows = data as Row[];

  const tally = (keys: string[]) => {
    const m = new Map<string, number>();
    keys.forEach((k) => m.set(k, (m.get(k) ?? 0) + 1));
    return [...m.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  };

  const categories = tally(rows.map((r) => r.action_category));
  const frequencies = tally(rows.map((r) => r.frequency));
  const sdgMap = new Map<number, number>();
  rows.forEach((r) => r.selected_sdgs.forEach((n) => sdgMap.set(n, (sdgMap.get(n) ?? 0) + 1)));
  const sdgCounts = Array.from({ length: 17 }, (_, i) => ({ sdg: i + 1, count: sdgMap.get(i + 1) ?? 0 }));

  return {
    configured: true,
    totalPledges: rows.length,
    participants: new Set(rows.map((r) => r.ip_hash)).size,
    categories,
    sdgCounts,
    frequencies,
    topCategory: categories[0]?.name ?? null,
    // "Most selected environmental commitments" = most selected action categories
    topCommitments: categories.slice(0, 3),
    recent: rows.slice(0, 6).map((r) => ({
      name: r.display_name?.trim() || "Anonymous",
      category: r.action_category,
      commitment: r.commitment,
      frequency: r.frequency,
      createdAt: r.created_at,
    })),
  };
}
