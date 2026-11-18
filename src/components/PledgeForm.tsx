"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { pledgeSchema, type PledgeInput } from "@/lib/validation";
import { ACTION_CATEGORIES, FREQUENCIES } from "@/lib/options";
import { sdgs } from "@/data/sdgs";

type Status = "idle" | "submitting" | "success" | "error";

export function PledgeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm<PledgeInput>({
    resolver: zodResolver(pledgeSchema),
    defaultValues: { displayName: "", commitment: "", selectedSdgs: [], agree: false, website: "" },
  });
  const selected = watch("selectedSdgs") ?? [];
  const commitment = watch("commitment") ?? "";

  const toggle = (n: number) => {
    const next = selected.includes(n) ? selected.filter((x) => x !== n) : [...selected, n];
    setValue("selectedSdgs", next, { shouldValidate: true });
  };

  const onSubmit = async (values: PledgeInput) => {
    if (status === "submitting") return; // prevents accidental double submits
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/pledge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setServerMessage(body.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("We could not reach the server. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card text-center" role="status">
        <CheckCircle2 className="mx-auto text-nature" size={48} aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold text-forest">Thank you for your commitment.</h2>
        <p className="mx-auto mt-3 max-w-md">
          Your pledge was received. It will appear on the Community Impact page once a moderator has reviewed and approved it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/impact" className="btn-primary">See community impact</Link>
          <button type="button" className="btn-outline" onClick={() => setStatus("idle")}>Make another pledge</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-6">
      <div>
        <label htmlFor="displayName" className="label">Display name (optional)</label>
        <input id="displayName" className="field" autoComplete="off" placeholder="Leave blank to stay anonymous" aria-describedby="displayName-hint" {...register("displayName")} />
        <p id="displayName-hint" className="mt-1 text-xs text-deep/70">Use a first name or nickname. Please do not enter personal details.</p>
        {errors.displayName && <p className="field-error" role="alert">{errors.displayName.message}</p>}
      </div>

      <div>
        <label htmlFor="actionCategory" className="label">Environmental action category *</label>
        <select id="actionCategory" className="field" defaultValue="" {...register("actionCategory")}>
          <option value="" disabled>Choose a category</option>
          {ACTION_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.actionCategory && <p className="field-error" role="alert">{errors.actionCategory.message}</p>}
      </div>

      <div>
        <label htmlFor="commitment" className="label">Your personal environmental commitment *</label>
        <textarea id="commitment" rows={4} maxLength={500} className="field" placeholder="Example: I will bring my reusable bottle to school every day." {...register("commitment")} />
        <p className="mt-1 text-right text-xs text-deep/70">{commitment.length}/500</p>
        {errors.commitment && <p className="field-error" role="alert">{errors.commitment.message}</p>}
      </div>

      <div>
        <label htmlFor="frequency" className="label">How often will you practice this commitment? *</label>
        <select id="frequency" className="field" defaultValue="" {...register("frequency")}>
          <option value="" disabled>Choose how often</option>
          {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        {errors.frequency && <p className="field-error" role="alert">{errors.frequency.message}</p>}
      </div>

      <fieldset>
        <legend className="label">Which SDGs does your commitment support? * <span className="font-normal text-deep/70">(choose up to 5)</span></legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {sdgs.map((s) => {
            const on = selected.includes(s.n);
            return (
              <label key={s.n} className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2 text-sm ${on ? "border-forest bg-sage/30" : "border-forest/20 bg-white"}`}>
                <input type="checkbox" className="h-5 w-5 accent-forest" checked={on} onChange={() => toggle(s.n)} />
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-extrabold ${s.dark ? "text-deep" : "text-white"}`} style={{ backgroundColor: s.color }} aria-hidden="true">{s.n}</span>
                <span>{s.title}</span>
              </label>
            );
          })}
        </div>
        {errors.selectedSdgs && <p className="field-error" role="alert">{errors.selectedSdgs.message}</p>}
      </fieldset>

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-forest" {...register("agree")} />
          <span>
            I agree that my commitment and optional display name may be shown publicly after moderation, and I have read the{" "}
            <Link href="/privacy" className="font-semibold text-forest underline">Privacy Policy</Link>. *
          </span>
        </label>
        {errors.agree && <p className="field-error" role="alert">{errors.agree.message}</p>}
      </div>

      <p className="rounded-xl bg-cream p-4 text-xs text-deep/80">
        Privacy notice: no account is needed. We store only what you enter above, plus a one-way hash of your network address used to limit spam. We never ask for your address, phone number, school ID or location.
      </p>

      {status === "error" && <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800" role="alert">{serverMessage}</p>}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Submitting..." : "Submit my pledge"}
      </button>
    </form>
  );
}
