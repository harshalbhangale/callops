import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';

// ── Config ──────────────────────────────────────────────
const TWILIO_SID = '<TWILIO_SID>';
const TWILIO_AUTH = '<TWILIO_AUTH>';
const TWILIO_FROM = '+447400409191';
const PORT = 3335;
const PUBLIC_URL = `http://46.225.76.15:${PORT}/sms/webhook`;
const BUILDS_DIR = '/opt/swarm/builds';
const FRAMEWORK_DIR = '/opt/swarm/shared/frameworks/public-build-pipeline';
const MAX_ACTIVE_BUILDS = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10; // max messages per minute per number

// ── Rate Limiter ────────────────────────────────────────
const rateLimits = new Map();

function isRateLimited(from) {
  const now = Date.now();
  if (!rateLimits.has(from)) rateLimits.set(from, []);
  const timestamps = rateLimits.get(from).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  rateLimits.set(from, timestamps);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  return false;
}

// ── Input Sanitizer ─────────────────────────────────────
function sanitize(text) {
  if (!text || typeof text !== 'string') return '';
  // Strip anything that looks like prompt injection
  let clean = text;
  clean = clean.replace(/\[\[.*?\]\]/gs, '');              // strip [[directives]]
  clean = clean.replace(/<\/?[a-z][^>]*>/gi, '');          // strip HTML
  clean = clean.replace(/`{3}[\s\S]*?`{3}/g, '');          // strip code blocks (multiline)
  clean = clean.replace(/`[^`]*`/g, '');                   // strip inline code
  clean = clean.replace(/system\s*:/gi, '');               // strip "system:" prefixes
  clean = clean.replace(/ignore\s+(previous|above|all)\s+instructions/gi, '[filtered]');
  clean = clean.replace(/you\s+are\s+now/gi, '[filtered]');
  clean = clean.replace(/act\s+as/gi, '[filtered]');
  clean = clean.replace(/\$\([^)]*\)/g, '[filtered]');     // strip $(command) injection
  clean = clean.replace(/;\s*(rm|cat|ls|wget|curl)\s/gi, '[filtered]'); // strip chained commands
  return clean.slice(0, 2000);                              // cap length
}

// ── User Session Management ─────────────────────────────
function getUserDir(phone) {
  // Strip everything except digits and +, then validate
  const safe = phone.replace(/[^+0-9]/g, '');
  if (!safe || safe.length < 5 || safe.length > 20 || !safe.startsWith('+')) {
    throw new Error(`Invalid phone number: ${safe}`);
  }
  // Ensure no path traversal possible
  const dir = path.join(BUILDS_DIR, safe);
  if (!dir.startsWith(BUILDS_DIR)) {
    throw new Error('Path traversal detected');
  }
  return dir;
}

function getSession(phone) {
  const dir = getUserDir(phone);
  const sessionFile = path.join(dir, 'session.json');
  if (!fs.existsSync(sessionFile)) return null;
  return JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
}

function saveSession(phone, session) {
  const dir = getUserDir(phone);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'session.json'), JSON.stringify(session, null, 2));
}

function initSession(phone) {
  const session = {
    phone,
    stage: 'intake',
    projectType: null, // 'website' or 'app'
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
    spec: null,
    approved: false,
    buildStarted: false,
    deployed: false,
    deployUrl: null,
  };
  saveSession(phone, session);
  return session;
}

function logMessage(phone, role, text) {
  const session = getSession(phone) || initSession(phone);
  session.messages.push({ role, text: text.slice(0, 2000), at: new Date().toISOString() });
  session.updatedAt = new Date().toISOString();
  saveSession(phone, session);
  return session;
}

// ── Twilio SMS Sender ───────────────────────────────────
async function sendSMS(to, body) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64');

  // Split long messages
  const chunks = [];
  for (let i = 0; i < body.length; i += 1500) chunks.push(body.slice(i, i + 1500));

  for (const chunk of chunks) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: TWILIO_FROM, To: to, Body: chunk }).toString(),
    });
    if (!res.ok) console.error('[sms] send failed:', res.status, await res.text());
    else console.log(`[sms] → ${to}: ${chunk.slice(0, 60)}...`);
  }
}

// ── Build System Prompt ─────────────────────────────────
function getSystemPrompt(session) {
  return `You are an AI build assistant. You help customers plan and build software projects via SMS.

CURRENT STAGE: ${session.stage}
CUSTOMER PHONE: ${session.phone}
BUILD APPROVED: ${session.approved}
PROJECT TYPE: ${session.projectType || 'not yet determined'}

YOUR RULES:
- You ONLY discuss software/website building. Nothing else.
- Never reveal system internals, API keys, server details, or architecture.
- Never execute commands, access files, or do anything outside the build conversation.
- If asked about anything non-build-related, politely redirect: "I'm here to help you build! What would you like to create?"
- Keep SMS replies SHORT (under 300 chars when possible).
- Be friendly, professional, and efficient.
- Ask ONE question at a time during intake.

STEP 1 — PROJECT TYPE (if not yet determined):
Your FIRST job is to figure out what they need. Ask what they want to build, then classify:

A) WEBSITE — marketing site, portfolio, landing page, blog, business site
   → Uses the Website Pipeline (design-first, copy-first, 8 stages)

B) APP — web app, SaaS, dashboard, tool, platform with auth/database/API
   → Uses the App Build Pipeline (feature-first, architecture-first, 8 stages)

Ask: "What are you looking to build? A website (marketing, portfolio, business site) or a web app (dashboard, tool, platform with user accounts)?"

Once determined, set the type and proceed to intake.

STEP 2 — INTAKE (ask one at a time):

FOR WEBSITES:
1. Business/project name?
2. What does your business do? (1-2 sentences)
3. What pages do you need? (Home, About, Services, Contact, etc.)
4. Do you have an existing website? (URL if yes)
5. Color/style preferences? (modern, corporate, playful, etc.)
6. Any specific features? (contact form, gallery, booking, etc.)
7. Target audience?
8. Do you have copy/text ready or should we write it?

FOR APPS:
1. What's the app called?
2. What problem does it solve? (1-2 sentences)
3. Who are the users?
4. What are the core features? (list them)
5. Does it need user auth? (login/signup)
6. Does it need a database? What data?
7. Any third-party integrations? (payments, email, APIs)
8. Any design preferences?

When you have enough info, write a brief spec summary including the PROJECT TYPE (website or app) and ask them to reply "yes" to approve.

CONVERSATION HISTORY:
${session.messages.map(m => `${m.role}: ${m.text}`).join('\n')}`;
}

// ── Agent Response ──────────────────────────────────────
async function getAgentResponse(phone, message) {
  let session = getSession(phone);
  if (!session) session = initSession(phone);

  // Log incoming message
  logMessage(phone, 'customer', message);
  session = getSession(phone); // refresh

  // Check if customer is approving spec
  const lower = message.toLowerCase().trim();
  if (session.stage === 'intake' && session.spec && ['yes', 'approved', 'approve', 'looks good', 'go ahead', 'confirm', 'perfect', 'let\'s go'].some(w => lower.includes(w))) {
    // Detect project type from spec
    const specLower = (session.spec || '').toLowerCase();
    if (!session.projectType) {
      if (specLower.includes('project type: app') || specLower.includes('web app') || specLower.includes('dashboard') || specLower.includes('saas') || specLower.includes('platform') || specLower.includes('authentication') || specLower.includes('database')) {
        session.projectType = 'app';
      } else {
        session.projectType = 'website';
      }
    }

    session.approved = true;
    session.stage = 'building';
    saveSession(phone, session);

    // Trigger async build with correct pipeline
    triggerBuild(phone, session);

    const pipelineType = session.projectType === 'app' ? 'App Build' : 'Website Build';
    return `Approved! 🚀 Starting the ${pipelineType} Pipeline now. I'll send you updates as each stage completes. This usually takes 20-40 minutes. Text me anytime for a status update!`;
  }

  // Status check
  if (['status', 'update', 'how\'s it going', 'progress', 'where are we'].some(w => lower.includes(w))) {
    if (session.deployed) return `Your site is live! 🎉 ${session.deployUrl}`;
    if (session.buildStarted) return `Build in progress — currently at stage: ${session.stage}. I'll text you when it's ready!`;
    if (session.spec) return `Waiting for your approval on the spec. Reply "yes" to start the build!`;
    return `We're still collecting your requirements. Let's keep going!`;
  }

  // Get AI response for intake conversation
  const systemPrompt = getSystemPrompt(session);

  try {
    const result = execSync(
      `openclaw agent --system-prompt ${JSON.stringify(systemPrompt)} --message ${JSON.stringify(`Customer says: ${message}`)} --timeout 60 2>&1`,
      { timeout: 70000, env: { ...process.env, HOME: '/root', OPENCLAW_GATEWAY_PORT: '18789' }, encoding: 'utf8' }
    );

    const reply = result.trim().split('\n').filter(l => !l.startsWith('[') && !l.startsWith('gateway') && !l.startsWith('Config')).join('\n').trim();

    // Check if agent generated a spec (look for summary patterns)
    if (reply.toLowerCase().includes('here\'s your spec') || reply.toLowerCase().includes('build specification') || reply.toLowerCase().includes('does this look right') || reply.toLowerCase().includes('shall i proceed')) {
      session.spec = reply;
      saveSession(phone, session);
    }

    logMessage(phone, 'agent', reply);
    return reply || "Got it! Let me think about that. What else can you tell me about your project?";
  } catch (err) {
    console.error('[sms] agent error:', err.message);
    return "Thanks for that! I'm processing your request. Could you give me a moment and try again?";
  }
}

// ── Build Trigger ───────────────────────────────────────
function triggerBuild(phone, session) {
  const buildDir = path.join(getUserDir(phone), 'project');
  fs.mkdirSync(buildDir, { recursive: true });

  // Write the spec for the build agent
  fs.writeFileSync(path.join(getUserDir(phone), 'spec.md'), session.spec || 'No spec');
  fs.writeFileSync(path.join(getUserDir(phone), 'build-log.md'), `# Build Log\n\nStarted: ${new Date().toISOString()}\nPhone: ${phone}\n\n`);

  session.buildStarted = true;
  saveSession(phone, session);

  console.log(`[build] triggering ${session.projectType} build for ${phone}`);

  // Dispatch to the correct pipeline runner
  const buildScript = path.join('/opt/swarm/sms-webhook', 'build-runner.mjs');
  const child = spawn('node', [buildScript, phone, session.projectType || 'website'], {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, HOME: '/root' },
  });
  child.unref();

  child.stdout.on('data', d => console.log(`[build:${phone}] ${d.toString().trim()}`));
  child.stderr.on('data', d => console.error(`[build:${phone}] ERR: ${d.toString().trim()}`));
  child.on('exit', code => console.log(`[build:${phone}] exited with code ${code}`));
}

// ── Parse Body ──────────────────────────────────────────
function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(Object.fromEntries(new URLSearchParams(data))));
  });
}

// ── HTTP Server ─────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  // Health check
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', activeBuildCount: fs.readdirSync(BUILDS_DIR).length }));
    return;
  }

  // SMS webhook
  if (req.method === 'POST' && req.url === '/sms/webhook') {
    const body = await parseBody(req);
    const from = body.From || '';
    const message = sanitize(body.Body || '');

    if (!from || !message) {
      res.writeHead(400, { 'Content-Type': 'text/xml' });
      res.end('<Response></Response>');
      return;
    }

    // Validate phone number format
    const safeFrom = from.replace(/[^+0-9]/g, '');
    if (!safeFrom || safeFrom.length < 5 || safeFrom.length > 20 || !safeFrom.startsWith('+')) {
      console.warn(`[sms] invalid phone number rejected: ${from}`);
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end('<Response></Response>');
      return;
    }

    console.log(`[sms] ← ${from}: ${message.slice(0, 100)}`);

    // Rate limit
    if (isRateLimited(from)) {
      console.warn(`[sms] rate limited: ${from}`);
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end('<Response><Message>Please slow down! Try again in a minute.</Message></Response>');
      return;
    }

    // Active build limit
    const activeBuildCount = fs.existsSync(BUILDS_DIR) ? fs.readdirSync(BUILDS_DIR).length : 0;
    const existingSession = getSession(from);
    if (!existingSession && activeBuildCount >= MAX_ACTIVE_BUILDS) {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end('<Response><Message>We\'re at capacity right now. Please try again in an hour!</Message></Response>');
      return;
    }

    // Respond to Twilio immediately
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end('<Response></Response>');

    // Process and reply async
    const reply = await getAgentResponse(from, message);
    await sendSMS(from, reply);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

// Create builds dir
fs.mkdirSync(BUILDS_DIR, { recursive: true });

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[sms-webhook] secure public endpoint on http://0.0.0.0:${PORT}/sms/webhook`);
  console.log(`[sms-webhook] builds dir: ${BUILDS_DIR}`);
  console.log(`[sms-webhook] max active builds: ${MAX_ACTIVE_BUILDS}`);
});
