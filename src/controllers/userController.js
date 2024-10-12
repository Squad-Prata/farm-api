import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passwordTemp from "../services/emailService.js"
import authConfig from "../config/auth.js";
import { generatePassword, hashPassword } from "../services/passwordService.js";

const prisma = new PrismaClient();

const adminRegister = async (req, res) => {
  const { name, cpf, crf, email, password, cargo } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'A senha é obrigatória.' });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, cpf, crf, email, password: hashedPassword, cargo, role: "ADMIN" },
    });

    const mailOptions = {
      from: "farmapi119@gmail.com",
      to: email,
      subject: "Bem-vindo!",
      text: `Olá ${name},\n\nSeja Benm-vindo.\n\nUse seu E-mail\n\nE sua senha: ${password}\n\n, Para ter acesso a sua conta.\n\nAtenciosamente,\nEquipe Squad Prata`,
    };

    passwordTemp.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Erro ao enviar email.");
      }
      console.log("Email enviado: " + info.response);
      res.status(201).json(user);
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const targetField = error.meta.target;
      res.status(400).json({ erro: `${targetField} já em uso.` });
    } else {
      res.status(400).json({ erro: 'Erro de validação' });
    }
  }
};

const userRegister = async (req, res) => {
  const { name, cpf, crf, email, cargo } = req.body;
  
  try {
    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, cpf, crf, email, password: hashedPassword, cargo },
    });

    const mailOptions = {
      from: "farmapi119@gmail.com",
      to: email,
      subject: "Bem-vindo!",
      text: `Olá ${name},\n\nSua conta foi criada com sucesso. Sua senha provisória é: ${password}\n\nPor favor, altere sua senha após o primeiro login.\n\nAtenciosamente,\nEquipe Equipe Squad Prata`,
    };

    passwordTemp.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Erro ao enviar email.");
      }
      console.log("Email enviado: " + info.response);
      res.status(201).json(user);
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const targetField = error.meta.target;
      res.status(400).json({ erro: `${targetField} já em uso.` });
    } else {
      res.status(400).json({ erro: 'Erro de validação' });
    }
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Usuário ou senha inválidos." });

    if (!password) return res.status(400).json({ message: 'Senha ou Usuário inválidos.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Usuário ou senha inválidos." });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      authConfig.secret,
      {
        expiresIn: "5d",
      }
    );
    res
      .header("Authorization", token)
      .send({ id: user.id, email, password: user.password, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro no Servidor, tente novamente' });
  }
};

const userId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

const users = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, email, cpf, crf, password, cargo, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = {
      name,
      email,
      cpf,
      crf,
      password: hashedPassword,
      cargo,
      role,
    };

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Usuário não encontrado" });
  }
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

const userInactivate = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    res.status(200).json({ message: "Usuário inativado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao inativar usuário" });
  }
};

export default { adminRegister, userRegister, userLogin, userId, userUpdate, users, userDelete, userInactivate };