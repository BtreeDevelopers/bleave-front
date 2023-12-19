import { defineStore } from "pinia";
import { apiConversas } from "@/service/conversas";
import { apiService } from "@/service/auth";
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
  naoLidas: number;
  nomeChat: string;
}
export const useChatStore = defineStore("user", {
  state() {
    return {
      conversas: [] as IChat[],
      atual: null as number | null,
      wsid: "",
    };
  },
  actions: {
    async obterUsuarios(listusers: string[]): Promise<{ user: IMembro[] }> {
      const users = await apiService.getUsers({
        listArray: listusers,
      });
      return users;
    },
    async selecionarConversa(conversa: number) {
      this.atual = conversa;
      const chatSelecionado = this.conversas[this.atual];
      const conversas = await apiConversas.obterChat(chatSelecionado._id);
      const conversaAtualizada = conversas.conversas[0];
      conversaAtualizada.mensagens.forEach((element: any) => {
        element.sender = chatSelecionado.membros.find(
          (el: any) => el._id === element.idSender
        );
      });
      this.conversas[this.atual].naoLidas = 0;
      this.conversas[this.atual].mensagens = conversaAtualizada.mensagens;
    },
    reordenarChats() {
      const cvs = [...this.conversas];
      let selecionadoId = -1;
      if (this.atual) {
        selecionadoId = cvs[this.atual!]._id;
      }
      cvs.sort((a, b) => {
        if (!a.mensagens.length) return -1;
        if (!b.mensagens.length) return 1;
        const MenA = new Date(a.mensagens[a.mensagens.length - 1].timestamps);
        const MenB = new Date(b.mensagens[b.mensagens.length - 1].timestamps);
        return MenB.getTime() - MenA.getTime();
      });
      if (this.atual) {
        const novaPos = cvs.findIndex((el) => el._id === selecionadoId);
        this.atual = novaPos;
      }
      this.conversas = cvs;
    },
    adicionarMensagem(payload: {
      _id: number;
      timestamps: string;
      idConversa: string;
      texto: string;
      idSender: string;
    }) {
      const chatRecebido = this.conversas.findIndex(
        (el: any) => el._id === payload.idConversa
      );
      if (chatRecebido === -1) return;
      const novaMgs = {
        ...payload,
        sender: this.conversas[chatRecebido].membros.find(
          (el: any) => el._id === payload.idSender
        ),
      };
      this.conversas[chatRecebido].mensagens.push(novaMgs);
      if (this.atual !== chatRecebido) {
        this.conversas[chatRecebido].naoLidas += 1;
      }
      this.reordenarChats();
      return novaMgs;
    },
    async carregarTudo() {
      const conversas = (await apiConversas.obterConversas()) as {
        conversas: {
          _id: string;
          membros: string[];
          mensagens: IMensagem[];
          nomeChat: string;
        }[];
      };
      const todosMembros = [
        ...new Set<string>(
          conversas.conversas.reduce((lista: string[], value: any) => {
            lista.push(...value.membros);
            return lista;
          }, [])
        ),
      ];
      const users = (await this.obterUsuarios(todosMembros)) as {
        user: IMembro[];
      };
      conversas.conversas.forEach((el: any) => {
        const membros = el.membros.map((mb: string) =>
          users.user.find((user) => user._id === mb)
        );
        el.naoLidas = 0;
        el.membros = membros;
      });
      this.conversas = conversas.conversas;
      this.reordenarChats();
    },
  },
});
