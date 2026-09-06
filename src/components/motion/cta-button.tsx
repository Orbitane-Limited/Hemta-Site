"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "cn";
import { gsap, useGSAP } from "@/lib/gsap";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  /** "down" for download intents, "right" for navigation intents */
  icon?: "down" | "right";
  /** Softer style for secondary actions */
  variant?: "primary" | "ghost";
  magnetic?: boolean;
  className?: string;
};

/**
 * Island pill CTA with a nested icon orb (button-in-button) and optional
 * magnetic hover (max 5px pull, transform-only, pointer devices with
 * no-reduced-motion only). Press = physical scale.
 */
export function CtaButton({
  href,
  children,
  icon = "down",
  variant = "primary",
  magnetic = false,
  className,
}: CtaButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = icon === "down" ? ArrowDown : ArrowRight;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !magnetic) return;
      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          xTo(relX * 5);
          yTo(relY * 4);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
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

  const isInternal = href.startsWith("/");
  const Comp = isInternal ? Link : "a";

  return (
    <Comp
      ref={ref as never}
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-3 rounded-full pr-1.5 pl-6 text-[15px] font-medium transition-[background-color,box-shadow,transform] duration-500 ease-[var(--ease-fluid)] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]",
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-cta hover:bg-[#1e3ecb] hover:shadow-glow"
          : "border border-border bg-card text-foreground shadow-float hover:border-foreground/20",
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105",
          variant === "primary" ? "bg-white/15" : "bg-muted",
        )}
      >
        <Icon aria-hidden strokeWidth={2} className="size-4" />
      </span>
    </Comp>
  );
}
