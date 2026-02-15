// SMS Utility Functions
const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send an SMS message
 * @param {string} to - Recipient phone number (e.g., "+447400409191")
 * @param {string} message - Message content
 * @param {string} from - Sender phone number (optional, uses env var by default)
 * @returns {Promise<object>} Twilio message object
 */
async function sendSMS(to, message, from = null) {
  try {
    const fromNumber = from || process.env.TWILIO_PHONE_NUMBER;

    console.log('📤 Sending SMS:', {
      from: fromNumber,
      to,
      preview: message.substring(0, 50) + (message.length > 50 ? '...' : '')
    });

    const twilioMessage = await twilioClient.messages.create({
      body: message,
      from: fromNumber,
      to: to
    });

    console.log('✅ SMS sent successfully:', twilioMessage.sid);
    return twilioMessage;

  } catch (error) {
    console.error('❌ Error sending SMS:', error.message);
    throw error;
  }
}

/**
 * Send app build notification
 * @param {string} phoneNumber - Recipient phone number
 * @param {object} appData - App data { name, url, buildTime }
 */
async function sendAppReadyNotification(phoneNumber, appData) {
  const message = `🎉 Your app "${appData.name}" is ready!

✅ Deployed successfully
🔗 ${appData.url}

Build time: ${appData.buildTime || 'N/A'}

Reply "status" to see all your apps.`;

  return await sendSMS(phoneNumber, message);
}

/**
 * Send app build started notification
 * @param {string} phoneNumber - Recipient phone number
 * @param {string} appDescription - What the user requested
 */
async function sendBuildStartedNotification(phoneNumber, appDescription) {
  const message = `⚙️ Starting to build your app...

📝 "${appDescription}"

I'll notify you when it's ready! This usually takes 2-3 minutes.`;

  return await sendSMS(phoneNumber, message);
}

/**
 * Send app build error notification
 * @param {string} phoneNumber - Recipient phone number
 * @param {string} errorMessage - Error description (optional)
 */
async function sendBuildErrorNotification(phoneNumber, errorMessage = null) {
  const message = errorMessage 
    ? `❌ Sorry, there was an error building your app:\n\n${errorMessage}\n\nPlease try again or call us for help.`
    : `❌ Sorry, there was an error building your app. Please try again or call us for help.`;

  return await sendSMS(phoneNumber, message);
}

/**
 * Send app deployment progress notification
 * @param {string} phoneNumber - Recipient phone number
 * @param {string} status - Current status message
 */
async function sendProgressNotification(phoneNumber, status) {
  return await sendSMS(phoneNumber, `🚀 ${status}`);
}

/**
 * Send welcome SMS to new user
 * @param {string} phoneNumber - Recipient phone number
 */
async function sendWelcomeSMS(phoneNumber) {
  const message = `👋 Welcome to Callops!

You can now build apps by:
📞 Calling ${process.env.TWILIO_PHONE_NUMBER}
💬 Texting "build [description]"

Reply "help" for more commands.`;

  return await sendSMS(phoneNumber, message);
}

/**
 * Format phone number to E.164 format
 * @param {string} phoneNumber - Phone number in any format
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phoneNumber) {
  // Remove all non-digit characters except +
  let cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, assume it's a UK number
  if (!cleaned.startsWith('+')) {
    // If it starts with 0, remove it (UK)
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
    cleaned = '+44' + cleaned;
  }
  
  return cleaned;
}

module.exports = {
  sendSMS,
  sendAppReadyNotification,
  sendBuildStartedNotification,
  sendBuildErrorNotification,
  sendProgressNotification,
  sendWelcomeSMS,
  formatPhoneNumber
};
