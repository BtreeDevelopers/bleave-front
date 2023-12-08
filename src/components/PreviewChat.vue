<script setup lang="ts">
defineProps<{
  selected: boolean;
}>();
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
            src="https://storage.googleapis.com/btreeauth.appspot.com/64a6b96210e294a1c7cd736c.jpg"
          />
        </VBadge>
        <div>
          <p class="text-h6">Lucas Neto</p>
          <p class="text-subtitle-2 text-gray1">Olá, como você está? • 2m</p>
        </div>
      </div>
      <div
        class="bg-primary text-caption d-flex align-center justify-center rounded-circle font-weight-medium"
        style="height: 22px; width: 22px"
      >
        <span> 5 </span>
      </div>
    </div>
  </VCard>
</template>

<style scoped lang="scss"></style>
