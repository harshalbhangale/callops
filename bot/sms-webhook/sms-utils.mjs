/**
 * Shared SMS utilities for the build pipeline
 */

const TWILIO_SID = '<TWILIO_SID>';
const TWILIO_AUTH = '<TWILIO_AUTH>';
const TWILIO_FROM = '+447400409191';

export async function sendSMS(to, body) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64');

  const chunks = [];
  for (let i = 0; i < body.length; i += 1500) chunks.push(body.slice(i, i + 1500));

  for (const chunk of chunks) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ From: TWILIO_FROM, To: to, Body: chunk }).toString(),
      });
      if (!res.ok) {
        console.error('[sms] send failed:', res.status, await res.text());
      } else {
        console.log(`[sms] → ${to}: ${chunk.slice(0, 60)}...`);
      }
    } catch (err) {
      console.error('[sms] send error:', err.message);
    }
  }
}
