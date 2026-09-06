"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { AppIcon } from "@/components/brand/app-icon";
import { nav, site } from "@/content/site";

/**
 * Floating glass island nav (detached pill) + full-screen staggered menu on
 * mobile with a hamburger-to-X morph. Backdrop blur only on fixed elements.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const links = overlay.querySelectorAll("[data-menu-link]");
      const mm = gsap.matchMedia();

      if (open) {
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.fromTo(
            overlay,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
          );
          gsap.fromTo(
            links,
            { y: 48, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: "power4.out", stagger: 0.07, delay: 0.1 },
          );
        });
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(overlay, { autoAlpha: 1 });
          gsap.set(links, { y: 0, autoAlpha: 1 });
        });
      } else {
        gsap.set(overlay, { autoAlpha: 0 });
      }
    },
    { dependencies: [open], scope: overlayRef },
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
        <div className="flex h-14 w-full max-w-3xl items-center justify-between gap-1 rounded-full border border-border/70 bg-background/70 px-2 shadow-float backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-full px-3 py-2"
            aria-label={`${site.name} home`}
            onClick={() => setOpen(false)}
          >
            <AppIcon className="size-8" />
            <span className="text-[17px] font-semibold tracking-tight">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center md:flex">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href={nav.cta.href}
              className="hidden h-10 items-center rounded-full bg-primary px-4.5 text-sm font-medium text-primary-foreground shadow-cta transition-[background-color,box-shadow] duration-500 ease-[var(--ease-fluid)] hover:bg-[#1e3ecb] hover:shadow-glow md:inline-flex"
            >
              {nav.cta.label}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-4.5 rounded-full bg-foreground transition-transform duration-500 ease-[var(--ease-fluid)]",
                  open ? "rotate-45" : "-translate-y-[3.5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-4.5 rounded-full bg-foreground transition-transform duration-500 ease-[var(--ease-fluid)]",
                  open ? "-rotate-45" : "translate-y-[3.5px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        ref={overlayRef}
        className={cn(
          "invisible fixed inset-0 z-30 bg-background/90 backdrop-blur-2xl md:hidden",
          !open && "pointer-events-none",
        )}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-center gap-2 px-8 pt-16"
        >
          {[...nav.links, { label: nav.cta.label, href: nav.cta.href }].map((link) => (
            <Link
              key={link.href}
              data-menu-link
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-4xl font-semibold tracking-[-0.02em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
