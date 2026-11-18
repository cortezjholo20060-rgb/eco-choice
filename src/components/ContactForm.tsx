"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { feedbackSchema, type FeedbackInput } from "@/lib/validation";
import { FEEDBACK_CATEGORIES } from "@/lib/options";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", message: "", agree: false, website: "" },
  });

  const onSubmit = async (values: FeedbackInput) => {
    if (status === "submitting") return;
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
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
        <h2 className="mt-4 text-2xl font-extrabold text-forest">Thank you for your feedback.</h2>
        <p className="mx-auto mt-3 max-w-md">Your message was received privately. It is never shown publicly.</p>
        <button type="button" className="btn-outline mt-6" onClick={() => setStatus("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Name (optional)</label>
          <input id="name" className="field" autoComplete="name" {...register("name")} />
          {errors.name && <p className="field-error" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="label">Email address (optional)</label>
          <input id="email" type="email" className="field" autoComplete="email" {...register("email")} />
          {errors.email && <p className="field-error" role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="label">Feedback category *</label>
        <select id="category" className="field" defaultValue="" {...register("category")}>
          <option value="" disabled>Choose a category</option>
          {FEEDBACK_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <p className="field-error" role="alert">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="label">Message *</label>
        <textarea id="message" rows={6} maxLength={1500} className="field" {...register("message")} />
        {errors.message && <p className="field-error" role="alert">{errors.message.message}</p>}
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-forest" {...register("agree")} />
          <span>I have read the <Link href="/privacy" className="font-semibold text-forest underline">Privacy Policy</Link> and agree that my message is stored so the team can read it. *</span>
        </label>
        {errors.agree && <p className="field-error" role="alert">{errors.agree.message}</p>}
      </div>

      {status === "error" && <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800" role="alert">{serverMessage}</p>}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send feedback"}
      </button>
    </form>
  );
}
