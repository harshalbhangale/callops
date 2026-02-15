# ✅ Callops - Complete Setup Checklist

## 📋 Pre-Demo Checklist

### 1. ☐ Install Dependencies
```bash
cd frontend
npm install
```

**Expected:** No errors, all packages installed

---

### 2. ☐ Google OAuth Setup

**Steps:**
1. Go to https://console.cloud.google.com
2. Create/select project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect: `http://localhost:3000/api/auth/callback/google`
6. Get Client ID and Secret

**What you need:**
- ✅ Google Client ID
- ✅ Google Client Secret

---

### 3. ☐ Environment Configuration

```bash
cd frontend
cp .env.local.example .env.local
```

**Edit `.env.local` with:**

```env
# From Google Console
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_actual_client_id
GOOGLE_CLIENT_SECRET=your_actual_secret

# Generate this
NEXTAUTH_SECRET=run_openssl_rand_base64_32

# Keep these as is for local
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_AI_PHONE_NUMBER=+1234567890
```

**Generate secret:**
```bash
openssl rand -base64 32
```

---

### 4. ☐ Run Development Server

```bash
cd frontend
npm run dev
```

**Expected output:**
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

---

### 5. ☐ Test Landing Page

**Open:** http://localhost:3000

**Check:**
- ✅ Page loads without errors
- ✅ "Build Apps with Your Voice" headline visible
- ✅ Gradient background looks good
- ✅ "Sign in with Google" button appears
- ✅ Smooth animations on load
- ✅ Responsive on mobile (use DevTools)

---

### 6. ☐ Test Authentication

**Steps:**
1. Click "Sign in with Google"
2. Select your Google account
3. Authorize the app

**Expected:**
- ✅ Redirects to Google
- ✅ Shows authorization screen
- ✅ Redirects back to `/dashboard`
- ✅ No errors in console

---

### 7. ☐ Test Dashboard

**Check:**
- ✅ Header shows your Google profile picture
- ✅ "Call AI" card is prominent
- ✅ Three stats cards display (Total Calls, Apps Built, Success)
- ✅ "Recent Calls" section shows mock call
- ✅ "My Apps" section shows mock app
- ✅ Bottom navigation is visible and working

---

### 8. ☐ Test Navigation

**Click each bottom nav item:**
- ✅ Home → Dashboard page
- ✅ Calls → Calls page (placeholder)
- ✅ Apps → Apps page (placeholder)
- ✅ Activity → Activity page (placeholder)
- ✅ Settings → Settings page with sign out

**Check:**
- ✅ Active tab highlights in primary color
- ✅ Navigation is smooth
- ✅ No console errors

---

### 9. ☐ Test Sign Out

**Steps:**
1. Go to Settings (bottom nav)
2. Click "Sign Out" button

**Expected:**
- ✅ Redirects to landing page
- ✅ Shows "Sign in with Google" button
- ✅ Session cleared
- ✅ Can't access `/dashboard` without re-authenticating

---

### 10. ☐ Test Mobile Responsiveness

**Open DevTools (F12):**
- Toggle device toolbar
- Test different sizes:
  - iPhone 12/13/14
  - iPhone SE
  - iPad
  - Desktop

**Check:**
- ✅ Layout adapts correctly
- ✅ Touch targets are 44px+ (easy to tap)
- ✅ Text is readable
- ✅ Bottom nav doesn't overlap content
- ✅ Cards stack nicely
- ✅ No horizontal scroll

---

## 🚀 Optional: Deploy to Vercel

### 11. ☐ Deploy Frontend

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Follow prompts:**
1. Link to Vercel account
2. Name: callops-demo (or your choice)
3. Confirm settings

**After deploy:**
- ✅ Get deployment URL
- ✅ Add to Google OAuth redirect URIs
- ✅ Add environment variables in Vercel dashboard

---

## 📱 Optional: Test PWA on iPhone

### 12. ☐ Install as PWA

**Requirements:**
- Deployed URL (from Vercel)
- iPhone with Safari

**Steps:**
1. Open deployed URL in Safari
2. Tap Share button (square with arrow up)
3. Scroll down, tap "Add to Home Screen"
4. Name it "Callops"
5. Tap "Add"

**Check:**
- ✅ App icon appears on home screen
- ✅ Opens in standalone mode (no Safari UI)
- ✅ Looks like native app
- ✅ Bottom navigation works
- ✅ Can navigate between pages

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
npm run dev -- -p 3001
```

### Error: Google OAuth "redirect_uri_mismatch"
1. Check Google Console redirect URIs
2. Must match exactly: `http://localhost:3000/api/auth/callback/google`
3. No trailing slash
4. Include http:// prefix

### Error: "NEXTAUTH_SECRET not set"
```bash
# Generate and add to .env.local
openssl rand -base64 32
```

### Icons not showing (PWA)
- Expected! Need to generate actual icon files
- See `frontend/public/icons/README.md`
- Use https://realfavicongenerator.net/

---

## 🎬 Demo Script for Hackathon

### Introduction (30 seconds)
"Hi! I'm presenting Callops - a revolutionary way to build apps using just your voice."

### Show Landing (15 seconds)
- Open site on phone (or browser)
- "Here's our landing page - clean, mobile-first design"

### Sign In (15 seconds)
- Click Google sign in
- "We use Google OAuth for secure authentication"
- Show authorization flow

### Dashboard Tour (45 seconds)
- "This is the dashboard - your command center"
- Point to Call AI button: "Users can tap here to call our AI"
- Show stats: "Track your usage and success rate"
- Show recent calls: "See all your voice calls and transcriptions"
- Show apps: "View your generated apps with deployed links"

### Mobile Features (30 seconds)
- Show bottom navigation: "Thumb-friendly navigation"
- Demonstrate smooth transitions
- "This is a Progressive Web App - installable on any device"

### PWA Demo (30 seconds) *if deployed*
- Show on iPhone home screen
- "See? It's installed like a native app"
- Open it: "Full screen, no browser UI"
- "Works offline with service workers"

### Vision (30 seconds)
"Here's how it works in production:"
1. User calls our AI number
2. Describes their app idea
3. AI generates code with Claude
4. Auto-deploys to Vercel
5. User gets link on WhatsApp

"All this in under 3 minutes."

### Wrap Up (15 seconds)
"We're solving the biggest barrier to building - technical skills. Anyone can now build apps just by talking."

**Total: 3-4 minutes**

---

## ✅ Final Checklist Before Demo

- [ ] `npm install` completed successfully
- [ ] `.env.local` file configured with all keys
- [ ] Dev server runs without errors
- [ ] Can sign in with Google
- [ ] Dashboard loads with mock data
- [ ] All navigation works
- [ ] Mobile responsive (tested in DevTools)
- [ ] Can sign out successfully
- [ ] (Optional) Deployed to Vercel
- [ ] (Optional) Installed as PWA on phone
- [ ] Demo script practiced
- [ ] Backup: Screenshots ready in case of internet issues

---

## 📊 What's Working

✅ **Frontend Complete**
- Beautiful UI
- Authentication
- Navigation
- Mock data display
- PWA configuration

⏳ **Backend (Phase 2)**
- Voice calling (coming)
- AI integration (coming)
- WhatsApp (coming)
- Deployment (coming)

---

## 🎯 Success!

If all checkboxes are checked, you're ready to demo! 🎉

**Questions?** Check:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick setup guide
- `PHASE1_COMPLETE.md` - What's been built

**Need help?** Open a GitHub issue or check console errors.

Good luck with your demo! 🚀
