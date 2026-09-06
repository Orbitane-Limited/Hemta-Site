"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, NO_PREF } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animate direct children with a stagger instead of the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  /** Play on mount (hero/page headers) instead of on scroll into view. */
  immediate?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Standard in-view reveal (docs/04 §3): opacity 0->1, y 20->0, 0.6s power3.out,
 * fires once at "top 75%". Under prefers-reduced-motion nothing animates.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  immediate = false,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(NO_PREF, () => {
        gsap.from(stagger ? Array.from(el.children) : el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          stagger: stagger ? 0.07 : 0,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
