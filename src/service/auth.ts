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
  getUser(nome: string, token: string) {
    return this.axiosCall({
      method: "get",
      url: `/user/users/nome/${nome}`,
      headers: {
        secret: process.env.VUE_APP_SECRET,
        Authorization: "Bearer " + token,
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
