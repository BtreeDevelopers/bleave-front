<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { apibleave } from "@/service";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { descriptografar } from "@/plugins/encript";
import { salvarToken } from "@/service/user";
const route = useRoute();

const router = useRouter();
const error = ref(false);
const loading = ref(false);

const user = computed(() => {
  return JSON.parse(
    route.query?.data ? descriptografar(route.query?.data as string) : "{}"
  );
});

const loginApi = async (userId: string, token: string) => {
  const data = await apibleave.login({ userId, token });
  const payload = {
    email: data.email,
    token: data.token_bleave,
    token_bauth: data.bauth_token,
    userId: data._id,
    name: data.nome,
    image: data.imagemUrl,
    theme: data.tema,
  };
  salvarToken(payload);
  router.push("/");
};

const login = async () => {
  loading.value = true;
  if (Object.keys(user.value).length) {
    await loginApi(user.value.userId, user.value.token);
  } else {
    router.push("/login");
  }
  loading.value = false;
};

onMounted(() => {
  login();
});
</script>
<template>
  <div class="h-100 d-flex align-center justify-center">
    <div
      v-if="!error && loading"
      class="relative"
      style="width: 70px; height: 70px"
    >
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
</template>
