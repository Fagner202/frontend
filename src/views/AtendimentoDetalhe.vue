<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getAtendimentoById } from "../services/atendimentoService";

const route = useRoute();
const atendimento = ref(null);

onMounted(async () => {
  const response = await getAtendimentoById(route.params.id);
  atendimento.value = response.data;
});
</script>

<template>
  <div v-if="atendimento">
    <h1>Detalhe do Atendimento</h1>

    <p><strong>Nome:</strong> {{ atendimento.nome_paciente }}</p>
    <p><strong>Data:</strong> {{ atendimento.data_atendimento }}</p>
    <p><strong>Tipo:</strong> {{ atendimento.tipo_exame }}</p>
    <p><strong>Resultado:</strong> {{ atendimento.resultado }}</p>
    <p><strong>Observações:</strong> {{ atendimento.observacoes }}</p>
  </div>

  <div v-else>
    Carregando...
  </div>
</template>