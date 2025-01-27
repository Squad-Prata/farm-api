import UserRepository from "../user.repository";

export default class InactiveUser {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User nor found");
    user.inactive();
    await this.userRepository.update(user);
  }

}
