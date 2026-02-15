#!/bin/bash

echo "════════════════════════════════════════"
echo "  CALLOPS SMS QUICK START"
echo "════════════════════════════════════════"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with Twilio credentials"
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Start the server
echo "🚀 Starting Callops backend server..."
echo ""

node server.js
