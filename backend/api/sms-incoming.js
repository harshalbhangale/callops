// Handle incoming SMS from Twilio webhook
const twilio = require('twilio');

module.exports = async (req, res) => {
  try {
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

    // Store message (TODO: save to database)
    const messageData = {
      messageSid: MessageSid,
      from: From,
      to: To,
      body: Body,
      hasMedia: NumMedia > 0,
      mediaUrl: NumMedia > 0 ? MediaUrl0 : null,
      timestamp: new Date().toISOString()
    };

    // TODO: Process the message with AI if needed
    // For example, if user sends "status" or "build [app name]"
    
    // Respond to the SMS (optional)
    const twiml = new twilio.twiml.MessagingResponse();
    
    // Check if it's a command
    const bodyLower = Body.toLowerCase().trim();
    
    if (bodyLower === 'status') {
      twiml.message('Your Callops account is active. You have 1 app deployed.');
    } else if (bodyLower.startsWith('build')) {
      const appDescription = Body.substring(5).trim();
      twiml.message(`Got it! I'll start building: "${appDescription}". You'll receive updates shortly.`);
      // TODO: Trigger AI app generation
    } else if (bodyLower === 'help') {
      twiml.message('Callops SMS Commands:\n• "status" - Check your account\n• "build [description]" - Create a new app\n• "help" - Show this message');
    } else {
      twiml.message(`Message received: "${Body}". Reply "help" for commands.`);
    }

    // Send TwiML response
    res.type('text/xml');
    res.send(twiml.toString());

  } catch (error) {
    console.error('❌ Error processing incoming SMS:', error);
    
    // Return empty TwiML on error
    const twiml = new twilio.twiml.MessagingResponse();
    res.type('text/xml');
    res.send(twiml.toString());
  }
};
