const twilio = require('twilio');

// Process speech input from Twilio
module.exports = async (req, res) => {
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

    // Log call data
    console.log('💾 Call data:', {
      callSid,
      from,
      transcription: speechResult,
      timestamp: new Date().toISOString()
    });

    // TODO: Process with Claude AI in background
    // TODO: Send WhatsApp notification
    // TODO: Generate and deploy app

  } else {
    twiml.say({
      voice: 'Polly.Joanna'
    }, 'I did not catch that. Please call back and try again. Goodbye!');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
};
