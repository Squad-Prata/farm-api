const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordTemp = require("../services/emailService.js");
const authConfig = require("../config/auth.js");
const { generatePassword, hashPassword } = require("../services/passwordService.js");

const prisma = new PrismaClient();

// Função para tratamento erros
const handleError = (res, error, customMessage) => {
  console.error(error);
  return res.status(500).json({ message: customMessage || "Erro no servidor." });
};

// Função para envio de emails
const sendWelcomeEmail = (email, name, password) => {
  const mailOptions = {
    from: "farmapi119@gmail.com",
    to: email,
    subject: "Bem-vindo!",
    text: `Olá ${name},\n\nSua conta foi criada com sucesso. Sua senha provisória é: ${password}\n\nPor favor, altere sua senha após o primeiro login.\n\nAtenciosamente,\nEquipe Squade Prata`,
  };

  return passwordTemp.sendMail(mailOptions);
};

// Função para criar um novo usuário
const createUser = async (data) => {
  return prisma.user.create({ data });
};

// Registro de administrador
exports.adminRegister = async (req, res) => {
  const { name, cpf, crf, email, password, cargo } = req.body;

  if (!password) {
    return res.status(400).json({ message: "A senha é obrigatória." });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser({ name, cpf, crf, email, password: hashedPassword, cargo, role: "ADMIN" });

    await sendWelcomeEmail(email, name, password);

    res.status(201).json(user);
  } catch (error) {
    return handleError(res, error, error.code === 'P2002' ? `${error.meta.target} já em uso.` : "Erro de validação.");
  }
};

// Registro de usuário comum
exports.userRegister = async (req, res) => {
  const { name, cpf, crf, email, cargo } = req.body;

  try {
    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    const user = await createUser({ name, cpf, crf, email, password: hashedPassword, cargo });

    await sendWelcomeEmail(email, name, password);

    res.status(201).json(user);
  } catch (error) {
    return handleError(res, error, error.code === 'P2002' ? `${error.meta.target} já em uso.` : "Erro de validação.");
  }
};

// Login de usuário
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !password) {
      return res.status(400).json({ message: "Usuário ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, authConfig.secret, { expiresIn: "5d" });
    res.header("Authorization", token).json({ id: user.id, email, token });
  } catch (error) {
    return handleError(res, error);
  }
};

// Buscar usuário por ID
exports.userId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    res.status(200).json(user);
  } catch (error) {
    return handleError(res, error);
  }
};

// Listar todos os usuários
exports.users = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar usuários.");
  }
};

// Atualizar usuário
exports.userUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, email, cpf, crf, password, cargo, role } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, cpf, crf, password: hashedPassword, cargo, role },
    });

    res.status(200).json(user);
  } catch (error) {
    return handleError(res, error, "Usuário não encontrado.");
  }
};

// Deletar usuário
exports.userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return handleError(res, error, "Erro ao deletar usuário.");
  }
};

// Inativar usuário
exports.userInactivate = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.update({ where: { id: Number(id) }, data: { ativo: false } });
    res.status(200).json({ message: "Usuário inativado com sucesso" });
  } catch (error) {
    return handleError(res, error, "Erro ao inativar usuário.");
  }
};