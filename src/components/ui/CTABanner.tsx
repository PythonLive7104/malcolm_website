import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Full-width accented call-to-action band. */
export default function CTABanner({
  title,
  lead,
  primary = { label: "Request a Quote", href: "/quote" },
  secondary = { label: "Partner With Us", href: "/contact" },
}: Props) {
  return (
    <section className="bg-navy-800">
      <div className="container-page py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-600 to-navy-900 px-8 py-12 lg:px-16 lg:py-16">
          {/* decorative pipeline lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent 0 22px, rgba(232,134,46,0.9) 22px 23px)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white lg:text-4xl">{title}</h2>
              {lead && <p className="mt-4 text-lg text-white/70">{lead}</p>}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href={primary.href} className="btn btn-primary">
                {primary.label}
                <ArrowRight size={17} />
              </Link>
              <Link href={secondary.href} className="btn btn-ghost">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
