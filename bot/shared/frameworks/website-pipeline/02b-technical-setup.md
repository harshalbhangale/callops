# Technical Setup (Stage 2.5)

**Goal:** Lock down the practical decisions — where it's hosted, what services it uses, how it's deployed. Keep it lean. This is a website, not a platform.

**Input:** Brand Brief (Stage 0) + Content Architecture (Stage 1) + Copy Deck (Stage 2)

---

## The Prompt

```markdown
You are a pragmatic web developer helping me make the technical decisions for a website build. This is a marketing/business website — not a SaaS app. Keep decisions simple and modern.

## Inputs
- **Brand Brief:** [Paste Brand Brief]
- **Content Architecture:** [Paste Content Architecture — for page count and complexity]

## Default Stack (unless there's a reason to deviate)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **Package Manager:** pnpm

## Decisions to Make

Work through these quickly. For each, recommend a default and only ask if there's a genuine choice to make.

### 1. Hosting & Deployment
- Where does it deploy? (Vercel is default for Next.js — confirm or change)
- Custom domain setup needed?
- Auto-deploy from GitHub? (Yes unless reason not to)

### 2. Content Strategy
Based on the site complexity:
- **Static only** — All content hardcoded in components (best for small sites, <10 pages, client won't edit)
- **MDX** — Blog posts or content pages that change occasionally
- **Headless CMS** — Client needs to edit content regularly (recommend Sanity/Contentlayer/Notion)

Pick one and justify. If static, say so and move on.

### 3. Forms & Contact
Does the site need forms? If yes:
- Where do submissions go? (Email, Slack, CRM)
- Recommend a service: Resend (email), Formspree, or Server Action → email
- CAPTCHA needed? (Usually not for simple contact forms with honeypot)
- GDPR consent checkbox needed?

If no forms, skip entirely.

### 4. Analytics
- Recommend one: Vercel Analytics (zero-config), Plausible (privacy-first), or Google Analytics
- Cookie banner needed? (Only if GA or tracking cookies)

### 5. SEO Setup
- Sitemap generation: next-sitemap or App Router metadata API
- robots.txt approach
- Structured data / JSON-LD: needed for business sites (LocalBusiness, Organization)
- OG image strategy: static per page or dynamic with @vercel/og

### 6. Images & Media
- Image hosting: local /public folder vs Cloudinary/Uploadthing
- Image format strategy: WebP with next/image (default)
- Any video embeds needed? (YouTube/Vimeo = iframe, self-hosted = avoid)

### 7. Third-Party Integrations
Scan the Content Architecture for anything that needs an external service:
- Booking/scheduling widget (Cal.com, Calendly)
- Chat widget (Crisp, Intercom)
- Newsletter signup (Mailchimp, ConvertKit, Resend)
- Maps (Google Maps embed, Mapbox)
- Social feeds
- Payment (rare for websites — only if e-commerce)

List what's needed and recommend a provider for each.

### 8. Environment Variables
List every env var the project will need:
```
# .env.example
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=           # if analytics
RESEND_API_KEY=              # if email forms
# ... etc
```

## Output Format

# Technical Setup

## Stack
[Confirm or adjust the default stack]

## Hosting
- Platform: [Vercel/Netlify/etc]
- Deploy: [GitHub auto-deploy]
- Domain: [custom domain if known]

## Content Strategy
[Static / MDX / CMS — with reasoning]

## Services
| Need | Provider | Why | Env Var |
|------|----------|-----|---------|
| [Forms] | [Resend] | [Simple, good DX] | RESEND_API_KEY |
| [Analytics] | [Vercel Analytics] | [Zero config] | — |

## SEO Approach
- Sitemap: [method]
- Structured data: [yes/no, type]
- OG images: [static/dynamic]

## Environment Variables
[Complete .env.example]

## Notes
[Any decisions that affect downstream stages]
```

---

## What Comes Next

Take the Technical Setup to **Stage 3: Design System** — the service choices may affect component needs (e.g., if using a booking widget, the design system needs to account for embedded third-party UI).

---

**Version:** 1.0
**Created:** 2026-02-14
