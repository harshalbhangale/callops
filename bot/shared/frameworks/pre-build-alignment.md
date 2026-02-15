# How to Use This Document
This is a validation prompt — the final quality gate before you start building. It checks all your documentation for conflicts, gaps, and misalignments that would confuse AI during implementation.
When to use: After generating all cursor docs AND all chunks, before opening Cursor.
How to use: Copy the prompt below, paste it into Claude, then paste ALL your documentation (every cursor doc + every chunk). AI will perform a meticulous audit and flag any issues.
Why this matters: A single contradiction between docs will cause AI to make inconsistent decisions. A missing reference will cause it to invent solutions. Misaligned naming will create bugs. This check prevents all of that.
---
## The Alignment Check Prompt
Copy everything below the line:
---
```javascript
You are a meticulous technical auditor performing a pre-build alignment check. Your task is to verify that all project documentation is perfectly consistent, complete, and ready for AI-assisted implementation in Cursor.

## Why This Matters

AI assistants build exactly what documentation tells them. If documents contradict each other:
- AI will make inconsistent decisions
- Code will have subtle bugs
- Refactoring will be needed
- Time will be wasted

Your job is to catch EVERY misalignment before building starts.

## Audit Categories

Check ALL of the following systematically:

---

### 1. NAMING CONSISTENCY

Verify identical naming across ALL documents:

**Database:**
- [ ] Table names match exactly between DATABASE_SCHEMA and Chunks
- [ ] Field names match exactly (check camelCase vs snake_case)
- [ ] Relation names are consistent
- [ ] No table mentioned in Chunks that isn't in DATABASE_SCHEMA
- [ ] No field mentioned in Chunks that isn't in DATABASE_SCHEMA

**API:**
- [ ] Endpoint names match between API_CONTRACTS and Chunks
- [ ] Request/response field names are consistent
- [ ] Service names are identical everywhere

**Variables:**
- [ ] Environment variable names match between ENVIRONMENT.md and Chunks
- [ ] No env var used in Chunks that isn't documented
- [ ] No env var documented but never referenced

**Functions/Patterns:**
- [ ] Pattern names in TASK_ROUTER match examples/ references
- [ ] Any named pattern in Chunks matches ARCHITECTURE description

---

### 2. CHUNK DEPENDENCY VALIDATION

For EACH chunk, verify:

- [ ] All listed prerequisites exist as earlier chunks
- [ ] No circular dependencies (A needs B, B needs A)
- [ ] Prerequisites are in correct order (if Chunk 5 needs Chunk 3, Chunk 3 comes first)
- [ ] "Provides to Next Chunks" actually matches what next chunks list as "From Previous Chunks"
- [ ] No chunk references tables/features that aren't built in an earlier chunk
- [ ] Database models are created BEFORE chunks that query them
- [ ] Auth is set up BEFORE chunks that require authentication
- [ ] External service integration chunks come BEFORE chunks that use those services

---

### 3. SCHEMA vs CHUNKS ALIGNMENT

For EACH table in DATABASE_SCHEMA:

- [ ] There is a chunk that creates this table
- [ ] The chunk that creates it comes before chunks that query it
- [ ] All fields mentioned in chunks exist in the schema
- [ ] All relations mentioned in chunks are defined in the schema
- [ ] Field types match (no chunk expecting string when schema says integer)
- [ ] Required fields in schema are handled in chunk data flows

For EACH chunk that touches the database:

- [ ] Every table it references exists in DATABASE_SCHEMA
- [ ] Every field it references exists in DATABASE_SCHEMA
- [ ] Query patterns match schema relationships
- [ ] No chunk creates tables not in DATABASE_SCHEMA (schema is the constraint)

---

### 4. API_CONTRACTS vs CHUNKS ALIGNMENT

For EACH external service in API_CONTRACTS:

- [ ] There is a chunk that implements this integration
- [ ] Request format in chunk matches API_CONTRACTS exactly
- [ ] Response handling in chunk matches documented response format
- [ ] Error handling in chunk covers documented error responses
- [ ] Rate limit handling mentioned in chunk matches API_CONTRACTS
- [ ] Webhook format in chunk matches API_CONTRACTS (if applicable)

For EACH chunk that uses external APIs:

- [ ] The API is documented in API_CONTRACTS
- [ ] All endpoints used are documented
- [ ] Auth method matches documentation

---

### 5. .cursorrules vs EVERYTHING

Verify .cursorrules is the source of truth:

- [ ] Tech stack in .cursorrules matches what chunks implement
- [ ] Critical rules in .cursorrules aren't violated by any chunk
- [ ] "Use X, NOT Y" rules are followed in all chunks
- [ ] Common mistakes listed are addressed in chunk "Things to Watch For"
- [ ] File organisation rules match chunk implementations
- [ ] Dependency rules aren't violated by any chunk

---

### 6. ARCHITECTURE vs CHUNKS ALIGNMENT

Verify architectural decisions are implemented:

- [ ] Patterns described in ARCHITECTURE are used in chunks
- [ ] Data flow in ARCHITECTURE matches chunk sequence
- [ ] Security model in ARCHITECTURE is implemented across chunks
- [ ] No chunk implements something that contradicts ARCHITECTURE
- [ ] External service strategy matches chunk implementations

---

### 7. CROSS-CHUNK CONSISTENCY

Compare chunks against each other:

- [ ] No two chunks implement the same feature differently
- [ ] Shared patterns are implemented identically
- [ ] Data passed between chunks has consistent structure
- [ ] Error handling approach is consistent across chunks
- [ ] Naming conventions are identical across all chunks
- [ ] Success criteria don't contradict each other

---

### 8. COMPLETENESS CHECK

Verify nothing is missing:

- [ ] Every feature in the project brief has a chunk
- [ ] Every external service has API documentation
- [ ] Every database table has schema documentation
- [ ] Every environment variable is documented
- [ ] Every chunk has clear success criteria
- [ ] Every chunk has "Things to Watch For"
- [ ] All referenced examples exist (or are flagged to create)

---

### 9. CONFLICT DETECTION

Look for contradictions:

- [ ] No conflicting statements about the same topic in different docs
- [ ] No conflicting data types for the same field
- [ ] No conflicting auth approaches
- [ ] No conflicting error handling strategies
- [ ] No conflicting UI/UX decisions
- [ ] No conflicting business logic

---

### 10. GOTCHA COVERAGE

Verify critical gotchas are addressed:

- [ ] Every complex feature has "Things to Watch For"
- [ ] API rate limits are handled somewhere
- [ ] Null/undefined cases are covered
- [ ] Error states are handled
- [ ] Edge cases are documented
- [ ] Security concerns are addressed
- [ ] Performance considerations are noted

---

## Output Format

Provide your audit in this exact format:

---

## ✅ PASSED CHECKS

[List categories that passed completely]

## ⚠️ WARNINGS

[Minor issues that should be fixed but won't break the build]

### Warning 1: [Title]
**Location:** [Which doc(s)]
**Issue:** [What's wrong]
**Fix:** [How to resolve]

## 🔴 CRITICAL ISSUES

[Issues that MUST be fixed before building]

### Critical 1: [Title]
**Location:** [Which doc(s)]
**Conflict:** [Exactly what contradicts what]
**Impact:** [What will break if not fixed]
**Fix:** [Specific resolution]

## 📊 SUMMARY

- Total checks performed: [N]
- Passed: [N]
- Warnings: [N]
- Critical issues: [N]

**Ready to build:** YES / NO

[If NO, list what must be fixed first]

---

## Audit Principles

1. **Be paranoid** — Assume any inconsistency will cause problems
2. **Be specific** — Quote exact text that conflicts
3. **Be actionable** — Every issue needs a clear fix
4. **Be thorough** — Check every document against every other document
5. **Be honest** — If unsure, flag it as a warning

## Common Issues to Watch For

- Table name in schema is `users` but chunk says `user`
- Field is `userId` in one place, `user_id` in another
- Chunk 5 needs auth but auth is in Chunk 6
- API_CONTRACTS shows JSON response but chunk expects different structure
- .cursorrules says "Use Prisma" but chunk mentions raw SQL
- ENVIRONMENT.md has `STRIPE_KEY` but chunk uses `STRIPE_SECRET_KEY`
- Schema has required field but chunk doesn't validate it
- Two chunks both claim to "set up the dashboard"

---

## NOW: Perform the complete alignment check on the following documentation:

[PASTE ALL YOUR CURSOR DOCS AND ALL YOUR CHUNKS HERE]
```
---
## What to Paste
Include ALL of these (whatever you have):
1. .cursorrules
1. ARCHITECTURE.md
1. DATABASE_SCHEMA.md
1. API_CONTRACTS.md
1. ENVIRONMENT.md
1. TASK_ROUTER.md
1. TROUBLESHOOTING.md
1. QUICK_REFERENCE.md
1. All implementation chunks (Chunk 0, Chunk 1, etc.)
---
## After the Check
### If "Ready to build: YES"
→ Open Cursor and start with Chunk 0
### If "Ready to build: NO"
1. Fix all critical issues
1. Address warnings (recommended)
1. Re-run the alignment check
1. Repeat until clean
---
## Why This Step is Non-Negotiable
10 minutes checking now saves hours of debugging later.
---
## Integration with Planning Framework 2.0
The complete workflow is now:
---
Last Updated: 2025-11-26
Version: 1.0
