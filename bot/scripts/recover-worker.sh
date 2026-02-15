#!/bin/bash
WORKER_NAME=$1
[ -z "$WORKER_NAME" ] && echo "Usage: $0 <worker_name>" && exit 1

echo "Recovering worker: $WORKER_NAME"
systemctl stop "swarm-$WORKER_NAME" 2>/dev/null

cp "/opt/swarm/workers/$WORKER_NAME/STATUS.md" \
   "/opt/swarm/workers/$WORKER_NAME/STATUS.md.backup.$(date +%s)" 2>/dev/null

echo "" >> "/opt/swarm/workers/$WORKER_NAME/STATUS.md"
echo "🔄 **WORKER RECOVERY** $(date -u)" >> "/opt/swarm/workers/$WORKER_NAME/STATUS.md"
echo "Auto-recovered due to 1+ hour inactivity" >> "/opt/swarm/workers/$WORKER_NAME/STATUS.md"

rm -f "/opt/swarm/workers/$WORKER_NAME/workspace/.git/index.lock"
systemctl start "swarm-$WORKER_NAME"

sleep 5
if systemctl is-active "swarm-$WORKER_NAME" >/dev/null 2>&1; then
    echo "✅ Worker $WORKER_NAME recovered"
else
    echo "❌ Worker $WORKER_NAME recovery failed"
    exit 1
fi
