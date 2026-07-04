import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Site-wide social share card (Open Graph + Twitter). Next.js turns this into
 * og:image / twitter:image on every page automatically. Product/News pages set
 * their own image in generateMetadata, which overrides this default.
 *
 * ⚠️ For the image to appear in real shared links, site.url must be the real
 * production domain (it builds the absolute image URL). Currently a placeholder.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0b1e33";
const NAVY_2 = "#14293f";
const AMBER = "#e8862e";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 100%)`,
          padding: "64px 72px",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* decorative pipeline stripes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage: `repeating-linear-gradient(115deg, transparent 0 40px, ${AMBER} 40px 42px)`,
          }}
        />

        {/* top row: mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "rgba(255,255,255,0.08)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* petroleum droplet mark (matches the site logo) */}
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path d="M16 5.5c0 0 7 7.6 7 12.6a7 7 0 0 1-14 0c0-5 7-12.6 7-12.6Z" fill={AMBER} />
              <path d="M12.4 19.6 16 16l3.6 3.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 16v4.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
              {site.name}
              <span style={{ color: AMBER }}>.</span>
            </span>
            <span style={{ fontSize: 15, letterSpacing: 4, color: "rgba(255,255,255,0.6)" }}>
              ENERGY TRADING
            </span>
          </div>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ display: "flex", width: 44, height: 4, background: AMBER }} />
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: 3, color: AMBER }}>
              PETROLEUM · STORAGE · LOGISTICS
            </span>
          </div>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Moving energy across global markets, reliably.
          </span>
        </div>

        {/* footer: description + url */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.72)", maxWidth: 760, lineHeight: 1.35 }}>
            Refined-products trading, storage, bulk shipping & pipeline transshipment.
          </span>
          <span style={{ fontSize: 22, fontWeight: 600, color: AMBER }}>
            {site.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
