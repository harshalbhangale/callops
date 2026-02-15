# 🔑 Environment Variables Setup

## Quick Copy-Paste Template

Create `frontend/.env.local` and paste this:

```env
# ============================================
# GOOGLE OAUTH
# Get from: https://console.cloud.google.com
# ============================================
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE

# ============================================
# NEXTAUTH
# Generate secret with: openssl rand -base64 32
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=PASTE_GENERATED_SECRET_HERE

# ============================================
# BACKEND API (Phase 2)
# Keep these for now
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_AI_PHONE_NUMBER=+1234567890
```

---

## Step-by-Step Setup

### 1. Google OAuth Credentials

#### Go to Google Cloud Console
🔗 https://console.cloud.google.com

#### Create/Select Project
1. Click project dropdown (top left)
2. Click "New Project"
3. Name: "Callops" or anything
4. Click "Create"

#### Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search: "Google+ API"
3. Click on it
4. Click "Enable"

#### Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure consent screen:
   - User Type: External
   - App name: Callops
   - User support email: your email
   - Developer contact: your email
   - Save and continue (skip scopes)
   - Add test users (your email)
   - Save and continue
4. Application type: **Web application**
5. Name: "Callops Web Client"
6. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Click "Create"
8. **Copy Client ID and Client Secret**

#### Paste into .env.local
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456
```

---

### 2. Generate NextAuth Secret

#### On Mac/Linux:
```bash
openssl rand -base64 32
```

#### On Windows (PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }) -as [byte[]])
```

#### Or use online generator:
🔗 https://generate-secret.vercel.app/32

#### Paste into .env.local
```env
NEXTAUTH_SECRET=abc123def456ghi789jkl012mno345pq
```

---

### 3. Other Variables (Keep as is)

These are fine for local development:

```env
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_AI_PHONE_NUMBER=+1234567890
```

---

## Production Deployment (Vercel)

When deploying, add these in Vercel dashboard:

### Settings → Environment Variables

| Variable | Value | Type |
|----------|-------|------|
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Your Client ID | Plain Text |
| `GOOGLE_CLIENT_SECRET` | Your Secret | Secret |
| `NEXTAUTH_SECRET` | Your generated secret | Secret |
| `NEXTAUTH_URL` | https://your-app.vercel.app | Plain Text |
| `NEXT_PUBLIC_API_URL` | https://your-api.com | Plain Text |
| `NEXT_PUBLIC_AI_PHONE_NUMBER` | Your Twilio number | Plain Text |

### Don't forget!
Update Google OAuth redirect URI to include:
```
https://your-app.vercel.app/api/auth/callback/google
```

---

## Troubleshooting

### Error: "The redirect_uri mismatch"
**Cause:** Google redirect URI doesn't match

**Fix:**
1. Check Google Console redirect URIs
2. Must be **exact match** (including http/https)
3. No trailing slash
4. Common mistake: `http://localhost:3000` vs `http://localhost:3000/`

### Error: "NEXTAUTH_SECRET is not set"
**Cause:** Missing or incorrect secret in .env.local

**Fix:**
1. Generate new secret: `openssl rand -base64 32`
2. Add to `.env.local`
3. Restart dev server

### Error: "NEXTAUTH_URL is invalid"
**Cause:** NEXTAUTH_URL format is wrong

**Fix:**
```env
# ✅ Correct
NEXTAUTH_URL=http://localhost:3000

# ❌ Wrong
NEXTAUTH_URL=localhost:3000
NEXTAUTH_URL=http://localhost:3000/
```

### Variables not loading
**Cause:** Next.js cached old values

**Fix:**
```bash
# Stop server (Ctrl+C)
rm -rf .next
npm run dev
```

---

## Security Notes

⚠️ **NEVER commit `.env.local` to git**
- Already in `.gitignore`
- Contains secrets
- Each developer needs their own

✅ **DO commit `.env.local.example`**
- Template for others
- No actual secrets
- Safe to share

🔒 **Keep secrets secret**
- Don't share in screenshots
- Don't paste in public channels
- Rotate if compromised

---

## Quick Verification

After setup, verify:

```bash
cd frontend
cat .env.local
```

Should see:
- ✅ All variables filled (no "YOUR_X_HERE")
- ✅ NEXTAUTH_SECRET is long random string
- ✅ Google Client ID looks like: `xxx.apps.googleusercontent.com`
- ✅ No trailing spaces or quotes

Then test:
```bash
npm run dev
```

Visit http://localhost:3000 and try signing in!

---

## Need Help?

**Can't find Google Console?**
→ Search "Google Cloud Console" or go to console.cloud.google.com

**Don't have openssl?**
→ Use online generator: https://generate-secret.vercel.app/32

**Still stuck?**
→ Check `SETUP_CHECKLIST.md` for full troubleshooting

---

## Summary Checklist

- [ ] Created `frontend/.env.local` file
- [ ] Added Google Client ID
- [ ] Added Google Client Secret  
- [ ] Generated and added NEXTAUTH_SECRET
- [ ] Set NEXTAUTH_URL to `http://localhost:3000`
- [ ] No "YOUR_X_HERE" placeholders remain
- [ ] File saved (not .example)
- [ ] Dev server restarted

**All checked?** → You're ready! 🚀
