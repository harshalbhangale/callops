#!/bin/bash
# Callops Backend Deployment Script for Hetzner Server
# Run this after logging into your server via console

echo "🚀 Callops Backend Deployment Starting..."
echo "=========================================="

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Git
echo "📦 Installing Git..."
apt install -y git

# Install PM2 (process manager)
echo "📦 Installing PM2..."
npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
apt install -y nginx

# Create app directory
echo "📁 Creating app directory..."
mkdir -p /var/www/callops
cd /var/www/callops

# Clone repository
echo "📥 Cloning repository..."
git clone https://github.com/harshalbhangale/callops.git .

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file
echo "📝 Creating environment file..."
cat > .env << 'EOF'
# ============================================
# TWILIO CONFIGURATION
# ============================================
TWILIO_ACCOUNT_SID=your_twilio_sid_here
TWILIO_AUTH_TOKEN=your_twilio_token_here
TWILIO_PHONE_NUMBER=your_phone_number
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
YOUR_WHATSAPP_NUMBER=your_whatsapp_number

# ============================================
# ANTHROPIC CLAUDE
# ============================================
ANTHROPIC_API_KEY=your_anthropic_key_here

# ============================================
# DATABASE
# ============================================
DATABASE_URL=your_database_url_here

# ============================================
# JWT SECRET
# ============================================
JWT_SECRET=your_jwt_secret_here

# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://frontend-ten-phi-62.vercel.app
EOF

echo "⚠️  IMPORTANT: Edit .env file with your actual credentials!"
echo "Run: nano .env"
echo "Press Ctrl+X, then Y, then Enter to save"
read -p "Press Enter after updating .env file..."

# Start backend with PM2
echo "🚀 Starting backend server..."
pm2 start server.js --name callops-backend
pm2 save
pm2 startup

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/callops << 'EOF'
server {
    listen 80;
    server_name 46.225.76.15;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/callops /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
echo "🔄 Restarting Nginx..."
nginx -t && systemctl restart nginx

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "🌐 Your backend is now running at:"
echo "   http://46.225.76.15"
echo ""
echo "🧪 Test it:"
echo "   curl http://46.225.76.15/health"
echo ""
echo "📊 Check status:"
echo "   pm2 status"
echo "   pm2 logs callops-backend"
echo ""
echo "🔧 Update Twilio webhook to:"
echo "   http://46.225.76.15/api/voice-incoming"
echo ""
echo "=========================================="
