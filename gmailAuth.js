const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI // This must match the redirect URI set in the Google Developer Console
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Scopes for the email sending
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
