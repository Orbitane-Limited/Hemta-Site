# Hemta Site — Competitive & Reference Research

> Condensed from a live-fetch research pass (2026-09-06) over 5 download-manager sites and 5 premium macOS/dev-tool sites. Full per-site notes below; decisions derived from this live in `03-design-system.md`.

## 1. The category (what visitors expect, and what we must NOT look like)

| Site | Vibe | The tell |
|---|---|---|
| Folx | SEO feature-catalog | Headline is a search string ("Free download manager for Mac"); 19-row free-vs-pro table |
| Downie | Honest indie, zero visual ambition | Emoji as feature icons; system-sans everything |
| Motrix | Modern but utilitarian OSS | Markets torrents/FTP openly (scope Hemta explicitly rejects) |
| IDM | Early-2000s | "Up to 8 times!" claims, award badges from 2005, text walls |
| Free Download Manager | Generic freeware | Says "No adware No malware" on its own homepage |

**Category defaults:** light theme, no owned accent (or default blue), system sans, fully static pages, icon grids + comparison tables, defensive trust signals. The category is visually fighting a sketchy-software reputation.

**Openings for Hemta:** nobody has a memorable accent, custom-feeling type, motion, or a designed hero moment. Nobody visualizes recovery, the one feature users emotionally care about. FDM even relegates macOS to an afterthought.

## 2. The premium references (patterns to adopt)

| Site | Theme | Verified specifics |
|---|---|---|
| CleanShot X | Light | Accent electric blue `#0d44e8` on white; attitude headline ("There are average capture apps. And there's CleanShot."); trust stack: 250k+ users, logo wall (Panic, Linear, Vercel), ISO badge, guarantee. **Closest analog to what Hemta should be.** |
| Raycast | Dark | bg `#040506`, accent coral `#ff6363`, Inter + `ss03`; hero shows the *mechanism* (animated keyboard), not a screenshot |
| Linear | Near-achromatic | Inter Variable + `cv01`/`ss03`, Inter Display headings, weights 300/510/590, display tracking tightens with size (-1.056px @48px) |
| Things | Light | Premium via restraint + whitespace; Apple Design Award trust; proof whitespace alone reads "native" but leaves no brand memory |
| Arc | Light | Historical reference only (superseded by Dia); quote-as-headline hero pattern |

**The seven premium patterns:**
1. One owned accent on a disciplined neutral base, used everywhere
2. Typography with a signature detail (stylistic sets, tight display tracking), never default
3. Hero shows the mechanism, not a flat screenshot
4. Attitude headline, not an SEO string or a speed claim
5. Named/specific social proof, never anonymous star widgets
6. Bento/feature architecture containing real product UI
7. Platform-native trust cues (device frames, notarization, guarantees) stated with confidence

## 3. Positioning conclusion

**Hemta = the CleanShot of download managers.** Light-first (separates us from hacker-utility torrent aesthetics, reads Mac-native and trustworthy), one electric accent, signature typography, and GSAP motion that demonstrates the two mechanisms no competitor shows: segments racing in parallel, and a download surviving an interruption and resuming from where it stopped. Trust is stated CleanShot-style ("zero telemetry, local-first" as a confident fact), never FDM-style defensiveness.

Differentiation does NOT come from an exotic hue; it comes from execution: motion, typography, the recovery story, and honesty as a design principle.

## 4. Sources

Direct page fetches (all Group A; CleanShot, Things, Linear, Arc), plus design-token references for Raycast and Linear:
- https://oh-my-design.kr/design-systems/raycast
- https://github.com/VoltAgent/awesome-design-md (raycast, linear.app DESIGN.md)
- https://designmd.cc/benchmarks/linear
- https://typ.io/s/2jmp (Inter on linear.app)

Caveats: Raycast palette verified via token sources after an initial fetch misreported its theme; Things' animation reputation is inferred from on-page review quotes.
