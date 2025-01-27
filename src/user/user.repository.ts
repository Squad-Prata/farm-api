// import { PrismaClient } from "@prisma/client";
import User from "./entity/User";

export default interface UserRepository {
  create (user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete (id: number): Promise<void>;
  getAll (): Promise<User[]>;
  getByEmail (email: string): Promise<User | undefined>;
  getById (id: number): Promise<User | undefined>;
}


export class UserRepositoryMemory implements UserRepository {
  private users: User[];
  
  constructor () {
    this.users = [];
  }
  
  async create(user: User): Promise<User> {
    const pos = this.users.push(user);
      this.users[pos-1].id = pos;
      return this.users[pos-1];
    }
    
    async update(user: User): Promise<User> {
      const pos = this.users.findIndex((_user: any) => _user.id === user.id);
      this.users[pos-1] = user;
      return this.users[pos-1];
    }
    
    async delete (id : number): Promise<void> {
      this.users = this.users.filter((item: any) => item.id !== id);
    };
    
    async getAll (): Promise<User[]> {
      return this.users;
    };
    
    async getByEmail (email : string): Promise<User | undefined> {
      return this.users.find((user: any) => user.email === email);
    };
    
    async getById (id : number): Promise<User | undefined> {
      return this.users.find((user: any) => user.id === id);
    };
    
    
    // export class UserRepositoryDatabase implements UserRepository {
    
    //   constructor (readonly prisma: PrismaClient) {
    //   }
    
    //   async saveUser (user: User): User {
    //     const data = { user.name, user.cpf, user.crf, user.email, user.password, user.cargo, user.role };
    //     const userData = await this.prisma.user.create({ data });
    //     return new User(
    //       userData.id,
    //       userData.createdAt,
    //       userData.updatedAt,
    //       userData.name,
    //       userData.cpf,
    //       userData.crf,
    //       userData.email,
    //       userData.password,
    //       userData.cargo,
    //       userData.role,
    //       userData.pharmacyId,
    //       userData.ativo 
    //       );
    //   }
    
    //  }
  }