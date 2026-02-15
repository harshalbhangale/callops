# Avolve Build Frameworks
> Source: https://www.notion.so/Avolve-257a2de3284880bda95ffa388479fd1a

Two pipelines. Run stages in order. Each stage's output feeds the next.

---

## 🔨 Pipeline 1: New Build
*Nothing exists yet → Build-ready code*

| Step | File | Input → Output |
|------|------|----------------|
| **0** | `idea-validator.md` | Vague idea → **Validated Concept** |
| **1** | `project-discovery.md` | Validated Concept → **Project Brief** |
| **2** | `feature-architect.md` | Project Brief → **Master Spec** |
| **2.5** | `growth-architect.md` | *(optional)* Master Spec → **Growth Spec** |
| **3** | `technical-architect-v2.md` | Brief + Spec → **Technical Architecture** |
| **3.5** | `schema-architect-v2.md` | Brief + Spec + Tech → **Schema Definition** |
| **4** | `roadmap-module-architect.md` | Spec + Stack + Schema → **Module Briefs** |
| **5** | `cursor-docs-generator-v2.md` | Brief + Spec + Stack + Schema → **.cursorrules + Docs** |
| **5.5** | `design-system-extraction.md` | *(optional)* Screenshots + Rules → **DESIGN_SYSTEM** |
| **6** | `build-chunk-generator-v3.md` | Module Briefs + Rules + Design → **Implementation Chunks** |
| **7** | `implementation-plan-generator.md` | Chunks + Rules → **IMPLEMENTATION_PLAN + README** |
| **✓** | `pre-build-alignment.md` | All docs → **Validation (final gate before building)** |
| **▶** | `chunk-execution-layer.md` | Chunks → **Execute in Cursor** (new build variant) |

**After building:** Generate initial BUILD_STATE.md, then use Pipeline 2 for all future changes.

---

## 🔄 Pipeline 2: Change Existing Code
*Codebase exists → Scoped, safe modifications*

| Step | File | Input → Output |
|------|------|----------------|
| **0** | `codebase-audit-native.md` | Existing code → **BUILD_STATE** |
| **0b** | `pattern-rules-extractor-v2.md` | *(optional)* Existing code → **.cursorrules** |
| **1** | `feature-spec-builder.md` | BUILD_STATE + idea(s) → **Feature Spec(s)** |
| **2** | `change-chunk-generator-v4.2.md` | BUILD_STATE + Spec + .cursorrules → **Sprint Document (chunks)** |
| **3** | `change-implementation-plan-generator.md` | Change Chunks → **CHANGE_IMPLEMENTATION_PLAN** |
| **✓** | `sprint-validation.md` | Sprint docs → **Validation for AI execution** |
| **▶** | `chunk-execution-layer.md` | Chunks → **Execute in Cursor** (change variant) |
| **∞** | Update BUILD_STATE after every change cycle |

**Variations:**
- *Multiple features?* Run Step 1 for each, then sequence with Sprint Planner before Step 2
- *Bug fix?* Skip the framework, just fix it
- *Inherited mess?* Start at Step 0, consider `cleanup-inventory.md` → `archive-executor.md`

---

## 🧰 Standalone Tools
*Not pipeline steps — use as needed*

| File | When to use |
|------|-------------|
| `ideation-agent.md` | Don't know what to build next (needs BUILD_STATE) |
| `innovation-scout-agent-feature-opportunity-analysis.md` | Feature modernisation / competitive analysis |
| `feature-discovery-prompt.md` | Inventory all features in a codebase |
| `feature-audit-prompt.md` | Deep audit of a specific feature |
| `fix-strategy-prompt.md` | Prioritise audit findings → Fix Briefs |
| `knowledge-base-extraction-prompt.md` | Extract user-friendly docs from code |
| `security-discovery.md` | Map attack surface (pre-production) |
| `security-audit-generator.md` | Generate security audit prompts from discovery |
| `cleanup-inventory.md` | Find cruft in a codebase |
| `archive-executor.md` | Generate cleanup commands |
| `marketing-strategist.md` | Post-build: first customers strategy |

---

## 📁 Archive
`archive/` — Deprecated, superseded, or reference-only docs (kept for history).

---

## How to Use

**New project:** Walk Pipeline 1, stages 0→7, then validate and execute.
**Change existing code:** Walk Pipeline 2, stages 0→3, validate and execute. Update BUILD_STATE.
**Not sure what to build?** Start with `ideation-agent.md` or `innovation-scout-agent-feature-opportunity-analysis.md`.
**Feed each prompt** its required inputs (previous stage outputs) into an AI model. Prompts are self-documenting.
