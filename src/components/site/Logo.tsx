import { site } from "@/lib/site";

/**
 * Brand logo. A petroleum droplet mark (with an upward "growth" arrow for
 * trading momentum) paired with the company wordmark. The tile background uses
 * currentColor so the mark reads well on both the dark header and light footer.
 * PLACEHOLDER — swap for the client's final logo asset when supplied.
 */
export default function Logo({ className = "" }: { className?: string }) {
  // Split a trailing "LLC" so it can be styled as a lighter suffix.
  const primary = site.name.replace(/\s+LLC$/, "");
  const suffix = site.name.endsWith("LLC") ? "LLC" : "";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.08" />
        {/* Oil droplet */}
        <path
          d="M16 5.5c0 0 7 7.6 7 12.6a7 7 0 0 1-14 0c0-5 7-12.6 7-12.6Z"
          fill="var(--color-amber-500)"
        />
        {/* Upward growth arrow inside the droplet */}
        <path
          d="M12.4 19.6 16 16l3.6 3.6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 16v4.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-sora)] text-[1.05rem] font-bold uppercase tracking-tight">
          {primary}
          {suffix && <span className="ml-1 text-amber-500">{suffix}</span>}
        </span>
        <span className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-current/60">
          Petroleum · Energy · Logistics
        </span>
      </span>
    </span>
  );
}
