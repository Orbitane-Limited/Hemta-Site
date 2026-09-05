# Hemta Site — Motion Spec

> What moves, why it moves, and the exact values. GSAP + ScrollTrigger only (see architecture §3).
> Governing idea: **motion demonstrates the product's virtues (persistence, precision, calm recovery) instead of decorating the page.** If an animation doesn't communicate hierarchy, story, feedback, or state change, it doesn't ship.

## 1. Motion personality

Hemta is a native macOS utility. The motion language is **calm, physical, exact** — Apple-adjacent, not Awwwards-chaotic.

- Default ease: `power3.out` for entrances, `power2.inOut` for state changes, `none` for scrubbed timelines
- Default durations: 0.5–0.7s entrances, 0.3s state flips, 0.15s hovers
- Stagger: 0.06–0.08s between siblings
- Distances: small and precise — 16–24px rises, never 100px slides
- Nothing loops forever except a subtle "downloading" progress shimmer inside demo windows (it conveys live state, the one justified perpetual motion)
- Zero: bounce/elastic eases, parallax-for-its-own-sake, cursor effects, scroll-jack outside the two designated scenes

## 2. The two hero scenes (heavy motion budget)

### 2.1 Recovery Story (pinned, scrubbed) — THE signature
Purpose: storytelling. The visitor *feels* an interruption survive.

- Structure: `pinned-scene.tsx` pins the section for ~2.5 viewport-heights of scroll, one master timeline scrubbed by ScrollTrigger (`scrub: 0.8` for slight smoothing)
- Beats (timeline positions):
  - 0.00–0.30 progress bar animates 62% → 70% (`scaleX`), byte counter counts up in mono, speed value ticks
  - 0.30–0.45 interruption: Wi-Fi glyph dims, speed collapses to 0, bar's leading edge stops pulsing, state chip flips Downloading → Interrupted (color: accent → warning-neutral)
  - 0.45–0.55 the contrast beat: ghosted browser-style "Download failed" card drifts in at low opacity, then slides away as Hemta's chip flips to Recovering
  - 0.55–0.70 recovery: connection re-establishes, chip → Downloading, speed counts back up
  - 0.70–1.00 completion: bar reaches 100%, chip → Completed, gentle settle (scale 1.01 → 1.0), copy beat fades in
- Reduced motion: pin removed; three static frames (interrupted / recovering / completed) stacked vertically with plain captions
- Mobile: pin distance shortened to ~1.8 viewport-heights; all transforms identical

### 2.2 Speed / segmentation (in-view, play-once)
Purpose: explaining the mechanism.

- Trigger: `ScrollTrigger` with `start: "top 70%"`, plays once (no scrub) — an explanation should complete itself, not depend on the visitor's scroll finesse
- One file bar splits into 5 segment lanes (`y` + `scaleX` transforms), lanes fill concurrently at organic different rates, then merge into one completed bar
- A faint single-lane comparison fills sequentially alongside, ~3x slower, labeled "one connection" — the honesty is the design
- Duration: ~4s total; replayable via a subtle replay affordance
- Reduced motion: final state rendered immediately (split lanes shown filled + merged bar)

## 3. Standard reveals (light motion budget)

Every other section uses `reveal.tsx` only:

- `opacity 0→1`, `y 20→0`, `duration 0.6`, `ease power3.out`, `stagger 0.07`, fire at `top 75%`, once
- Bento cells, FAQ items, browser logos, footer columns all use this and nothing else
- Nav: background transitions transparent → translucent blur at `scrollY > 8` via ScrollTrigger toggle (class swap, CSS transition 0.25s)

## 4. Micro-interactions (CSS-first)

- Buttons: `:hover` slight brightness/translate (`-translate-y-px`), `:active scale-[0.98]`, transition 150ms — tactile push, no glow
- Cards/bento cells: border-color shift on hover, no lift-shadows-everywhere
- FAQ accordion: shadcn default timing customized to 0.25s `power2.inOut`
- Demo window state chips: color/label crossfade 0.3s — these are the product's states, treat them with UI-grade precision, not marketing flair

## 5. Enforcement checklist (every animated PR)

- [ ] One-sentence justification written in the PR/commit context for each new animation
- [ ] `gsap.matchMedia` reduced-motion branch present and verified (Playwright with `prefers-reduced-motion: reduce`)
- [ ] Only `transform`/`opacity` animated; no layout properties
- [ ] Cleanup via `useGSAP` scope (no orphaned ScrollTriggers on route change; verify with ScrollTrigger.getAll() in dev)
- [ ] 60fps on mid-tier hardware: test with 6x CPU throttle in devtools; drop effect if it stutters
- [ ] Scene works at 375px width or has an explicit mobile variant
