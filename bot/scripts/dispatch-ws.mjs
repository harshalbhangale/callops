#!/usr/bin/env node
// Dispatch a task to a worker via its gateway websocket
// Usage: node dispatch-ws.mjs <worker> "<message>"

import { WebSocket } from 'node:stream/web' in process.versions.node >= '21' 
  ? 'node:stream/web' 
  : (() => { throw new Error('need ws'); })();

// Fallback: use the ws module from openclaw's node_modules
const args = process.argv.slice(2);
const worker = args[0];
const message = args.slice(1).join(' ');

if (!worker || !message) {
  console.error('Usage: node dispatch-ws.mjs <alpha|bravo|charlie> "<message>"');
  process.exit(1);
}

const ports = { alpha: 18801, bravo: 18802, charlie: 18803 };
const tokens = { alpha: 'alpha-swarm-token-001', bravo: 'bravo-swarm-token-002', charlie: 'charlie-swarm-token-003' };

const port = ports[worker];
const token = tokens[worker];

if (!port) {
  console.error(`Unknown worker: ${worker}`);
  process.exit(1);
}

console.log(`Dispatching to ${worker} on port ${port}...`);
