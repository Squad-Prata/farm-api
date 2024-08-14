const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { env } = require("./env");

const app = express();

app.use(
  cors({
    origin: "https://staging-farmapp.vercel.app",
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
