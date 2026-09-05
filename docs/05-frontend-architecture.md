# Hemta Site — Frontend Architecture

> How the site is built: folder layout, component boundaries, motion strategy, and the quality gates every PR must pass.
> Stack (already installed): Next.js 16.3.4 App Router, TypeScript, Tailwind v4, shadcn/ui, GSAP + @gsap/react.
> Before writing Next.js code, consult the version-accurate docs in `node_modules/next/dist/docs/` or via the next-devtools MCP (this Next version has breaking changes vs. common knowledge).

## 1. Folder structure

```
src/
  app/
    layout.tsx          # fonts (next/font), metadata, theme class, <Nav/> + <Footer/>
    page.tsx            # assembles landing sections in order (server component)
    privacy/page.tsx    # stub in V1
    globals.css         # Tailwind v4 @theme tokens = THE design system source of truth
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    sections/           # one file per landing section, server components by default
      nav.tsx  hero.tsx  recovery-story.tsx  speed.tsx  browsers.tsx
      background-agent.tsx  feature-bento.tsx  privacy.tsx  faq.tsx
      download-cta.tsx  footer.tsx
    demo/               # the live "app window" component previews (client leaves)
      app-window.tsx    # macOS window chrome (traffic lights, toolbar)
      download-row.tsx  # one download: name, size, state chip, progress, speed
      segment-lanes.tsx # the parallel-segments visualization
    motion/             # reusable GSAP primitives (client leaves)
      reveal.tsx        # in-view fade/rise, stagger support
      pinned-scene.tsx  # pin + scrub wrapper (ScrollTrigger), used by recovery-story
      count.tsx         # animated numeric counter (mono, GB/MB/s values)
    ui/                 # shadcn/ui components (customized, never default-styled)
  content/
    site.ts             # ALL page copy + demo data, typed. No copy strings inside components.
  lib/
    gsap.ts             # gsap + ScrollTrigger registration, matchMedia helpers (single import point)
    utils.ts            # cn() etc.
docs/                   # these planning documents
public/                 # favicons, og fallback, browser logos (vendored SVGs)
```

Rules:
- **Copy lives in `content/site.ts`**, components receive it. One place to edit messaging, one place to audit honesty.
- **Sections are server components**; anything animated is an isolated `"use client"` leaf imported into them. No `"use client"` at section level unless the whole section is a scene (recovery-story).
- One icon family only: **lucide-react** (already a dependency via shadcn). Standardized `strokeWidth={1.75}`. No hand-rolled SVG icons; browser logos are vendored simple-icons SVGs in `public/logos/`.

## 2. Design tokens (Tailwind v4)

All tokens are defined in `globals.css` under `@theme` (colors, font families, radii, spacing extensions). The values come from `docs/03-design-system.md`. Components use semantic utilities only; **no raw hex in components, ever**. Corner radius: one scale, defined once, applied everywhere (Shape Consistency Lock).

## 3. Motion strategy: GSAP-only

We deliberately use **one** animation runtime. No Motion/Framer alongside GSAP; they fight over frames and double the bundle.

- Registration happens once in `lib/gsap.ts`; components import from there, never from `gsap` directly (guarantees plugins registered, SSR-safe).
- Component pattern: `useGSAP(() => {...}, { scope: ref })` from `@gsap/react` — automatic cleanup, scoped selectors.
- **Reduced motion is not optional.** Every animated component wraps its tweens in `gsap.matchMedia()`:
  ```ts
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => { /* tweens */ });
  mm.add("(prefers-reduced-motion: reduce)", () => { /* set final states instantly */ });
  ```
  Pinned scenes degrade to static storyboards, not to broken half-scenes.
- Pin/scrub scenes follow the canonical shape: `start: "top top"`, `pin: true`, `end: "+=<distance>"`, `invalidateOnRefresh: true`.
- Animate **transform and opacity only**. Progress bars animate via `scaleX` on a full-width bar, not `width`.
- Banned: `window.addEventListener("scroll")`, scroll math in React state, `useState` for continuous values.
- Budget: at most ONE pinned/scroll-hijacked scene per viewport-journey segment; the page has exactly two heavy scenes (Recovery Story pin, Speed viz) and lightweight reveals elsewhere. Every animation must answer "what does this communicate?" in one sentence or it gets cut.

## 4. The demo components (why they're not "fake screenshots")

The app repo is separate and its UI is in flux, so the site cannot use real screenshots yet. Instead of static div-mockups, `components/demo/` builds a **real, working component preview**: a miniature Hemta window whose download rows are driven by GSAP timelines through the actual product states (Queued → Downloading → Interrupted → Recovering → Completed). It is honest (states match the product brief), reusable (hero, recovery story, and bento cells all compose from the same rows), and replaceable (when real screenshots/recordings exist, they slot into `app-window.tsx`'s frame).
Demo numbers must look organic (8.4 GB, 34.2 MB/s) and are clearly demo data in `content/site.ts` (`// demo values, not claims`).

## 5. Responsiveness

- Breakpoints: Tailwind defaults. Containers: `max-w-7xl mx-auto px-4 md:px-6`.
- Hero uses `min-h-[100dvh]` (never `h-screen`); content fits the first viewport with CTA visible.
- Every multi-column section declares its `<768px` collapse explicitly in the same file (single column, stacked, pin scenes shortened or storyboarded on mobile if performance demands).
- Test at 375, 768, 1024, 1440 before calling any section done (Playwright MCP screenshots).

## 6. Performance budgets (hard gates)

- LCP < 2.5s (hero text is the LCP candidate by design; demo window enters after text paint)
- CLS < 0.1 (fonts via `next/font` with fallback metrics; all media has reserved space)
- INP < 200ms; JS: GSAP core + ScrollTrigger only (no ScrollSmoother in V1, no Three.js)
- Fonts self-hosted via `next/font`, `display: swap`, max 2 families (sans + mono), max ~4 weights total
- Lighthouse run (via `npm run build` + Playwright against prod build) before any "section done" claim

## 7. Accessibility gates

- WCAG AA contrast everywhere, including text over the demo window and state chips
- Semantic landmarks: `header/nav/main/section[aria-labelledby]/footer`; one `h1` (hero)
- Full keyboard path: nav, FAQ accordion, all CTAs; visible focus rings (token-defined)
- `prefers-reduced-motion` honored by every animated component (see §3)
- Demo windows are `aria-hidden` decorative OR get a proper text alternative describing the states shown

## 8. SEO / metadata

- Per-page `metadata` export; OG image via `opengraph-image.tsx` (dark app window + wordmark)
- `sitemap.ts` + `robots.ts` from day one
- Copy naturally carries the honest keywords: "download manager for macOS", "resume interrupted downloads", "segmented downloads", "Safari download manager". No keyword stuffing.

## 9. Quality workflow per section

1. Copy from `content/site.ts` (draft in `docs/02`), reviewed against the honesty walls
2. Build section (server component + client leaves)
3. Verify against `docs/03-design-system.md` tokens + the taste-skill pre-flight (no AI tells: no em-dashes in visible copy, eyebrow budget, layout-family uniqueness, contrast checks)
4. Playwright: desktop + mobile screenshot review, reduced-motion pass, keyboard pass
5. next-devtools MCP: zero build/runtime/type errors before moving on

## 10. Out of scope for V1 (explicit)

Blog/MDX pipeline, i18n, analytics (would contradict the zero-telemetry story unless owner chooses a privacy-preserving option deliberately), theme toggle (page ships with ONE locked theme per design doc), CMS. All revisitable post-launch.
