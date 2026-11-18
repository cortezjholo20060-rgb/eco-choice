"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServer } from "@/lib/supabase-auth";
import { getServiceClient } from "@/lib/supabase-service";
import { getAdminUser } from "@/lib/admin";

export type LoginState = { error: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter your email and password." };

  const supa = await createSupabaseServer();
  if (!supa) return { error: "Admin sign-in is not configured on this server." };

  const { error } = await supa.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Invalid email or password." };

  // A valid Supabase account is not enough: it must also be listed in public.admins.
  const admin = await getAdminUser();
  if (!admin) {
    await supa.auth.signOut();
    return { error: "This account is not authorized for administration." };
  }
  redirect("/admin");
}

export async function logout() {
  const supa = await createSupabaseServer();
  await supa?.auth.signOut();
  redirect("/admin/login");
}

export async function setPledgeStatus(formData: FormData) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  const parsed = z.object({ id: z.string().uuid(), status: z.enum(["pending", "approved", "rejected"]) }).safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;
  const db = getServiceClient();
  if (!db) return;
  await db.from("pledges").update({ status: parsed.data.status, moderated_at: new Date().toISOString(), moderated_by: admin.id }).eq("id", parsed.data.id);
  revalidatePath("/admin");
  revalidatePath("/impact");
  revalidatePath("/");
}

export async function setFeedbackStatus(formData: FormData) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  const parsed = z.object({ id: z.string().uuid(), status: z.enum(["new", "reviewed", "archived"]) }).safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;
  const db = getServiceClient();
  if (!db) return;
  await db.from("feedback").update({ status: parsed.data.status }).eq("id", parsed.data.id);
  revalidatePath("/admin");
}
