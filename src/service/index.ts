import { AxiosCall } from "@/https";
import axios from "axios";

class authService extends AxiosCall {
  url;
  service;
  constructor() {
    super();
    this.url = "bleave";
    this.service = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}`,
    });
  }
  async login(paylaod: any): Promise<any> {
    const { data } = await this.service({
      method: "post",
      url: `${this.url}/login`,
      data: paylaod,
    });
    return data;
  }
  csrf(paylaod: any) {
    return this.axiosCall2({
      method: "post",
      url: `${this.url}/login/csrf`,
      data: paylaod,
    });
  }
}

export const apibleave = new authService();
