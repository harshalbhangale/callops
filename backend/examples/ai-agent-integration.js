// Example: Integrating Callops SMS with your AI Agent
// This shows how to send SMS notifications from your OpenClaude or other AI app

const CALLOPS_API_URL = 'http://localhost:4000';
const USER_PHONE_NUMBER = '+447400409191'; // Your UK phone number

/**
 * Send SMS notification via Callops backend
 */
async function sendNotification(message) {
  try {
    const response = await fetch(`${CALLOPS_API_URL}/api/sms/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: USER_PHONE_NUMBER,
        message: message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Notification sent:', data.messageSid);
    return data;
  } catch (error) {
    console.error('❌ Failed to send notification:', error.message);
    throw error;
  }
}

/**
 * Example: AI Agent workflow with SMS notifications
 */
async function aiAgentWorkflow(userRequest) {
  try {
    // Step 1: Notify start
    await sendNotification('🤖 AI Agent is processing your request...');

    // Step 2: Simulate AI processing
    console.log('🧠 Processing:', userRequest);
    await delay(2000);

    // Step 3: Notify progress
    await sendNotification('⚙️ Generating code...');
    await delay(3000);

    // Step 4: Simulate code generation
    const generatedCode = `// Your generated code here
function example() {
  console.log("Hello from AI!");
}`;

    // Step 5: Notify deployment
    await sendNotification('🚀 Deploying your application...');
    await delay(2000);

    // Step 6: Notify completion
    const deployUrl = 'https://your-app.vercel.app';
    await sendNotification(`✅ Complete!

🔗 ${deployUrl}

Your app is ready to use.`);

    return {
      success: true,
      code: generatedCode,
      url: deployUrl
    };

  } catch (error) {
    // Notify error
    await sendNotification(`❌ Error: ${error.message}

Please try again or contact support.`);
    throw error;
  }
}

/**
 * Example: Long-running task with periodic updates
 */
async function longRunningTask(taskDescription) {
  const steps = [
    { message: '📝 Analyzing requirements...', duration: 3000 },
    { message: '🧠 AI is thinking...', duration: 5000 },
    { message: '💻 Writing code...', duration: 4000 },
    { message: '🧪 Testing...', duration: 3000 },
    { message: '📦 Building project...', duration: 4000 },
    { message: '🚀 Deploying...', duration: 3000 },
    { message: '✅ All done! Check your dashboard.', duration: 0 }
  ];

  console.log(`Starting task: ${taskDescription}`);

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`Step ${i + 1}/${steps.length}:`, step.message);
    
    await sendNotification(step.message);
    
    if (step.duration > 0) {
      await delay(step.duration);
    }
  }

  return { success: true };
}

/**
 * Example: Error handling with SMS
 */
async function taskWithErrorHandling(task) {
  try {
    await sendNotification('🤖 Starting your task...');
    
    // Simulate task that might fail
    const result = await performTask(task);
    
    await sendNotification('✅ Task completed successfully!');
    return result;

  } catch (error) {
    // Send detailed error notification
    const errorMessage = `❌ Task failed

Error: ${error.message}

Please review and try again.`;
    
    await sendNotification(errorMessage);
    throw error;
  }
}

/**
 * Example: Batch notifications (multiple users)
 */
async function notifyMultipleUsers(userPhones, message) {
  const results = [];

  for (const phone of userPhones) {
    try {
      const response = await fetch(`${CALLOPS_API_URL}/api/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: phone, message })
      });

      const data = await response.json();
      results.push({ phone, success: true, data });
      
      // Add delay to avoid rate limiting
      await delay(500);

    } catch (error) {
      results.push({ phone, success: false, error: error.message });
    }
  }

  return results;
}

// ============================================
// Utility Functions
// ============================================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function performTask(task) {
  // Simulate actual task
  await delay(2000);
  return { result: 'Task completed' };
}

// ============================================
// Usage Examples
// ============================================

// Example 1: Simple notification
async function example1() {
  console.log('Example 1: Simple notification\n');
  await sendNotification('👋 Hello from your AI Agent!');
}

// Example 2: Full workflow
async function example2() {
  console.log('Example 2: Full AI workflow\n');
  await aiAgentWorkflow('Build me a todo app');
}

// Example 3: Long running task
async function example3() {
  console.log('Example 3: Long running task\n');
  await longRunningTask('Generate and deploy full-stack app');
}

// Example 4: Multiple users
async function example4() {
  console.log('Example 4: Notify multiple users\n');
  const users = ['+447400409191', '+447458081879'];
  const results = await notifyMultipleUsers(
    users, 
    '🎉 New feature released! Check out our latest updates.'
  );
  console.log('Results:', results);
}

// ============================================
// Run Examples
// ============================================

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  CALLOPS AI AGENT SMS INTEGRATION');
  console.log('═══════════════════════════════════════\n');

  try {
    // Uncomment the example you want to run:

    // await example1(); // Simple notification
    // await example2(); // Full workflow
    // await example3(); // Long running task
    // await example4(); // Multiple users

    // Or run your custom code:
    await sendNotification('🚀 Test from AI Agent integration example!');

  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('  COMPLETE');
  console.log('═══════════════════════════════════════\n');
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

// Export functions for use in other files
module.exports = {
  sendNotification,
  aiAgentWorkflow,
  longRunningTask,
  taskWithErrorHandling,
  notifyMultipleUsers
};
