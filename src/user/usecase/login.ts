import AuthError from "../../application/error/AuthError";
import JWTService  from "../../application/services/jwt.service";
import UserRepository from "../user.repository";

export default class Login {

  constructor(readonly userRepository: UserRepository) {}

  async run(input: Input): Promise<OutputToken> {
    const user = await this.userRepository.getByEmail(input.email);
    if (!user) throw new AuthError("Usuário ou senha inválida!" )  
    if (!user.verifyPassword(input.passwordPlainText)) throw new AuthError("Usuário ou senha inválida!" )  
    const jwtService = new JWTService();
    const token = jwtService.token({ id: user.id, role: user.role });
    return { token };
  }

}

type Input = {
  email: string,
  passwordPlainText: string,
}

type OutputToken = {
  token: string
}