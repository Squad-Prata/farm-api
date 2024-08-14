const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const prisma = require("./config/database");
const app = express();

const corsOptions = {
  origin: "https://staging-farmapp.vercel.app/", // substitua pelo domínio do seu frontend na Vercel
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
