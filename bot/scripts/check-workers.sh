#!/bin/bash
# Worker status check — runs every 15 min via system cron
# Sends update to James via Claw's Telegram bot

JAMES_ID="2014825209"
CLAW_TOKEN="8355144303:AAGZilkXzWKGfH2JQJ6K81BttKXR3avCvNU"
MSG=""
ALERT=0

# Check services
for worker in alpha bravo charlie; do
    if ! systemctl is-active "swarm-$worker" >/dev/null 2>&1; then
        MSG="${MSG}🔴 ${worker^} is DOWN — restarting...\n"
        systemctl restart "swarm-$worker"
        ALERT=1
    fi
done

# Check STATUS.md for each worker
for worker in alpha bravo charlie; do
    STATUS_FILE="/opt/swarm/workers/$worker/workspace/STATUS.md"
    if [ -f "$STATUS_FILE" ]; then
        # Get status line
        STATUS=$(grep -i "status:" "$STATUS_FILE" | head -1 | sed 's/.*Status:\*\* //' | sed 's/\*//g')
        TASK=$(grep -i "task\|project" "$STATUS_FILE" | head -1 | sed 's/.*:\*\* //' | sed 's/\*//g')
        
        UPPER=$(echo "$worker" | sed 's/.*/\u&/')
        
        if echo "$STATUS" | grep -qi "idle\|none\|complete\|done\|delivered"; then
            MSG="${MSG}⚪ ${UPPER}: Idle\n"
        elif echo "$STATUS" | grep -qi "working\|progress\|pending\|active"; then
            # Check if stuck (STATUS.md not modified in 1hr)
            LAST_MOD=$(stat -c %Y "$STATUS_FILE")
            NOW=$(date +%s)
            DIFF=$((NOW - LAST_MOD))
            if [ $DIFF -gt 3600 ]; then
                MINS=$((DIFF / 60))
                MSG="${MSG}⚠️ ${UPPER}: Possibly stuck (${MINS}m since update) — ${TASK}\n"
                ALERT=1
            else
                MSG="${MSG}🟡 ${UPPER}: Working — ${TASK}\n"
            fi
        else
            MSG="${MSG}🟢 ${UPPER}: ${STATUS}\n"
        fi
    fi
done

# Memory check
MEM_USED_PCT=$(free | awk '/Mem:/ {printf "%.0f", $3/$2*100}')
if [ "$MEM_USED_PCT" -gt 85 ]; then
    MSG="${MSG}🐏 Memory: ${MEM_USED_PCT}%\n"
    ALERT=1
fi

# Only send if there's an alert OR it's on the hour (periodic update)
MINUTE=$(date +%M)
if [ $ALERT -eq 1 ] || [ "$MINUTE" = "00" ]; then
    curl -s -X POST "https://api.telegram.org/bot$CLAW_TOKEN/sendMessage" \
        -d "chat_id=$JAMES_ID" \
        -d "text=🤖 Swarm Status:
$(echo -e "$MSG")" >/dev/null
fi
