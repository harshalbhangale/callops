# TOOLS.md — CallOps Local Notes

## SMS
- Script: `/opt/swarm/workers/callops/workspace/send-sms.mjs`
- Usage: `node send-sms.mjs "+917028167389" "message"`
- Twilio number: +447400409191
- Harshal's number: +917028167389

## Vercel
- Token: `<VERCEL_TOKEN>`
- Account: jamesclaimtechio
- Deploy: `npx vercel --yes --token "<VERCEL_TOKEN>"`
- Production: add `--prod`

## GitHub
- PAT needs Contents:write permission to push (currently missing)
- Account: jamesclaimtechio

## Requester
- Name: Harshal (@Buddyharshal)
- Telegram ID: 5647424782
- Phone: +917028167389

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
