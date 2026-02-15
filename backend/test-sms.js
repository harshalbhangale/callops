// Test script for SMS functionality
require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.BACKEND_URL || 'http://localhost:4000';
const TEST_NUMBER = '+447400409191'; // UK number from screenshot

async function testSendSMS() {
  console.log('🧪 Testing SMS Send...\n');
  
  try {
    const response = await axios.post(`${API_URL}/api/sms/send`, {
      to: TEST_NUMBER,
      message: 'Hello from Callops! 🚀 Your AI agent can now send you SMS updates about your apps. Reply "help" for commands.'
    });

    console.log('✅ SMS sent successfully!');
    console.log('Response:', response.data);
    console.log('\n📱 Check your phone:', TEST_NUMBER);
    
  } catch (error) {
    console.error('❌ Error sending SMS:');
    console.error(error.response?.data || error.message);
  }
}

async function testSendBuildNotification() {
  console.log('\n🧪 Testing Build Notification SMS...\n');
  
  try {
    const response = await axios.post(`${API_URL}/api/sms/send`, {
      to: TEST_NUMBER,
      message: `🎉 Your app "Todo List" is ready!

✅ Deployed successfully
🔗 https://your-app.vercel.app

Total build time: 2m 34s

Reply with "status" to see all your apps.`
    });

    console.log('✅ Build notification sent!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Error sending notification:');
    console.error(error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════');
  console.log('  CALLOPS SMS TESTING');
  console.log('═══════════════════════════════════════\n');
  console.log('Target Number:', TEST_NUMBER);
  console.log('API URL:', API_URL);
  console.log('Twilio Number:', process.env.TWILIO_PHONE_NUMBER);
  console.log('\n');

  // Test 1: Simple SMS
  await testSendSMS();
  
  // Wait a bit before next test
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Build notification
  await testSendBuildNotification();

  console.log('\n═══════════════════════════════════════');
  console.log('  TESTS COMPLETE');
  console.log('═══════════════════════════════════════\n');
  console.log('📱 Check your phone for messages!');
  console.log('💬 Try replying with: "help", "status", or "build [description]"\n');
}

// Run tests
runTests().catch(console.error);
