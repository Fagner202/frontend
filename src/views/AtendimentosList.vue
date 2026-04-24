<template>
  <div class="container">
    <h1>Atendimentos</h1>

    <router-link to="/novo" class="btn">
      Novo Atendimento
    </router-link>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Resultado</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="a in atendimentos" :key="a.id">
            <td>{{ a.nome_paciente }}</td>
            <td>{{ formatarData(a.data_atendimento) }}</td>
            <td>{{ a.tipo_exame }}</td>
            <td>
              <span :class="a.resultado === 'APTO' ? 'apto' : 'inapto'">
                {{ a.resultado }}
              </span>
            </td>
            <td>
              <router-link :to="`/${a.id}`" class="link">
                Ver
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAtendimentos } from "../services/atendimentoService";

const atendimentos = ref([]);

const formatarData = (data) =>
  new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });

onMounted(async () => {
  const response = await getAtendimentos();
  atendimentos.value = response.data;
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

.card {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 16px;
  background-color: #2d89ef;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}

.btn:hover {
  background-color: #1b5fbf;
}

.link {
  color: #2d89ef;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.apto {
  color: green;
  font-weight: bold;
}

.inapto {
  color: red;
  font-weight: bold;
}
</style>