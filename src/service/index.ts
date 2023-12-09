import { AxiosCall } from "@/https";

class authService extends AxiosCall {
  url;
  constructor() {
    super();
    this.url = "/user";
  }
  login(data: any) {
    return this.axiosCall2({
      method: "post",
      url: `user/auth`,
      data,
    });
  }
}

export const apibleave = new authService();
