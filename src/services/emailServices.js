const nodemailer = require("nodemailer");
const { env } = require("../env");

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false, // usar SSL
  to: [
    {
      email: env.SMTP_FROM,
    },
  ],
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

module.exports = transporter;
