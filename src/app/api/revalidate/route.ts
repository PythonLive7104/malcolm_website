import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity → Next on-demand revalidation.
 *
 * Configure a Sanity GROQ-powered webhook (Studio → API → Webhooks) pointing at
 * POST /api/revalidate with a secret, projecting the body as `{ "_type": _type }`.
 * On publish/edit it revalidates the ISR pages that depend on that document type,
 * so they rebuild instantly — no timer, no manual redeploy.
 *
 * Env: SANITY_REVALIDATE_SECRET (same value set on the Sanity webhook).
 */
type WebhookPayload = { _type?: string };

/** Which routes to revalidate for each edited document type. */
const PATHS_BY_TYPE: Record<string, { path: string; type?: "page" | "layout" }[]> = {
  product: [
    { path: "/products" },
    { path: "/products/[slug]", type: "page" },
    { path: "/" },
    { path: "/sitemap.xml" },
  ],
  service: [{ path: "/services" }, { path: "/" }],
  newsArticle: [
    { path: "/news" },
    { path: "/news/[slug]", type: "page" },
    { path: "/sitemap.xml" },
  ],
  jobListing: [
    { path: "/careers" },
    { path: "/careers/[slug]", type: "page" },
    { path: "/sitemap.xml" },
  ],
  companyStat: [{ path: "/" }],
  teamMember: [{ path: "/about" }],
  partnerLogo: [{ path: "/about" }, { path: "/partners" }],
  certification: [{ path: "/compliance" }],
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    const type = body?._type;
    if (!type) {
      return NextResponse.json({ message: "Bad request — missing _type" }, { status: 400 });
    }

    const targets = PATHS_BY_TYPE[type] ?? [];
    for (const t of targets) revalidatePath(t.path, t.type);

    return NextResponse.json({
      revalidated: true,
      type,
      paths: targets.map((t) => t.path),
      now: Date.now(),
    });
  } catch (err) {
    console.error("[revalidate] error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
