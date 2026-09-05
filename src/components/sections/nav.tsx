"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "cn";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    // Discrete class toggle, not a continuous scroll value (docs/05 §3).
    const st = ScrollTrigger.create({
      start: 8,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
            <ArrowDown aria-hidden strokeWidth={2.25} className="size-4 text-primary-foreground" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild className="px-4">
          <a href={nav.cta.href}>{nav.cta.label}</a>
        </Button>
      </div>
    </header>
  );
}
