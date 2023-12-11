<script setup lang="ts">
import ListUsers from "@/components/ListUsers.vue";
import Chat from "@/components/Chat.vue";
import { useDisplay } from "vuetify";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { apiConversas } from "@/service/conversas";

const userStore = useUserStore();

const { mobile } = useDisplay();

const conversa = ref<any>(null);

const selecionarConversa = async (cv: any) => {
  const conversas = await apiConversas.obterConversas();
  const newCv = conversas.conversas.find((cvs: any) => cvs._id === cv._id);
  newCv.mensagens.forEach((element: any) => {
    element.sender = cv.membros.find((el: any) => el._id === element.idSender);
  });

  conversa.value = { ...cv, mensagens: newCv.mensagens };
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
  conversa.value.mensagens.push({
    ...mensagem,
    sender: conversa.value.membros.find(
      (el: any) => el._id === mensagem.idSender
    ),
  });
};
</script>

<template>
  <VContainer fluid class="h-screen">
    <VRow class="h-100" style="margin: 0">
      <VCol
        cols="4"
        v-if="!mobile"
        class="pa-0 bg-background2 d-flex flex-column"
        style="max-height: 100%"
      >
        <ListUsers @selecionarConversa="selecionarConversa"></ListUsers>
      </VCol>
      <VCol class="pa-0 d-flex flex-column" style="max-height: 100%">
        <Chat
          :chatid="conversa._id"
          :imagem="outroMembro(conversa).imagemUrl"
          :mensagens="conversa.mensagens"
          :nome="outroMembro(conversa).nome"
          @adicionarMensagem="adicionarMensagem"
          v-if="conversa"
        ></Chat>
        <div v-else class="d-flex align-center justify-center h-100">
          <p>Inicie uma nova conversa</p>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss"></style>
