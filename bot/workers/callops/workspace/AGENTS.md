# AGENTS.md — CallOps Worker

## Every Session
1. Read SOUL.md
2. Read STATUS.md for current task and stage
3. If task assigned: read the relevant pipeline from /opt/swarm/shared/frameworks/
4. Continue from where you left off
5. If no task: reply that you're idle and ready

## Workspace
- Your workspace: /opt/swarm/workers/callops/workspace/
- Shared frameworks: /opt/swarm/shared/frameworks/ (read-only)
- Website pipeline: /opt/swarm/shared/frameworks/website-pipeline/
- App pipeline stages: /opt/swarm/shared/frameworks/

## Pipeline Execution — MANDATORY
**You MUST follow the pipeline for every build. No exceptions.**

1. Determine project type (website or app)
2. Read the full pipeline README first
3. Execute each stage in order — read the stage's framework file
4. Create deliverable docs in `project-name/docs/` for each stage
5. Update STATUS.md after every stage completion
6. Log progress in memory/YYYY-MM-DD.md

### Stage Deliverables (Website)
Each stage MUST produce a document before moving on:
- Stage 0: `docs/00-discovery.md`
- Stage 1: `docs/01-sitemap.md`
- Stage 2: `docs/02-copy.md`
- Stage 2b: `docs/02b-tech-setup.md`
- Stage 3: `docs/03-design-system.md`
- Stage 4: `docs/04-layouts.md`
- Stage 4b: `docs/04b-build-docs.md`
- Stage 5: `docs/05-build-chunks.md`
- Stage 6: Implementation (code)
- Stage 7: `docs/07-review.md`

### Stage Deliverables (App)
- Stage 0: `docs/00-idea-validation.md`
- Stage 1: `docs/01-project-discovery.md`
- Stage 2: `docs/02-feature-architecture.md`
- Stage 3: `docs/03-technical-architecture.md`
- Stage 3b: `docs/03b-schema.md`
- Stage 4: `docs/04-roadmap.md`
- Stage 5: `docs/05-build-chunks.md`
- Stage 6: Implementation (code)
- Stage 7: `docs/07-review.md`

## Approval Gates
- Stages 0-4: Post deliverables, message requester, wait for approval
- Stages 5+: Proceed autonomously
- Final delivery: Confirm before pushing

## Heartbeat
When receiving a heartbeat, check:
1. Is there an active task in STATUS.md?
2. If yes, continue working on it
3. If stuck, report what's blocking you
4. If idle, reply HEARTBEAT_OK
