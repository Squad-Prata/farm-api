import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import AuthError from "../error/AuthError";

interface Payload {
  id: number;  
  role: string;  
}

export default class JWTService {
  token(payload: Payload): string {
    const options = { expiresIn: authConfig.expiresIn } as jwt.SignOptions;
    const token = jwt.sign(
      payload,
      authConfig.secret,
      options
    );
    return token;
  }

  verifyToken(token: string): Promise<string | object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) reject(new AuthError("Invalid token or verification failed"));
        resolve(decoded!);
      });
    });
  }

}

