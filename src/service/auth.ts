import { AxiosCall } from "@/https";

class authService extends AxiosCall {
  url;
  constructor() {
    super();
    this.url = "/user";
  }
  csrf(url_retorno: string) {
    return this.axiosCall({
      method: "get",
      url: `/login/csrf`,
      headers: {
        url_retorno,
      },
    });
  }
  getUsers(data: { listArray: string[] }): Promise<{ user: any[] }> {
    return this.axiosCall({
      method: "post",
      url: `/user/list`,
      data,
      headers: {
        secret: process.env.VUE_APP_SECRET,
      },
    });
  }
}

export const apiService = new authService();
