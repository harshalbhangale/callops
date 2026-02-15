#!/bin/bash
# Dispatch a BUILD task to Claude Code with the execution framework baked in
# Usage: dispatch-build.sh <project_dir> <chunks_file> <design_system_file> [layouts_file]

PROJECT_DIR=$1
CHUNKS_FILE=$2
DESIGN_FILE=$3
LAYOUTS_FILE=$4

if [ -z "$PROJECT_DIR" ] || [ -z "$CHUNKS_FILE" ]; then
    echo "Usage: dispatch-build.sh <project_dir> <chunks_file> <design_system_file> [layouts_file]"
    exit 1
fi

LAYOUTS_LINE=""
if [ -n "$LAYOUTS_FILE" ]; then
    LAYOUTS_LINE="4. ${LAYOUTS_FILE} — Page layout spec."
fi

echo "🏗️ Launching Claude Code build in $PROJECT_DIR..."

cd "$PROJECT_DIR" && \
claude -p "You are executing build chunks for a website/app project.

BEFORE BUILDING ANYTHING, read these files in order:
1. /opt/swarm/shared/frameworks/chunk-execution-layer.md — This is your EXECUTION FRAMEWORK. Follow it exactly.
2. ${CHUNKS_FILE} — These are your build chunks.
3. ${DESIGN_FILE} — Design system spec.
${LAYOUTS_LINE}

For EACH chunk:
1. PLAN — Read the chunk, extract what to build, what to test, what to watch for
2. BUILD — Write the code following the spec exactly
3. TEST — Run the appropriate build/test command after each chunk to verify
4. VERIFY — Check the output matches the chunk's success criteria

Create a docs/SESSION_TRACKER.md to track your progress through the chunks.

Work through ALL sprints sequentially. Build REAL, production-quality code with proper animations, responsive design, and accessibility.

When completely finished, create a BUILD_COMPLETE.md summarizing what was built, any issues found, and test results." \
--allowedTools "Bash,Read,Write,Edit"
