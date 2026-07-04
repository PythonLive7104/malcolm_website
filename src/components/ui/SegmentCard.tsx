import Image from "next/image";
import Link from "next/link";
import { ArrowRight, icons } from "lucide-react";
import type { SiteImage } from "@/lib/images";

type Props = {
  title: string;
  blurb: string;
  href: string;
  icon?: keyof typeof icons;
  image?: SiteImage;
  index?: number;
};

/** Segment / service / product card with hover-lift + accent underline. */
export default function SegmentCard({ title, blurb, href, icon, image, index }: Props) {
  const Icon = icon ? icons[icon] : null;
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_24px_60px_-30px_rgba(11,30,51,0.35)]"
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
          {Icon && (
            <span className="absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800/90 text-amber-500 backdrop-blur transition-colors group-hover:bg-amber-500 group-hover:text-navy-900">
              <Icon size={21} strokeWidth={2} />
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        {typeof index === "number" && (
          <span className="absolute right-6 top-6 font-[family-name:var(--font-sora)] text-sm font-bold text-white/70 mix-blend-plus-lighter">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {!image && Icon && (
          <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-800 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-navy-900">
            <Icon size={22} strokeWidth={2} />
          </span>
        )}
        <h3 className="text-xl font-bold text-navy-900">{title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-navy-500">
          {blurb}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
          Learn more
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-500 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:w-full" />
    </Link>
  );
}
