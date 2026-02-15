# Stage 0 — Idea Validation: ElectroMart

## Problem Clarity

**What problem are we solving?**
Harshal runs a physical electronics shop and needs an online presence — a marketplace web app where customers can browse products, add to cart, pay online, and track orders. Currently sales are in-store only, limiting reach.

**Who experiences this?**
- Harshal (shop owner) — limited to foot traffic, no online sales channel
- His customers — can't browse or buy remotely

**How painful is it?**
Moderate-to-high. Competitors with online stores capture customers who prefer to browse/buy from home. Post-COVID, online shopping is expected.

**How are people solving it today?**
- Listing on Amazon/Flipkart (high commission fees, no brand control)
- WhatsApp catalog (limited, no payments/tracking)
- No solution (walk-in only)

**Why hasn't this been solved for him?**
Custom e-commerce dev is expensive. Shopify/Woo exist but come with monthly fees and may not fit Indian payment needs (UPI, Razorpay) out of the box.

## Target Audience

**Primary:** Harshal's existing customers + local area customers searching for electronics online
**Secondary:** Broader online shoppers if the store scales

**Would they pay?** Yes — they're already buying electronics. The app is a sales channel, not a separate product to sell.

## Competitive Landscape

| Competitor | Pros | Cons |
|-----------|------|------|
| Amazon/Flipkart | Huge reach, trust | High fees (15-25%), no brand, no loyalty |
| Shopify India | Easy setup | Monthly cost, limited Indian payment options |
| Custom dev agency | Tailored | Expensive (₹2-5L+) |
| WhatsApp Business | Free, easy | No cart, no payments, no tracking |

**Gap:** A self-owned, commission-free marketplace with Indian payment integration (Razorpay/UPI), built on modern stack, at zero ongoing platform fees.

## Differentiation

- **Zero commission** — own platform vs. marketplace fees
- **Direct customer relationship** — loyalty, repeat business
- **Indian-first** — Razorpay, UPI, INR pricing baked in
- **Solo-buildable** — Next.js makes it feasible for one dev

## Scope & Feasibility

**Smallest useful version (MVP):**
- Product catalog with search/filter
- Cart + checkout with Razorpay
- Order tracking (basic status updates)
- Admin panel to manage products/orders

**Effort:** 3-4 week MVP for a solo dev
**Tech risk:** Low — well-trodden stack (Next.js + Prisma + Razorpay)
**Biggest risk:** Driving traffic to the site vs. marketplace giants

## Conviction Check

- Harshal owns the shop — he IS the domain expert
- Direct business need — this isn't speculative
- Solo dev — keeps costs zero beyond hosting

## Verdict

| | |
|---|---|
| **Decision** | ✅ **GO** |
| **Confidence** | High (8/10) |
| **Strengths** | Real business need, owner-operated, proven market, low tech risk |
| **Risks** | Customer acquisition/SEO, maintaining the app solo long-term |
| **Open Questions** | Shop name/branding? Payment provider confirmed (Razorpay)? Hosting plan? |
| **Next Step** | → Stage 1: Project Discovery |

---
*Generated: 2026-02-15 | Pipeline: App Build v2 | Stage 0*
