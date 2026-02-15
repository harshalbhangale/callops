#!/bin/bash
# AI Swarm Health Monitor

LOG_FILE="/opt/swarm/claw/logs/monitor.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> $LOG_FILE
}

check_worker_health() {
    local worker=$1
    local status_file="/opt/swarm/workers/$worker/STATUS.md"
    
    if ! systemctl is-active "swarm-$worker" >/dev/null 2>&1; then
        log "ERROR: Worker $worker service is down"
        systemctl restart "swarm-$worker"
        log "RECOVERED: Worker $worker restarted"
        return 1
    fi
    
    if [ -f "$status_file" ]; then
        local last_modified=$(stat -c %Y "$status_file")
        local current_time=$(date +%s)
        local diff=$((current_time - last_modified))
        
        if [ $diff -gt 3600 ]; then
            log "WARNING: Worker $worker stuck for ${diff}s"
            /opt/swarm/scripts/recover-worker.sh $worker
        fi
    fi
}

check_disk_space() {
    local usage=$(df /opt/swarm | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$usage" -gt 80 ]; then
        log "WARNING: Disk usage high: ${usage}%"
    fi
}

# Main loop
while true; do
    log "Health check cycle starting"
    for worker in alpha bravo charlie; do
        check_worker_health $worker
    done
    check_disk_space
    log "Health check cycle complete"
    sleep 300
done
