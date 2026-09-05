# Hemta Site — Planning Docs

Read in order. These documents are the contract for the build; sections/PRs that contradict them need a doc change first, not a silent exception.

| Doc | What it locks down | Status |
|---|---|---|
| [01-research.md](01-research.md) | Competitive landscape: what download-manager sites look like, what premium macOS sites do, where Hemta positions | done |
| [02-sitemap-and-sections.md](02-sitemap-and-sections.md) | Mindmap, page tree, all 11 landing sections with purpose + working copy | done |
| [03-design-system.md](03-design-system.md) | Direction, palette, typography, spacing, radii — becomes `@theme` tokens in `globals.css` | done |
| [04-motion-spec.md](04-motion-spec.md) | Motion personality, the two hero scenes beat-by-beat, reveal defaults, enforcement checklist | done |
| [05-frontend-architecture.md](05-frontend-architecture.md) | Folder structure, component boundaries, GSAP strategy, perf/a11y gates, workflow | done |

Non-negotiables that apply across all docs:

1. **Honest marketing only.** HTTP/HTTPS downloads on macOS. Never imply torrents, FTP, crawling, cloud sync, or cross-platform.
2. **Git is human-operated.** No git/gh commands from Claude, ever (enforced in `.claude/settings.json`).
3. **One theme, one accent, one radius scale, one icon family, one animation runtime.** Consistency locks from the design system are page-wide.
4. **The product brief** (`Hemta — Frontend Product Context & Functional Understanding.md`, repo root) outranks these docs on any factual claim about the product.
