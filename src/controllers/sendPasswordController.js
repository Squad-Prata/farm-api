const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
require('dotenv').config();

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

exports.sendPassword = async (req, res) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).send('Usuário não encontrado');
    }

    const resetLink = `http://localhost:3000/reset-password?email=${email}`;

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: user.email,
        subject: 'Redefinição de senha',
        text: `Você está recebendo este e-mail porque você (ou alguém) solicitou a redefinição da senha da sua conta.\n\n
           Clique no link ou cole no seu navegador para redefinir sua senha:\n\n
           ${resetLink}\n\n
           Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá a mesma.\n`,
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error('Erro ao enviar email', error);
            return res.status(500).send('Erro ao enviar email');
        }
        res.status(200).send('Email de redefinição de senha enviado com sucesso');
    });
};