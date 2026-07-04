import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Operations", href: "/operations" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center bg-navy-800 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 26px, rgba(232,134,46,0.9) 26px 27px)",
        }}
      />
      <div className="container-page relative py-24 text-center">
        <p className="font-[family-name:var(--font-sora)] text-[6rem] font-extrabold leading-none text-amber-500 sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back on route.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            <Home size={17} /> Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact us <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-amber-500 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
