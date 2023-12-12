<script setup lang="ts">
import { apiConversas } from "@/service/conversas";
import PreviewChat from "./PreviewChat.vue";
import { onMounted, ref, watch } from "vue";
import { apiService } from "@/service/auth";
import { useUserStore } from "@/stores/user";
import { useChatStore } from "@/stores/chats";
import { useRouter } from "vue-router";

const router = useRouter();
const chatStore = useChatStore();
const userStore = useUserStore();
const busca = ref("");
const loading = ref(false);
const emit = defineEmits(["selecionarConversa"]);

let timeoutID: NodeJS.Timeout | null = null;
const usersBuscado = ref<
  { _id: string; nome: string; imagemUrl: string; email: string }[]
>([]);

function debounce(fn: any, delay: number) {
  return function () {
    clearTimeout(timeoutID!);
    var args: any = arguments;
    var that: any = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}

watch(
  () => busca.value,
  (value) => {
    if (!value) {
      usersBuscado.value = [];
      return;
    }
    loading.value = true;
    debounce(async function () {
      const data = await apiService.getUser(busca.value, userStore.token_bauth);
      usersBuscado.value = data.user;
      loading.value = false;
    }, 500)();
  }
);
const iniciarChat = async (userId: string) => {
  const payload = {
    nome_chat: "",
    membros: [userId],
  };
  const conversa = await apiConversas.iniciarConversa(payload);
  const users = await obterUsuarios(conversa.conversas.membros);
  conversa.conversas.membros = users.user;
  chatStore.conversas.unshift(conversa.conversas);
  busca.value = "";
  emit("selecionarConversa", conversa.conversas);
};
const outroMembro = (conversa: any): { nome: string; imagemUrl: string } => {
  if (conversa.membros.length > 2)
    return { nome: conversa.nomeChat, imagemUrl: "" };
  const chat = conversa.membros.filter(
    (el: any) => el._id !== userStore.userId
  );
  return chat[0];
};

const obterUsuarios = async (listusers: string[]) => {
  const users = await apiService.getUsers({
    listArray: listusers,
  });
  return users;
};
onMounted(async () => {
  loading.value = true;
  const conversas = await apiConversas.obterConversas();
  const todosMembros = [
    ...new Set<string>(
      conversas.conversas.reduce((lista: string[], value: any) => {
        lista.push(...value.membros);
        return lista;
      }, [])
    ),
  ];
  const users = await obterUsuarios(todosMembros);
  conversas.conversas.forEach((el: any) => {
    const membros = el.membros.map((mb: string) =>
      users.user.find((user) => user._id === mb)
    );
    el.membros = membros;
  });
  chatStore.conversas = conversas.conversas;
  loading.value = false;
});
const sair = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <div
    style="min-height: 72px"
    class="d-flex align-center justify-space-between mx-7"
  >
    <img
      width="40px"
      height="40px"
      class="rounded-circle mr-2"
      :src="userStore.image"
      v-if="userStore.image"
    />
    <v-icon size="42px" class="rounded-circle" color="primary" v-else
      >$UserCircleIcon</v-icon
    >
    <VMenu>
      <template v-slot:activator="{ props }">
        <VIcon v-bind="props">$EllipsisVerticalIcon</VIcon>
      </template>
      <VCard color="#252831" class="py-2 px-4">
        <p class="text-caption cursor-pointer py-1">Novo grupo</p>
        <p class="text-caption cursor-pointer py-1">Mensagens favoritas</p>
        <p class="text-caption cursor-pointer py-1">Selecionar conversas</p>
        <p class="text-caption cursor-pointer py-1">Configurações</p>
        <p class="text-caption cursor-pointer text-error py-1" @click="sair">
          Sair
        </p>
      </VCard>
    </VMenu>

    <!-- <p class="text-h5 font-weight-bold ml-6 my-5">Conversas</p> -->
  </div>
  <div>
    <VTextField
      flat
      variant="solo"
      bg-color="background"
      prepend-inner-icon="$MagnifyingGlassIcon"
      hide-details="auto"
      class="mb-5 busca"
      v-model.lazy="busca"
      placeholder="Pesquisar ou começar uma nova conversa"
    ></VTextField>
  </div>
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
  <div class="overflow-auto" v-else-if="!busca">
    <PreviewChat
      v-for="(conversa, index) in chatStore.conversas"
      :key="conversa._id"
      :nome="outroMembro(conversa).nome"
      :imagem="outroMembro(conversa).imagemUrl"
      :ultima="
        conversa.mensagens.length
          ? conversa.mensagens[conversa.mensagens.length - 1]
          : undefined
      "
      :selected="chatStore.atual === index"
      @click="emit('selecionarConversa', index)"
    ></PreviewChat>
  </div>
  <div class="overflow-auto" v-else-if="usersBuscado.length">
    <PreviewChat
      v-for="user in usersBuscado"
      :nome="user.nome"
      @click="iniciarChat(user._id)"
      :imagem="user.imagemUrl"
      offline
    ></PreviewChat>
  </div>
</template>

<style>
.v-field {
  border-radius: 0 !important;
}
.busca input {
  font-size: 12px;
}
.busca input::placeholder {
  font-size: 10px !important;
}
</style>
