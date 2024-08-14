require("dotenv").config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
  PORT: process.env.PORT,
};

module.exports = { env };
