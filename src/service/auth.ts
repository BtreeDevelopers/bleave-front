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
}

export const apiService = new authService();
