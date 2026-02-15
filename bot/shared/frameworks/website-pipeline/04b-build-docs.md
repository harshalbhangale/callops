# Build Docs Generator (Stage 4.5)

**Goal:** Produce the AI reference files that Claude Code needs to build consistently — coding rules, project structure, and quick start guide. Light touch for a website.

**Input:** Brand Brief (Stage 0) + Technical Setup (Stage 2.5) + Design System (Stage 3) + Page Layouts (Stage 4)

---

## The Prompt

```markdown
You are generating build reference docs for a website project. These files will guide an AI coding agent (Claude Code) during autonomous implementation. Keep them concise — this is a website, not a platform.

## Inputs
- **Technical Setup:** [Paste — for stack, services, env vars]
- **Design System:** [Paste — for tokens, component patterns]
- **Content Architecture:** [Paste — for page list]

## Generate These Files

### File 1: .cursorrules

Project-specific coding rules. Include:

**Project Context:**
- One-line description of the site
- Stack summary (Next.js 14, TypeScript, Tailwind, shadcn/ui, Framer Motion)
- Content strategy (static/MDX/CMS)

**Component Rules:**
- Server Components by default, 'use client' only for interactivity/animations
- Component naming: PascalCase, one component per file
- Props: TypeScript interfaces, no `any`
- Colocation: page-specific components live next to their page

**Styling Rules:**
- Design tokens only — reference CSS variables or Tailwind config, never hardcode values
- Responsive: mobile-first, breakpoints at sm/md/lg/xl
- No inline styles, no CSS modules — Tailwind only
- Use `cn()` utility for conditional classes

**Content Rules:**
- All copy comes from the Copy Deck — never invent placeholder text
- All images need descriptive alt text
- All external links open in new tab with rel="noopener noreferrer"

**SEO Rules:**
- Every page exports metadata (title, description, OG image)
- Semantic HTML: proper heading hierarchy (one h1 per page), section/article/nav
- next/image for all images (lazy loading, WebP)

**Animation Rules:**
- Framer Motion for entrance animations
- Respect prefers-reduced-motion
- Keep animations subtle (0.3-0.6s duration, ease-out)

**Quality Rules:**
- Zero TypeScript errors
- No console.log in committed code
- No TODO comments — finish it or don't start it

### File 2: QUICK_START.md

```markdown
# [Project Name]

## Setup
git clone [repo]
cd [project]
pnpm install
cp .env.example .env.local
# Fill in env vars (see Technical Setup)
pnpm dev

## Commands
- `pnpm dev` — Start dev server (localhost:3000)
- `pnpm build` — Production build
- `pnpm lint` — ESLint check
- `pnpm format` — Prettier format

## Project Structure
src/
├── app/                  # Pages (App Router)
│   ├── layout.tsx        # Root layout (nav + footer)
│   ├── page.tsx          # Homepage
│   ├── about/page.tsx    # [list all pages from Content Architecture]
│   └── globals.css       # CSS variables + base styles
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── sections/         # Page sections (Hero, Features, CTA, etc.)
│   └── layout/           # Nav, Footer, shared layout
├── lib/
│   └── utils.ts          # cn() utility, helpers
└── public/               # Static assets, images, favicon
```

Adjust the page list based on the actual Content Architecture.

### File 3: tailwind.config.ts

Generate a complete Tailwind config from the Design System tokens:
- Colors (all CSS variable references)
- Typography (font families, sizes, weights)
- Spacing (if custom beyond Tailwind defaults)
- Border radius values
- Animation keyframes for Framer Motion entrance effects
- Container/max-width values
- Breakpoints (if custom)

### File 4: globals.css

Generate the CSS file:
- CSS custom properties for all design tokens (colors, fonts)
- @font-face declarations or Google Fonts import
- Base layer styles (body, headings, links)
- shadcn/ui theme variables

## Output

Deliver all 4 files as complete, copy-paste-ready content. No placeholders — use actual values from the Design System and Technical Setup.
```

---

## What Comes Next

These files go into the project root alongside the specs. When Claude Code starts the autonomous build, it reads `.cursorrules` first and follows those rules for every task.

Take everything to **Stage 5: Build Chunks** — the chunks can now reference `.cursorrules` patterns.

---

**Version:** 1.0
**Created:** 2026-02-14
