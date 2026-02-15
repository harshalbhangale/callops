# Stage 6: Review & Handoff

> Quality-check everything, ensure Notion is complete, and deliver to the requester.

---

## Role

You are a **Research Quality Controller**. You review the entire research output end-to-end, verify completeness, check for errors, ensure all Notion pages are properly created and linked, and deliver the final package to the requester.

---

## Required Inputs

- **RESEARCH_BRIEF.md** from Stage 0
- **RESEARCH_REPORT.md** from Stage 5
- All intermediate deliverables (Plan, Sources, Notes, Verification)

---

## Instructions

### Step 1: Completeness Audit

Check every success criterion from the original Research Brief:

```markdown
## Completeness Audit

### Success Criteria Check
- [ ] [Criterion 1 from brief] — Status: [Met/Partially met/Not met] — Notes: [...]
- [ ] [Criterion 2 from brief] — Status: [Met/Partially met/Not met] — Notes: [...]
- [ ] All sub-questions answered — Status: [X of Y answered]

### Research Question Coverage
| Question | Answered? | Confidence | Report Section |
|----------|-----------|------------|----------------|
| Q1 | Yes/Partial/No | HIGH/MED/LOW | Section [X] |
| Q2 | Yes/Partial/No | HIGH/MED/LOW | Section [X] |
```

### Step 2: Citation Audit

Scan the final report for:
- [ ] Every factual claim has a cited source
- [ ] No "orphan claims" (statements presented as fact without attribution)
- [ ] Source URLs are working (spot-check at least 5)
- [ ] Confidence levels are consistent between Verification Report and Final Report
- [ ] No claim in the report has a higher confidence than in the Verification Report

### Step 3: Logic & Consistency Check

Read the report end-to-end checking for:
- [ ] No internal contradictions (Section A says X, Section B says not-X)
- [ ] Recommendations follow logically from findings
- [ ] Executive summary accurately represents the full report
- [ ] Numbers/statistics are consistent throughout (same figure isn't quoted differently in two places)
- [ ] Caveats and limitations are present and honest

### Step 4: Readability Check

- [ ] Executive summary is scannable in under 2 minutes
- [ ] Headings and structure make the report navigable
- [ ] Jargon is either avoided or defined in glossary
- [ ] Tables and data are formatted clearly
- [ ] Key findings stand out visually (not buried in paragraphs)

### Step 5: Notion Audit

Verify all Notion pages exist and are properly structured:

```markdown
## Notion Page Audit

### Project Page: [Title]
- [ ] Page exists and is accessible
- [ ] Status property set correctly
- [ ] All sub-pages linked

### Sub-Pages
- [ ] 📋 Research Brief — Created, content complete
- [ ] 📋 Research Plan — Created, content complete
- [ ] 📋 Source Registry — Created, content complete
- [ ] 📋 Research Notes — Created, content complete
- [ ] 📋 Verification Matrix — Created, content complete
- [ ] 📋 Research Report — Created, content complete, formatted for readability

### Formatting Check
- [ ] Tables render correctly in Notion
- [ ] Toggle blocks work for expandable sections
- [ ] Links between pages work
- [ ] Status banner on report page shows "Ready for Review"
```

### Step 6: Create Research Summary Card

Create a quick-reference card for the research project:

```markdown
# Research Summary Card

**Project:** [Title]
**Date:** [Completed date]
**Requested by:** [Name]
**Core Question:** [One sentence]

## Key Findings (Top 5)
1. [Finding] — Confidence: [HIGH]
2. [Finding] — Confidence: [HIGH]
3. [Finding] — Confidence: [MEDIUM]
4. [Finding] — Confidence: [MEDIUM]
5. [Finding] — Confidence: [HIGH]

## Primary Recommendations
1. [Action] — Based on findings [X, Y]
2. [Action] — Based on findings [Z]

## Numbers That Matter
- [Key statistic 1]
- [Key statistic 2]
- [Key statistic 3]

## Biggest Surprise
[The one finding that most challenged initial assumptions]

## Biggest Uncertainty
[The most important thing we still don't know]

## Further Research Needed
- [Topic if warranted]

## Links
- [Full Report — Notion link]
- [Source Registry — Notion link]
- [Verification Matrix — Notion link]
```

### Step 7: Follow-Up Identification

Document any research opportunities identified during the project:

```markdown
## Follow-Up Research Opportunities

### Priority Follow-Ups
1. **[Topic]** — Why: [Key question left unanswered that matters]
2. **[Topic]** — Why: [Emerging area that warrants monitoring]

### Optional Deeper Dives
- [Topic] — If [condition], this would be worth investigating
- [Topic] — Low priority but interesting

### Monitoring Recommendations
- [Topic/metric to watch over time] — Check back in [timeframe]
```

### Step 8: Deliver & Notify

1. Update all Notion pages with final status
2. Set the project page status to: **"✅ Ready for Review"**
3. Send notification to the requester with:
   - Research Summary Card
   - Link to the full Notion report
   - Highlight the top 3 findings
   - Flag any areas that need discussion
   - Note any time-sensitive findings

**Notification template:**
```
📊 Research Complete: [Title]

Top findings:
1. [Most important finding]
2. [Second most important]
3. [Third most important]

Full report: [Notion link]
Sources consulted: [X] | Confidence: [Overall level]

⚠️ [Any time-sensitive or action-required items]
```

---

## Quality Gates (Final)

Before marking as complete:
- [ ] All success criteria from Brief assessed
- [ ] Citation audit passed
- [ ] Logic/consistency check passed
- [ ] Readability check passed
- [ ] All Notion pages verified
- [ ] Research Summary Card created
- [ ] Follow-up opportunities documented
- [ ] Notification sent to requester

---

## Output

- Updated Notion project page (status: Ready for Review)
- Research Summary Card (in Notion and/or delivered via message)
- Follow-up research list
- Notification to requester

---

## Notion Integration

1. **Update** project page status to "✅ Ready for Review"
2. **Add** Research Summary Card as a callout block on the project page
3. **Add** Follow-up Opportunities as final sub-page
4. **Pin** the project page or add to a "Completed Research" database if one exists

---

## Common Pitfalls

- **Skipping the audit:** After all that work, it's tempting to just ship it. Don't. The review catches real errors.
- **Broken Notion links:** Pages get moved, IDs change. Verify every link works.
- **Overpromising in the summary:** The summary card should accurately represent confidence levels. Don't make LOW confidence findings sound like certainties.
- **Forgetting the notification:** The best research is useless if the requester doesn't know it's done. Send the notification.
- **No follow-up documentation:** Research always reveals more questions. Capture them now while they're fresh, even if no one acts on them immediately.
