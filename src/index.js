import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Lista de domínios permitidos
const allowedOrigins = [
  process.env.NEXT_PUBLIC_API_BASE_URL,
  process.env.FRONTEND_URL,
  'http://localhost:3000'
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/", userRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
