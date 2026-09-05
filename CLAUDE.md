# Hemta Website — Project Rules

@AGENTS.md

## Stack

Next.js (App Router, TypeScript, Tailwind CSS v4, `src/` layout), shadcn/ui components, GSAP + @gsap/react for motion. MCP servers (figma, playwright, shadcn-ui) are registered in `.mcp.json`; design/animation skills live in `.claude/skills/`.

## What this repo is

The marketing/landing **website** for Hemta, a native macOS download manager (IDM-style). The actual app (UI + download engine) lives in a **separate repo** and is out of scope here. The product brief is `Hemta — Frontend Product Context & Functional Understanding.md` in the root — use it as the source of truth for messaging and feature storytelling.

## HARD RULE: No git / GitHub operations — EVER

The owner manages all git and GitHub activity **themselves, manually**, from their personal account. Claude must **never**:

- `git commit`, `git push`, `git pull`, `git fetch`, `git clone`, `git merge`, `git rebase`, `git reset`, `git tag`, or modify remotes
- use the `gh` CLI for anything
- suggest running these as a "next step" it performs itself

This is not a preference — an accidental commit/push from the wrong account is a serious problem for the owner. Deny rules enforcing this live in `.claude/settings.json`. Working with files, building, and running dev servers is all fine; version control is exclusively human-operated.

## Working agreements

- Design bar is high: smooth, best-in-class marketing site; GSAP-style motion is planned. Design-oriented MCPs may be attached by the owner.
- Honest marketing only: Hemta is HTTP/HTTPS downloads on macOS. Never imply torrents, FTP, crawling, cloud sync, or cross-platform support.
- Core messaging pillars: Speed (segmented downloads), Reliability/Recovery (hero feature), Native macOS feel, Local-first privacy (zero telemetry), works behind Safari/Chrome/Arc/Brave/Edge/Vivaldi/Opera.
