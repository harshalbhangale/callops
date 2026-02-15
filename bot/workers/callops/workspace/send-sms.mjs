#!/usr/bin/env node
// Usage: node send-sms.mjs "+917028167389" "Your message here"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const TWILIO_SID = '<TWILIO_SID>';
const TWILIO_AUTH = '<TWILIO_AUTH>';
const FROM = '+447400409191';

const to = process.argv[2];
const body = process.argv[3];

if (!to || !body) {
  console.error('Usage: node send-sms.mjs <to> <message>');
  process.exit(1);
}

const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64');

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ To: to, From: FROM, Body: body }),
});

const data = await res.json();
if (data.sid) {
  console.log(`SMS sent: ${data.sid}`);
} else {
  console.error('SMS failed:', data.message || JSON.stringify(data));
  process.exit(1);
}
