import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const phone = process.argv[2];
const projectType = process.argv[3] || 'website'; // 'website' or 'app'
if (!phone) { console.error('Usage: node build-runner.mjs <phone> [website|app]'); process.exit(1); }

const TWILIO_SID = '<TWILIO_SID>';
const TWILIO_AUTH = '<TWILIO_AUTH>';
const TWILIO_FROM = '+447400409191';
const BUILDS_DIR = '/opt/swarm/builds';
const FRAMEWORKS = '/opt/swarm/shared/frameworks';
const WEBSITE_PIPELINE = path.join(FRAMEWORKS, 'website-pipeline');
const userDir = path.join(BUILDS_DIR, phone.replace(/[^+0-9]/g, ''));
const projectDir = path.join(userDir, 'project');
const docsDir = path.join(userDir, 'docs');
const MAX_FIX_CYCLES = 5;

// ── Helpers ─────────────────────────────────────────────
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  fs.appendFileSync(path.join(userDir, 'build-log.md'), line);
}

function updateStage(stage) {
  const session = JSON.parse(fs.readFileSync(path.join(userDir, 'session.json'), 'utf8'));
  session.stage = stage;
  session.updatedAt = new Date().toISOString();
  fs.writeFileSync(path.join(userDir, 'session.json'), JSON.stringify(session, null, 2));
}

async function sms(body) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64');
  const chunks = [];
  for (let i = 0; i < body.length; i += 1500) chunks.push(body.slice(i, i + 1500));
  for (const chunk of chunks) {
    await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: TWILIO_FROM, To: phone, Body: chunk }).toString(),
    });
  }
}

function run(cmd, cwd = projectDir, timeout = 300_000) {
  try {
    return execSync(cmd, { cwd, timeout, encoding: 'utf8', env: { ...process.env, HOME: '/root' } });
  } catch (err) {
    return (err.stdout || '') + '\n' + (err.stderr || '');
  }
}

function claudeCode(prompt, cwd = projectDir, timeout = 600_000) {
  log(`[claude-code] ${prompt.slice(0, 120)}...`);
  try {
    return execSync(
      `claude -p ${JSON.stringify(prompt)} --output-format text 2>&1`,
      { cwd, timeout, encoding: 'utf8', env: { ...process.env, HOME: '/root' }, maxBuffer: 10 * 1024 * 1024 }
    );
  } catch (err) {
    log(`[claude-code] Error: ${err.message.slice(0, 200)}`);
    return err.stdout || err.message;
  }
}

function readFramework(filename) {
  const filepath = path.join(WEBSITE_PIPELINE, filename);
  if (fs.existsSync(filepath)) return fs.readFileSync(filepath, 'utf8');
  // Also check root frameworks dir
  const rootPath = path.join(FRAMEWORKS, filename);
  if (fs.existsSync(rootPath)) return fs.readFileSync(rootPath, 'utf8');
  return '';
}

// ── Stage 0: Discovery (from intake spec) ───────────────
async function stage0_discovery() {
  updateStage('stage-0-discovery');
  log('Stage 0: WEBSITE DISCOVERY');
  await sms('📋 Stage 1/8: Analysing your requirements...');

  const spec = fs.readFileSync(path.join(userDir, 'spec.md'), 'utf8');
  const framework = readFramework('00-website-discovery.md');

  fs.mkdirSync(docsDir, { recursive: true });

  claudeCode(`You are executing Stage 0 of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

CLIENT INTAKE SPEC:
${spec}

Using the framework above, produce a complete Brand Brief document.
Save it to ${path.join(docsDir, '00-brand-brief.md')}

Include: business overview, target audience, brand voice, competitors, goals, key messaging, and any existing site URL for design extraction.`, userDir);

  log('Stage 0 complete: Brand Brief');
}

// ── Stage 1: Sitemap & Content Architecture ─────────────
async function stage1_sitemap() {
  updateStage('stage-1-sitemap');
  log('Stage 1: SITEMAP & CONTENT ARCHITECTURE');
  await sms('🗺️ Stage 2/8: Planning site structure...');

  const brandBrief = fs.existsSync(path.join(docsDir, '00-brand-brief.md'))
    ? fs.readFileSync(path.join(docsDir, '00-brand-brief.md'), 'utf8') : '';
  const framework = readFramework('01-sitemap-content-architecture.md');

  claudeCode(`You are executing Stage 1 of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

BRAND BRIEF:
${brandBrief}

Produce a complete Content Architecture document with sitemap, page hierarchy, and content requirements.
Save it to ${path.join(docsDir, '01-content-architecture.md')}`, userDir);

  log('Stage 1 complete: Content Architecture');
}

// ── Stage 2: Copy Generation ────────────────────────────
async function stage2_copy() {
  updateStage('stage-2-copy');
  log('Stage 2: COPY GENERATION');
  await sms('✍️ Stage 3/8: Writing your website copy...');

  const brandBrief = fs.existsSync(path.join(docsDir, '00-brand-brief.md'))
    ? fs.readFileSync(path.join(docsDir, '00-brand-brief.md'), 'utf8') : '';
  const architecture = fs.existsSync(path.join(docsDir, '01-content-architecture.md'))
    ? fs.readFileSync(path.join(docsDir, '01-content-architecture.md'), 'utf8') : '';
  const framework = readFramework('02-copy-generation.md');

  claudeCode(`You are executing Stage 2 of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

BRAND BRIEF:
${brandBrief}

CONTENT ARCHITECTURE:
${architecture}

Generate professional, compelling copy for every page and section.
Save it to ${path.join(docsDir, '02-copy-deck.md')}`, userDir);

  log('Stage 2 complete: Copy Deck');
}

// ── Stage 2b: Technical Setup ───────────────────────────
async function stage2b_techsetup() {
  updateStage('stage-2b-techsetup');
  log('Stage 2b: TECHNICAL SETUP');

  const framework = readFramework('02b-technical-setup.md');

  claudeCode(`You are executing Stage 2b of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

Tech stack decisions (already decided):
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Animation: Framer Motion
- Hosting: Vercel
- Repo: GitHub

Document any additional technical decisions (fonts, icons, third-party services).
Save it to ${path.join(docsDir, '02b-technical-setup.md')}`, userDir);

  log('Stage 2b complete: Technical Setup');
}

// ── Stage 3: Design System ──────────────────────────────
async function stage3_design() {
  updateStage('stage-3-design');
  log('Stage 3: DESIGN SYSTEM');
  await sms('🎨 Stage 4/8: Creating your design system...');

  const brandBrief = fs.existsSync(path.join(docsDir, '00-brand-brief.md'))
    ? fs.readFileSync(path.join(docsDir, '00-brand-brief.md'), 'utf8') : '';
  const framework = readFramework('03-design-system.md');
  const extractionFramework = readFramework('design-system-extraction.md');

  // Check if there's an existing site URL in the spec
  const spec = fs.readFileSync(path.join(userDir, 'spec.md'), 'utf8');
  const hasExistingSite = spec.match(/https?:\/\/[^\s]+/);
  const extractionNote = hasExistingSite
    ? `\n\nIMPORTANT: The client has an existing site at ${hasExistingSite[0]}. You MUST extract the design system from this site first using the design extraction framework below. The existing design is the default — changes are opt-in.\n\nDESIGN EXTRACTION FRAMEWORK:\n${extractionFramework}`
    : '\n\nThis is a new build — create a fresh design system based on the brand brief.';

  claudeCode(`You are executing Stage 3 of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}
${extractionNote}

BRAND BRIEF:
${brandBrief}

Create a complete design system with:
- Color tokens (CSS custom properties)
- Typography scale
- Spacing system
- tailwind.config.ts extensions
- globals.css with all tokens

Save the design system doc to ${path.join(docsDir, '03-design-system.md')}`, userDir);

  log('Stage 3 complete: Design System');
}

// ── Stage 4: Page Layouts ───────────────────────────────
async function stage4_layouts() {
  updateStage('stage-4-layouts');
  log('Stage 4: PAGE LAYOUTS');
  await sms('📐 Stage 5/8: Designing page layouts...');

  const architecture = fs.existsSync(path.join(docsDir, '01-content-architecture.md'))
    ? fs.readFileSync(path.join(docsDir, '01-content-architecture.md'), 'utf8') : '';
  const copyDeck = fs.existsSync(path.join(docsDir, '02-copy-deck.md'))
    ? fs.readFileSync(path.join(docsDir, '02-copy-deck.md'), 'utf8') : '';
  const designSystem = fs.existsSync(path.join(docsDir, '03-design-system.md'))
    ? fs.readFileSync(path.join(docsDir, '03-design-system.md'), 'utf8') : '';
  const framework = readFramework('04-page-layouts.md');

  claudeCode(`You are executing Stage 4 of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

CONTENT ARCHITECTURE:
${architecture}

COPY DECK:
${copyDeck}

DESIGN SYSTEM:
${designSystem}

Create detailed section-by-section layout specs for every page.
Save to ${path.join(docsDir, '04-page-layouts.md')}`, userDir);

  log('Stage 4 complete: Page Layouts');
}

// ── Stage 4b: Build Docs ────────────────────────────────
async function stage4b_builddocs() {
  updateStage('stage-4b-builddocs');
  log('Stage 4b: BUILD DOCS');

  const framework = readFramework('04b-build-docs.md');

  claudeCode(`You are executing Stage 4b of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

Read all docs in ${docsDir}/ and generate:
1. Project structure document
2. QUICK_START.md for the project
3. Component inventory

Save to ${path.join(docsDir, '04b-build-docs.md')}`, userDir);

  log('Stage 4b complete: Build Docs');
}

// ── Stage 5: Build Chunks ───────────────────────────────
async function stage5_chunks() {
  updateStage('stage-5-chunks');
  log('Stage 5: BUILD CHUNKS');
  await sms('📦 Stage 6/8: Breaking into build chunks...');

  const layouts = fs.existsSync(path.join(docsDir, '04-page-layouts.md'))
    ? fs.readFileSync(path.join(docsDir, '04-page-layouts.md'), 'utf8') : '';
  const buildDocs = fs.existsSync(path.join(docsDir, '04b-build-docs.md'))
    ? fs.readFileSync(path.join(docsDir, '04b-build-docs.md'), 'utf8') : '';
  const framework = readFramework('05-build-chunks.md');
  const chunkGenerator = fs.readFileSync(path.join(FRAMEWORKS, 'build-chunk-generator-v3.md'), 'utf8');

  claudeCode(`You are executing Stage 5 of the Avolve Website Build Pipeline.

FRAMEWORK INSTRUCTIONS:
${framework}

CHUNK GENERATOR FRAMEWORK:
${chunkGenerator}

PAGE LAYOUTS:
${layouts}

BUILD DOCS:
${buildDocs}

Break the entire build into ordered, implementation-ready chunks.
Each chunk must be self-contained with:
- Exact files to create/modify
- Complete component code specs
- Acceptance criteria
- Dependencies on other chunks

Save chunks to ${path.join(docsDir, 'chunks/')} as individual markdown files (chunk-01-xxx.md, chunk-02-xxx.md, etc.)
Save the master chunk list to ${path.join(docsDir, '05-build-chunks.md')}`, userDir);

  log('Stage 5 complete: Build Chunks');
}

// ── Stage 6: Implementation (Claude Code) ───────────────
async function stage6_implementation() {
  updateStage('stage-6-implementation');
  log('Stage 6: IMPLEMENTATION');
  await sms('🔨 Stage 7/8: Building your website now. This is the big one — 15-30 min...');

  const framework = readFramework('06-implementation.md');
  const chunkExecution = fs.readFileSync(path.join(FRAMEWORKS, 'chunk-execution-layer.md'), 'utf8');

  // Scaffold project if not exists
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    log('Scaffolding Next.js project...');
    run(`npx create-next-app@latest project --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --use-npm`, userDir, 120_000);
    run('npm install framer-motion', projectDir, 60_000);
    run('npx shadcn@latest init -y --defaults 2>&1', projectDir, 60_000);
  }

  // Copy docs into project for Claude Code to reference
  const projDocsDir = path.join(projectDir, 'docs');
  fs.mkdirSync(projDocsDir, { recursive: true });
  run(`cp -r ${docsDir}/* ${projDocsDir}/`, userDir);

  // Create SESSION_TRACKER.md
  const chunkFiles = fs.existsSync(path.join(docsDir, 'chunks'))
    ? fs.readdirSync(path.join(docsDir, 'chunks')).filter(f => f.endsWith('.md')).sort()
    : [];
  const totalChunks = chunkFiles.length || 1;

  fs.writeFileSync(path.join(projDocsDir, 'SESSION_TRACKER.md'), `# Build Session Tracker

## Current Position
- **Active Chunk:** 1 of ${totalChunks}
- **Status:** Not Started

## Chunks
${chunkFiles.map((f, i) => `- [ ] Chunk ${i + 1}: ${f}`).join('\n')}
`);

  // Build with Claude Code — persistent until complete
  claudeCode(`You are executing Stage 6 of the Avolve Website Build Pipeline.

IMPLEMENTATION FRAMEWORK:
${framework}

CHUNK EXECUTION FRAMEWORK (MANDATORY — follow this exactly):
${chunkExecution}

BUILD DOCS: Read all files in ${projDocsDir}/
CHUNK FILES: Read all files in ${projDocsDir}/chunks/ (if they exist)

YOUR TASK:
1. Read the SESSION_TRACKER.md
2. Read ALL chunk files in docs/chunks/
3. Execute each chunk in order following the chunk execution framework:
   - For EACH chunk: Plan → Build → Test (npm run build) → Verify
4. Update SESSION_TRACKER.md after each chunk
5. Install any needed shadcn/ui components: npx shadcn@latest add <component>
6. Apply the design system from docs/03-design-system.md
7. Use the copy from docs/02-copy-deck.md
8. Make everything responsive (mobile-first)
9. Add Framer Motion animations
10. After ALL chunks: run "npm run build" — fix any errors

DO NOT STOP until every chunk is complete and npm run build passes with zero errors.`, projectDir, 1_200_000); // 20 min timeout

  // Verify final build
  const buildResult = run('npm run build 2>&1', projectDir, 120_000);
  if (buildResult.includes('Error') && !buildResult.includes('0 Error')) {
    log('Build errors detected, running fix cycle...');
    claudeCode(`npm run build failed:\n\n${buildResult.slice(-3000)}\n\nFix ALL errors. Run npm run build again. Keep fixing until it passes cleanly.`, projectDir, 300_000);
  }

  log('Stage 6 complete: Implementation');
}

// ── Stage 7: Review, Test & Polish ──────────────────────
async function stage7_review() {
  updateStage('stage-7-review');
  log('Stage 7: REVIEW & TEST');
  await sms('🧪 Stage 8/8: Testing everything...');

  const framework = readFramework('07-review-polish.md');

  // Install Playwright
  run('npm install -D @playwright/test @axe-core/playwright', projectDir, 60_000);
  run('npx playwright install --with-deps chromium', projectDir, 180_000);

  // Generate and run E2E tests
  claudeCode(`You are executing Stage 7 of the Avolve Website Build Pipeline — Review & Polish.

FRAMEWORK:
${framework}

PROJECT: ${projectDir}

TASKS:
1. Create a comprehensive Playwright E2E test suite in ${projectDir}/e2e/ covering:
   - Every route loads (200 status)
   - Responsive rendering at 1440px, 768px, 375px
   - All internal links work
   - Forms validate required fields
   - Accessibility (axe-core, AA compliance)
   - SEO (meta titles, descriptions, OG tags on every page)
   - 404 page exists
   - No console errors

2. Create playwright.config.ts with:
   - webServer pointing to "npm run dev" on port 3000
   - chromium only
   - test directory: e2e/

3. Run: npx playwright test
4. If any tests fail, fix the WEBSITE CODE (not the tests)
5. Re-run tests
6. Repeat up to ${MAX_FIX_CYCLES} times until all pass

7. Also verify:
   - npm run build passes
   - All design system tokens applied correctly
   - Copy matches the copy deck
   - Animations work
   - Mobile nav works

Do not stop until all tests pass and the build is clean.`, projectDir, 900_000);

  log('Stage 7 complete: Review & Testing');
}

// ── Deploy ──────────────────────────────────────────────
async function deploy() {
  updateStage('deploying');
  log('DEPLOYING');
  await sms('🚀 All tests passed! Deploying your website...');

  // Get project name
  const spec = fs.readFileSync(path.join(userDir, 'spec.md'), 'utf8');
  const nameMatch = spec.match(/(?:business|project|name)[:\s]+([^\n]+)/i);
  const projectName = (nameMatch ? nameMatch[1].trim() : 'client-site')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'client-site';
  const repoName = `build-${projectName}-${Date.now().toString(36)}`;

  // Remove docs from deploy (internal only)
  run('rm -rf docs/', projectDir);

  // Git + GitHub
  run('git init', projectDir);
  run('echo "node_modules/\\n.next/\\ntest-results/\\n" > .gitignore', projectDir);
  run('git add -A', projectDir);
  run('git commit -m "Initial build — Avolve Build Pipeline"', projectDir);
  const ghResult = run(`gh repo create jamesclaimtechio/${repoName} --public --source . --push 2>&1`, projectDir, 60_000);
  log(`GitHub: ${ghResult.slice(0, 300)}`);

  // Vercel
  const vercelResult = run('npx vercel --prod --yes --token "<VERCEL_TOKEN>" 2>&1', projectDir, 120_000);
  log(`Vercel: ${vercelResult.slice(0, 300)}`);

  const urlMatch = vercelResult.match(/https:\/\/[^\s]+\.vercel\.app/);
  const deployUrl = urlMatch ? urlMatch[0] : 'deployment pending';
  const ghUrl = `https://github.com/jamesclaimtechio/${repoName}`;

  // Update session
  const session = JSON.parse(fs.readFileSync(path.join(userDir, 'session.json'), 'utf8'));
  session.deployed = true;
  session.deployUrl = deployUrl;
  session.stage = 'complete';
  session.completedAt = new Date().toISOString();
  fs.writeFileSync(path.join(userDir, 'session.json'), JSON.stringify(session, null, 2));
  fs.writeFileSync(path.join(userDir, 'deployed.json'), JSON.stringify({ deployUrl, ghUrl, repoName }, null, 2));

  log(`DEPLOYED: ${deployUrl}`);
  await sms(`🎉 Your website is LIVE!\n\n🌐 ${deployUrl}\n📦 ${ghUrl}\n\nText me anytime if you want changes!`);
}

// ══════════════════════════════════════════════════════════
// APP BUILD PIPELINE (Stages 0→7 from PIPELINE.md)
// ══════════════════════════════════════════════════════════

function readAppFramework(filename) {
  const filepath = path.join(FRAMEWORKS, filename);
  if (fs.existsSync(filepath)) return fs.readFileSync(filepath, 'utf8');
  return '';
}

async function app0_ideation() {
  updateStage('app-0-ideation');
  log('App Stage 0: IDEA VALIDATION');
  await sms('💡 Stage 1/8: Validating your app concept...');

  const spec = fs.readFileSync(path.join(userDir, 'spec.md'), 'utf8');
  const framework = readAppFramework('idea-validator.md');

  fs.mkdirSync(docsDir, { recursive: true });

  claudeCode(`You are executing Stage 0 of the Avolve App Build Pipeline — Idea Validation.

FRAMEWORK:
${framework}

CLIENT SPEC:
${spec}

Validate the idea, identify risks, confirm viability.
Save to ${path.join(docsDir, '00-idea-validation.md')}`, userDir);

  log('App Stage 0 complete');
}

async function app1_discovery() {
  updateStage('app-1-discovery');
  log('App Stage 1: PROJECT DISCOVERY');
  await sms('🔍 Stage 2/8: Deep project discovery...');

  const framework = readAppFramework('project-discovery.md');
  const validation = fs.existsSync(path.join(docsDir, '00-idea-validation.md'))
    ? fs.readFileSync(path.join(docsDir, '00-idea-validation.md'), 'utf8') : '';

  claudeCode(`Stage 1: Project Discovery.

FRAMEWORK:
${framework}

IDEA VALIDATION:
${validation}

Produce a comprehensive project discovery document covering users, problems, requirements, constraints.
Save to ${path.join(docsDir, '01-project-discovery.md')}`, userDir);

  log('App Stage 1 complete');
}

async function app2_features() {
  updateStage('app-2-features');
  log('App Stage 2: FEATURE ARCHITECTURE');
  await sms('🏗️ Stage 3/8: Architecting features...');

  const framework = readAppFramework('feature-architect.md');
  const discovery = fs.existsSync(path.join(docsDir, '01-project-discovery.md'))
    ? fs.readFileSync(path.join(docsDir, '01-project-discovery.md'), 'utf8') : '';

  claudeCode(`Stage 2: Feature Architecture.

FRAMEWORK:
${framework}

PROJECT DISCOVERY:
${discovery}

Design the complete feature set, user flows, and feature dependencies.
Save to ${path.join(docsDir, '02-feature-architecture.md')}`, userDir);

  log('App Stage 2 complete');
}

async function app3_technical() {
  updateStage('app-3-technical');
  log('App Stage 3: TECHNICAL ARCHITECTURE');
  await sms('⚙️ Stage 4/8: Technical architecture...');

  const framework = readAppFramework('technical-architect-v2.md');
  const features = fs.existsSync(path.join(docsDir, '02-feature-architecture.md'))
    ? fs.readFileSync(path.join(docsDir, '02-feature-architecture.md'), 'utf8') : '';

  claudeCode(`Stage 3: Technical Architecture.

FRAMEWORK:
${framework}

FEATURE ARCHITECTURE:
${features}

Tech stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma (if DB needed), NextAuth (if auth needed).

Design the full technical architecture: API routes, data models, auth flow, third-party integrations.
Save to ${path.join(docsDir, '03-technical-architecture.md')}`, userDir);

  log('App Stage 3 complete');
}

async function app3b_schema() {
  updateStage('app-3b-schema');
  log('App Stage 3b: SCHEMA ARCHITECTURE');

  const framework = readAppFramework('schema-architect-v2.md');
  const technical = fs.existsSync(path.join(docsDir, '03-technical-architecture.md'))
    ? fs.readFileSync(path.join(docsDir, '03-technical-architecture.md'), 'utf8') : '';

  claudeCode(`Stage 3b: Schema Architecture.

FRAMEWORK:
${framework}

TECHNICAL ARCHITECTURE:
${technical}

Design database schemas, API contracts, type definitions.
Save to ${path.join(docsDir, '03b-schema-architecture.md')}`, userDir);

  log('App Stage 3b complete');
}

async function app4_roadmap() {
  updateStage('app-4-roadmap');
  log('App Stage 4: ROADMAP & MODULES');
  await sms('🗺️ Stage 5/8: Planning build roadmap...');

  const framework = readAppFramework('roadmap-module-architect.md');
  const technical = fs.existsSync(path.join(docsDir, '03-technical-architecture.md'))
    ? fs.readFileSync(path.join(docsDir, '03-technical-architecture.md'), 'utf8') : '';

  claudeCode(`Stage 4: Roadmap & Module Architecture.

FRAMEWORK:
${framework}

TECHNICAL ARCHITECTURE:
${technical}

Break the project into modules and create a phased build roadmap.
Save to ${path.join(docsDir, '04-roadmap-modules.md')}`, userDir);

  log('App Stage 4 complete');
}

async function app5_chunks() {
  updateStage('app-5-chunks');
  log('App Stage 5: BUILD CHUNKS');
  await sms('📦 Stage 6/8: Breaking into build chunks...');

  const chunkGenerator = readAppFramework('build-chunk-generator-v3.md');
  const roadmap = fs.existsSync(path.join(docsDir, '04-roadmap-modules.md'))
    ? fs.readFileSync(path.join(docsDir, '04-roadmap-modules.md'), 'utf8') : '';
  const technical = fs.existsSync(path.join(docsDir, '03-technical-architecture.md'))
    ? fs.readFileSync(path.join(docsDir, '03-technical-architecture.md'), 'utf8') : '';

  claudeCode(`Stage 5: Build Chunk Generation.

CHUNK GENERATOR FRAMEWORK:
${chunkGenerator}

ROADMAP:
${roadmap}

TECHNICAL ARCHITECTURE:
${technical}

Generate ordered, implementation-ready chunks. Each chunk must be self-contained.
Save chunks to ${path.join(docsDir, 'chunks/')} as chunk-01-xxx.md, chunk-02-xxx.md, etc.
Save master list to ${path.join(docsDir, '05-build-chunks.md')}`, userDir);

  log('App Stage 5 complete');
}

async function app6_implementation() {
  updateStage('app-6-implementation');
  log('App Stage 6: IMPLEMENTATION');
  await sms('🔨 Stage 7/8: Building your app. This is the big one — 20-40 min...');

  const chunkExecution = readAppFramework('chunk-execution-layer.md');
  const implPlan = readAppFramework('implementation-plan-generator.md');

  // Scaffold
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    log('Scaffolding Next.js project...');
    run(`npx create-next-app@latest project --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --use-npm`, userDir, 120_000);
    run('npm install framer-motion', projectDir, 60_000);
    run('npx shadcn@latest init -y --defaults 2>&1', projectDir, 60_000);
  }

  // Copy docs into project
  const projDocsDir = path.join(projectDir, 'docs');
  fs.mkdirSync(projDocsDir, { recursive: true });
  run(`cp -r ${docsDir}/* ${projDocsDir}/`, userDir);

  // Create SESSION_TRACKER
  const chunkFiles = fs.existsSync(path.join(docsDir, 'chunks'))
    ? fs.readdirSync(path.join(docsDir, 'chunks')).filter(f => f.endsWith('.md')).sort() : [];

  fs.writeFileSync(path.join(projDocsDir, 'SESSION_TRACKER.md'), `# Build Session Tracker\n\n## Chunks\n${chunkFiles.map((f, i) => `- [ ] ${f}`).join('\n')}\n`);

  claudeCode(`You are building a complete web application.

IMPLEMENTATION PLAN FRAMEWORK:
${implPlan}

CHUNK EXECUTION FRAMEWORK (MANDATORY):
${chunkExecution}

Read ALL docs in ${projDocsDir}/ and ${projDocsDir}/chunks/

Execute each chunk in order: Plan → Build → Test (npm run build) → Verify
Install any needed deps (prisma, nextauth, etc.) as specified in the technical architecture.
Update SESSION_TRACKER.md after each chunk.

DO NOT STOP until every chunk is complete and npm run build passes cleanly.`, projectDir, 1_200_000);

  // Verify
  const buildResult = run('npm run build 2>&1', projectDir, 120_000);
  if (buildResult.includes('Error') && !buildResult.includes('0 Error')) {
    claudeCode(`npm run build failed:\n\n${buildResult.slice(-3000)}\n\nFix ALL errors until it passes.`, projectDir, 300_000);
  }

  log('App Stage 6 complete');
}

// ── Main Pipeline ───────────────────────────────────────
async function main() {
  try {
    log(`\n${'='.repeat(60)}\nAVOLVE ${projectType.toUpperCase()} BUILD PIPELINE — ${phone}\n${'='.repeat(60)}`);

    if (projectType === 'website') {
      // Website Pipeline (design + copy first)
      await stage0_discovery();     // Brand Brief
      await stage1_sitemap();       // Content Architecture
      await stage2_copy();          // Copy Deck
      await stage2b_techsetup();    // Technical Setup
      await stage3_design();        // Design System
      await stage4_layouts();       // Page Layouts
      await stage4b_builddocs();    // Build Docs
      await stage5_chunks();        // Build Chunks
      await stage6_implementation();// Claude Code builds it
      await stage7_review();        // E2E tests + fixes
    } else {
      // App Pipeline (features + architecture first)
      await app0_ideation();        // Idea Validation
      await app1_discovery();       // Project Discovery
      await app2_features();        // Feature Architecture
      await app3_technical();       // Technical Architecture
      await app3b_schema();         // Schema Architecture
      await app4_roadmap();         // Roadmap & Modules
      await app5_chunks();          // Build Chunks
      await app6_implementation();  // Claude Code builds it
      await stage7_review();        // E2E tests + fixes (shared)
    }

    await deploy();                 // GitHub + Vercel (shared)
    log('PIPELINE COMPLETE ✅');
  } catch (err) {
    log(`FATAL: ${err.message}\n${err.stack}`);
    await sms('⚠️ Something went wrong with your build. Our team has been notified and will reach out shortly.');
  }
}

main();
