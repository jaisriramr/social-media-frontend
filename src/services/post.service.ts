import { inject, injectable } from "tsyringe";
import { HttpService } from "./public.http.service";

@injectable()
export class PostService {
  constructor(@inject(HttpService) private httpService: HttpService) {}
  namespace = "post";

  createLike = async (query: any) => {
    return await this.httpService.post("/like/create", query);
  };

  removeLike = async (id: any) => {
    return await this.httpService.delete("/like/remove/" + id);
  };
}
