<template>
  <div>
    <h1>Atendimentos</h1>

    <router-link to="/novo">Novo Atendimento</router-link>

    <ul>
      <li v-for="a in atendimentos" :key="a.id">
        {{ a.nome_paciente }} - {{ a.resultado }}
        <router-link :to="`/${a.id}`">Ver</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAtendimentos } from "../services/atendimentoService";

const atendimentos = ref([]);

onMounted(async () => {
  const response = await getAtendimentos();
  atendimentos.value = response.data;
});
</script>