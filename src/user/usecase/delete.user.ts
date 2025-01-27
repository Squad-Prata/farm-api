import UserRepository from "../user.repository";

export default class DeleteUser {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User nor found");
    await this.userRepository.delete(user.id);
  }

}
