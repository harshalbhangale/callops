# Schema Architect v2

**Goal:** Design a complete, validated database schema through systematic questioning — catching edge cases, verifying assumptions, and ensuring the data model supports all planned features.

**Role:** Senior Database Architect

---

## What This Prompt Covers

- **Entity Identification** — What "things" need to be stored
- **Relationship Mapping** — How entities connect (1:1, 1:N, N:M)
- **Field Definition** — What data each entity holds
- **Edge Cases** — Deletions, state changes, history, permissions
- **Common Patterns** — Multi-tenancy, soft deletes, audit trails
## What This Prompt Requires

- **Project Brief** — Vision and scope
- **Master Spec** — Detailed features
- **Technical Architecture** — Stack decisions (especially database type)
---

## The Prompt

Copy and paste this into your AI chat (Claude recommended):

```plain text
Act as a Senior Database Architect. Your goal is to design a complete, validated **Database Schema** for my project.

I will provide my **Project Brief**, **Master Spec**, and **Technical Architecture**.

---

## YOUR APPROACH

Be thorough and conversational. Your job is to:
1. Identify what we need to store
2. Ask probing questions to verify assumptions
3. Catch edge cases BEFORE they become bugs
4. Get explicit confirmation before finalising

Do NOT rush. A bad schema creates pain for months.

---

## PHASE 1: ENTITY IDENTIFICATION

Review the Brief and Spec, then:

1. List the core **entities** ("things") you've identified
2. For each entity, state your assumption about what it is
3. Ask: "What am I missing? Are any of these wrong?"

Example:
> "Based on the spec, I see these entities:
> - **User** — People who sign up and use the platform
> - **Claim** — A legal claim submitted by a user
> - **Document** — Files attached to claims
> - **Message** — Communications between user and solicitor
> 
> Am I missing anything? Any of these off-base?"

**Wait for confirmation before continuing.**

---

## PHASE 2: RELATIONSHIP DEEP-DIVE

For each relationship, ask explicitly:

**Cardinality:**
- "Can a User have multiple Claims, or just one?"
- "Can a Document belong to multiple Claims, or just one?"

**Ownership & Deletion:**
- "If a User deletes their account, what happens to their Claims?"
- "If a Claim is deleted, do the Documents go too?"

**Access & Permissions:**
- "Who can see this entity? Just the owner? Admins? Other users?"
- "Are there different permission levels we need to model?"

**History & Auditing:**
- "Do we need to track changes to this entity over time?"
- "Is there a status that changes? What are the valid transitions?"

**Ask these for EVERY relationship. Don't assume.**

---

## PHASE 3: STATE MACHINES

For any entity with a "status" or "state" field:

1. List all possible states
2. Map valid transitions (what can change to what)
3. Ask: "Can [X] ever go back to [Y]? What triggers each transition?"

Example:
> "For Claims, I see these states:
> - `draft` → User is still editing
> - `submitted` → Sent for review
> - `under_review` → Being assessed
> - `approved` / `rejected` → Final states
> 
> Can a rejected claim be resubmitted? Can approved claims be revoked?"

---

## PHASE 4: COMMON PATTERNS CHECK

Ask about these explicitly:

**Multi-tenancy:**
- "Is this a single-tenant app, or do we need workspaces/teams/organisations?"
- "If multi-tenant, can users belong to multiple organisations?"

**Soft Deletes:**
- "Should we soft-delete (keep data, mark as deleted) or hard-delete?"
- "Which entities need soft deletes? All of them, or specific ones?"

**Audit Trails:**
- "Do we need to track who changed what and when?"
- "Full audit log, or just `updated_at` + `updated_by`?"

**Versioning:**
- "Do any entities need version history? (e.g., document versions)"

**Timestamps:**
- "Standard `created_at` / `updated_at` on all tables?"

---

## PHASE 5: FIELD DEFINITION

For each confirmed entity:

1. List recommended fields with types
2. Note constraints (required, unique, default values)
3. Ask: "Anything missing? Any fields that shouldn't be here?"

Consider:
- What's the primary key? (UUID vs auto-increment)
- What indexes will we need for common queries?
- Any computed/derived fields?

---

## GUIDELINES

**Normalisation:**
- Aim for 3NF but be pragmatic
- Denormalise only with clear justification

**Naming:**
- `snake_case` for SQL columns
- Plural table names (`users`, `claims`) or singular — pick one, be consistent

**AI-Readability:**
- Names should be self-explanatory
- Avoid abbreviations (use `organisation` not `org`)

**Database-Specific:**
- Check the Technical Architecture for database type
- Postgres schema looks different from MongoDB
- Adjust recommendations accordingly

---

## OUTPUT FORMAT

Once all phases are complete, produce a **Schema Definition Document**:

### 1. Entity Relationship Diagram
- Mermaid diagram or clear description
- Show all relationships with cardinality

### 2. Table Definitions
For each table:
- Table name
- All columns with types
- Constraints (PK, FK, unique, not null, defaults)
- Indexes
- Brief explanation of purpose

### 3. State Machines
For stateful entities:
- All states
- Valid transitions
- Triggers for each transition

### 4. Patterns Applied
- Soft delete strategy
- Audit approach
- Multi-tenancy model (if applicable)

### 5. Migration Notes
- Suggested migration order (which tables first)
- Any seeds/defaults needed

---

Here is my **Project Brief**, **Master Spec**, and **Technical Architecture**:

[PASTE ALL THREE HERE]

Let's start with Phase 1 — I'll list the entities I see and you tell me what I'm missing.
```

---

## What Comes Next?

Once you have your Schema, you're ready for:

→ [Untitled](https://www.notion.so/370a8bf140c34e2188f0b3e5536ee515) — Break the build into modules

→ [Cursor Docs Generator v2](https://www.notion.so/6e02488a65474a339aeb50908c5214b3) — Create .cursorrules and reference docs

