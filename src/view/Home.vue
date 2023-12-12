<script setup lang="ts">
import ListUsers from "@/components/ListUsers.vue";
import Chat from "@/components/Chat.vue";
import { useDisplay } from "vuetify";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { apiConversas } from "@/service/conversas";
import { useChatStore } from "@/stores/chats";

const chatStore = useChatStore();
const userStore = useUserStore();

const telaChats = ref(true);

const { mobile } = useDisplay();

const conversa = ref<any>(null);

const loading = ref(false);

const reordenarChats = () => {
  const cvs = [...chatStore.conversas];
  const selecionadoId = cvs[chatStore.atual!]._id;
  cvs.sort((a, b) => {
    if (!a.mensagens.length) return -1;
    if (!b.mensagens.length) return 1;
    const MenA = new Date(a.mensagens[a.mensagens.length - 1].timestamps);
    const MenB = new Date(b.mensagens[b.mensagens.length - 1].timestamps);
    return MenB.getTime() - MenA.getTime();
  });
  const novaPos = cvs.findIndex((el) => el._id === selecionadoId);
  chatStore.conversas = cvs;
  chatStore.atual = novaPos;
};

const selecionarConversa = async (cv: number) => {
  loading.value = true;
  chatStore.atual = cv;
  const chatSelecionado = chatStore.conversas[chatStore.atual];
  const conversas = await apiConversas.obterChat(chatSelecionado._id);
  const newCv = conversas.conversas[0];
  newCv.mensagens.forEach((element: any) => {
    element.sender = chatSelecionado.membros.find(
      (el: any) => el._id === element.idSender
    );
  });
  telaChats.value = false;
  conversa.value = { ...chatSelecionado, mensagens: newCv.mensagens };
  loading.value = false;
};

const outroMembro = (conversa: any): { nome: string; imagemUrl: string } => {
  if (conversa.membros.length > 2)
    return { nome: conversa.nomeChat, imagemUrl: "" };
  const chat = conversa.membros.filter(
    (el: any) => el._id !== userStore.userId
  );
  return chat[0];
};

const adicionarMensagem = (mensagem: any) => {
  const novaMgs = {
    ...mensagem,
    sender: conversa.value.membros.find(
      (el: any) => el._id === mensagem.idSender
    ),
  };
  chatStore.conversas[chatStore.atual!].mensagens.push(novaMgs);
  conversa.value.mensagens.push(novaMgs);
  reordenarChats();
};
</script>

<template>
  <VContainer fluid class="h-screen">
    <VRow class="h-100" style="margin: 0">
      <VCol
        :cols="mobile ? 12 : 4"
        v-if="!mobile || (mobile && telaChats)"
        class="pa-0 bg-background2 d-flex flex-column"
        style="max-height: 100%"
      >
        <ListUsers @selecionarConversa="selecionarConversa"></ListUsers>
      </VCol>
      <VCol
        class="pa-0 d-flex flex-column"
        style="max-height: 100%"
        v-if="!mobile || (mobile && !telaChats)"
      >
        <div v-if="loading" class="d-flex align-center justify-center h-100">
          <div class="relative" style="width: 70px; height: 70px">
            <div class="absolute">
              <v-progress-circular
                value="100"
                class="absolute"
                color="black"
                size="70"
                width="7"
              ></v-progress-circular>
            </div>
            <div class="absolute">
              <v-progress-circular
                indeterminate
                class="absolute"
                color="primary"
                size="70"
                width="7"
              ></v-progress-circular>
            </div>
          </div>
        </div>
        <Chat
          :chatid="conversa._id"
          :imagem="outroMembro(conversa).imagemUrl"
          :mensagens="conversa.mensagens"
          :nome="outroMembro(conversa).nome"
          @adicionarMensagem="adicionarMensagem"
          v-else-if="conversa"
          @voltar="telaChats = true"
        ></Chat>
        <div v-else class="d-flex align-center justify-center h-100">
          <p>Inicie uma nova conversa</p>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss"></style>
