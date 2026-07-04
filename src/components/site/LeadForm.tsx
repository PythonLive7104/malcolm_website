"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { products } from "@/lib/data/products";

type Props = {
  formType: "contact" | "quote";
  defaultProduct?: string;
};

/** Contact / Quote form → POSTs to /api/lead. Includes a honeypot field. */
export default function LeadForm({ formType, defaultProduct }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-amber-200 bg-amber-50 p-10 text-center">
        <CheckCircle2 size={40} className="text-amber-600" />
        <h3 className="mt-4 text-xl font-bold text-navy-900">Thank you — message received</h3>
        <p className="mt-2 max-w-sm text-navy-500">
          Our team will respond within one business day. For urgent matters, call us directly.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-dark mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
      {/* Honeypot — visually hidden, must stay empty */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Phone" name="phone" type="tel" />

        {formType === "quote" && (
          <div className="sm:col-span-2">
            <label htmlFor="product" className="mb-1.5 block text-sm font-medium text-navy-700">
              Product of interest
            </label>
            <select
              id="product"
              name="product"
              defaultValue={defaultProduct ?? ""}
              className="w-full rounded-lg border border-line bg-white px-4 py-3 text-navy-900 outline-none focus:border-amber-500"
            >
              <option value="">Select a product…</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
              <option value="other">Other / not listed</option>
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-700">
            {formType === "quote" ? "Requirement details (volume, delivery terms, destination)" : "Message"}{" "}
            <span className="text-amber-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-lg border border-line bg-white px-4 py-3 text-navy-900 outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-6 w-full sm:w-auto">
        {status === "sending" ? (
          <><Loader2 size={17} className="animate-spin" /> Sending…</>
        ) : (
          <>{formType === "quote" ? "Request Quote" : "Send Message"} <Send size={16} /></>
        )}
      </button>

      <p className="mt-4 text-xs text-navy-400">
        By submitting you agree to our{" "}
        <a href="/privacy" className="underline hover:text-amber-600">Privacy Policy</a>.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-700">
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
        className="w-full rounded-lg border border-line bg-white px-4 py-3 text-navy-900 outline-none focus:border-amber-500"
      />
    </div>
  );
}
