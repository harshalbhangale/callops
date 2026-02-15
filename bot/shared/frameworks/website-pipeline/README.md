# Website Build Pipeline

Lighter than the app pipeline. Design + copy first-class. No backend/DB/auth stages.

## ⚠️ Rebuild vs. New Build

**If rebuilding an existing site:** Stage 0 MUST capture the existing URL and Stage 3 MUST extract the design system from the live site first. The existing site's design is the default — changes are opt-in, not opt-out. Skipping this produces a site that looks nothing like the original.

## Pipeline Flow

```
0   Website Discovery        → Brand Brief
1   Sitemap & Architecture   → Content Architecture
2   Copy Generation          → Copy Deck
    ── ✅ APPROVAL GATE: Brand Brief + Copy confirmed ──
2.5 Technical Setup          → Tech decisions, hosting, services, env vars
3   Design System            → Tokens + tailwind.config.ts + globals.css
    ── ✅ APPROVAL GATE: Design System confirmed ──
4   Page Layouts             → Section-by-section layout specs
4.5 Build Docs               → .cursorrules + QUICK_START + project structure
5   Build Chunks             → Implementation-ready sprint document
    ── OUTPUT → feeds into Autonomous Build Template ──
6   Implementation           → Code (Claude Code executes chunks)
7   Review & Polish          → QA against all specs
```

## Files

| File | Stage |
|------|-------|
| `00-website-discovery.md` | Stage 0 |
| `01-sitemap-content-architecture.md` | Stage 1 |
| `02-copy-generation.md` | Stage 2 |
| `02b-technical-setup.md` | Stage 2.5 |
| `03-design-system.md` | Stage 3 |
| `04-page-layouts.md` | Stage 4 |
| `04b-build-docs.md` | Stage 4.5 |
| `05-build-chunks.md` | Stage 5 |
| `06-implementation.md` | Stage 6 |
| `07-review-polish.md` | Stage 7 |

## Stack
Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion

## Autonomous Build Integration

After running stages 0→5, the output specs folder contains everything needed for the Autonomous Build Template at `../autonomous-build/TEMPLATE.md`.

## Gap Analysis
See `GAP-ANALYSIS.md` for the full comparison against the app pipeline.
