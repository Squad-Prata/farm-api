import UserRepository from "../user.repository";

export default class ChangePassword {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number, newPassordTextPlain: string): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User nor found");
    user.changePassword(newPassordTextPlain);
    await this.userRepository.update(user);
  }

}
