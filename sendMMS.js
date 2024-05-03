require("dotenv").config();

// Send MMS using Twilio API

// Usage: node sendMMS.js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Load Twilio API
const client = require("twilio")(accountSid, authToken);
const readline = require("readline");

// Your code to configure the Twilio API goes here
function sendSMS() {
  // Configure the Twilio API
  client.messages
    .create({
      body: "Hello, this is a test SMS!",
      from: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: process.env.TO_NUMBER,
    })
    .then((message) => console.log("SMS sent:", message.sid))
    .catch((error) => console.error("Error sending SMS:", error));
}

function sendMMS() {
  // Note that the filesize should remain under 600kb.
  // Larger sizes will be received as a file instead of an image.
  const mediaUrl = process.env.MEDIA_URL;
  const message = {
    body: "Hello, this is a test MMS!",
    from: process.env.TWILIO_MESSAGING_SERVICE_SID,
    to: process.env.TO_NUMBER,
    mediaUrl: mediaUrl,
  };

  client.messages
    .create(message)
    .then((message) => console.log("MMS sent:", message.sid))
    .catch((error) => console.error("Error sending MMS:", error));
}

// Add manual intervention via keyboard

function waitForUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Press any key to continue...\n\n", () => {
      rl.close();
      resolve();
    });
  });
}

sendMMS();
waitForUserInput()
  .then(() => sendSMS())
  .catch((error) => console.error("Error:", error));
// sendSMS();
