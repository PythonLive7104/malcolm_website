"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsCategories } from "@/lib/data/news";
import type { ArticleDoc } from "@/lib/cms";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

type Filter = "All" | (typeof newsCategories)[number];

/** Client-side category filter over the article list (from Sanity or mock). */
export default function NewsList({ articles }: { articles: ArticleDoc[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...newsCategories];
  const shown = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="News categories">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f ? "bg-navy-800 text-white" : "border border-line bg-surface text-navy-500 hover:border-amber-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <article key={a.slug} className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,30,51,0.35)]">
            <Link href={`/news/${a.slug}`} className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={a.image.src}
                alt={a.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-navy-800/90 px-3 py-1 text-xs font-semibold text-amber-400 backdrop-blur">
                {a.category}
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <time className="text-xs font-medium text-navy-400" dateTime={a.date}>{fmt(a.date)}</time>
              <h2 className="mt-2 text-lg font-bold leading-snug text-navy-900">
                <Link href={`/news/${a.slug}`} className="hover:text-amber-600">{a.title}</Link>
              </h2>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-500">{a.excerpt}</p>
              <Link href={`/news/${a.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination placeholder — wired to Sanity page params in production */}
      <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
        <span className="rounded-md bg-navy-800 px-3.5 py-2 text-sm font-medium text-white">1</span>
        <span className="rounded-md border border-line px-3.5 py-2 text-sm text-navy-300">2</span>
        <span className="rounded-md border border-line px-3.5 py-2 text-sm text-navy-300">Next</span>
      </nav>
    </div>
  );
}
