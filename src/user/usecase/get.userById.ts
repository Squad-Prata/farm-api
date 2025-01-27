import User from "../entity/User";
import UserRepository from "../user.repository";

export default class GetUserById {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number): Promise<User | undefined> {
    const user = await this.userRepository.getById(id);
    return user;
  }

}
