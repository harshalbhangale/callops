// Send SMS via Twilio
const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = async (req, res) => {
  try {
    const { to, message, from } = req.body;

    // Validate input
    if (!to || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['to', 'message']
      });
    }

    // Use the phone number from request or default from env
    const fromNumber = from || process.env.TWILIO_PHONE_NUMBER;

    console.log('📤 Sending SMS:', {
      from: fromNumber,
      to,
      message: message.substring(0, 50) + '...'
    });

    // Send SMS using Twilio
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
};
