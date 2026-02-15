# How to Use This Document
This prompt takes your approved Archive Plan and generates ready-to-run shell commands. Run this AFTER approving the Archive Plan.
Input required: Paste your approved Archive Plan.
Output: Shell commands you can run in your terminal.
---
## The Workflow
```javascript
┌──────────────────────────┐
│ 1. Cleanup Inventory     │
│    (done)                │
└───────────┬──────────────┘
            ↓
┌──────────────────────────┐
│ 2. Cleanup Plan          │
│    Generator (done)      │
└───────────┬──────────────┘
            ↓
       [YOU APPROVED]
            ↓
┌──────────────────────────┐
│ 3. Archive Executor      │ ← YOU ARE HERE
│    (this prompt)         │
└───────────┬──────────────┘
            ↓
       [RUN COMMANDS]
       in terminal
            ↓
┌──────────────────────────┐
│ 4. Verify & Commit       │
│    (manual)              │
└──────────────────────────┘
```
---
## The Archive Executor Prompt
Copy and paste into Cursor, then paste your approved Archive Plan after it:
---
```javascript
You are generating shell commands to execute an approved Archive Plan. The user has already reviewed and approved the plan. Your job is to output safe, ready-to-run commands.

---

INPUT: APPROVED ARCHIVE PLAN

[The user will paste their approved plan below]

---

YOUR TASK

1. Generate commands to create the archive folder structure
2. Generate mv commands for each file
3. Generate the manifest file creation
4. Output verification commands
5. Provide rollback instructions

---

OUTPUT FORMAT

# Archive Execution Commands

Project: [Name]
Date: [YYYY-MM-DD]
Total files: [N]

---

## Step 1: Create Archive Structure

Run these commands to create the archive folders:

```
# Create archive directory structure
mkdir -p archive/[YYYY-MM-DD]/docs
mkdir -p archive/[YYYY-MM-DD]/code
mkdir -p archive/[YYYY-MM-DD]/config
mkdir -p archive/[YYYY-MM-DD]/other
```javascript

---

## Step 2: Move Files

Run these commands to move files to archive:

### Documentation

```
# Documentation files
mv "[source-path]" "archive/[YYYY-MM-DD]/docs/"
mv "[source-path]" "archive/[YYYY-MM-DD]/docs/"
```javascript

### Code

```
# Code files
mv "[source-path]" "archive/[YYYY-MM-DD]/code/"
```javascript

### Configuration

```
# Config files
mv "[source-path]" "archive/[YYYY-MM-DD]/config/"
```javascript

### Other

```
# Other files
mv "[source-path]" "archive/[YYYY-MM-DD]/other/"
```javascript

---

## Step 3: Create Manifest

Run this to create the archive manifest (as a markdown file):

```
cat > archive/[YYYY-MM-DD]/ARCHIVE_MANIFEST.md << 'EOF'
# Archive Manifest
Archived: [YYYY-MM-DD]
Project: [Name]
Total files: [N]
## Why These Files Were Archived
[Summary from plan]
## Archived Files
### Documentation
[List from plan]
### Code
[List from plan]
### Configuration
[List from plan]
### Other
[List from plan]
## Recovery
To recover any file:
mv archive/[YYYY-MM-DD]/[category]/[filename] [original-path]
EOF
```javascript

---

## Step 4: Verify

Run these to verify the archive:

```
# Check archive structure
ls -la archive/[YYYY-MM-DD]/
# Count archived files
find archive/[YYYY-MM-DD] -type f | wc -l
# Verify manifest exists
cat archive/[YYYY-MM-DD]/ARCHIVE_MANIFEST.md
```javascript

---

## Step 5: Test Build

Before committing, verify nothing broke:

```
# Run your build
pnpm build
# Run tests if you have them
pnpm test
# Start dev server and check
pnpm dev
```javascript

---

## Step 6: Commit

If everything works:

```
git add .
git commit -m "chore: archive [N] unused files
- Archived [N] documentation files
- Archived [N] code files
- Archived [N] config files
- Archived [N] other files
See archive/[YYYY-MM-DD]/ARCHIVE_MANIFEST.md for details"
```javascript

---

## Rollback (If Needed)

If something breaks, recover files:

```
# Recover a single file
mv "archive/[YYYY-MM-DD]/[category]/[filename]" "[original-path]"
# Or recover everything (nuclear option)
for category in docs code config other; do
done
```javascript

---

## All Commands (Combined)

For convenience, here's everything in one block:

```
# === ARCHIVE EXECUTION ===
# Project: [Name]
# Date: [YYYY-MM-DD]
# Step 1: Create structure
mkdir -p archive/[YYYY-MM-DD]/{docs,code,config,other}
# Step 2: Move files
[All mv commands]
# Step 3: Create manifest
cat > archive/[YYYY-MM-DD]/ARCHIVE_MANIFEST.md << 'EOF'
[Manifest content]
EOF
# Step 4: Verify
echo "Archived files:"
find archive/[YYYY-MM-DD] -type f | wc -l
```javascript

---

COMMAND QUALITY RULES

1. Quote all paths - handle spaces and special characters
2. Use relative paths - from project root
3. Preserve structure - files go to correct category folders
4. Include verification - user should confirm success
5. Provide rollback - always give recovery instructions

---

Now read the approved Archive Plan below and generate the execution commands.

---

[PASTE YOUR APPROVED ARCHIVE PLAN HERE]
```
---
## How to Run the Commands
### Option 1: Step by Step
Run each step section one at a time:
1. Create structure
