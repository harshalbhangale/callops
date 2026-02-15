# 📱 Callops SMS Integration - Complete Setup

## ✅ What's Been Added

Your Callops backend now has **full SMS functionality** integrated with Twilio! You can:

1. ✅ **Send SMS** to +44 7400 409191 from your AI agent
2. ✅ **Receive SMS** from users (with webhook setup)
3. ✅ **Track delivery** status of sent messages
4. ✅ **Interactive commands** (help, status, build)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Start the Backend Server

```bash
cd backend
npm install  # If you haven't already
npm start
```

You should see:
```
🚀 Callops Backend Server
📍 Server running on http://localhost:4000
📞 Twilio Number: +447458081879
```

### Step 2: Test Sending SMS

**Option A: Use the Web Interface** (Easiest!)
1. Open in browser: http://localhost:4000/sms-test
2. Enter message
3. Click "Send SMS"
4. Check your phone! 📱

**Option B: Use Test Script**
```bash
cd backend
node test-sms.js
```

**Option C: Use curl**
```bash
curl -X POST http://localhost:4000/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{"to":"+447400409191","message":"Hello from Callops!"}'
```

### Step 3: Integrate with Your AI Agent

```javascript
// In your OpenClaude or other AI app
const response = await fetch('http://localhost:4000/api/sms/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '+447400409191',
    message: '🚀 Your AI task is complete!'
  })
});
```

---

## 📂 What Was Created

### New Files
```
backend/
├── api/
│   ├── sms-send.js         # Send SMS endpoint
│   ├── sms-incoming.js     # Receive SMS webhook
│   └── sms-status.js       # SMS status callback
├── utils/
│   └── sms.js              # Helper functions
├── examples/
│   └── ai-agent-integration.js  # Integration examples
├── public/
│   └── sms-test.html       # Web-based SMS tester
└── test-sms.js             # Test script

Root/
├── SMS_GUIDE.md            # Detailed documentation
├── SMS_QUICKSTART.md       # Quick reference
└── SMS_SETUP_COMPLETE.md   # This file
```

### Updated Files
- `backend/server.js` - Added SMS routes and static file serving
- `backend/api/voice-process.js` - Integrated SMS notifications

---

## 🎯 Available Endpoints

### 1. Send SMS
**POST** `/api/sms/send`

```javascript
{
  "to": "+447400409191",
  "message": "Your message here"
}
```

### 2. Receive SMS (Webhook)
**POST** `/api/sms/incoming`

Set this in Twilio Console (see setup below)

### 3. SMS Status (Webhook)
**POST** `/api/sms/status`

Tracks delivery status

### 4. SMS Tester UI
**GET** `/sms-test`

Web interface for testing

---

## 🔧 Complete Twilio Setup (For Receiving SMS)

If you want to **receive SMS** from users:

### 1. Expose Your Server (Development)

**Using ngrok:**
```bash
# In a new terminal
ngrok http 4000
```

Copy the URL (e.g., `https://abc123.ngrok.io`)

### 2. Configure Twilio Webhooks

1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. Click your number: **+447458081879**
3. Scroll to "Messaging Configuration"
4. Set:
   - **When a message comes in:** `https://abc123.ngrok.io/api/sms/incoming`
   - **Method:** POST
   - **Status callback URL:** `https://abc123.ngrok.io/api/sms/status` (optional)
5. Click **Save**

### 3. Test Receiving SMS

From your phone (+447400409191), send a text to **+447458081879**:

- Send: `help` → Get commands list
- Send: `status` → Get account status
- Send: `build a todo app` → Start building

You'll get automatic replies! 🤖

---

## 💡 Use Cases

### 1. Notify When AI Task Starts
```javascript
await fetch('http://localhost:4000/api/sms/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '+447400409191',
    message: '⚙️ AI Agent is processing your request...'
  })
});
```

### 2. Notify When Task Completes
```javascript
await fetch('http://localhost:4000/api/sms/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '+447400409191',
    message: '✅ Task complete! Your result is ready.'
  })
});
```

### 3. Send Error Notifications
```javascript
try {
  // Your AI task
} catch (error) {
  await fetch('http://localhost:4000/api/sms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: '+447400409191',
      message: `❌ Error: ${error.message}`
    })
  });
}
```

### 4. Progress Updates
```javascript
const steps = [
  '⚙️ Starting...',
  '🧠 Processing with AI...',
  '🚀 Deploying...',
  '✅ Complete!'
];

for (const step of steps) {
  await fetch('http://localhost:4000/api/sms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: '+447400409191',
      message: step
    })
  });
  await new Promise(r => setTimeout(r, 5000)); // Wait 5s between updates
}
```

---

## 🧪 Testing

### Quick Test Checklist

- [ ] Backend server running
- [ ] Open http://localhost:4000/sms-test
- [ ] Send test message
- [ ] Receive SMS on +447400409191
- [ ] (Optional) Setup ngrok for receiving
- [ ] (Optional) Configure Twilio webhook
- [ ] (Optional) Send SMS to Twilio number and get reply

### Run Test Script
```bash
node backend/test-sms.js
```

### Check Logs
Your backend terminal will show:
```
📤 Sending SMS: { from: '+447458081879', to: '+447400409191', ... }
✅ SMS sent successfully: SM1234567890...
```

### Verify in Twilio
https://console.twilio.com/us1/monitor/logs/sms

---

## 🔗 Integration with Your AI App

### Helper Module (Recommended)

Create a file in your AI app:

```javascript
// sms-notifier.js
const CALLOPS_API = 'http://localhost:4000';

async function notify(message) {
  const response = await fetch(`${CALLOPS_API}/api/sms/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: '+447400409191',
      message: message
    })
  });
  return response.json();
}

module.exports = { notify };
```

Use it:
```javascript
const { notify } = require('./sms-notifier');

// In your AI agent
await notify('🤖 Starting your task...');
// ... do work ...
await notify('✅ Task complete!');
```

---

## 📊 Monitoring

### Backend Logs
Watch your terminal for:
- 📤 Outgoing SMS
- 📥 Incoming SMS  
- 📊 Status updates
- ❌ Errors

### Twilio Console
Monitor all SMS activity:
- https://console.twilio.com/us1/monitor/logs/sms
- See delivery status, errors, costs

---

## 💰 Costs

Twilio SMS pricing (approximate):
- **Outbound SMS (UK)**: ~£0.03 per message
- **Inbound SMS (UK)**: ~£0.01 per message
- **Phone number**: ~£1/month

100 messages ≈ £3-4

---

## 🐛 Troubleshooting

### SMS not sending?
1. Check Twilio credentials in `.env`
2. Verify phone number format: `+447400409191`
3. Check Twilio balance
4. Look at backend terminal for errors

### Not receiving SMS on your phone?
1. Verify Twilio number: +447458081879
2. Check phone number format
3. Test with curl first
4. Check Twilio console for delivery status

### SMS webhook not working?
1. Ensure ngrok is running
2. Verify webhook URL in Twilio console
3. Check backend logs for incoming requests
4. Test webhook URL: `curl https://your-ngrok-url.ngrok.io/api/sms/incoming`

### "Invalid phone number" error?
- UK numbers: `+44` prefix (e.g., `+447400409191`)
- Always include country code
- Remove spaces and dashes

---

## 🎉 You're All Set!

### What You Can Do Now:

✅ Send SMS from your AI agent to your phone  
✅ Notify users about task progress  
✅ Send completion/error notifications  
✅ Receive commands via SMS (with webhook setup)  
✅ Build interactive SMS workflows  

### Next Steps:

1. **Test locally**: Use the web tester or test script
2. **Integrate**: Add SMS notifications to your AI app
3. **Deploy**: (Optional) Deploy backend and configure webhooks
4. **Scale**: Add database to store SMS history

---

## 📚 Documentation

- **Quick Start**: `SMS_QUICKSTART.md`
- **Full Guide**: `SMS_GUIDE.md`
- **Examples**: `backend/examples/ai-agent-integration.js`
- **Test Script**: `backend/test-sms.js`
- **Web Tester**: http://localhost:4000/sms-test

---

## 🆘 Need Help?

### Resources
- Twilio Console: https://console.twilio.com/
- Twilio SMS Docs: https://www.twilio.com/docs/sms
- Twilio Support: https://support.twilio.com/

### Quick Commands
```bash
# Start server
cd backend && npm start

# Test SMS
node backend/test-sms.js

# Start ngrok
ngrok http 4000

# Check logs
tail -f backend/logs.txt  # If you have logging enabled
```

---

## ✨ Example: Full Integration

Here's a complete example of using SMS with your AI agent:

```javascript
// In your OpenClaude or AI app

async function buildAppWithNotifications(userRequest) {
  const CALLOPS_API = 'http://localhost:4000';
  const USER_PHONE = '+447400409191';

  async function notify(msg) {
    await fetch(`${CALLOPS_API}/api/sms/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: USER_PHONE, message: msg })
    });
  }

  try {
    // Start
    await notify('🤖 Starting to build your app...');

    // Generate code
    await notify('💻 AI is writing code...');
    const code = await generateCode(userRequest);

    // Deploy
    await notify('🚀 Deploying to server...');
    const url = await deploy(code);

    // Complete
    await notify(`✅ Done! Your app is live:\n${url}`);

    return { success: true, url };

  } catch (error) {
    await notify(`❌ Error: ${error.message}\nPlease try again.`);
    throw error;
  }
}

// Usage
await buildAppWithNotifications('Build me a todo app');
```

---

**🚀 Happy Building with Callops!**

Your SMS integration is ready to use. Start by opening http://localhost:4000/sms-test and sending your first message!
