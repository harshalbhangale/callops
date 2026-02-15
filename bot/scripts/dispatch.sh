#!/bin/bash
# Dispatch a task to a worker via its persistent gateway session
# Usage: dispatch.sh <worker> <message>

WORKER=$1
shift
MESSAGE="$*"
JAMES_ID="2014825209"

if [ -z "$WORKER" ] || [ -z "$MESSAGE" ]; then
    echo "Usage: dispatch.sh <alpha|bravo|charlie> <message>"
    exit 1
fi

case $WORKER in
    alpha)  PORT=18801 ;;
    bravo)  PORT=18802 ;;
    charlie) PORT=18803 ;;
    *) echo "Unknown worker: $WORKER"; exit 1 ;;
esac

WORKER_HOME="/opt/swarm/workers/$WORKER"

echo "📤 Dispatching to $WORKER (port $PORT)..."
OPENCLAW_GATEWAY_PORT=$PORT HOME=$WORKER_HOME openclaw agent \
    --to "$JAMES_ID" \
    --message "$MESSAGE" \
    --deliver \
    --channel telegram \
    --timeout 600

echo "✅ $WORKER task dispatched"
