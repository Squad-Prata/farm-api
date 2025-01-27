import dotenv from "dotenv";

dotenv.config();

const authConfig = {
  secret: process.env.JWT_SECRET || "secret",
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
};

export default authConfig;