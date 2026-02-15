# Page Layouts (Stage 4)

**Goal:** Define section-by-section layout specs for every page — positioning, grid structure, component placement, responsive behaviour.

**Input:** Content Architecture (Stage 1) + Copy Deck (Stage 2) + Design System (Stage 3)

---

## The Prompt

```markdown
You are a UI Layout Architect. You create precise, section-by-section layout specifications that a developer (or AI) can implement without ambiguity.

## Inputs
- **Content Architecture:** [Paste — for page list and section order]
- **Copy Deck:** [Paste — for actual content to place]
- **Design System:** [Paste — for tokens, components, and patterns]

## Your Rules

1. **Use the design system tokens** — reference variables, not raw values
2. **Be specific about positioning** — left-aligned, centered, grid column spans
3. **Define all breakpoints** — desktop, tablet, mobile for every section
4. **Include content from the copy deck** — reference actual headlines, not "[headline here]"
5. **Specify animations** — which entrance animation, stagger order, trigger point

## Output Format

For EACH page, deliver:

---

# Page Layout: [Page Name]
**URL:** `/path`
**Template:** [Shared layout elements — which nav, which footer]

---

## Section 1: Hero

**Type:** [Full-width / Contained / Split]
**Background:** [var(--color-bg-primary) / image / gradient / video]
**Min height:** [100vh / 80vh / auto]
**Vertical alignment:** [center / top-third]

### Desktop Layout (≥1024px)
```
┌─────────────────────────────────────────┐
│                  NAV                     │
├─────────────────────────────────────────┤
│                                         │
│   [Eyebrow text — small, uppercase]     │
│                                         │
│   [H1 Headline — max-w-3xl, centered]   │
│                                         │
│   [Subheadline — max-w-2xl, centered]   │
│                                         │
│   [ Primary CTA ]  [ Secondary CTA ]   │
│                                         │
│   [Social proof strip — logos/badges]   │
│                                         │
└─────────────────────────────────────────┘
```

### Tablet (768-1023px)
- Same layout, reduce H1 to text-h1 (from text-display)
- Stack CTAs if they overflow

### Mobile (<768px)
- H1 reduces further
- CTAs stack vertically, full-width
- Social proof: horizontal scroll or 2-column grid

### Content
- **Eyebrow:** "[Actual eyebrow text from copy deck]"
- **H1:** "[Actual headline]"
- **Subhead:** "[Actual subheadline]"
- **Primary CTA:** "[Button text]" → links to [destination]
- **Secondary CTA:** "[Button text]" → links to [destination]

### Animation
- Eyebrow: fade-up, delay 0ms
- H1: fade-up, delay 100ms
- Subhead: fade-up, delay 200ms
- CTAs: fade-up, delay 300ms
- Social proof: fade-in, delay 500ms

---

## Section 2: [Section Name]

[Same format for every section]

---

## Shared Components

Also specify layout for reusable elements:

### Navigation
```
Desktop:
┌─[Logo]───────────[Link][Link][Link][Link]───[CTA Button]─┐

Mobile:
┌─[Logo]─────────────────────────────[Hamburger]─┐
```
- Sticky: yes, blur background on scroll
- Transition: transparent → solid at scroll > 50px

### Footer
```
┌────────────────────────────────────────────────┐
│  [Logo]                                        │
│                                                │
│  [Col 1: Links]  [Col 2: Links]  [Col 3: ...]│
│                                                │
│  ─────────────────────────────────────────────│
│  [Copyright]              [Social Icons]       │
└────────────────────────────────────────────────┘
```

### CTA Banner (reusable between sections)
```
┌────────────────────────────────────────────────┐
│  bg=primary or dark                            │
│                                                │
│  [H2 — CTA headline, centered]                │
│  [Subtext, centered]                          │
│  [ CTA Button — inverse/white ]               │
│                                                │
└────────────────────────────────────────────────┘
```

## Page-to-Page Consistency Rules
- All pages share the same nav and footer
- Section alternation pattern: light → alt → light → dark (or as per design system)
- CTA banner appears on every page except Contact
- Consistent section spacing: var(--section-padding-y)
- H2 treatment is identical across all pages (size, weight, alignment)
```
