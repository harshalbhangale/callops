require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for SMS tester)
app.use('/public', express.static('public'));

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Callops Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      voice: '/api/voice/*',
      sms: '/api/sms/*',
      calls: '/api/calls',
      apps: '/api/apps',
      stats: '/api/stats',
      smsTester: '/sms-test'
    }
  });
});

// SMS Tester UI
app.get('/sms-test', (req, res) => {
  res.sendFile(__dirname + '/public/sms-test.html');
});

// SMS Monitor UI
app.get('/sms-monitor', (req, res) => {
  res.sendFile(__dirname + '/public/sms-monitor.html');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Twilio Voice Webhook - Handles incoming calls
app.post('/api/voice/incoming', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  
  // Greet the caller
  twiml.say({
    voice: 'Polly.Joanna',
    language: 'en-US'
  }, 'Hello! This is Callops. Tell me what you want to build, and I will create it for you.');

  // Gather speech input
  const gather = twiml.gather({
    input: 'speech',
    timeout: 5,
    speechTimeout: 'auto',
    action: '/api/voice/process',
    method: 'POST',
    language: 'en-US'
  });

  gather.say({
    voice: 'Polly.Joanna'
  }, 'You can start speaking now.');

  // If no input, say goodbye
  twiml.say({
    voice: 'Polly.Joanna'
  }, 'I did not hear anything. Please call back and try again. Goodbye!');

  res.type('text/xml');
  res.send(twiml.toString());
});

// Process speech input
app.post('/api/voice/process', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const speechResult = req.body.SpeechResult;
  const callSid = req.body.CallSid;
  const from = req.body.From;

  console.log('📞 Call received from:', from);
  console.log('🎤 Transcription:', speechResult);

  if (speechResult) {
    // Acknowledge receipt
    twiml.say({
      voice: 'Polly.Joanna'
    }, `Got it! I heard you want to build: ${speechResult}. I'm starting to work on it now. Check your WhatsApp for updates!`);

    // TODO: Process with Claude AI
    // TODO: Send WhatsApp notification
    // TODO: Generate and deploy app

    // Store call data (will implement with database)
    console.log('💾 Call data:', {
      callSid,
      from,
      transcription: speechResult,
      timestamp: new Date().toISOString()
    });

  } else {
    twiml.say({
      voice: 'Polly.Joanna'
    }, 'Sorry, I could not understand what you said. Please try again.');
  }

  twiml.say({
    voice: 'Polly.Joanna'
  }, 'Thank you for using Callops. Goodbye!');

  res.type('text/xml');
  res.send(twiml.toString());
});

// Get all calls for a user
app.get('/api/calls', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // TODO: Fetch from database
    // For now, return mock data
    const mockCalls = [
      {
        id: '1',
        userId: userId || 'user123',
        phoneNumber: '+447458081879',
        transcription: 'I want to build a marketplace for my coffee shop',
        status: 'completed',
        duration: 45,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        appId: '1'
      }
    ];

    res.json(mockCalls);
  } catch (error) {
    console.error('Error fetching calls:', error);
    res.status(500).json({ error: 'Failed to fetch calls' });
  }
});

// Get all apps for a user
app.get('/api/apps', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // TODO: Fetch from database
    // For now, return mock data
    const mockApps = [
      {
        id: '1',
        userId: userId || 'user123',
        name: 'Coffee Shop Marketplace',
        type: 'marketplace',
        description: 'A marketplace for ordering coffee and products',
        deployedUrl: 'https://coffee-shop-demo.vercel.app',
        status: 'deployed',
        createdFrom: '1',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      }
    ];

    res.json(mockApps);
  } catch (error) {
    console.error('Error fetching apps:', error);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

// Get stats for a user
app.get('/api/stats', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // TODO: Calculate from database
    const stats = {
      totalCalls: 1,
      appsGenerated: 1,
      successRate: 100,
      lastCall: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// SMS Routes
// Send SMS endpoint
app.post('/api/sms/send', async (req, res) => {
  const { to, message, from } = req.body;

  if (!to || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['to', 'message']
    });
  }

  try {
    const fromNumber = from || process.env.TWILIO_PHONE_NUMBER;

    console.log('📤 Sending SMS:', {
      from: fromNumber,
      to,
      message: message.substring(0, 50) + '...'
    });

    const twilioMessage = await twilioClient.messages.create({
      body: message,
      from: fromNumber,
      to: to
    });

    console.log('✅ SMS sent successfully:', twilioMessage.sid);

    res.status(200).json({
      success: true,
      messageSid: twilioMessage.sid,
      status: twilioMessage.status,
      to: twilioMessage.to,
      from: twilioMessage.from,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error sending SMS:', error);
    res.status(500).json({
      error: 'Failed to send SMS',
      message: error.message,
      code: error.code
    });
  }
});

// Receive SMS webhook
app.post('/api/sms/incoming', (req, res) => {
  const { 
    MessageSid, 
    From, 
    To, 
    Body,
    NumMedia,
    MediaUrl0
  } = req.body;

  console.log('📥 Incoming SMS received:');
  console.log({
    messageSid: MessageSid,
    from: From,
    to: To,
    body: Body,
    hasMedia: NumMedia > 0,
    timestamp: new Date().toISOString()
  });

  // Process the message
  const twiml = new twilio.twiml.MessagingResponse();
  const bodyLower = Body.toLowerCase().trim();
  
  if (bodyLower === 'status') {
    twiml.message('Your Callops account is active. You have 1 app deployed.');
  } else if (bodyLower.startsWith('build')) {
    const appDescription = Body.substring(5).trim();
    twiml.message(`Got it! I'll start building: "${appDescription}". You'll receive updates shortly.`);
  } else if (bodyLower === 'help') {
    twiml.message('Callops SMS Commands:\n• "status" - Check your account\n• "build [description]" - Create a new app\n• "help" - Show this message');
  } else {
    twiml.message(`Message received: "${Body}". Reply "help" for commands.`);
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// SMS status callback
app.post('/api/sms/status', (req, res) => {
  const {
    MessageSid,
    MessageStatus,
    To,
    From,
    ErrorCode,
    ErrorMessage
  } = req.body;

  console.log('📊 SMS Status Update:');
  console.log({
    messageSid: MessageSid,
    status: MessageStatus,
    to: To,
    from: From,
    error: ErrorCode ? { code: ErrorCode, message: ErrorMessage } : null,
    timestamp: new Date().toISOString()
  });

  res.status(200).json({ received: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Callops Backend Server');
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📞 Twilio Number: ${process.env.TWILIO_PHONE_NUMBER}`);
  console.log('');
  console.log('📋 Available endpoints:');
  console.log('   GET  /health');
  console.log('   POST /api/voice/incoming  (Twilio webhook)');
  console.log('   POST /api/voice/process   (Twilio webhook)');
  console.log('   POST /api/sms/send        (Send SMS)');
  console.log('   POST /api/sms/incoming    (Twilio webhook)');
  console.log('   POST /api/sms/status      (Twilio webhook)');
  console.log('   GET  /api/calls');
  console.log('   GET  /api/apps');
  console.log('   GET  /api/stats');
});

module.exports = app;
