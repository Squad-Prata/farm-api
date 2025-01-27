import UserRepository from "../user.repository";

export default class ResetPassword {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User nor found");
    
    // Envia email de reset de senha
  }

}
