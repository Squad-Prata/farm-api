const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'farmapi119@gmail.com',
        pass: 'sugdfndfpbxyjtxo',
    },
});

exports.sendPassword = async (req, res) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).send('Usuário não encontrado');
    }

    const resetLink = `http://localhost:3001/atualizarsenha?email=${email}`;

    const mailOptions = {
        from: 'farmapi119@gmail.com',
        to: user.email,
        subject: 'Redefinição de senha',
        text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n
           Clique no link ou cole no seu navegador para redefinir sua senha:\n\n
           ${resetLink}\n\n
           Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá a mesma.\n`,
    };

    transporter.sendMail(mailOptions, (error, res) => {
        if (error) {
            console.error('Erro ao enviar email', error);
            return res.status(500).send('Erro ao enviar email');
        }
        res.status(200).send('Email de redefinição de senha enviado com sucesso');
    });
};

exports.updatePassword = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).send('Usuário não encontrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    res.status(200).send('Senha atualizada com sucesso');
};