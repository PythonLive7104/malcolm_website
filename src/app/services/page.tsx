import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, icons } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { getServices } from "@/lib/cms";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const revalidate = 3600;

/** Resolve a lucide icon by (string) name, falling back to a neutral glyph. */
const iconFor = (name: string) => icons[name as keyof typeof icons] ?? icons.Circle;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Petroleum trading, liquid petroleum storage, bulk shipping, pipeline transshipment and supply-chain logistics — five integrated services under one operation.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Five integrated services, one supply chain"
        lead={`${site.name} runs trading, storage, shipping, transshipment and logistics in-house — so you deal with a single accountable team from sourcing to delivery.`}
        image={images.operations}
        crumbs={[{ label: "Services", href: "/services" }]}
      />

      {/* Quick jump nav */}
      <nav aria-label="Service sections" className="sticky top-20 z-30 border-b border-line bg-ground/90 backdrop-blur">
        <div className="container-page flex gap-1 overflow-x-auto py-3">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-800 hover:text-white"
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {services.map((s, i) => {
        const Icon = iconFor(s.icon);
        const flip = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-32 py-20 lg:py-28 ${i % 2 === 1 ? "bg-white" : ""}`}
          >
            <div className="container-page">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className={flip ? "lg:order-2" : ""}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-800 text-amber-500">
                    <Icon size={24} />
                  </span>
                  <h2 className="mt-5 text-3xl font-bold text-navy-900 lg:text-4xl">{s.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-navy-500">{s.intro}</p>
                  <ul className="mt-8 space-y-4">
                    {s.features.map((f) => (
                      <li key={f.title} className="flex gap-3">
                        <Check size={20} className="mt-0.5 shrink-0 text-amber-500" />
                        <span>
                          <span className="font-semibold text-navy-900">{f.title}.</span>{" "}
                          <span className="text-navy-500">{f.body}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/quote" className="btn btn-dark mt-8">
                    Enquire about {s.title.toLowerCase()} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`overflow-hidden rounded-2xl ${flip ? "lg:order-1" : ""}`}>
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTABanner title="Let's build your supply solution" lead="Trading, storage, shipping or logistics — tell us what you need and we'll structure it." />
    </>
  );
}
