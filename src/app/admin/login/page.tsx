import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <section className="section">
      <div className="container-x max-w-md">
        <h1 className="mb-6 text-3xl font-extrabold text-forest">Administrator sign in</h1>
        <LoginForm />
      </div>
    </section>
  );
}
