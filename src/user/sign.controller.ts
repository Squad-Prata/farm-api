import HttpServer from "../infra/http/httpServer";
import ChangePassword from "./usecase/change.password";
import CreateAdmin from "./usecase/create.admin";
import Login from "./usecase/login";
import UserRepository from "./user.repository";

export default class SignController {

  constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository) {

  }

  registerRoutes() {
    this.adminRegister();
    this.login();
    this.changePassword();
    this.resetPassword();
  }
 
  private adminRegister() {
    this.httpServer.route("post", "/admin-register", (params: any, body: any) => {
      const input = {
        name: body.name,
        cpf: body.cpf,
        crf: body.crf,
        email: body.email,
        passwordPlainText: body.password,
        cargo: body.cargo,
        pharmacyId: body.pharmacyId,
      };
      const user = new CreateAdmin(this.userRepository).run(input);
      return user;
    }, 201);
  }
  
  private login() {
    this.httpServer.route("post", "/login", (params: any, body: any) => {
      const input = {
        email: body.email,
        passwordPlainText: body.password,
      };
      const outputToken = new Login(this.userRepository).run(input);
      return outputToken;
    });
  }  

  private changePassword() {
    this.httpServer.securityRoute("post", "/password-update", (params: any, body: any, token: any) => {
      new ChangePassword(this.userRepository).run(token.id, body);
    });
  }

  private resetPassword() {
    this.httpServer.securityRoute("post", "/password-reset/:id", (params: any, body: any, token: any) => {
      // new ResetPassword(this.userRepository).run(params.id);
    });
  }

}