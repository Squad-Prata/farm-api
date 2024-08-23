const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config();
const emailsend = require("../services/emailServices");

const prisma = new PrismaClient();

exports.passwordReset = async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).send("Usuário não encontrado");
  }
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const resetLink = `${BASE_URL}/reset-password/${email}`;

  const mailOptions = {
    from: "farmapi119@gmail.com",
    to: user.email,
    subject: "Redefinição de senha",
    html: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.
        <br>
        <br>
           <a href="${resetLink}" style="text-decoration:none;">
        <button style="background-color:blue;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;">
          Clique aqui!
          </button>
          <br>
          <br>
          </a>
           Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá a mesma.`,
  };

  res.status(200).send("Email de redefinição de senha enviado com sucesso");

  emailsend.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.error("Erro ao enviar email", error);
      return res.status(500).send("Erro ao enviar email");
    }
  });
};

exports.passwordUpdate = async (req, res) => {
  const { password } = req.body;
  const { email } = req.params;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).send("Usuário não encontrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.status(200).send("Senha atualizada com sucesso");
};
