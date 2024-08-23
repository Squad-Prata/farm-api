const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { env } = require("./env");

const app = express();

// Lista de domínios permitidos
const allowedOrigins = [
  'https://staging-farmapp.vercel.app',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
