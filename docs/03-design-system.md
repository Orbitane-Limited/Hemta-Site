# Hemta Site — Design System

> **Elevation pass (2026-09-06), supersedes conflicting rules below:** the site moved from flat-clean to premium-atmospheric. Additions: film grain overlay (fixed, 3.5%); scroll-progress-as-download-bar motif (top bar + mono %); floating glass island nav (detached pill) with full-screen staggered mobile menu; dot-grid + cobalt wash atmospheres on hero/page headers; double-bezel shells around all showcase windows (outer tray `rounded-[1.75rem]` `bg-foreground/[0.045]` p-2 ring, inner `rounded-[1.25rem]`); SplitText masked line reveals on all display headings; magnetic button-in-button pill CTAs (nested icon orb); pointer tilt on the hero window; hover lift + border/shadow shift on all cells; ONE marquee (file formats, dark passage only). **Radius rule v2:** buttons/CTAs pill, cards 18px (`rounded-2xl`), bezel shells 28px outer / 20px inner, chips pill. **Dark finale:** one deliberate theme descent per page (rounded-t-[3rem] `bg-window` sheet) running Privacy → marquee → CTA → footer (footer is dark site-wide, with ghost wordmark). **Pages:** `/` story, `/features` deep dive, `/download` conversion, `/privacy` manifesto. Hero headline accent: "finish." in cobalt.

> The visual contract. These values become `@theme` tokens in `src/app/globals.css` and are the only values components may use.
> Derived from `01-research.md`; structure enforced by the taste-skill consistency locks (one theme, one accent, one radius rule, one icon family).

## 1. Direction

**"Precision-calm, Mac-native, quietly confident."** A light, spacious, exact site where dark app windows carry the drama. The category looks like freeware; premium macOS looks like craft. Hemta's site must read as craft within 2 seconds: CleanShot-level trust, Linear-level typographic discipline, and motion no download-manager site has ever had.

Dials (taste-skill): `DESIGN_VARIANCE 7 / MOTION_INTENSITY 7 / VISUAL_DENSITY 3`.

### Theme decision (explicit)
- **V1 ships light, locked page-wide.** Light differentiates from hacker-utility aesthetics and carries trust, which this category lacks.
- The **demo app windows are dark** macOS windows. That is imagery contrast inside a light page, not a section theme flip, and it is where the accent glows.
- Tokens are defined as CSS variables so a full dark mode can ship post-launch without refactoring. (Flagged as an owner decision; if dual-mode is wanted in V1, budget roughly +30% polish time.)

## 2. Color

### 2.1 Neutrals (cool, macOS-adjacent; no pure black or pure white for text/bg pairings)

| Token | Value | Role |
|---|---|---|
| `bg` | `#FAFAFB` | Page background |
| `surface` | `#FFFFFF` | Cards, nav (with blur), bento cells |
| `ink` | `#16181D` | Headlines, primary text |
| `ink-secondary` | `#5A5F6A` | Body/secondary text (AA on bg and surface) |
| `ink-faint` | `#8B909B` | Captions, small print (large text only) |
| `border` | `#E5E7EB` | Hairlines, card borders |

### 2.2 Dark demo-window internals (imagery palette, never for page sections)

| Token | Value | Role |
|---|---|---|
| `window-bg` | `#101114` | Demo window canvas |
| `window-surface` | `#17181C` | Rows, toolbar |
| `window-border` | `#2A2C31` | Internal hairlines |
| `window-text` | `#F4F5F7` / `#9DA2AC` | Primary / secondary text inside windows |

### 2.3 Accent: Hemta Cobalt

| Token | Value | Role |
|---|---|---|
| `accent` | `#2144DF` | CTAs, links, active download state, progress bars, focus rings |
| `accent-hover` | `#1A37BE` | Hover/active on CTAs |
| `accent-tint` | `#EDF0FE` | Subtle tinted panels, selected states |

Rationale: deep electric cobalt. Blue is the trust color and the native macOS progress color; we own a deeper, more saturated cut than Apple system blue `#0A84FF` and clearly distinct from CleanShot's `#0d44e8` in execution (our blue lives inside dark windows and motion, theirs on white cards). Research verdict: we do not win on hue, we win on execution. **One accent page-wide, no exceptions** (Color Consistency Lock).

### 2.4 Product state colors (ONLY inside demo components, mirroring the real app lifecycle)

| State | Value | Note |
|---|---|---|
| Downloading | `accent #2144DF` | Progress fill, active chip |
| Completed | `#1D9A4E` | Chip + check; green appears nowhere else on the page |
| Interrupted / Recovering | `#C97A0A` | Deliberately calm amber: an interruption is routine for Hemta, not an alarm |
| Failed | `#D53535` | Rare; only in FAQ/story contexts |

Contrast gates: every text/background pair passes WCAG AA (4.5:1 body, 3:1 large text); white on `#2144DF` and chip texts on window surfaces must be verified at build with a contrast check, not eyeballed.

## 3. Typography

**Geist (sans) + Geist Mono**, self-hosted via `next/font`. SF-adjacent without imitating Apple, designed for interfaces, and the mono sibling is essential because this site is full of numbers (sizes, speeds, percentages).

| Style | Spec |
|---|---|
| Display (hero) | Geist 600, `text-6xl md:text-7xl` (hero headline is 3 words), `tracking-[-0.03em]`, `leading-[1.05]` |
| H2 (sections) | Geist 600, `text-3xl md:text-5xl`, `tracking-[-0.02em]` |
| H3 / feature titles | Geist 500, `text-xl` |
| Body | Geist 400, `text-base md:text-lg`, `leading-relaxed`, `max-w-[62ch]`, color `ink-secondary` |
| Numbers/data (all counters, sizes, speeds) | Geist Mono 500, `font-variant-numeric: tabular-nums` |
| Small print | Geist 400 `text-sm`, `ink-faint` |

Signature details (our "ss03 move"): tight negative tracking that increases with display size, and **every numeral on the page is tabular mono**. A counter that ticks without layout shift is the typographic embodiment of "precision downloads".

Weights loaded: 400, 500, 600 sans + 500 mono. Nothing else.

## 4. Shape, depth, spacing

- **Radius rule (documented, page-wide):** buttons & inputs `10px`, cards & demo windows `14px`, state chips full-pill. No other radii exist.
- **Shadows:** borders do most separation work. Two shadows exist:
  - `shadow-window`: `0 1px 2px rgb(22 24 29 / 0.05), 0 12px 32px rgb(22 24 29 / 0.10)` (demo windows only)
  - `shadow-cta`: `0 1px 2px rgb(33 68 223 / 0.25)` (primary button only)
  No glows, no colored halos.
- **Section rhythm:** `py-24 md:py-32`; hero `min-h-[100dvh]` with content vertically centered; container `max-w-7xl mx-auto px-4 md:px-6`.
- **Nav:** 64px, transparent at top, `bg-white/70 backdrop-blur-md border-b border-border` after 8px scroll (the one macOS-material moment; no glassmorphism anywhere else).

## 5. Iconography & imagery

- Icons: **lucide-react only** (already a dependency, shadcn-native), `strokeWidth={1.75}`, sizes 16/20/24. No second family, no hand-rolled SVGs.
- Browser logos: vendored simple-icons SVGs, monochrome `ink-secondary` at rest; logos only, no labels under them.
- Product imagery: the live demo windows (see architecture §4). No stock photos anywhere; this is a software product, its UI is the imagery.
- OG image: dark demo window + wordmark on `bg`.

## 6. Voice anchors (full copy rules in 02, §4)

Plain, confident, concrete, honest. The brand says "zero telemetry" like CleanShot says "trusted by 250,000 users": as a calm fact. Banned vocabulary: seamless, blazing, unleash, supercharge, next-gen, revolutionize, "up to N× faster". No em-dashes in any visible string.

## 7. What we deliberately avoid (from research)

SEO-string headlines, speed-multiplier claims, free-vs-pro comparison tables on the landing page, icon-grid feature lists, emoji as icons, award badges, "no malware" defensiveness, torrent/FTP imagery, default-blue-link aesthetics, dark-hacker theming, AI-purple gradients, glassmorphism-everywhere.

## 8. `@theme` mapping preview (implemented in globals.css at build start)

```css
@theme {
  --color-bg: #FAFAFB;
  --color-surface: #FFFFFF;
  --color-ink: #16181D;
  --color-ink-secondary: #5A5F6A;
  --color-ink-faint: #8B909B;
  --color-border: #E5E7EB;
  --color-accent: #2144DF;
  --color-accent-hover: #1A37BE;
  --color-accent-tint: #EDF0FE;
  --color-window-bg: #101114;
  --color-window-surface: #17181C;
  --color-window-border: #2A2C31;
  --color-state-done: #1D9A4E;
  --color-state-wait: #C97A0A;
  --color-state-fail: #D53535;
  --radius-control: 10px;
  --radius-card: 14px;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```
