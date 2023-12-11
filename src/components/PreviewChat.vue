<script setup lang="ts">
withDefaults(
  defineProps<{
    selected?: boolean;
    nome: string;
    imagem: string;
    mensagens?: number;
    ultima?: string;
  }>(),
  {
    mensagens: 0,
    ultima: "",
    selected: false,
  }
);
</script>

<template>
  <VCard
    @click=""
    :color="selected ? 'background' : 'background2'"
    rounded="0"
    elevation="0"
    class="px-8 py-3"
  >
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <VBadge color="success" dot location="bottom end" class="mr-3">
          <img
            width="40px"
            height="40px"
            class="rounded-circle"
            :src="imagem"
            v-if="imagem"
          />
          <v-icon v-else size="45px" class="rounded-circle" color="primary"
            >$UserCircleIcon</v-icon
          >
        </VBadge>
        <div>
          <p class="text-h6">{{ nome }}</p>
          <p class="text-subtitle-2 text-gray1" v-if="ultima">
            {{ ultima }}
          </p>
        </div>
      </div>
      <div
        v-if="mensagens > 0"
        class="bg-primary text-caption d-flex align-center justify-center rounded-circle font-weight-medium"
        style="height: 22px; width: 22px"
      >
        <span> {{ mensagens }} </span>
      </div>
    </div>
  </VCard>
</template>

<style scoped lang="scss"></style>
