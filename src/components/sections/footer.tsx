import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { footer, site } from "@/content/site";

/** Dark closer with a ghost wordmark. Continuous with the dark finale sheet on the home page. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-window">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-40 md:px-6 md:pt-20 md:pb-56">
        <div className="flex flex-col justify-between gap-10 border-t border-window-border pt-12 md:flex-row">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <span className="flex size-7 items-center justify-center rounded-full bg-primary">
                <ArrowDown aria-hidden strokeWidth={2.25} className="size-4 text-primary-foreground" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-window-text">
                {site.name}
              </span>
            </Link>
            <p className="mt-3 max-w-[36ch] text-sm text-window-muted">{footer.tagline}</p>
          </div>
          <div className="flex gap-16">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-sm font-medium text-window-text">{column.title}</h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-window-muted transition-colors duration-300 hover:text-window-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-12 text-sm text-window-muted/70">{footer.copyright}</p>
      </div>
      {/* Ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[0.23em] text-center text-[26vw] leading-none font-semibold tracking-[-0.04em] text-white/[0.035] select-none"
      >
        {site.name}
      </div>
    </footer>
  );
}
