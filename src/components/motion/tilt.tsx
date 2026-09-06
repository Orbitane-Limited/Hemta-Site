"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Subtle pointer tilt (max ~3deg, transform-only). Pointer devices with
 * no-reduced-motion only; inert on touch.
 */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { perspective: 1100 });
        gsap.set(card, { transformStyle: "preserve-3d" });
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          ry(relX * 6);
          rx(relY * -5);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        };
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
