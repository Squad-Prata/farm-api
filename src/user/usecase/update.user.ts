import User from "../entity/User";
import UserRepository from "../user.repository";

export default class UpdateUser {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number, updatableFields: Input): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User nor found");
    const name = updatableFields.name ?? user.name;
    const cpf = updatableFields.cpf ?? user.cpf;
    const crf = updatableFields.crf ?? user.crf;
    const cargo = updatableFields.cargo ?? user.cargo;
    const newUser = new User(user.id, user.createdAt, user.updatedAt, name, cpf, crf, user.email, user.getHashPassword(), cargo, user.role,user.pharmacyId, user.getActive() ); 
    return await this.userRepository.update(newUser);
  }

}

type Input = {
  name?: string,
  cpf?: string,
  crf?: string,
  cargo?: string
}
