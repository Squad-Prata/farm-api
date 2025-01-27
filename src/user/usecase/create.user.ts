import User from "../entity/User";
import UserRepository from "../user.repository";

export default class CreateUser {

  constructor(readonly userRepository: UserRepository){}

  async run(input: Input): Promise<Output> {
    const user = User.create(input.name, input.cpf, input.crf, input.email, input.passwordPlainText, input.cargo, "USER", input.pharmacyId);    
    const newUser = await this.userRepository.create(user);
    return { id: newUser.id };
  } 

}

type Input = {
  name: string,
  cpf: string,
  crf: string,
  email: string,
  passwordPlainText: string,
  cargo: string,
  pharmacyId: number
}

type Output = {
  id: number
}

