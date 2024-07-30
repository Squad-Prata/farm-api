const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'farmapi119@gmail.com',
        pass: 'sugdfndfpbxyjtxo',
    }
});

module.exports = transporter;