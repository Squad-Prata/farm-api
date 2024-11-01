import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

export const authenticateToken = (req, res, next) => {

    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send('Token não encontrado');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, authConfig.secret, {
            expiresIn: '5d',
        });
        req.user = verified;
        next();
 
    } catch (error) {
        res.status(400).send('token inválido');
    }
};