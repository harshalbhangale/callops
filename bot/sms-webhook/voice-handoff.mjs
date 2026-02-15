#!/usr/bin/env node
/**
 * Voice Call Handoff Processor
 * 
 * Watches for completed voice calls, extracts specs from transcripts,
 * saves them, and kicks off the build pipeline.
 * 
 * Run: node /opt/swarm/sms-webhook/voice-handoff.mjs
 * Or via cron every minute.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { sendSMS } from './sms-utils.mjs';

const CALLS_FILE = '/root/.openclaw/voice-calls/calls.jsonl';
const PROCESSED_FILE = '/opt/swarm/voice-handoff-processed.json';
const BUILDS_DIR = '/opt/swarm/builds';

// Load already-processed call IDs
function loadProcessed() {
  try {
    return JSON.parse(readFileSync(PROCESSED_FILE, 'utf8'));
  } catch {
    return { processedCalls: [] };
  }
}

function saveProcessed(data) {
  writeFileSync(PROCESSED_FILE, JSON.stringify(data, null, 2));
}

// Parse the calls.jsonl to find completed calls with transcripts
function getCompletedCalls() {
  if (!existsSync(CALLS_FILE)) return [];
  
  const lines = readFileSync(CALLS_FILE, 'utf8').split('\n').filter(Boolean);
  const callMap = new Map();
  
  for (const line of lines) {
    try {
      const call = JSON.parse(line);
      // Keep latest state per callId
      callMap.set(call.callId, call);
    } catch {}
  }
  
  // Return only completed calls with transcripts
  return [...callMap.values()].filter(
    c => c.state === 'completed' && c.transcript && c.transcript.length >= 6
  );
}

// Extract a build spec from the transcript using simple parsing
function extractSpec(call) {
  const transcript = call.transcript || [];
  const lines = transcript.map(t => 
    `${t.speaker === 'bot' ? 'Agent' : 'Customer'}: ${t.text}`
  ).join('\n');
  
  // Determine project type from conversation
  const fullText = transcript.map(t => t.text).join(' ').toLowerCase();
  const isApp = fullText.includes('web app') || fullText.includes('saas') || 
                fullText.includes('dashboard') || fullText.includes('platform');
  const projectType = isApp ? 'app' : 'website';
  
  // Build the spec markdown
  const spec = `# Build Spec — Voice Intake

**Source:** Voice call on ${new Date(call.startedAt).toISOString()}
**Caller:** ${call.from || call.to || 'unknown'}
**Call ID:** ${call.callId}
**Project Type:** ${projectType}

## Transcript

${lines}

## Extracted Requirements

_Auto-extracted from voice conversation. Build agent should parse the transcript above for detailed requirements._

---
**Status:** Ready for build pipeline
**Pipeline:** ${projectType === 'website' ? 'Website Pipeline (Stages 0-7)' : 'App Pipeline (Stages 0-7)'}
`;

  return { spec, projectType, phone: call.from || call.to || 'unknown' };
}

// Main
async function main() {
  const processed = loadProcessed();
  const completed = getCompletedCalls();
  
  let newBuilds = 0;
  
  for (const call of completed) {
    if (processed.processedCalls.includes(call.callId)) continue;
    
    console.log(`[voice-handoff] Processing call ${call.callId}`);
    
    const { spec, projectType, phone } = extractSpec(call);
    
    // Sanitize phone for directory name
    const phoneSafe = phone.replace(/[^+\d]/g, '');
    const buildDir = `${BUILDS_DIR}/${phoneSafe}`;
    
    // Create build directory
    mkdirSync(buildDir, { recursive: true });
    mkdirSync(`${buildDir}/project`, { recursive: true });
    mkdirSync(`${buildDir}/docs`, { recursive: true });
    
    // Save spec
    writeFileSync(`${buildDir}/spec.md`, spec);
    
    // Save/update session
    const session = {
      phone: phoneSafe,
      stage: 'ready',
      projectType,
      source: 'voice',
      callId: call.callId,
      createdAt: new Date().toISOString(),
      buildApproved: true // Voice calls are pre-approved by speaking
    };
    writeFileSync(`${buildDir}/session.json`, JSON.stringify(session, null, 2));
    
    console.log(`[voice-handoff] Spec saved to ${buildDir}/spec.md`);
    console.log(`[voice-handoff] Project type: ${projectType}`);
    
    // Send immediate SMS confirmation to caller
    // For outbound calls (we called them): customer is call.to
    // For inbound calls (they called us): customer is call.from
    const isOutbound = call.direction === 'outbound' || call.from === '+447400409191';
    const callerPhone = isOutbound ? call.to : call.from;
    if (callerPhone) {
      try {
        await sendSMS(callerPhone, 
          `Hey! 👋 Thanks for the call — your ${projectType} build has been handed to the team and we're getting started right away!\n\nWe'll text you updates as we go through each stage. Sit tight!`
        );
        console.log(`[voice-handoff] Confirmation SMS sent to ${callerPhone}`);
      } catch (err) {
        console.error(`[voice-handoff] SMS failed: ${err.message}`);
      }
    }

    // Kick off the build runner in background
    try {
      const cmd = `nohup node /opt/swarm/sms-webhook/build-runner.mjs "${phoneSafe}" "${projectType}" > ${buildDir}/build-log.md 2>&1 &`;
      execSync(cmd, { shell: true });
      console.log(`[voice-handoff] Build runner started for ${phoneSafe}`);
    } catch (err) {
      console.error(`[voice-handoff] Failed to start build: ${err.message}`);
    }
    
    // Mark as processed
    processed.processedCalls.push(call.callId);
    newBuilds++;
  }
  
  if (newBuilds > 0) {
    saveProcessed(processed);
    console.log(`[voice-handoff] Processed ${newBuilds} new call(s)`);
  } else {
    console.log('[voice-handoff] No new calls to process');
  }
}

main();
