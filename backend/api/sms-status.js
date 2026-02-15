// Handle SMS status callbacks from Twilio
module.exports = (req, res) => {
  try {
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

    // TODO: Update message status in database

    // Respond with 200 OK
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Error processing SMS status:', error);
    res.status(500).json({ error: 'Failed to process status update' });
  }
};
