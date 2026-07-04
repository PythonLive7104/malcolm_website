import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

/** Inline LinkedIn glyph (lucide v1 dropped brand icons). */
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 22 10.6 22 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9V9Z" />
    </svg>
  );
}
import { footerNav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <span className="text-white">
              <Logo />
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              {site.tagline}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-amber-500" />
                <span>
                  {site.address.line1}, {site.address.city},{" "}
                  {site.address.region} {site.address.postalCode},{" "}
                  {site.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-amber-500" />
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-amber-500" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.children?.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="hover:text-white transition-colors">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <a
              href={site.socials.linkedin}
              aria-label="LinkedIn"
              className="text-white/60 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
