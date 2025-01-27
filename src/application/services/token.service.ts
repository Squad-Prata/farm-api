import TokenError from "../error/TokenError";
import JWTService from "./jwt.service";

export default class TokenService {

  validate(authHeader: string | undefined): object {
    if (!authHeader) throw new TokenError('Token not found');
    const token = authHeader.replace('Bearer ', '');
    const jwtService = new JWTService();
    try {
      const decodedToken = jwtService.verifyToken(token);
      return decodedToken;
    } catch (error) {
      throw new TokenError('Invalid token');
    }
  }

}
