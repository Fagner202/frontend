<template>
  <div class="container">
    <h1>Novo Atendimento</h1>

    <div class="card">
      <div class="field">
        <label>Nome</label>
        <input v-model="form.nome_paciente" />
      </div>

      <div class="field">
        <label>Data</label>
        <input type="date" v-model="form.data_atendimento" />
      </div>

      <div class="field">
        <label>Tipo de exame</label>
        <input v-model="form.tipo_exame" />
      </div>

      <div class="field">
        <label>Resultado</label>
        <select v-model="form.resultado">
          <option value="APTO">APTO</option>
          <option value="INAPTO">INAPTO</option>
        </select>
      </div>

      <div class="field">
        <label>Observações</label>
        <textarea v-model="form.observacoes"></textarea>
      </div>

      <button class="btn" @click="submit">
        Salvar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createAtendimento } from "../services/atendimentoService";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  nome_paciente: "",
  data_atendimento: "",
  tipo_exame: "",
  resultado: "APTO",
  observacoes: ""
});

const submit = async () => {
  try {
    await createAtendimento(form.value);
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};
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
  background: #fafafa;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select,
textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

textarea {
  min-height: 80px;
}

.btn {
  margin-top: 10px;
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