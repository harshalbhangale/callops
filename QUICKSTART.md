# 🚀 Quick Setup Guide for Hackathon Demo

## Step 1: Install Dependencies (2 mins)

```bash
cd frontend
npm install
```

## Step 2: Setup Google OAuth (5 mins)

1. Go to https://console.cloud.google.com
2. Create new project: "Callops"
3. Enable APIs: Google+ API
4. Credentials → Create OAuth 2.0 Client ID
5. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret

## Step 3: Configure Environment (2 mins)

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run_openssl_rand_base64_32_and_paste_here
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_AI_PHONE_NUMBER=+1234567890
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 4: Run Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:3000

## Step 5: Test the App

1. ✅ Landing page loads
2. ✅ Click "Sign in with Google"
3. ✅ Authorize with Google
4. ✅ Redirected to Dashboard
5. ✅ See mock data (calls & apps)
6. ✅ Navigation works (bottom tabs)

## Step 6: Test PWA on iPhone (Optional)

1. Deploy to Vercel (free):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Open URL on iPhone Safari
3. Share → Add to Home Screen
4. Open from home screen (looks like native app!)

## Demo Script for Hackathon

### Show Landing Page
- "Here's Callops - build apps with your voice"
- Clean, modern UI

### Sign In
- Click Google sign in
- Shows OAuth flow

### Dashboard
- "This is where users see all their calls and apps"
- Point out: Stats cards, recent calls, apps
- "Users can tap this big button to call our AI"

### Navigation
- Demo bottom navigation
- "Mobile-first, thumb-friendly design"

### PWA Demo (if deployed)
- Show on iPhone
- "Notice it's on my home screen like a native app"
- "Full screen, no browser UI"
- "This is a Progressive Web App"

## What's Next?

Phase 2 will add:
- Backend with Twilio voice integration
- Claude AI for generating apps
- Real WhatsApp notifications
- Actual app deployment

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Google OAuth not working
- Check redirect URI matches exactly
- Make sure Google+ API is enabled
- Try incognito mode

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill
# or
npm run dev -- -p 3001
```

## Need Help?

Check the main README.md for detailed docs.

---

Total setup time: ~10 minutes
Demo ready! 🎉
