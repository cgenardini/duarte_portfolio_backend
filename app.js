const express = require("express");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Use express.json() middleware for parsing JSON bodies

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use your authenticated Gmail address
    to: "csgenardini@gmail.com", // Your target email address
    subject: `New Contact Form Submission from ${name}: ${subject}`,
    text: `You have received a new message from ${name} (${email}): \n\n${message}`,
    replyTo: email, // Set reply-to header to the sender's email address
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ message: "Email successfully sent" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
