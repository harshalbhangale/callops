# 🚀 Deploy Callops Backend to Hetzner Server

## Your Server Details

- **IP Address:** 46.225.76.15
- **Server Type:** CPX22 (2 vCPU, 4 GB RAM)
- **Location:** Nuremberg, Germany
- **OS:** Ubuntu 22.04

---

## 📋 Quick Deployment Guide

### Step 1: Access Console

Click the **"Console"** button in your Hetzner dashboard (top, highlighted in yellow)

### Step 2: Login

```
Username: root
Password: (from Hetzner password reset email)
```

### Step 3: Run Deployment Script

Copy and paste this ONE command:

```bash
curl -o- https://raw.githubusercontent.com/harshalbhangale/callops/main/backend/deploy-hetzner.sh | bash
```

**Or manually run:**

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx

# Install PM2
npm install -g pm2

# Clone and setup
mkdir -p /var/www/callops
cd /var/www/callops
git clone https://github.com/harshalbhangale/callops.git .
cd backend
npm install

# Create .env (copy from your local backend/.env)
nano .env
# Paste your environment variables

# Start server
pm2 start server.js --name callops-backend
pm2 save
pm2 startup

# Configure Nginx
nano /etc/nginx/sites-available/callops
# Add reverse proxy config

# Enable and restart
ln -s /etc/nginx/sites-available/callops /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# Configure firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

---

## ✅ After Deployment

Your backend will be available at:
- **HTTP:** http://46.225.76.15
- **Health Check:** http://46.225.76.15/health
- **API:** http://46.225.76.15/api/stats

---

## 🔧 Update Services

### Update Frontend
Change `NEXT_PUBLIC_API_URL` to: `http://46.225.76.15`

### Update Twilio Webhook
Change webhook URL to: `http://46.225.76.15/api/voice-incoming`

---

## 📊 Manage Your Server

```bash
# Check status
pm2 status

# View logs
pm2 logs callops-backend

# Restart
pm2 restart callops-backend

# Update code
cd /var/www/callops
git pull
cd backend
npm install
pm2 restart callops-backend
```

---

## 🔒 Optional: Add HTTPS with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

---

Your backend will run 24/7 on your Hetzner server! 🎉
