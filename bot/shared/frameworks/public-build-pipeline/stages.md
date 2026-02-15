# Build Pipeline Stages

## Stage 1: INTAKE
**Goal:** Understand what the customer wants.
**Channel:** Voice call or SMS
**Agent asks:**
1. What's your business/project name?
2. What does your business do? (1-2 sentences)
3. What pages do you need? (e.g., Home, About, Services, Contact)
4. Do you have a website already? (if yes, get URL for design extraction)
5. Any specific colors, style, or vibe? (modern, corporate, playful, etc.)
6. Do you have a logo? (can send via SMS/WhatsApp)
7. Any specific features? (contact form, booking, gallery, etc.)
8. What's your target audience?
9. Do you have copy/text ready or should we generate it?
10. Timeline expectations?

**Output:** `spec.md` — written confirmation sent to customer via SMS
**Gate:** Customer confirms spec via SMS reply ("yes" / "approved" / corrections)

## Stage 2: PLAN
**Goal:** Architecture the site
**Agent creates:**
- Sitemap with all routes
- Design system (colors, typography, spacing)
- Component inventory
- Page layout wireframes (text-based)
- Copy deck (if generating copy)

**Output:** `plan.md` — summary sent to customer
**Gate:** Auto-approved after 15 min if no objections

## Stage 3: BUILD
**Goal:** Code the entire project
**Tech stack:** Next.js 14 (App Router) + Tailwind CSS + shadcn/ui + Framer Motion
**Process:**
1. Scaffold project: `npx create-next-app@latest`
2. Install deps: shadcn/ui, framer-motion
3. Build in chunks per `chunk-execution-layer.md`:
   - Each page = 1 chunk
   - Each complex component = 1 chunk
   - Shared layout/nav/footer = 1 chunk
4. After each chunk: `npm run build` must pass
5. Claude Code runs persistently until ALL chunks complete

**Output:** Complete Next.js project in `project/`
**Gate:** `npm run build` exits 0, all pages render

## Stage 4: TEST
**Goal:** Comprehensive E2E testing
**Framework:** Playwright
**Tests generated:**
1. **Navigation:** Every route loads, all links work
2. **Responsive:** Desktop (1440px), Tablet (768px), Mobile (375px)
3. **Visual:** Screenshots at each breakpoint for each page
4. **Forms:** Submit contact/booking forms, validate required fields
5. **Accessibility:** axe-core audit, all pages must pass AA
6. **Performance:** Lighthouse CI — all pages score 90+
7. **SEO:** Meta tags, OG tags, sitemap.xml, robots.txt present
8. **Error states:** 404 page exists and renders

**Output:** `tests/` directory with full Playwright suite + results
**Gate:** ALL tests pass

## Stage 5: FIX LOOP
**Goal:** Fix any test failures
**Process:**
1. Parse test results
2. For each failure:
   a. Identify root cause
   b. Claude Code fixes the code
   c. Re-run failing test
3. Loop until ALL tests pass
4. Max 5 fix cycles — if still failing after 5, escalate to human

**Output:** All tests green
**Gate:** 100% pass rate

## Stage 6: DEPLOY
**Goal:** Ship it live
**Process:**
1. Create GitHub repo: `gh repo create builds-org/{project-name} --public`
2. Push code: `git init && git add . && git commit && git push`
3. Deploy to Vercel: `vercel --prod --token $VERCEL_TOKEN`
4. Capture deployed URL
5. SMS customer: "Your website is live! 🎉 {url}"
6. Send GitHub repo link

**Output:** `deployed.json` with URLs
**Gate:** Site loads at deployed URL, returns 200

## Error Handling
- If customer stops responding: pause build, send reminder SMS after 1h, 24h
- If build fails repeatedly: escalate, notify admin
- If Claude Code crashes: restart and resume from last successful chunk
- If tests fail after 5 fix cycles: send partial results + human review request
