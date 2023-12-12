<script setup lang="ts">
import { useDisplay } from "vuetify";
import { computed } from "vue";

const { mobile } = useDisplay();

const props = defineProps<{
  texto: string;
  time: string;
  showImagem?: boolean;
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
  <div class="d-flex flex-column align-end">
    <p
      class="text-subtitle-2 text-gray1 text-end mr-5"
      style="font-size: 10px !important; line-height: 1rem"
    >
      {{ formateDate }}
    </p>

    <div class="balao">
      <div
        class="rounded rounded-te-0 bg-primary pa-2 text-caption"
        style="min-height: 50px; word-break: break-all"
        :style="{
          width: mobile ? '240px' : '260px',
        }"
      >
        {{ texto }}
      </div>
      <svg
        :style="{ opacity: showImagem ? 1 : 0 }"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="margin-left: -2px"
      >
        <path
          d="M14.1006 3.61011L3.1864 11.6521C1.86587 12.6251 0 11.6823 0 10.042V2C0 0.895431 0.895432 0 2 0H12.9142C14.8448 0 15.6548 2.46487 14.1006 3.61011Z"
          fill="#5093FE"
        />
      </svg>
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
