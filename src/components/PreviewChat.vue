<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const props = withDefaults(
  defineProps<{
    selected?: boolean;
    nome: string;
    imagem: string;
    mensagens?: number;
    ultima?: { texto: string; idSender: string; timestamps: string };
  }>(),
  {
    mensagens: 0,
    selected: false,
  }
);

const duracao = computed(() => {
  if (!props.ultima) return "";
  // Data fornecida
  const dataFornecida = new Date(props.ultima.timestamps);

  // Data atual
  const dataAtual = new Date();

  var diferencaEmMilissegundos = dataAtual.getTime() - dataFornecida.getTime();

  var diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

  var mensagem;

  if (diferencaEmMinutos < 60) {
    mensagem = diferencaEmMinutos + "m";
  } else if (diferencaEmMinutos < 1440) {
    var diferencaEmHoras = Math.floor(diferencaEmMinutos / 60);
    mensagem = diferencaEmHoras + "h";
  } else {
    dataFornecida.setDate(dataFornecida.getDate() - 1);
    // Verificando se a data é "ontem"
    var ehOntem =
      dataAtual.getDate() === dataFornecida.getDate() &&
      dataAtual.getMonth() === dataFornecida.getMonth() &&
      dataAtual.getFullYear() === dataFornecida.getFullYear();

    // Se a data é "ontem"
    if (ehOntem) {
      mensagem = "Ontem";
    } else {
      // Formatando a data no formato DD/MM/YYYY
      var dia = String(dataFornecida.getDate()).padStart(2, "0");
      var mes = String(dataFornecida.getMonth() + 1).padStart(2, "0");
      var ano = dataFornecida.getFullYear();

      mensagem = dia + "/" + mes + "/" + ano;
    }
  }

  return mensagem;
});
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
      <div class="d-flex align-center" style="overflow: hidden">
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
        <div style="overflow: hidden">
          <p class="text-subtitle-1" style="font-size: 18px">{{ nome }}</p>
          <div class="d-flex">
            <p v-if="ultima" class="d-flex">
              <span
                v-if="userStore.userId === ultima.idSender"
                class="text-caption text-primary mr-1"
              >
                Você:
              </span>
              <span
                class="text-caption text-gray1 mr-1"
                style="
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  max-width: 120px;
                "
              >
                {{ ultima.texto }}
              </span>
              <span class="text-caption text-gray1"> • {{ duracao }} </span>
            </p>
          </div>
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
