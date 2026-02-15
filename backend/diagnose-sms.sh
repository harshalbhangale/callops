#!/bin/bash

echo "════════════════════════════════════════════════"
echo "  🔍 CALLOPS SMS DIAGNOSTICS"
echo "════════════════════════════════════════════════"
echo ""

# Check backend server
echo "1️⃣  Checking backend server..."
if curl -s http://localhost:4000/health > /dev/null 2>&1; then
    echo "   ✅ Backend is running on port 4000"
else
    echo "   ❌ Backend is NOT running"
fi
echo ""

# Check ngrok
echo "2️⃣  Checking ngrok tunnel..."
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | jq -r '.tunnels[0].public_url' 2>/dev/null)
if [ ! -z "$NGROK_URL" ]; then
    echo "   ✅ ngrok is running"
    echo "   📡 Public URL: $NGROK_URL"
else
    echo "   ❌ ngrok is NOT running"
    NGROK_URL="NOT_AVAILABLE"
fi
echo ""

# Test webhook endpoint
echo "3️⃣  Testing SMS webhook endpoint..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/sms/incoming \
    -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "MessageSid=DIAG_TEST&From=%2B447400409191&To=%2B447458081879&Body=diagnostic+test")

if [ "$RESPONSE" = "200" ]; then
    echo "   ✅ SMS endpoint responding (HTTP $RESPONSE)"
else
    echo "   ⚠️  SMS endpoint returned HTTP $RESPONSE"
fi
echo ""

# Test ngrok accessibility
echo "4️⃣  Testing ngrok URL accessibility..."
if [ "$NGROK_URL" != "NOT_AVAILABLE" ]; then
    NGROK_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$NGROK_URL/health" 2>/dev/null)
    if [ "$NGROK_RESPONSE" = "200" ]; then
        echo "   ✅ ngrok URL is accessible from internet (HTTP $NGROK_RESPONSE)"
    else
        echo "   ❌ ngrok URL returned HTTP $NGROK_RESPONSE"
    fi
else
    echo "   ⚠️  Skipped (ngrok not running)"
fi
echo ""

# Check recent ngrok requests
echo "5️⃣  Checking recent ngrok requests..."
REQUEST_COUNT=$(curl -s http://localhost:4040/api/requests/http 2>/dev/null | jq '.requests | length' 2>/dev/null)
if [ ! -z "$REQUEST_COUNT" ]; then
    echo "   📊 Total requests to ngrok: $REQUEST_COUNT"
    SMS_REQUESTS=$(curl -s http://localhost:4040/api/requests/http 2>/dev/null | jq '[.requests[] | select(.uri | contains("sms"))] | length' 2>/dev/null)
    echo "   📱 SMS webhook requests: $SMS_REQUESTS"
else
    echo "   ⚠️  Unable to check ngrok requests"
fi
echo ""

# Summary
echo "════════════════════════════════════════════════"
echo "  📋 TWILIO WEBHOOK CONFIGURATION"
echo "════════════════════════════════════════════════"
echo ""
echo "Configure this in Twilio Console:"
echo "👉 https://console.twilio.com/us1/develop/phone-numbers/manage/incoming"
echo ""
echo "For number: +447458081879"
echo ""
echo "Webhook URL (A MESSAGE COMES IN):"
if [ "$NGROK_URL" != "NOT_AVAILABLE" ]; then
    echo "┌────────────────────────────────────────────────┐"
    echo "│ $NGROK_URL/api/sms/incoming"
    echo "└────────────────────────────────────────────────┘"
else
    echo "❌ ngrok is not running - start it first!"
fi
echo ""
echo "Method: POST"
echo ""
echo "════════════════════════════════════════════════"
echo "  🧪 HOW TO TEST"
echo "════════════════════════════════════════════════"
echo ""
echo "1. Update Twilio webhook with URL above"
echo "2. Send SMS from +447400409191 to +447458081879"
echo "3. Watch backend logs for incoming message"
echo ""
echo "Or test the webhook directly:"
echo "curl -X POST $NGROK_URL/api/sms/incoming \\"
echo "  -d 'From=%2B447400409191' \\"
echo "  -d 'Body=test'"
echo ""
