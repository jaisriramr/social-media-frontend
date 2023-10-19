import { inject, injectable } from "tsyringe";
import { HttpService } from "./public.http.service";

@injectable()
export class FeedService {
  constructor(@inject(HttpService) private httpService: HttpService) {}
  namespace = "feed";

  getFeedForUser = async (user_id: string) => {
    return await this.httpService.get(`${this.namespace}/user/list/${user_id}`);
  };

  getPostLikedUsers = async (post_id: string) => {
    return await this.httpService.get(
      `${this.namespace}/post/likes/${post_id}`
    );
  };

  getPostComments = async (post_id: string) => {
    return await this.httpService.get(
      `${this.namespace}/post/comments/${post_id}`
    );
  };
}
