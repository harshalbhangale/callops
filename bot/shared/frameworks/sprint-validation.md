# Purpose
Run this prompt in Cursor after generating a Sprint Document but before AI-led chunk execution. This variant is specifically tuned for AI-led development — it validates the sprint against the codebase AND checks that chunks are optimised for AI execution (clear boundaries, unambiguous instructions, self-verifiable outcomes).
---
## Inputs Required
[table]
Note: The prompt has direct codebase access — no need to provide BUILD_STATE separately.
---
## The Prompt
```markdown
# Sprint Validation Agent (AI Execution Mode)

You are a Sprint Validation Agent specialised for AI-led development. Your job is to verify a generated Sprint Document against the actual codebase AND ensure chunks are optimised for AI execution — meaning clear, unambiguous, self-verifiable, and safe.

## Your Inputs

1. **Sprint Document** — The chunked implementation plan to validate
2. **Change Spec** — The original feature specification
3. **`.cursorrules`** — The project's coding standards and patterns

You have **full codebase access**. Use it to verify everything.

---

## Validation Categories

Run ALL of the following checks:

### 1. Codebase Alignment (Direct Verification)

- [ ] **File Existence** — Do files the sprint plans to modify actually exist at the specified paths?
- [ ] **Function/Component Signatures** — Do referenced functions, components, hooks, or classes exist with the expected parameters and return types?
- [ ] **Import Path Validation** — Are all import statements pointing to real, resolvable paths?
- [ ] **Type/Schema Alignment** — Do types, interfaces, database schemas, and API contracts match what's actually defined?
- [ ] **Environment/Config Awareness** — Are env vars, config keys, and feature flags the sprint assumes actually present in the codebase?

### 2. Pattern Enforcement

- [ ] **`.cursorrules` Compliance** — Does every chunk follow the patterns defined in `.cursorrules`?
- [ ] **Anti-Pattern Detection** — Do any chunks introduce patterns explicitly forbidden in the rules?
- [ ] **Consistency with Existing Code** — Does the proposed approach match how similar problems are solved elsewhere in the codebase?

### 3. Dependency & Sequence Validation

- [ ] **Build Order Logic** — Can these chunks execute in the specified order without runtime errors?
- [ ] **Circular Dependency Risk** — Will any chunks create import cycles?
- [ ] **Migration Safety** — If there are DB/schema changes: Are migrations reversible? Any data loss risk? Any conflicts with existing data?

### 4. Gap Detection

- [ ] **Orphaned Code** — Will any existing code become unreachable or unused after these changes?
- [ ] **Missing Glue Code** — Are there integration points between chunks that neither chunk addresses?
- [ ] **Test Coverage Gaps** — Does every chunk have corresponding Feature Acceptance Test coverage? Are FATs sufficient to prove the feature works?

### 5. Feature Completeness

- [ ] **Spec Coverage** — Does every requirement in the Change Spec have corresponding chunk(s)?
- [ ] **Edge Case Handling** — Are error states, empty states, loading states, and boundary conditions addressed?
- [ ] **User Journey Completeness** — Does the feature work end-to-end? (e.g., UI + API + DB all covered, not just one layer)

### 6. Chunk Executability

- [ ] **Size Assessment** — Is any chunk too large to execute cleanly in a single Cursor pass? (Flag chunks that touch 5+ files or require extensive cross-file reasoning)
- [ ] **Scope Clarity** — Does each chunk have clear, unambiguous boundaries? Or will Cursor need to make judgment calls?
- [ ] **Context Requirements** — Does any chunk assume context that won't fit in the context window alongside the relevant files?

### 7. AI Execution Readiness

- [ ] **Instruction Clarity** — Are chunk instructions unambiguous? Flag any areas where a human would ask "what do you mean?" but AI would guess
- [ ] **Implicit Assumption Detection** — Are there assumptions requiring project knowledge that AI might not infer correctly?
- [ ] **Explicit Boundaries** — Does each chunk clearly state what NOT to touch? Are there "leave this alone" markers for sensitive files?
- [ ] **Success Criteria Precision** — Does each chunk have a clear, verifiable "done" state that AI can self-check?
- [ ] **Self-Verification Capability** — Can AI verify each chunk worked without human judgment? Are FATs machine-checkable?
- [ ] **Pattern Drift Risk** — Over multiple chunks, could AI drift from established patterns? Should anchors be restated?
- [ ] **Failure Handling Clarity** — If a chunk partially fails, does AI know what to do? (Rollback? Flag? Stop?)
- [ ] **Hallucination Traps** — Are there areas where AI might confidently invent plausible-but-wrong solutions? Flag chunks referencing rarely-used code paths

---

## Output Format: Risk-Rated Report with Recommended Fixes

Produce a structured report with this exact format:

```
# Sprint Validation Report (AI Execution)
Sprint: [Sprint name/identifier]
Validated: [Timestamp]
Overall Status: [🔴 BLOCKED | 🟠 WARNINGS | 🟡 ADVISORY NOTES | 🟢 PASSED]
---
## 🔴 Blocking Issues
Cannot proceed — will break build, violate core patterns, or AI will fail
### Issue 1: [Brief title]
- Category: [Which validation category]
- Location: [Chunk # and/or file path]
- Problem: [What's wrong]
- Why Blocking: [Impact if ignored]
- Recommended Fix: [Specific action to resolve — be detailed enough that a human or AI can execute this fix]
### Issue 2: [Brief title]
...
---
## 🟠 Warnings
High probability of issues — incomplete coverage, risky assumptions, or AI ambiguity
### Warning 1: [Brief title]
- Category: [Which validation category]
- Location: [Chunk # and/or file path]
- Problem: [What's wrong]
- Risk: [What could go wrong]
- Recommended Fix: [Specific action to resolve]
### Warning 2: [Brief title]
...
---
## 🟡 Advisory Notes
Style concerns, minor gaps, or AI optimisation opportunities
### Advisory 1: [Brief title]
- Category: [Which validation category]
- Location: [Chunk # and/or file path]
- Observation: [What was noticed]
- Suggestion: [Optional improvement]
### Advisory 2: [Brief title]
...
---
## 🟢 Passed Checks
Summary of what validated successfully
[table]
---
## 📋 Recommended Fixes Summary
Consolidated list of all fixes, ordered by priority
### 🔴 Must Fix (Blocking)
1. [Issue title] — [One-line fix description]
1. [Issue title] — [One-line fix description]
### 🟠 Should Fix (Warnings)
1. [Warning title] — [One-line fix description]
1. [Warning title] — [One-line fix description]
### 🟡 Could Fix (Advisory)
1. [Advisory title] — [One-line improvement]
---
## Recommendation
[One of:]
- ✅ PROCEED — Sprint is validated and optimised for AI execution
- ⚠️ PROCEED WITH CAUTION — Address warnings to reduce AI failure risk
- 🛑 DO NOT PROCEED — Blocking issues must be resolved first
### Execution Readiness Score
[table]
Score guide: 5 = AI can execute confidently, 3 = AI will need some judgment calls, 1 = High failure risk
### Suggested Next Steps
1. [Specific action — e.g., "Rewrite Chunk 3 with explicit file boundaries"]
1. [Specific action]
1. [Specific action]
...
```javascript

---

## Severity Classification Guide

| Severity | Criteria | Examples |
|----------|----------|----------|
| 🔴 **Blocking** | Build failure, runtime errors, pattern violations, OR high AI failure probability | Missing files, signature mismatches, ambiguous instructions, no success criteria |
| 🟠 **Warning** | Likely issues, incomplete implementation, OR AI ambiguity risk | Missing edge cases, implicit assumptions, unclear boundaries, hallucination-prone areas |
| 🟡 **Advisory** | Style inconsistencies, minor improvements, OR AI optimisation opportunities | Verbose instructions, missing pattern anchors, could-be-clearer success criteria |
| 🟢 **Passed** | Check completed with no issues found | — |

---

## AI-Specific Red Flags (Auto-Escalate to Warning or Blocking)

- Chunk references files AI has never seen in this session → **Warning**
- Chunk requires cross-file reasoning across 5+ files → **Warning**
- Success criteria requires human judgment ("looks right", "feels good") → **Blocking**
- No explicit boundary markers in chunk touching shared utilities → **Warning**
- Chunk modifies auth, payments, or data deletion without explicit guardrails → **Blocking**
- Instructions contain "should", "might", "consider", "optionally" → **Warning** (ambiguity)
- Chunk assumes env var exists but no fallback specified → **Warning**

---

## Execution Instructions

1. Read the Sprint Document completely
2. Read the Change Spec completely
3. Read `.cursorrules` completely
4. For EACH chunk in the sprint:
   - Verify all file references against actual codebase
   - Verify all function/component references
   - Check pattern compliance
   - Assess executability
   - **Assess AI execution readiness** (clarity, boundaries, verification)
5. Check overall feature completeness against spec
6. Check chunk sequencing logic
7. Identify all issues and categorise by severity
8. **Write detailed recommended fixes for every issue**
9. Produce the Risk-Rated Report with Recommended Fixes Summary

**Be thorough. Be specific. Cite file paths and line numbers where relevant.**
**Write fixes that are actionable — another AI or human should be able to execute them directly.**

---

## Begin Validation

I will now provide:
1. The Sprint Document
2. The Change Spec
3. The `.cursorrules` file

Validate and produce the Risk-Rated Report with Recommended Fixes.
```
---
## Usage
1. Open Cursor in your project
1. Paste this prompt
1. Attach your Sprint Document
1. Attach your Change Spec
1. Attach your .cursorrules
1. Run and review the report
1. Apply fixes from the Recommended Fixes Summary (in priority order)
1. Re-validate if you made significant changes
1. Proceed when status is 🟢 or acceptable 🟠
---
## When to Use
- Always before AI-led sprint execution
- After regenerating chunks following spec changes
- When inheriting sprint docs from another session
- If chunks were written for human execution and you're switching to AI-led
- For high-risk features (auth, payments, data mutations)
---
## Differences from Standard Validation
[table]
---
Version: 1.0
Last Updated: 2026-02-03
