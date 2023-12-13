import { ref } from "vue";
import { useChatStore } from "@/stores/chats";
import notificacao from "@/assets/notificacao.mp3";

export default function () {
  const chatStore = useChatStore();
  enum ListStatus {
    "closed",
    "open",
    "error",
  }
  const statusWS = ref(ListStatus.closed);
  const ws = ref<WebSocket | null>(null);
  const conectar = (csfr: string, userid: string) => {
    ws.value = new WebSocket(
      `${process.env.VUE_APP_API_URL_WS!}/?csfr=${csfr}&userid=${userid}`
    );
    eventsWS();
  };
  const eventsWS = () => {
    ws.value!.addEventListener("open", () => {
      statusWS.value = ListStatus.open;
    });
    ws.value!.addEventListener("error", () => {
      //RECONECTAR :(
      statusWS.value = ListStatus.error;
    });
    ws.value!.addEventListener("close", () => {
      statusWS.value = ListStatus.closed;
    });
    ws.value!.addEventListener("message", (event) => {
      if (statusWS.value !== ListStatus.open) return;
      const data = JSON.parse(event.data);
      switch (data.status) {
        case 0:
          chatStore.wsid = data.id;
          break;
        case 1:
          const payload = {
            _id: Date.now(),
            timestamps: data.timestamps,
            idConversa: data.idConversa,
            texto: data.texto,
            idSender: data.idSender,
          };
          var audio = new Audio(notificacao);
          audio.play();
          chatStore.adicionarMensagem(payload);
          break;
      }
    });
  };
  const enviarMensagem = (payload: {
    idConversa: string;
    idSender: string;
    texto: string;
  }) => {
    ws.value?.send(JSON.stringify(payload));
  };
  return {
    ws,
    conectar,
    enviarMensagem,
  };
}
