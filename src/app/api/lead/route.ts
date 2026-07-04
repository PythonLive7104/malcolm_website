import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

/**
 * Lead submission handler for Contact + Request-a-Quote forms.
 *
 * - No database: emails the submission over SMTP (e.g. the client's cPanel mail
 *   server) using nodemailer. Configure via env vars:
 *     SMTP_HOST      e.g. mail.propetroleumllc.com  (cPanel outgoing server)
 *     SMTP_PORT      465 (SSL, default) or 587 (STARTTLS)
 *     SMTP_USER      full mailbox address, e.g. info@propetroleumllc.com
 *     SMTP_PASS      that mailbox's password
 *     LEAD_TO_EMAIL  inbox that receives leads (defaults to SMTP_USER / site.email)
 *     LEAD_FROM_EMAIL from address (defaults to SMTP_USER / site.email)
 *   Without SMTP_HOST/USER/PASS it logs to the server and still returns success,
 *   so the form stays demoable pre-config (e.g. on the Vercel preview).
 * - Spam protection: hidden honeypot field + naive per-IP rate limiting.
 */

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

// --- naive in-memory rate limit (per warm serverless instance) --------------
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

type LeadBody = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  product?: string;
  message?: string;
  formType?: "contact" | "quote";
  website?: string; // honeypot — must stay empty
};

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) {
    return NextResponse.json({ ok: true }); // silently accept + drop
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const kind = body.formType === "quote" ? "Quote request" : "Contact enquiry";
  const lines = [
    `${kind} via ${site.name} website`,
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    body.company ? `Company: ${body.company}` : null,
    body.phone ? `Phone:   ${body.phone}` : null,
    body.product ? `Product: ${body.product}` : null,
    "",
    "Message:",
    message,
  ].filter(Boolean).join("\n");

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 465;
  const to = process.env.LEAD_TO_EMAIL || user || site.email;
  const from = process.env.LEAD_FROM_EMAIL || user || site.email;

  if (!host || !user || !pass) {
    // Demo mode: SMTP not configured yet (e.g. Vercel preview without secrets).
    console.info("[lead] (SMTP not configured — logging only)\n" + lines);
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${site.name}" <${from}>`,
      to,
      replyTo: email,
      subject: `${kind}: ${name}${body.company ? ` (${body.company})` : ""}`,
      text: lines,
    });
  } catch (err) {
    console.error("[lead] SMTP send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
