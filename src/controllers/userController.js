const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.registrarUsuario = async (req, res) => {
  const { name, cpf, crf, email, password, role } = req.body;

  try {

    const user = await prisma.user.create({
      data: { name, cpf, crf, email, password, role },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Usuário ja cadastrado' });
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

exports.atualizarCliente = async (req, res) => {
  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar' });
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