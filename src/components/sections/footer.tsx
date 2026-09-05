import { ArrowDown } from "lucide-react";
import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <a href="#" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
                <ArrowDown aria-hidden strokeWidth={2.25} className="size-4 text-primary-foreground" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight">{site.name}</span>
            </a>
            <p className="mt-3 max-w-[36ch] text-sm text-muted-foreground">{footer.tagline}</p>
          </div>
          <div className="flex gap-16">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-12 text-sm text-faint">{footer.copyright}</p>
      </div>
    </footer>
  );
}
