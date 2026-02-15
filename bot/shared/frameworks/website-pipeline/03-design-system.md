# Design System (Stage 3)

**Goal:** Extract or create a complete design system from reference sites/screenshots + brand direction.

**Input:** Brand Brief (Stage 0) + Reference site screenshots

---

## ⚠️ REBUILD RULE (NON-NEGOTIABLE)

If the Brand Brief identifies this as a **rebuild of an existing site**:

1. **The existing live site is your PRIMARY design reference** — not generic inspiration
2. **Before writing any design tokens**, you MUST:
   - Visit/screenshot the existing site (all pages)
   - Extract the ACTUAL color palette (use browser dev tools or color picker)
   - Identify the ACTUAL fonts in use
   - Document the ACTUAL spacing, border radius, shadow patterns
   - Note the ACTUAL layout patterns (grid, card styles, section spacing)
3. **Your design system must faithfully reproduce the existing design** unless the Brand Brief explicitly says to change specific elements
4. **Document what you're keeping vs. changing** with rationale for each change

If you skip this step and invent a new design system for a rebuild, the entire build will be wrong.

---

## The Prompt

```markdown
You are a design system architect. Your job is to create a complete design system for a website project by analyzing reference screenshots and brand direction.

## Inputs
- **Brand Brief:** [Paste Brand Brief — especially Visual Direction section]
- **Screenshots:** [Attach 5-10 screenshots from reference sites identified in Brand Brief]
- **Existing Site URL (if rebuild):** [URL — this is your PRIMARY reference. Scrape it first.]

## Analysis Process

### Pass 1: Color Extraction
For each reference screenshot:
- Background colors (page, cards, sections)
- Text colors (headings, body, muted, placeholder)
- Accent/brand colors (buttons, links, highlights)
- Border and divider colors
- Gradient usage
- Dark/light section alternation patterns

**Output a unified palette:**

```css
/* Brand Colors */
--color-primary: #____;        /* Main brand / CTA */
--color-primary-hover: #____;  
--color-secondary: #____;      /* Supporting accent */
--color-accent: #____;         /* Highlights, badges */

/* Neutrals */
--color-bg-primary: #____;     /* Main background */
--color-bg-secondary: #____;   /* Alternate sections */
--color-bg-card: #____;        /* Card backgrounds */
--color-bg-dark: #____;        /* Dark sections (footer, hero variants) */

--color-text-primary: #____;   /* Headings */
--color-text-body: #____;      /* Body text */
--color-text-muted: #____;     /* Secondary text */
--color-text-inverse: #____;   /* Text on dark backgrounds */

--color-border: #____;         
--color-border-light: #____;   

/* Semantic */
--color-success: #____;
--color-warning: #____;
--color-error: #____;
--color-info: #____;
```

### Pass 2: Typography

```css
/* Font Families */
--font-heading: '____', sans-serif;
--font-body: '____', sans-serif;
--font-mono: '____', monospace;  /* If applicable */

/* Type Scale */
--text-display: ____rem;   /* Hero headlines */
--text-h1: ____rem;        /* Page titles */
--text-h2: ____rem;        /* Section titles */
--text-h3: ____rem;        /* Card titles */
--text-h4: ____rem;        /* Sub-sections */
--text-body-lg: ____rem;   /* Lead paragraphs */
--text-body: ____rem;      /* Default body */
--text-body-sm: ____rem;   /* Captions, labels */
--text-micro: ____rem;     /* Badges, tags */

/* Line Heights */
--leading-tight: ____;     /* Headings */
--leading-normal: ____;    /* Body */
--leading-relaxed: ____;   /* Large body text */

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;       /* If used */

/* Letter Spacing */
--tracking-tight: ____em;  /* Large headings */
--tracking-normal: 0;
--tracking-wide: ____em;   /* Uppercase labels */
```

### Pass 3: Spacing & Layout

```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */

/* Section Spacing */
--section-padding-y: var(--space-20);     /* Vertical padding between sections */
--section-padding-y-lg: var(--space-32);  /* Large section padding */

/* Container */
--container-max: 1280px;
--container-padding: var(--space-4);
--container-padding-md: var(--space-8);

/* Grid */
--grid-cols: 12;
--grid-gap: var(--space-6);
```

### Pass 4: Components

Define patterns for these core website components:

#### Buttons
```
Primary:   bg=primary, text=white, radius=__, padding=__, hover=____
Secondary: bg=transparent, border=primary, text=primary, hover=____
Ghost:     bg=transparent, text=primary, hover=____
Sizes:     sm (h=36px), md (h=44px), lg (h=52px)
```

#### Cards
```
Background: var(--color-bg-card)
Border: [yes/no, color, width]
Shadow: [none/sm/md/lg]
Radius: ____
Padding: ____
Hover: [lift/glow/border-change/none]
```

#### Section Patterns
```
Light section:  bg=bg-primary, text=text-primary
Dark section:   bg=bg-dark, text=text-inverse
Alt section:    bg=bg-secondary, text=text-primary
Gradient:       [describe if used]
```

#### Navigation
```
Style: [sticky/fixed/static]
Height: ____
Background: [solid/transparent→solid on scroll/blur]
Logo position: [left/center]
Links: [style, spacing, hover effect]
Mobile: [hamburger/slide-in/full-screen overlay]
CTA in nav: [yes/no, which button style]
```

#### Footer
```
Background: ____
Columns: [number, content per column]
Bottom bar: [copyright, links, socials]
```

### Pass 5: Motion & Interactions

```
/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

/* Scroll Animations */
Entrance: [fade-up/fade-in/slide-in] with [stagger/simultaneous]
Distance: [10px/20px/30px]
Duration: [300ms/500ms/800ms]
Trigger: [on-viewport-enter, threshold 0.2]

/* Hover Effects */
Buttons: [scale/color-shift/shadow]
Cards: [lift/shadow-increase/border-glow]  
Links: [underline-slide/color-change/highlight]
Images: [zoom/parallax/overlay]

/* Page Transitions */
[none/fade/slide — keep simple for Next.js]
```

### Pass 6: Responsive Breakpoints

```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (wide desktop)
2xl: 1536px  (ultra-wide)

Key responsive rules:
- Grid columns: 1 (mobile) → 2 (tablet) → 3-4 (desktop)
- Section padding: reduced by 40% on mobile
- Font sizes: display reduces by 30-40% on mobile
- Nav: hamburger below md
- Hero: stack layout below md
```

## Output

Deliver as a single document titled:

# Design System: [Project Name]

All passes as sections, with CSS custom properties ready to drop into a Tailwind config or globals.css.

Include a **Tailwind Config Extension** section that maps tokens to tailwind.config.ts:

```typescript
// tailwind.config.ts additions
{
  theme: {
    extend: {
      colors: { /* mapped from Pass 1 */ },
      fontFamily: { /* mapped from Pass 2 */ },
      fontSize: { /* mapped from Pass 2 */ },
      spacing: { /* mapped from Pass 3 */ },
      borderRadius: { /* mapped from Pass 4 */ },
      boxShadow: { /* mapped from Pass 4 */ },
      transitionDuration: { /* mapped from Pass 5 */ },
    }
  }
}
```

**UNCERTAIN items:** Mark anything you couldn't confirm from screenshots. These need design decisions from the human.
```
