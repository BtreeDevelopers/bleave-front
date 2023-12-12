<script setup lang="ts">
import { useDisplay } from "vuetify";
import { computed } from "vue";

const { mobile } = useDisplay();

const props = defineProps<{
  texto: string;
  time: string;
  imagem: string;
}>();

const formateDate = computed(() => {
  const data = new Date(props.time);
  const horaFormatada = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return horaFormatada;
});
</script>

<template>
  <div>
    <p class="text-subtitle-2 text-gray1 ml-16">{{ formateDate }}</p>
    <div class="d-flex">
      <img
        width="40px"
        height="40px"
        class="rounded-circle mr-2"
        :src="imagem"
        v-if="imagem"
      />
      <v-icon size="45px" class="rounded-circle" color="primary" v-else
        >$UserCircleIcon</v-icon
      >
      <div class="balao">
        <svg
          style="margin-right: -2px"
          width="15"
          height="13"
          viewBox="0 0 15 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.89944 3.61011L11.8136 11.6521C13.1341 12.6251 15 11.6823 15 10.042V2C15 0.895431 14.1046 0 13 0H2.08584C0.155213 0 -0.654819 2.46487 0.89944 3.61011Z"
            fill="#252831"
          />
        </svg>

        <div
          class="rounded rounded-ts-0 bg-background2 pa-2"
          style="min-height: 50px; word-break: break-all"
          :style="{
            width: mobile ? '240px' : '260px',
          }"
        >
          {{ texto }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.balao {
  display: flex;
}
.borda {
  height: 14px;
  width: 19px;
}
</style>
