const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const prisma = require("./config/database");
const app = express();

app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
));
app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
