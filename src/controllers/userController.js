const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

exports.registrarUsuario = async (req, res) => {
  const { name, cpf, crf, email, password, cargo, role } = req.body;

  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, cpf, crf, email, password: hashedPassword, cargo, role },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Usuário ja cadastrado' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Usuário ou senha inválidos.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Usuário ou senha inválidos.' });

    res.status(200).send('Seja Bem-vindo');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

exports.buscarTodosUsuarios = async (req, res) => {

  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, email, cpf, crf, password, cargo, role } = req.body;

  try {
    const data = { name, email, cpf, crf, password, cargo, role };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Usuário não encontrado' });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};