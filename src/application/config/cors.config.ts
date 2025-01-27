import dotenv from "dotenv";

dotenv.config();

const allowedOrigins: any[] = [
  process.env.NEXT_PUBLIC_API_BASE_URL,
  process.env.FRONTEND_URL,
  'http://localhost:3000'
];

export default allowedOrigins;