import User from "../entity/User";
import UserRepository from "../user.repository";

export default class GetUsers {

  constructor(readonly userRepository: UserRepository){
  }

  async run(input: Input): Promise<User[]> {
    const users = await this.userRepository.getAll();
    return users;
  }

}

type Input = {
  // pharmacyId: number,
}
