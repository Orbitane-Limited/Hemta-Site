"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { cn } from "cn";
import { gsap, SplitText, useGSAP, NO_PREF } from "@/lib/gsap";

type SplitHeadingProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
  /** Play immediately on mount (hero) instead of on scroll into view. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Masked line reveal for display type: lines rise out of an overflow mask
 * (0.9s, power4.out, 0.09 stagger). Splits after fonts load to avoid reflow.
 * Reduced motion: text simply visible, no split.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  className,
  children,
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(NO_PREF, () => {
        let split: SplitText | null = null;
        document.fonts.ready.then(() => {
          if (!el.isConnected) return;
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          });
          gsap.set(el, { visibility: "visible" });
          gsap.fromTo(
            split.lines,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.09,
              delay,
              ...(immediate
                ? {}
                : { scrollTrigger: { trigger: el, start: "top 80%", once: true } }),
            },
          );
        });
        return () => split?.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn("split-ready", className)}>
      {children}
    </Tag>
  );
}
