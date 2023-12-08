<script setup lang="ts">
import { ref, onMounted } from "vue";
import Balloon from "./Balloon.vue";
import MyBalloon from "./MyBalloon.vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

const listChat = ref<HTMLElement | null>(null);
onMounted(() => {
  listChat.value!.scrollTop = listChat.value!.scrollHeight;
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
          src="https://storage.googleapis.com/btreeauth.appspot.com/64a6b96210e294a1c7cd736c.jpg"
        />
      </VBadge>
      <div>
        <p class="text-h6">Lucas Neto</p>
        <p class="text-subtitle-2 text-gray1">Online</p>
      </div>
    </div>
    <p v-if="!mobile"><b>b</b>Leave</p>
  </div>

  <p class="text-subtitle-2 text-gray1 text-center mr-5 my-2">15 de Agosto</p>
  <div class="overflow-auto px-2 px-md-16 py-2 h-100" ref="listChat">
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
    <Balloon></Balloon>
    <MyBalloon></MyBalloon>
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
      placeholder="Escreva uma mensagem..."
    ></VTextField>
    <VBtn color="background2" rounded="0" height="40">
      <VIcon color="primary" size="24">$PaperAirplaneIcon</VIcon>
    </VBtn>
  </div>
</template>

<style scoped lang="scss"></style>
