# 🔧 Quick Setup: Add Environment Variables to Vercel

## Option 1: Via Vercel Dashboard (Easiest)

### Backend Environment Variables
1. Go to: https://vercel.com/buddyharshal2751gmailcoms-projects/backend/settings/environment-variables
2. Click "Add New"
3. Copy from your local `backend/.env` file

### Frontend Environment Variables
1. Go to: https://vercel.com/buddyharshal2751gmailcoms-projects/frontend/settings/environment-variables
2. Click "Add New"
3. Copy from your local `frontend/.env.local` file

**Important URLs to Update:**
- `NEXT_PUBLIC_API_URL=https://backend-one-chi-79.vercel.app`
- `NEXTAUTH_URL=https://frontend-ten-phi-62.vercel.app`
- `FRONTEND_URL=https://frontend-ten-phi-62.vercel.app`

---

## Option 2: Via Vercel CLI (Faster)

```bash
# Backend environment variables
cd backend

vercel env add TWILIO_ACCOUNT_SID production
# Paste your Twilio Account SID from backend/.env

vercel env add TWILIO_AUTH_TOKEN production
# Paste your Twilio Auth Token from backend/.env

vercel env add TWILIO_PHONE_NUMBER production
# Paste your Twilio phone number

vercel env add ANTHROPIC_API_KEY production
# Paste your Claude API key

vercel env add DATABASE_URL production
# Paste your database URL

vercel env add NODE_ENV production
# Type: production

vercel env add FRONTEND_URL production
# Type: https://frontend-ten-phi-62.vercel.app

# Frontend environment variables
cd ../frontend

vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID production
# Paste your Google Client ID from frontend/.env.local

vercel env add GOOGLE_CLIENT_SECRET production
# Paste your Google client secret from frontend/.env.local

vercel env add NEXTAUTH_URL production
# Type: https://frontend-ten-phi-62.vercel.app

vercel env add NEXTAUTH_SECRET production
# Paste your NextAuth secret from frontend/.env.local

vercel env add NEXT_PUBLIC_API_URL production
# Type: https://backend-one-chi-79.vercel.app

vercel env add NEXT_PUBLIC_AI_PHONE_NUMBER production
# Type your Twilio phone number
```

---

## After Adding Environment Variables

Redeploy both projects:

```bash
# Redeploy backend
cd backend
vercel --prod

# Redeploy frontend
cd ../frontend
vercel --prod
```

---

## Update External Services

### 1. Google OAuth Redirect URI
Go to: https://console.cloud.google.com/apis/credentials

Add redirect URI:
```
https://frontend-ten-phi-62.vercel.app/api/auth/callback/google
```

### 2. Twilio Webhook URL
Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming

Set webhook URL:
```
https://backend-one-chi-79.vercel.app/api/voice-incoming
```

---

## ✅ Test Your Deployment

1. **Frontend:** https://frontend-ten-phi-62.vercel.app
2. **Backend API:** https://backend-one-chi-79.vercel.app
3. **Health Check:** https://backend-one-chi-79.vercel.app/health

---

## 🎉 You're Done!

Your app is now fully deployed on Vercel's free tier!
