"use client";

import { useEffect, useRef, useState } from "react";
import type { StatDoc } from "@/lib/cms";

/** Animated count-up, triggered once when scrolled into view. */
function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const decimals = value % 1 !== 0 ? 1 : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatStrip({ stats }: { stats: StatDoc[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-navy-800 px-6 py-8 text-center lg:px-8 lg:py-10">
          <dd className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-white lg:text-5xl">
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </dd>
          <dt className="mt-2 text-sm font-medium uppercase tracking-wider text-white/55">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
