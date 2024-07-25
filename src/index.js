const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const prisma = require('./config/database')
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', userRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});