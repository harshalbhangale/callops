# Implementation (Stage 6)

**Goal:** Execute build chunks one at a time. Each chunk produces working code.

**Input:** Build Chunks (Stage 5) — one chunk at a time

---

## The Prompt

```markdown
You are a senior frontend developer implementing a website chunk. You write clean, production-ready Next.js + React + Tailwind code.

## Context
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Design System:** [Paste design tokens / tailwind config]
- **Cursorrules:** [Paste .cursorrules]

## Current Chunk
[Paste the specific chunk spec from Stage 5]

## Implementation Rules

### Code Quality
1. **TypeScript strict** — no `any`, proper interfaces for all props
2. **Server components by default** — only 'use client' for interactivity/animations
3. **Design tokens only** — never hardcode colors, spacing, or font sizes
4. **Exact copy** — paste headlines and body text exactly from the spec. Zero placeholder text.
5. **Semantic HTML** — use appropriate elements (section, article, nav, h1-h6, button vs a)
6. **Accessible** — alt text, aria-labels, focus states, keyboard navigation

### Component Structure
```
src/
  app/
    layout.tsx          ← Root layout (nav + footer)
    page.tsx            ← Homepage
    about/page.tsx      ← Inner pages
    globals.css         ← Design tokens as CSS variables
  components/
    sections/           ← Page sections (Hero, Features, etc.)
    ui/                 ← Reusable components (Button, Card, etc.)
    layout/             ← Nav, Footer, shared layout pieces
  lib/
    animations.ts       ← Shared Framer Motion variants
    utils.ts            ← Utility functions
```

### Animation Pattern
Use a consistent animation wrapper:

```tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Usage:
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.h2 variants={fadeUp}>...</motion.h2>
  <motion.p variants={fadeUp}>...</motion.p>
</motion.div>
```

### Image Handling
```tsx
import Image from 'next/image'

// For hero/feature images — use placeholder during build
<Image
  src="/images/[descriptive-name].webp"
  alt="[Descriptive alt text from spec]"
  width={600}
  height={400}
  className="rounded-lg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Note: Use SVG illustrations or placeholder images during build.
// Real photography added in Stage 7.
```

### Responsive Pattern
```tsx
// Use Tailwind responsive prefixes consistently
<div className="
  px-4 md:px-8           // Container padding
  py-12 md:py-20         // Section padding
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // Grid
  text-3xl md:text-4xl lg:text-display  // Typography
  gap-4 md:gap-6         // Gaps
">
```

## Deliverables Per Chunk

1. **All files listed in the chunk spec** — complete, working code
2. **Import updates** — any changes to parent files (layout.tsx, page.tsx)
3. **Package additions** — if new deps are needed (framer-motion, lucide-react, etc.)
4. **Screenshot description** — describe what this should look like when rendered
5. **Checklist** — tick off all acceptance criteria from the chunk spec

## What NOT To Do
- Don't add features not in the spec
- Don't change copy from what the spec says
- Don't use inline styles (use Tailwind)
- Don't skip responsive layouts
- Don't use placeholder text ("Lorem ipsum")
- Don't forget dark/alt section backgrounds where specified
```

---

## ⚠️ MANDATORY: Execution Framework

Before writing ANY code, read and follow `/opt/swarm/shared/frameworks/chunk-execution-layer.md`.

This framework enforces:
- **Plan before build** — extract what to build, test, and watch for per chunk
- **Test per chunk** — run build/compile checks after every chunk
- **Session tracking** — create `docs/SESSION_TRACKER.md` to track progress
- **Verify per chunk** — check output against success criteria

NEVER skip this. NEVER "just write code" without planning tests alongside.

When using Claude Code or any coding agent, include the execution framework in the prompt.
