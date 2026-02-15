# Callops Backend

Node.js/Express backend for handling Twilio voice calls and AI processing.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

## Twilio Webhook Configuration

Once your server is running with ngrok:

1. Start ngrok: `ngrok http 4000`
2. Copy the https URL (e.g., `https://abc123.ngrok.io`)
3. Go to Twilio Console → Phone Numbers → Your Number
4. Set Voice webhook to: `https://abc123.ngrok.io/api/voice/incoming`
5. HTTP method: POST
6. Save

## Test

Call your Twilio number: +447458081879

The AI will answer and ask what you want to build!

## Endpoints

- `POST /api/voice/incoming` - Twilio incoming call webhook
- `POST /api/voice/process` - Process speech transcription
- `GET /api/calls` - Get all calls
- `GET /api/apps` - Get all apps
- `GET /api/stats` - Get user stats
