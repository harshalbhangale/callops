# Public Build Pipeline — Voice/SMS to Deployed Website

## Overview
Customers contact via phone call or SMS. An AI agent guides them through a structured build specification, then autonomously builds, tests, and deploys their website.

## Flow
```
Customer calls/texts +447400409191
        ↓
[1] INTAKE — Collect requirements (voice/SMS conversation)
        ↓
[2] SPEC — Generate build specification document
        ↓
[3] PLAN — Create sitemap, page layouts, design system
        ↓
[4] BUILD — Claude Code builds the project persistently
        ↓
[5] TEST — Generate & run E2E test suite
        ↓
[6] FIX — Loop: fix failures → retest → until green
        ↓
[7] DEPLOY — Push to GitHub → Deploy to Vercel → Send link
```

## Security Model
- Public endpoints accept ONLY build-related conversations
- Each customer identified by phone number (E.164)
- Each build gets an isolated workspace directory
- No access to internal systems, other builds, or admin functions
- Rate limited: 1 active build per phone number
- Input sanitized for prompt injection
- All interactions logged for audit

## Customer Data
```
/opt/swarm/builds/
  +447738585850/
    session.json         ← conversation state, stage tracker
    spec.md              ← approved build specification
    project/             ← the actual Next.js project
    tests/               ← E2E test suite
    build-log.md         ← full build history
    deployed.json        ← deployment URLs
```
