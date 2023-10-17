import { inject, injectable } from "tsyringe";
import { HttpService } from "./public.http.service";

@injectable()
export class AuthService {
  constructor(@inject(HttpService) private httpService: HttpService) {}
  namespace = "user";

  register = async (registerData: any) => {
    return await this.httpService.post(
      `${this.namespace}/register`,
      registerData
    );
  };

  login = async (loginData: any) => {
    return await this.httpService.post(`${this.namespace}/login`, loginData);
  };
}
