import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

export const authenticateToken = (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, authConfig.secret, {
            expiresIn: '5d',
        });
        req.user = verified;
        next();
 
    } catch (error) {
        console.log(error)
        res.status(400).send('token inválido');
    }
};