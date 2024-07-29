const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');


exports.authenticateToken = (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, '0e581d8c-a675-4e61-976a-d7a9f9ed2b02', {
            expiresIn: '5d',
        });
        req.user = verified;
        next();

    } catch (error) {
        res.status(400).send('token inválido');
    }
};