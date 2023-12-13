<template>
  <div>
    <img :src="imagem" />
    <p>
      <span>teste</span>
      <span
        :style="{ backgroundImage: 'url(' + imagem + ')' }"
        style="
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        "
      >
        <span style="color: transparent"> 😀 </span>
      </span>
      <span>teste</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import regex from "@/assets/regex.js";
const imagem = ref("");

var testRegex = new RegExp("^(" + regex.toString().slice(1, -2) + ")$");
function getImage(str: string) {
  str = str.replace(/[\ufe00-\ufe0f\u200d]/g, "");

  var name = [];
  for (var i = 0; i < str.length; i++)
    name.push(("0000" + str.charCodeAt(i).toString(16)).slice(-4));

  return "/src/assets/emoji/" + name.join("-") + ".png";
}
const getIcon = (chars: string) => {
  if (!testRegex.test(chars)) return null;
  return getImage(chars);
};

onMounted(async () => {
  imagem.value = new URL(getIcon("😀")!, import.meta.url) as unknown as string;
});
</script>

<style>
.row {
  display: flex;
}
.row > * {
  margin: auto;
}
</style>
