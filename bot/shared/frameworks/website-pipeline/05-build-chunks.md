# Website Build Chunk Generator (Stage 5)

**Goal:** Turn page layouts + design system + copy into implementation-ready build chunks.

**Input:** All previous stages (Brand Brief, Content Architecture, Copy Deck, Design System, Page Layouts)

---

## The Prompt

```markdown
You are a senior frontend architect creating implementation chunks for a website build. The site uses Next.js (App Router) + React + Tailwind CSS + shadcn/ui + Framer Motion.

## Inputs
[Paste all previous stage outputs]

## Chunk Generation Rules

### Chunk Ordering
1. **Foundation first:** Project setup, design system tokens, shared layout (nav + footer)
2. **Homepage sections:** Build the homepage section by section (hero → features → social proof → CTA)
3. **Inner pages:** One chunk per page (or split large pages into 2 chunks)
4. **Global polish:** SEO metadata, OG images, 404 page, animations polish, performance

### Chunk Size
- Each chunk should take 15-30 minutes to implement with AI assistance
- One chunk = one logical unit (a section, a page, a component)
- Never mix unrelated concerns in one chunk

### Chunk Format

For each chunk, output:

---

## Sprint [N] — [Sprint Theme]

### Chunk [N.M]: [Chunk Name]

**What we're building:** [One sentence]

**Files to create/modify:**
```
src/app/page.tsx (or specific page)
src/components/sections/[SectionName].tsx
src/components/ui/[Component].tsx (if new)
```

**Design Tokens Used:**
- Colors: `var(--color-primary)`, `var(--color-bg-secondary)`
- Typography: `text-display`, `font-heading`
- Spacing: `section-padding-y`, `space-8`
- Animation: `fade-up, stagger 100ms`

**Copy (exact):**
```
Headline: "[Paste exact headline from copy deck]"
Subheadline: "[Paste exact subheadline]"
CTA: "[Paste exact CTA text]"
Body: "[Paste body copy]"
```

**Layout Spec:**
```
[Paste ASCII layout from Page Layouts stage]
```

**Responsive Rules:**
- Desktop: [specific layout]
- Tablet: [changes]
- Mobile: [changes]

**Animation Spec:**
- [Element]: [animation type], delay [X]ms, duration [X]ms
- Trigger: viewport entry, threshold 0.2

**Component Props:**
```typescript
interface [Component]Props {
  // Define if this is a reusable component
}
```

**Acceptance Criteria:**
- [ ] Matches layout spec at all breakpoints
- [ ] Copy is exact (no placeholder text)
- [ ] Design tokens used (no hardcoded colors/sizes)
- [ ] Animations trigger on scroll
- [ ] Accessible (semantic HTML, alt text, contrast)
- [ ] [Section-specific criteria]

**Integration Points:**
- Depends on: [Chunk X.Y — what must exist first]
- Used by: [What future chunks reference this]

---

### Sprint Structure

**Sprint 1: Foundation**
- Chunk 1.1: Project scaffolding (Next.js, Tailwind config, fonts, globals.css with design tokens)
- Chunk 1.2: Shared layout (Nav component + Footer component)

**Sprint 2: Homepage**
- Chunk 2.1: Hero section
- Chunk 2.2: Features/Benefits section
- Chunk 2.3: Social proof / Testimonials section
- Chunk 2.4: CTA banner section
- [Additional homepage sections]

**Sprint 3-N: Inner Pages**
- One chunk per page (or 2 for complex pages)

**Sprint N+1: Polish**
- SEO metadata + OG images
- 404 page
- Animation polish pass
- Performance audit (images, fonts, Core Web Vitals)
- Accessibility pass

### Dependencies
List chunk dependencies clearly:
```
1.1 → 1.2 → 2.1 (sequential)
2.2, 2.3, 2.4 (parallel after 2.1)
3.x depends on 1.2 (shared layout)
```

### Cursorrules Generation
Also output a `.cursorrules` file for the project:

```
# Project: [Name]
# Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion

## Design System
- ALWAYS use design tokens from globals.css (never hardcode colors, sizes, or fonts)
- Use Tailwind classes mapped to the custom theme
- Section spacing: py-20 (desktop), py-12 (mobile)

## Components
- All sections go in src/components/sections/
- Reusable UI in src/components/ui/ (shadcn pattern)
- Use 'use client' only when needed (animations, interactions)

## Copy
- ALL copy comes from the copy deck — never write placeholder text
- If copy is missing, leave a TODO comment and flag it

## Animations
- Use Framer Motion for scroll animations
- Consistent entrance: fade-up, 20px distance, 500ms duration
- Stagger children by 100ms
- Use viewport detection with threshold 0.2

## Images
- Use next/image for all images
- Provide width/height or fill
- Use placeholder="blur" where possible

## Accessibility
- Semantic HTML (section, article, nav, main, footer)
- All images need alt text
- Buttons need aria-labels if icon-only
- Color contrast must meet WCAG AA

## SEO
- Each page has generateMetadata()
- OG image for each page
- Structured data where applicable
```
```
