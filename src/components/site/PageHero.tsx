import Image from "next/image";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import type { SiteImage } from "@/lib/images";

/**
 * Compact interior-page hero: dark navy band with optional background photo,
 * eyebrow, H1, lead, and a breadcrumb trail.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: SiteImage;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800 text-white">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/55"
          />
        </>
      )}
      <div className="container-page relative pb-14 pt-32 lg:pb-16 lg:pt-40">
        <Breadcrumbs trail={crumbs} invert />
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
