<script setup lang="ts">
import ListUsers from "@/components/ListUsers.vue";
import Chat from "@/components/Chat.vue";
import { useDisplay } from "vuetify";
import { ref, onMounted } from "vue";
import { apibleave } from "@/service";
import { useChatStore } from "@/stores/chats";
import { obterUserData } from "@/service/user";
import useWs from "@/composable/ws";

const dataUser = obterUserData();
const { conectar, enviarMensagem } = useWs();
const chatStore = useChatStore();
const telaChats = ref(true);
const { mobile } = useDisplay();
const loading = ref(false);

const selecionarConversa = async (cv: number) => {
  loading.value = true;
  await chatStore.selecionarConversa(cv);
  telaChats.value = false;
  loading.value = false;
};

const outroMembro = (conversa: any): { nome: string; imagemUrl: string } => {
  if (conversa.membros.length > 2)
    return { nome: conversa.nomeChat, imagemUrl: "" };
  const chat = conversa.membros.filter((el: any) => el._id !== dataUser.userId);
  return chat[0];
};

const adicionarMensagem = (mensagem: any) => {
  chatStore.adicionarMensagem(mensagem);
};
onMounted(async () => {
  const token = await apibleave.csrf({ bauthToken: dataUser.token_bauth });
  conectar(token.csfr, dataUser.userId);
});
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
          :chatid="chatStore.conversas[chatStore.atual!]._id"
          :imagem="outroMembro(chatStore.conversas[chatStore.atual!]).imagemUrl"
          :mensagens="chatStore.conversas[chatStore.atual!].mensagens"
          :nome="outroMembro(chatStore.conversas[chatStore.atual!]).nome"
          @adicionarMensagem="adicionarMensagem"
          v-else-if="chatStore.atual != null"
          :enviarMensagem="enviarMensagem"
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
