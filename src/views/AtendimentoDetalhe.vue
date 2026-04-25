<template>
  <div v-if="atendimento" class="container">
    <h1>Detalhe do Atendimento</h1>

    <div class="card">
      <p><strong>Nome:</strong> {{ atendimento.nome_paciente }}</p>
      <p><strong>Data:</strong> {{ formatarData(atendimento.data_atendimento) }}</p>
      <p><strong>Tipo:</strong> {{ atendimento.tipo_exame }}</p>
      <p><strong>Resultado:</strong> {{ atendimento.resultado }}</p>
      <p><strong>Observações:</strong> {{ atendimento.observacoes || "-" }}</p>
    </div>

    <button class="btn" @click="baixarASO(atendimento.id)">
      Baixar ASO (PDF)
    </button>
  </div>

  <div v-else>
    Carregando...
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getAtendimentoById } from "../services/atendimentoService";

const route = useRoute();
const atendimento = ref(null);

const baixarASO = (id) => {
  window.open(`${import.meta.env.VITE_API_URL}/atendimentos/${id}/aso`);
};

const formatarData = (data) =>
  new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });

onMounted(async () => {
  const response = await getAtendimentoById(route.params.id);
  atendimento.value = response.data;
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #fafafa;
}

.btn {
  padding: 10px 16px;
  border: none;
  background-color: #2d89ef;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  background-color: #1b5fbf;
}
</style>