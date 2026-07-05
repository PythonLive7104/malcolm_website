"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

/**
 * Homepage hero. A background carousel cross-fades through several full-bleed
 * photographs behind a dark overlay gradient for text contrast. Swap the files
 * referenced in `slides` for the client's real photography — the overlay,
 * rotation and layout stay the same.
 */
const slides = [images.hero, images["liquid-storage"], images.refinery, images.shipping];
const INTERVAL = 6000; // ms between slides

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Background carousel — cross-fading slides */}
      {slides.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          aria-hidden={i !== active}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[1500ms] ease-[var(--ease-out-expo)] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* dark overlay gradient for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/85 to-navy-900/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40"
      />

      <div className="container-page relative flex min-h-[92vh] flex-col justify-center pb-24 pt-40 lg:min-h-[88vh]">
        <p className="eyebrow reveal">Petroleum trading · Storage · Marine logistics</p>
        <h1 className="reveal mt-6 max-w-4xl font-[family-name:var(--font-sora)] text-[clamp(2.5rem,1.6rem+4.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-tight">
          Moving energy across
          <span className="text-amber-500"> global markets</span>, reliably.
        </h1>
        <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-white/75">
          {site.name} trades, stores and ships refined petroleum products
          worldwide — backed by independent storage capacity, a chartered
          fleet and end-to-end supply-chain logistics.
        </p>
        <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="btn btn-primary">
            Request a Quote
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Partner With Us
          </Link>
        </div>

        {/* Carousel indicators */}
        <div className="reveal mt-12 flex items-center gap-2.5">
          {slides.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-amber-500" : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
