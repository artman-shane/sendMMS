require("dotenv").config();

// Send MMS using Twilio API

// Usage: node sendMMS.js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Load Twilio API
const client = require("twilio")(accountSid, authToken);

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

sendMMS();
