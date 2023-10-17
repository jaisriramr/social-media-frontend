import axios, { AxiosInstance } from "axios";
import { injectable } from "tsyringe";

@injectable()
export class HttpService {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
  }

  async get(url: string, params?: object): Promise<any> {
    const response = await this.instance.get(url, { params });
    return response.data;
  }

  async post(url: string, body: object): Promise<any> {
    const response = await this.instance.post(url, body);
    return response.data;
  }

  async put(url: string, body: object): Promise<any> {
    const response = await this.instance.put(url, body);
    return response.data;
  }

  async delete(url: string, params?: object): Promise<any> {
    const response = await this.instance.delete(url, { params });
    return response.data;
  }

  async patch(url: string, body: object): Promise<any> {
    const response = await this.instance.patch(url, body);
    return response.data;
  }
}
