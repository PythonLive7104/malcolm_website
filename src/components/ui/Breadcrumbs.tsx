import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import JsonLd from "./JsonLd";

export type Crumb = { label: string; href: string };

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD (SEO §5.4/§5.5).
 * Pass the trail WITHOUT "Home" — it's prepended automatically.
 */
export default function Breadcrumbs({
  trail,
  invert = false,
}: {
  trail: Crumb[];
  invert?: boolean;
}) {
  const full: Crumb[] = [{ label: "Home", href: "/" }, ...trail];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href === "/" ? "" : c.href}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={invert ? "text-white/70" : "text-navy-400"}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {full.map((c, i) => {
          const last = i === full.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={invert ? "text-white" : "text-navy-700"}
                >
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="transition-colors hover:text-amber-500"
                >
                  {c.label}
                </Link>
              )}
              {!last && <ChevronRight size={14} className="opacity-50" />}
            </li>
          );
        })}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
