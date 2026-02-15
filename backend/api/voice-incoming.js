const twilio = require('twilio');

// Twilio Voice Webhook - Handles incoming calls
module.exports = (req, res) => {
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
    action: '/api/voice-process',
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

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
};
