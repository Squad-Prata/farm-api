import HttpServer from "../infra/http/httpServer";
import CreateUser from "./usecase/create.user";
import DeleteUser from "./usecase/delete.user";
import GetUserById from "./usecase/get.userById";
import GetUsers from "./usecase/get.users";
import InactiveUser from "./usecase/inactive.user";
import UpdateUser from "./usecase/update.user";
import UserRepository from "./user.repository";

export default class UserController {

  constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository) {}

  registerRoutes() {
    this.userPhoto();
    this.userRegister();
    this.getUsers();
    this.getUser();
    this.updateUser();
    this.deleteUser();
    this.inactiveUser();
  }
   
  private userRegister() {
    this.httpServer.securityRoute("post", "/register", (params: any, body: any) => {
      const input = {
        name: body.name,
        cpf: body.cpf,
        crf: body.crf,
        email: body.email,
        passwordPlainText: body.password,
        cargo: body.cargo,
        pharmacyId: body.pharmacyId,
      };  
      const output = new CreateUser(this.userRepository).run(input);
      return output;
    });  
  }

  private userPhoto() {
    this.httpServer.imageRoute( "post", "/user/:id/photo", (params: any, file: any) => {
      return {
        id: params.id,   
        nomeArquivo: file.filename,
        message: "Arquivo enviado com sucesso" }
    } )
  }

  private getUsers() {
    this.httpServer.securityRoute("get", "/users", (params: any, body: any) => {
      const input = {
        // farmacyId: params.pharmacyId 
      };
      const output = new GetUsers(this.userRepository).run(input);
      return output;
    });
  }

  private getUser() {
    this.httpServer.securityRoute("get", "/users/:id", (params: any, body: any) => {
      const output = new GetUserById(this.userRepository).run(params.id);
      return output;
    });
  }
  
  private updateUser() {
    this.httpServer.securityRoute("get", "/users", (params: any, body: any) => {
      const output = new UpdateUser(this.userRepository).run(params.id, body);
      return output;
    });
  }
  
  private deleteUser() {
    this.httpServer.securityRoute("delete", "/users/:id", (params: any, body: any) => {
      new DeleteUser(this.userRepository).run(params.id);
    });
  }

  private inactiveUser() {
    this.httpServer.securityRoute("post", "/users/:id/inactivate", (params: any, body: any) => {
      new InactiveUser(this.userRepository).run(params.id);
    });
  }
  
}