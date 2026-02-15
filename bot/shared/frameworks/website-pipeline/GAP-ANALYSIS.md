# Website Pipeline vs App Pipeline — Gap Analysis

## The Question
Does the Website Pipeline (stages 0→7) produce specs detailed enough to feed into the Autonomous Build Template? Compared against the battle-tested App Pipeline (0→7).

---

## App Pipeline Outputs (What Goes Into `specs/`)
| Stage | Output Doc | Purpose |
|-------|-----------|---------|
| 0 Idea Validator | Project Brief | Vision, problem, audience, constraints |
| 1 Project Discovery | Detailed Brief | Deep-dive: users, flows, edge cases |
| 2 Feature Architect | MASTER_SPEC | Exhaustive feature list, user flows, edge cases, admin ops, error states, phase 1 vs roadmap |
| 2.5 Growth Architect | Growth Strategy | Acquisition, retention, virality (optional) |
| 3 Technical Architect | TECHNICAL_ARCHITECTURE | Stack, hosting, 3rd-party services, file structure, CI/CD |
| 3.5 Schema Architect | DATABASE_SCHEMA | Full Prisma schema, indexes, relations, enums |
| 4 Roadmap Architect | MODULE_BRIEFS | Phased modules with acceptance criteria |
| 5 Cursor Docs Gen | .cursorrules, QUICK_START, ARCHITECTURE, ENV_SETUP, etc. | AI-ready reference docs |
| 5.5 Design System | DESIGN_SYSTEM | Tokens, components, patterns |
| 6 Build Chunk Gen v3 | SPRINT_DOCUMENTS | 10-section chunks with tests, gotchas, data flows |
| 7 Implementation Plan | IMPLEMENTATION_PLAN + README | Progress tracker, navigation |

**Total output: ~12-15 documents, deeply cross-referenced**

---

## Website Pipeline Outputs (Current)
| Stage | Output Doc | Purpose |
|-------|-----------|---------|
| 0 Website Discovery | Brand Brief | Business, audience, voice, visual direction, competitor analysis |
| 1 Sitemap & Content | Content Architecture | Page tree, sections per page, navigation, user journeys |
| 2 Copy Generation | Copy Deck | All text: headlines, body, CTAs, metadata, microcopy |
| 3 Design System | Design System Tokens | Colors, typography, spacing, components, animations |
| 4 Page Layouts | Layout Specs | Section-by-section layout per page, responsive, animations |
| 5 Build Chunks | Build Chunks | Implementation-ready chunks per section/page |
| 6 Implementation | (executes chunks) | Code output |
| 7 Review & Polish | QA Checklist | Review against all specs |

**Total output: ~6-7 documents**

---

## 🔴 Critical Gaps (Must Fix)

### 1. No Technical Architecture Stage
**App pipeline has:** Full Technical Architect stage that decides stack, hosting, 3rd-party services, file structure, CI/CD, version choices.

**Website pipeline assumes:** Next.js + Tailwind + shadcn/ui + Framer Motion. No discussion. No hosting decision. No CI/CD. No env vars.

**Fix:** Add a **Stage 2.5: Technical Setup** (lightweight) that covers:
- Hosting decision (Vercel/Netlify/Cloudflare Pages)
- Package manager choice
- Deployment pipeline (GitHub → auto-deploy)
- Environment variables (analytics IDs, CMS keys, form endpoints)
- Third-party services (forms, analytics, CMS if any, image hosting)
- SEO tooling (sitemap generation, robots.txt, structured data approach)
- Domain + DNS setup plan

### 2. No .cursorrules / AI Reference Docs
**App pipeline has:** Cursor Docs Generator that produces `.cursorrules`, `QUICK_START`, `ARCHITECTURE`, `ENV_SETUP`, `TROUBLESHOOTING`, `TASK_ROUTER`.

**Website pipeline has:** Nothing equivalent. The build chunks reference a design system but there's no persistent rules file.

**Fix:** Add a **Stage 4.5: Build Docs Generator** that produces:
- `.cursorrules` — coding standards, component patterns, naming conventions, Tailwind rules
- `QUICK_START` — clone, install, dev, build
- Project structure reference
- Component naming conventions (when to use server vs client components)
- Image handling rules (next/image, lazy loading, formats)
- SEO rules (metadata per page, OG images, structured data patterns)

### 3. No Implementation Plan / Progress Tracker
**App pipeline has:** Implementation Plan Generator (stage 7) creating `IMPLEMENTATION_PLAN.md` + `README.md` with checkboxes, phases, milestones.

**Website pipeline goes:** Build Chunks → Implementation (just start coding). No tracking.

**Fix:** The Build Chunks stage (05) should output an `IMPLEMENTATION_PLAN.md` with ordered task list — or the autonomous build template handles this (it does, via `TODO.md`). But the chunks need to be structured so the template can consume them.

### 4. No Module Briefs / Roadmap Stage
**App pipeline has:** Roadmap & Module Architect that creates phased module briefs with acceptance criteria, QA criteria, and dependencies.

**Website pipeline has:** Page Layouts go straight to Build Chunks. No intermediate planning of *what order* to build things and *what "done" looks like per module*.

**Fix:** Stage 5 (Build Chunks) partially covers this, but needs to explicitly output:
- Build order with dependencies
- Acceptance criteria per chunk
- A "Sprint Summary" like the app pipeline's sprint documents

### 5. Copy Deck Has No Approval Gate
**App pipeline has:** Feature Architect includes a "Hard Stop" — explicit confirmation before proceeding.

**Website pipeline:** Copy generation (Stage 2) produces copy but doesn't enforce sign-off before design/layout stages consume it. Copy changes mid-build are catastrophic.

**Fix:** Add explicit approval gates at stages 0, 2, and 3 (Brand Brief ✓, Copy Deck ✓, Design System ✓) before proceeding.

---

## 🟡 Moderate Gaps

### 6. Design System Extraction is Shallow
**App pipeline's Design System Extraction** is optional but produces structured tokens.

**Website pipeline's Stage 3** is actually pretty good — it extracts colors, typography, spacing, components, and animation patterns from references. But it doesn't output a **`tailwind.config.ts`** or **`globals.css`** — it produces a markdown document.

**Fix:** Stage 3 should explicitly output:
- `tailwind.config.ts` (complete, ready to paste)
- `globals.css` (CSS variables, base styles)
- `shadcn/ui` theme configuration
- Component library decisions (which shadcn components to use)

### 7. No Form/Integration Handling
Websites often have: contact forms, newsletter signups, booking widgets, chat widgets, maps, social feeds.

**Current pipeline doesn't address:** Where form submissions go, what email service to use, CAPTCHA, GDPR consent, cookie banners.

**Fix:** Technical Setup stage (proposed 2.5) should cover this. Build chunks should explicitly handle forms as integration chunks.

### 8. No Content Management Strategy
Many websites need a CMS or at least structured content.

**Fix:** Discovery (Stage 0) should ask: "Will the client update content? If yes → CMS selection (Contentlayer, Sanity, Notion as CMS, MDX, etc.)." This feeds into Technical Setup.

### 9. No SEO-Specific Stage
SEO is mentioned in Review (Stage 7) as a checklist item but isn't planned into the architecture.

**Fix:** SEO requirements should be captured in Discovery and enforced in Build Chunks:
- URL structure (decided in Sitemap stage)
- Metadata per page (decided in Copy stage)
- Structured data / JSON-LD (decided in Technical Setup)
- Performance budget (decided in Technical Setup)
- OG images strategy (decided in Design System)

---

## 🟢 Things the Website Pipeline Does Well

1. **Copy before design** — Brilliant. Content-first approach means the design serves the message.
2. **Brand Brief is comprehensive** — Voice, visual direction, competitor analysis, conversion goals.
3. **Section-by-section layouts** — Very prescriptive, good for AI implementation.
4. **Animation specifications** — Framer Motion entrance animations defined per section.
5. **Responsive breakpoints** — Every layout spec includes desktop/tablet/mobile.
6. **Review stage is thorough** — Cross-references against all previous specs.

---

## Recommended Revised Pipeline

```
0   Website Discovery        → Brand Brief ✅ (add CMS question, SEO goals)
1   Sitemap & Architecture   → Content Architecture (add URL structure for SEO)
2   Copy Generation          → Copy Deck ✅ (add metadata + OG descriptions)
    ── APPROVAL GATE: Brand Brief + Copy Deck confirmed ──
2.5 Technical Setup (NEW)    → Technical Doc (hosting, services, env vars, SEO setup)
3   Design System            → Design Tokens + tailwind.config.ts + globals.css
    ── APPROVAL GATE: Design System confirmed ──
4   Page Layouts             → Layout Specs (unchanged, already solid)
4.5 Build Docs Gen (NEW)    → .cursorrules + QUICK_START + project structure
5   Build Chunks             → Sprint Document (10-section format from app pipeline)
    ── OUTPUT: Implementation-ready specs folder ──
    ── FEED INTO: Autonomous Build Template ──
6   Implementation           → Code (executed by Claude Code)
7   Review & Polish          → QA pass against all specs
```

**New stages: 2.5 (Technical Setup) and 4.5 (Build Docs Generator)**
**Modified stages: 0 (add CMS/SEO), 1 (add URLs), 2 (add metadata), 3 (add config files), 5 (use 10-section chunk format)**

---

## Autonomous Build Compatibility

After the revised pipeline runs stages 0→5, the output folder should contain:

```
specs/
├── brand-brief.md              (Stage 0)
├── content-architecture.md     (Stage 1)
├── copy-deck.md                (Stage 2)
├── technical-setup.md          (Stage 2.5)  ← NEW
├── design-system.md            (Stage 3)
├── tailwind.config.ts          (Stage 3)    ← NEW
├── globals.css                 (Stage 3)    ← NEW
├── page-layouts.md             (Stage 4)
├── .cursorrules                (Stage 4.5)  ← NEW
├── QUICK_START.md              (Stage 4.5)  ← NEW
└── sprint-document.md          (Stage 5 — 10-section chunks)
```

This folder drops straight into the Autonomous Build Template's `./specs/` directory.

Claude Code reads all specs → generates `TODO.md` → builds autonomously.

---

## Priority of Fixes

1. **Write Stage 2.5 prompt** (Technical Setup) — blocks everything downstream
2. **Write Stage 4.5 prompt** (Build Docs Gen) — .cursorrules is critical for chunk quality
3. **Update Stage 3** to output actual config files, not just markdown
4. **Update Stage 5** to use the 10-section chunk format from app pipeline
5. **Add approval gates** to pipeline flow
6. **Update Stages 0-2** with minor additions (CMS, URLs, metadata)
