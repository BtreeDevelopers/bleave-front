<script setup lang="ts">
import { ref, onMounted } from "vue";
import Balloon from "./Balloon.vue";
import MyBalloon from "./MyBalloon.vue";
import { useDisplay } from "vuetify";
import { Conection } from "@/service/ws";
import { apibleave } from "@/service";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const { mobile } = useDisplay();

const listChat = ref<HTMLElement | null>(null);
enum ListStatus {
  "closed",
  "open",
  "error",
}
const statusWS = ref(ListStatus.closed);
const conexao = ref<Conection | null>(null);

const mensagem = ref("");
const wsid = ref("");

const props = defineProps<{
  nome: string;
  chatid: string;
  imagem: string;
  mensagens: any[];
}>();

const emit = defineEmits(["adicionarMensagem"]);
const eventsWS = () => {
  conexao.value!.ws.addEventListener("open", () => {
    statusWS.value = ListStatus.open;
  });
  conexao.value!.ws.addEventListener("error", () => {
    //RECONECTAR :(
    statusWS.value = ListStatus.error;
  });
  conexao.value!.ws.addEventListener("close", () => {
    statusWS.value = ListStatus.closed;
  });
  conexao.value!.ws.addEventListener("message", (event) => {
    if (statusWS.value !== ListStatus.open) return;
    const data = JSON.parse(event.data);
    switch (data.status) {
      case 0:
        wsid.value = data.id;
        break;
      case 1:
        const payload = {
          _id: Date.now(),
          timestamps: data.timestamps,
          idConversa: data.idConversa,
          texto: data.texto,
          idSender: data.idSender,
        };
        emit("adicionarMensagem", payload);
        setTimeout(() => {
          scrollEnd();
        }, 2);
        break;
    }
  });
};
const enviarMensagem = () => {
  if (!mensagem.value) return;
  const payload = {
    idConversa: props.chatid,
    idSender: wsid.value,
    texto: mensagem.value,
  };
  conexao.value!.ws.send(JSON.stringify(payload));
  var dataAtual = new Date();
  var dataFormatada = dataAtual.toISOString();
  emit("adicionarMensagem", {
    ...payload,
    timestamps: dataFormatada,
    _id: Date.now(),
    idSender: userStore.userId,
  });
  mensagem.value = "";
  setTimeout(() => {
    scrollEnd();
  }, 2);
};
const scrollEnd = () => {
  listChat.value!.scrollTop = listChat.value!.scrollHeight;
};
onMounted(async () => {
  scrollEnd();
  const token = await apibleave.csrf({ bauthToken: userStore.token_bauth });
  conexao.value = new Conection(token.csfr, userStore.userId);
  eventsWS();
});
</script>

<template>
  <div
    class="d-flex align-center justify-space-between px-2 px-md-7"
    :class="{
      'bg-background2': !mobile,
    }"
    style="min-height: 72px"
  >
    <div class="d-flex align-center">
      <VIcon v-if="mobile" color="white" size="24" class="mx-3" @click=""
        >$ChevronLeftIcon</VIcon
      >
      <VBadge color="success" dot location="bottom end" class="mr-3">
        <img
          width="40px"
          height="40px"
          class="rounded-circle"
          :src="props.imagem"
        />
      </VBadge>
      <div>
        <p class="text-h6">{{ props.nome }}</p>
        <p class="text-subtitle-2 text-gray1">Online</p>
      </div>
    </div>
    <p v-if="!mobile"><b>b</b>Leave</p>
  </div>

  <p class="text-subtitle-2 text-gray1 text-center mr-5 my-2">15 de Agosto</p>
  <div class="overflow-auto px-2 px-md-16 py-2 h-100" ref="listChat">
    <template v-for="msg in props.mensagens">
      <Balloon
        :texto="msg.texto"
        :time="msg.timestamps"
        :imagem="msg.sender.imagemUrl"
        :key="msg._id"
        v-if="msg.idSender !== userStore.userId"
      ></Balloon>

      <MyBalloon
        :key="msg._id + '1'"
        v-else
        :texto="msg.texto"
        :time="msg.timestamps"
      >
      </MyBalloon>
    </template>
  </div>
  <div class="d-flex mx-n4 mx-sm-0">
    <VBtn
      color="background2"
      class="mx-1"
      rounded="0"
      height="40"
      v-if="!mobile"
    >
      <VIcon color="warning" size="24">$FaceSmileIcon</VIcon>
    </VBtn>
    <VBtn
      color="background2"
      class="mx-1"
      rounded="0"
      height="40"
      v-if="!mobile"
    >
      <VIcon color="success" size="24">$PaperClipIcon</VIcon>
    </VBtn>
    <VTextField
      rounded="0"
      variant="solo"
      density="compact"
      class="mr-1"
      bg-color="background2"
      hide-details="auto"
      v-model="mensagem"
      @keyup.enter="enviarMensagem"
      placeholder="Escreva uma mensagem..."
    ></VTextField>
    <VBtn color="background2" rounded="0" height="40" @click="enviarMensagem">
      <VIcon color="primary" size="24">$PaperAirplaneIcon</VIcon>
    </VBtn>
  </div>
</template>

<style scoped lang="scss"></style>
