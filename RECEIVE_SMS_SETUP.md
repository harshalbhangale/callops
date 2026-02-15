# 📥 How to Receive Incoming SMS Messages

## ✅ Your Setup is Ready!

### Your ngrok URL:
```
https://randi-osseous-winford.ngrok-free.dev
```

Your backend is now accessible from the internet! 🌍

---

## 🔧 Configure Twilio (5 Steps)

### Step 1: Open Twilio Console
Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming

### Step 2: Select Your Phone Number
Click on: **+447458081879**

### Step 3: Scroll to "Messaging Configuration"

### Step 4: Configure Webhooks

**A MESSAGE COMES IN:**
```
https://randi-osseous-winford.ngrok-free.dev/api/sms/incoming
```
- HTTP POST

**EVENTS CALLBACK URL (Optional):**
```
https://randi-osseous-winford.ngrok-free.dev/api/sms/status
```
- HTTP POST

### Step 5: Click "Save"

---

## 📱 Test Receiving SMS

### From Your Phone (+447400409191)
Send a text message to: **+447458081879**

Try these commands:

1. **"help"** → Get list of commands
2. **"status"** → Check your account
3. **"build a todo app"** → Start building
4. **Any text** → Get echo response

---

## 👀 Watch Incoming Messages

### Option 1: Watch Backend Logs (Real-time)

In your terminal, you'll see incoming messages:
```
📥 Incoming SMS received:
{
  messageSid: 'SM...',
  from: '+447400409191',
  to: '+447458081879',
  body: 'help',
  timestamp: '...'
}
```

### Option 2: Check Backend Server Terminal

The server running on port 4000 will log all incoming SMS.

### Option 3: Check Twilio Console

Go to: https://console.twilio.com/us1/monitor/logs/sms

You'll see all incoming and outgoing messages.

---

## 🧪 Quick Test

**From your phone, text this to +447458081879:**
```
help
```

**You should receive:**
```
Callops SMS Commands:
• "status" - Check your account
• "build [description]" - Create a new app
• "help" - Show this message
```

---

## 📊 What Happens When You Send SMS

```
Your Phone (+447400409191)
    ↓
    📱 Send SMS to +447458081879
    ↓
Twilio receives the message
    ↓
    🌐 Webhook to your server
    ↓
https://randi-osseous-winford.ngrok-free.dev/api/sms/incoming
    ↓
Your backend processes it
    ↓
    ✉️ Automatic reply sent back
    ↓
Your Phone receives reply
```

---

## 🎮 Interactive Commands

Your backend automatically responds to:

### "help"
Shows available commands

### "status" 
```
Your Callops account is active. You have 1 app deployed.
```

### "build [description]"
Example: `build a todo app`
```
Got it! I'll start building: "a todo app". You'll receive updates shortly.
```

### Any other text
```
Message received: "your text". Reply "help" for commands.
```

---

## 🔍 Monitor Live Messages

### Watch server logs:
```bash
# The server terminal will show:
📥 Incoming SMS received:
{ from: '+447400409191', body: 'your message', ... }
```

### Or check the ngrok web interface:
Open in browser: http://localhost:4040

You'll see all HTTP requests including SMS webhooks!

---

## ⚠️ Important Notes

1. **Keep ngrok running**: Don't close the ngrok terminal
2. **Keep backend running**: The server on port 4000 must stay up
3. **ngrok URL changes**: Each time you restart ngrok, update Twilio webhooks
4. **Free ngrok**: URL is temporary (lasts until you close ngrok)

---

## 🚀 Ready to Test!

**Send a text now from your phone:**

📱 **From:** +447400409191  
📱 **To:** +447458081879  
📱 **Message:** `help`

Then watch your backend server logs! 👀

---

## 📝 Webhook URLs Reference

Update these in Twilio Console:

**Incoming SMS:**
```
https://randi-osseous-winford.ngrok-free.dev/api/sms/incoming
```

**Status Callback (optional):**
```
https://randi-osseous-winford.ngrok-free.dev/api/sms/status
```

**Twilio Console Link:**
https://console.twilio.com/us1/develop/phone-numbers/manage/active

---

## 🛠️ Troubleshooting

### Not receiving SMS?
1. ✅ Check ngrok is running: `curl http://localhost:4040/api/tunnels`
2. ✅ Check backend is running: `curl http://localhost:4000/health`
3. ✅ Verify webhook URL in Twilio console
4. ✅ Try sending "help" from your phone

### No response from bot?
1. Check backend logs for errors
2. Open ngrok web UI: http://localhost:4040
3. Check Twilio error logs

---

## ✅ Checklist

- [ ] Backend server running (port 4000) ✅
- [ ] ngrok running ✅
- [ ] Copy ngrok URL: `https://randi-osseous-winford.ngrok-free.dev`
- [ ] Open Twilio Console
- [ ] Configure webhook for +447458081879
- [ ] Save configuration
- [ ] Send test SMS from phone
- [ ] Watch backend logs for incoming message
- [ ] Receive automatic reply

---

**Once configured, text +447458081879 from your phone to test!** 📱
