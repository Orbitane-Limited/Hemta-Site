"use client";

import { useRef } from "react";
import { gsap, useGSAP, NO_PREF } from "@/lib/gsap";
import { stats } from "@/content/site";

/**
 * Opening beat of the dark finale: three honest numbers counting up in
 * giant tabular mono. Reduced motion: final values rendered.
 */
export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        el.querySelectorAll<HTMLElement>("[data-count]").forEach((numEl) => {
          const target = Number(numEl.dataset.count ?? 0);
          const obj = { value: 0 };
          gsap.to(obj, {
            value: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: numEl, start: "top 85%", once: true },
            onUpdate: () => {
              numEl.textContent = String(Math.round(obj.value));
            },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-4 pt-24 md:px-6 md:pt-32">
      <dl className="grid gap-10 border-b border-window-border/60 pb-16 md:grid-cols-3 md:gap-6 md:pb-20">
        {stats.items.map((stat) => (
          <div key={stat.label}>
            <dd className="font-mono text-6xl font-medium tracking-[-0.03em] tabular-nums text-window-text md:text-8xl">
              <span data-count={stat.value}>{stat.value}</span>
              {stat.suffix}
            </dd>
            <dt className="mt-3 text-[15px] text-window-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
