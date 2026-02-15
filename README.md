# 📱 Callops - Build Apps with Your Voice

A revolutionary platform that lets you build and deploy applications by simply calling an AI and describing what you want. Get a deployed link sent directly to your WhatsApp in minutes!

## ✨ Features

- 🎤 **Voice-to-App**: Call our AI and describe your app idea
- 🚀 **Instant Deployment**: Apps deployed to production in minutes
- 💬 **WhatsApp Integration**: Get updates and deployed links via WhatsApp
- 📱 **PWA Support**: Install on iPhone home screen like a native app
- 🎨 **Beautiful UI**: Mobile-first design inspired by modern fintech apps
- 🔐 **Google Auth**: Secure authentication with Google Sign-In
- ⚡ **Real-time Updates**: Live progress tracking as your app is built

## 🏗️ Project Structure

```
callops/
├── frontend/          # Next.js 14 PWA
└── backend/          # Node.js Express API (coming soon)
```

## 🚀 Quick Start - Frontend

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Console account (for OAuth)
- Twilio account (for voice & WhatsApp)

### Setup Steps

1. **Clone and Install**

```bash
cd frontend
npm install
```

2. **Environment Variables**

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your credentials:

```env
# Google OAuth - Get from https://console.cloud.google.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth - Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# Backend API (will be setup later)
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_AI_PHONE_NUMBER=+1234567890
```

3. **Run Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Getting API Keys

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Go to **Credentials** → **Create OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - Add production URL when deploying
7. Copy **Client ID** and **Client Secret**

### Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET`

## 📱 PWA Installation (iPhone)

1. Open the app in Safari on your iPhone
2. Tap the **Share** button (square with arrow)
3. Scroll and tap **"Add to Home Screen"**
4. Name it "Callops" and tap **Add**
5. App appears on home screen like a native app!

## 🎨 Design System

### Colors

- Primary: `#7DD3C0` (mint green)
- Secondary: `#4FD1C5` (teal)
- Accent: `#38B2AC` (darker teal)
- Background: `#F7FAFC` (light gray)
- Surface: `#FFFFFF` (white)

### Typography

- Font: Inter (with SF Pro Display fallback)
- Headings: 600-700 weight
- Body: 400-500 weight

## 🏗️ Built With

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **NextAuth.js** - Authentication
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Deploy to Other Platforms

The app can be deployed to:
- Vercel (recommended)
- Netlify
- Railway
- Any platform supporting Next.js

## 🎯 Roadmap - Phase 1 (Current)

- [x] Next.js setup with TypeScript
- [x] Google OAuth authentication
- [x] Landing page with sign-in
- [x] Dashboard UI with stats
- [x] Call and App cards
- [x] Bottom navigation
- [x] PWA configuration

## 🎯 Roadmap - Phase 2 (Next)

- [ ] Backend API with Express
- [ ] Twilio voice integration
- [ ] Claude Haiku AI integration
- [ ] Real-time updates with SSE
- [ ] WhatsApp messaging
- [ ] Auto-deployment to Vercel
- [ ] Database (PostgreSQL/MongoDB)

## 🎯 Roadmap - Phase 3 (Future)

- [ ] Edit apps via WhatsApp chat
- [ ] Multiple app templates
- [ ] GitHub integration
- [ ] Team collaboration
- [ ] Usage analytics
- [ ] Custom domains

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! This is a hackathon project that's being actively developed.

## 💬 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ for hackathons and rapid prototyping
