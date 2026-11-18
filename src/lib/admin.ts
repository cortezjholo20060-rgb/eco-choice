import "server-only";
import { createSupabaseServer } from "./supabase-auth";
import { getServiceClient } from "./supabase-service";

/** Returns the signed-in user only if they are listed in public.admins. */
export async function getAdminUser(): Promise<{ id: string; email: string } | null> {
  const supa = await createSupabaseServer();
  if (!supa) return null;
  const {
    data: { user },
  } = await supa.auth.getUser();
  if (!user) return null;
  const db = getServiceClient();
  if (!db) return null;
  const { data } = await db.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  return data ? { id: user.id, email: user.email ?? "" } : null;
}
