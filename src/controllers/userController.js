const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.registrarUsuario = async (req, res) => {
  const { name, cpf, crf, email, password, role } = req.body;

  try {

    const user = await prisma.user.create({
      data: { name, cpf, crf, email, password, role },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.error });
  }
};