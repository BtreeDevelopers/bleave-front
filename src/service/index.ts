import { AxiosCall } from "@/https";

class authService extends AxiosCall {
  url;
  constructor() {
    super();
    this.url = "bleave";
  }
  login(data: any) {
    return this.axiosCall2({
      method: "post",
      url: `${this.url}/login`,
      data,
    });
  }
  csrf(data: any) {
    return this.axiosCall2({
      method: "post",
      url: `${this.url}/login/csrf`,
      data,
    });
  }
}

export const apibleave = new authService();
