# How to Use This Document
This prompt takes your Master Spec + Stack + Schema and produces a complete Build Roadmap with full Module Briefs for each module.
When to use: After you have your Master Spec, Technical Stack, and Database Schema.
What it produces:
- Module sequence with dependencies
- Full Module Brief for each module
- QA Testing Criteria per module
What comes next: Run the Build Chunk Generator to turn Module Briefs into implementation chunks.
---
## The Roadmap & Module Architect Prompt
Copy everything in the code block below:
```javascript
Act as a CTO, Engineering Manager, and Senior Product Owner. You have been given:

1. **Master Spec** — The complete feature specification
2. **Technical Stack** — The chosen technologies
3. **Database Schema** — The data model

Your job is to:
1. Break the project into **Implementation Modules** based on dependency logic
2. Create a detailed **Module Brief** for each module

---

## PART 1: BUILD ROADMAP

### Rules for Module Sequencing

1. **Dependency Physics:** Determine build order based on technical dependencies
   - Auth before features that need auth
   - Schema before features that use those tables
   - Core utilities before features that use them

2. **Atomic Value:** Each module must result in a testable, working state
   - Can be verified independently
   - Provides value even if later modules aren't built

3. **Flexible Granularity:** Create as many (or as few) modules as needed
   - Don't force arbitrary splits
   - Don't create mega-modules that take weeks

4. **No Orphans:** Every feature in the Master Spec must be assigned to a module

---

## PART 2: MODULE BRIEFS

For EACH module, create a detailed brief using this format:

    ## Module X: [Name]

    **Core Problem:** What value does this module unlock?
    **Dependencies:** Which modules must be complete first?
    **Estimated Effort:** [X-X days]

    ### Key Flows
    - [Trigger] → [Process] → [Outcome]
    - [Trigger] → [Process] → [Outcome]

    ### Schema Areas
    - [Table]: [How this module uses it]
    - [Table]: [What's created/modified]

    ### What's Included
    *From Master Spec:*
    - [Feature]: [Key requirements]
    - [Feature]: [Key requirements]

    ### What's NOT Included
    - [Feature that belongs to another module]

    ### Success Criteria
    - [ ] [Verifiable outcome]
    - [ ] [Verifiable outcome]
    - [ ] [Verifiable outcome]

    ### Edge Cases & Error States
    - [Scenario]: [How it's handled]
    - [Scenario]: [How it's handled]

    ### 🧪 QA Testing Criteria

    **Complexity:** [Simple | Moderate | Complex]

    **Core Tests:**
    - [ ] [Primary happy path] → [Expected outcome]
    - [ ] [Secondary flow] → [Expected outcome]
    - [ ] [Basic error state] → [Expected outcome]

    **Edge Cases:** (if Moderate+)
    - [ ] [Edge case] → [Expected outcome]
    - [ ] [Boundary condition] → [Expected outcome]

    **Integration Tests:** (if Complex)
    - [ ] [Cross-module flow] → [Expected outcome]

---

## COMPLEXITY ASSESSMENT

For each module, assess complexity:

| Factor | Simple | Moderate | Complex |
|--------|--------|----------|---------|
| User flows | 1-2 linear paths | 3-5 paths with branches | 6+ paths, conditional logic |
| Data operations | Basic CRUD | Relationships, calculations | Transactions, aggregations |
| Edge cases | Few obvious ones | Several non-obvious | Many interacting |
| Integration points | None or 1 | 2-3 services | 4+ services |

**Test counts by complexity:**
- Simple: 3-5 tests
- Moderate: 6-12 tests
- Complex: 12-20+ tests

---

## OUTPUT STRUCTURE

### 1. Roadmap Overview

| Module | Name | Dependencies | Effort | Complexity |
|--------|------|--------------|--------|------------|
| 1 | [Name] | None | X days | Simple |
| 2 | [Name] | Module 1 | X days | Moderate |
| ... | ... | ... | ... | ... |

### 2. Dependency Diagram

    Module 1: [Name]
    ├── Module 2: [Name] (depends on 1)
    ├── Module 3: [Name] (depends on 1)
    │   └── Module 5: [Name] (depends on 3)
    └── Module 4: [Name] (depends on 1, 2)

### 3. Module Briefs

Full brief for each module using the format above.

### 4. Critical Path

Which modules block others? What's the longest dependency chain?

### 5. Risk Notes

Areas that might cause issues:
- [Risk]: [Why it matters]
- [Risk]: [Mitigation]

---

## WHAT YOU DON'T DO

- Don't generate implementation chunks (that's the next step)
- Don't include code examples or file paths
- Don't make assumptions about features not in the Master Spec
- Don't skip edge cases or error states

Your job ends at the Module Briefs. The Build Chunk Generator takes it from there.

---

## NOW

Generate the Build Roadmap and Module Briefs for the following:

[PASTE YOUR MASTER SPEC HERE]

[PASTE YOUR TECHNICAL STACK HERE]

[PASTE YOUR DATABASE SCHEMA HERE]
```
---
## Tips for Better Results
### 1. Provide Complete Inputs
The prompt needs:
- Full Master Spec (from Feature Architect)
- Technical Stack (from Technical Architect)
- Database Schema (from Schema Architect)
### 2. Review Module Boundaries
After generation, check:
- Are modules too large? (> 1 week of work)
- Are modules too small? (< 1 day of work)
- Are dependencies correct?
- Is every Master Spec feature assigned?
### 3. Validate QA Criteria
Ensure:
- Complexity matches actual module complexity
- Test count is appropriate
- Tests cover happy path + errors + edge cases
---
## What Happens Next
1. Confirm the Module Briefs → Review and approve
1. Run Build Chunk Generator → Turn briefs into implementation chunks
1. Run Cursor Docs Generator → Create .cursorrules and supporting docs
1. Build in Cursor → Execute the chunks
---
Last Updated: 2025-12-21
Version: 1.0 — Combined Roadmap + Module Briefs into single step
