import { defineStore } from "pinia";
interface IMembro {
  email: string;
  imagemUrl?: string;
  nome: string;
  _id: string;
}
interface IMensagem {
  idSender: string;
  sender?: IMembro;
  texto: string;
  timestamps: string;
  _id: string;
}
interface IChat {
  _id: string;
  membros: IMembro[];
  mensagens: IMensagem[];
  nomeChat: string;
}
export const useChatStore = defineStore("user", {
  state: () => {
    return {
      conversas: [] as IChat[],
      atual: null as number | null,
    };
  },
  getters: {
    // isLogged: (state) => !!state.token,
  },
});
