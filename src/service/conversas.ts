import { AxiosCall } from "@/https";

interface IInicioConversa {
  name_chat?: string;
  membros: string[];
}

class conversasService extends AxiosCall {
  url;
  constructor() {
    super();
    this.url = "bleave/conversas";
  }
  obterConversas() {
    return this.axiosCall2({
      method: "get",
      url: `${this.url}`,
    });
  }
  obterChat(id: string) {
    return this.axiosCall2({
      method: "get",
      url: `${this.url}/id/${id}`,
    });
  }

  iniciarConversa(data: IInicioConversa) {
    return this.axiosCall2({
      method: "post",
      url: `${this.url}`,
      data,
    });
  }
}

export const apiConversas = new conversasService();
