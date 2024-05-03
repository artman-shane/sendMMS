require("dotenv").config();

// Send MMS using Twilio API

// Usage: node sendMMS.js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Load Twilio API
const client = require("twilio")(accountSid, authToken);

function sendMMS() {
  const mediaUrl =
    "https://image.useinsider.com/hankypanky/1814/klASG8C4SYSsuGdABZnq1714650588.gif";
  const message = {
    body: "Hello, this is a test MMS!",
    from: process.env.TWOILIO_MESSAGING_SERVICE_SID,
    to: process.env.TO_NUMBER,
    mediaUrl: mediaUrl,
  };

  client.messages
    .create(message)
    .then((message) => console.log("MMS sent:", message.sid))
    .catch((error) => console.error("Error sending MMS:", error));
}

sendMMS();
