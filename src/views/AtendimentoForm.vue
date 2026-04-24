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

<template>
  <div>
    <h1>Novo Atendimento</h1>

    <input v-model="form.nome_paciente" placeholder="Nome" />
    <input type="date" v-model="form.data_atendimento" />
    <input v-model="form.tipo_exame" placeholder="Tipo de exame" />

    <select v-model="form.resultado">
      <option value="APTO">APTO</option>
      <option value="INAPTO">INAPTO</option>
    </select>

    <textarea v-model="form.observacoes" placeholder="Observações"></textarea>

    <button @click="submit">Salvar</button>
  </div>
</template>