<template>
  <div class="container">
    <h1>Novo Atendimento</h1>

    <!-- Dados do Paciente -->
    <div class="card">
      <h2 class="section-title">Dados do Paciente</h2>
      <div class="grid-2">
        <div class="field">
          <label>Nome completo</label>
          <input v-model="form.nome_paciente" />
        </div>
        <div class="field">
          <label>CPF</label>
          <input v-model="form.cpf_paciente" placeholder="000.000.000-00" />
        </div>
        <div class="field">
          <label>Data de nascimento</label>
          <input type="date" v-model="form.data_nascimento" />
        </div>
        <div class="field">
          <label>Sexo</label>
          <select v-model="form.sexo">
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Empresa -->
    <div class="card">
      <h2 class="section-title">Empresa</h2>
      <div class="grid-2">
        <div class="field">
          <label>Nome da empresa</label>
          <input v-model="form.empresa_nome" />
        </div>
        <div class="field">
          <label>CNPJ</label>
          <input v-model="form.empresa_cnpj" placeholder="00.000.000/0000-00" />
        </div>
        <div class="field">
          <label>Cargo</label>
          <input v-model="form.cargo" />
        </div>
        <div class="field">
          <label>Setor</label>
          <input v-model="form.setor" />
        </div>
      </div>
    </div>

    <!-- Exame / ASO -->
    <div class="card">
      <h2 class="section-title">Exame / ASO</h2>
      <div class="grid-3">
        <div class="field">
          <label>Tipo de ASO</label>
          <select v-model="form.tipo_aso">
            <option value="">Selecione</option>
            <option value="ADMISSIONAL">Admissional</option>
            <option value="PERIODICO">Periódico</option>
            <option value="DEMISSIONAL">Demissional</option>
            <option value="RETORNO">Retorno</option>
            <option value="MUDANCA_FUNCAO">Mudança de função</option>
          </select>
        </div>
        <div class="field">
          <label>Tipo de exame</label>
          <input v-model="form.tipo_exame" />
        </div>
        <div class="field">
          <label>Data do atendimento</label>
          <input type="date" v-model="form.data_atendimento" />
        </div>
        <div class="field">
          <label>Data de validade</label>
          <input type="date" v-model="form.data_validade" />
        </div>
        <div class="field">
          <label>Data de retorno</label>
          <input type="date" v-model="form.data_retorno" />
        </div>
        <div class="field">
          <label>Resultado</label>
          <select v-model="form.resultado">
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Médico -->
    <div class="card">
      <h2 class="section-title">Médico Responsável</h2>
      <div class="grid-2">
        <div class="field">
          <label>Nome do médico</label>
          <input v-model="form.medico_nome" />
        </div>
        <div class="field">
          <label>CRM</label>
          <input v-model="form.crm_medico" placeholder="CRM/UF 000000" />
        </div>
      </div>
    </div>

    <!-- Controle -->
    <div class="card">
      <h2 class="section-title">Controle</h2>
      <div class="grid-2">
        <div class="field">
          <label>Status</label>
          <select v-model="form.status">
            <option value="ATIVO">Ativo</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="ARQUIVADO">Arquivado</option>
          </select>
        </div>
      </div>
      <div class="field" style="margin-top: 1rem">
        <label>Observações</label>
        <textarea v-model="form.observacoes"></textarea>
      </div>
    </div>

    <button class="btn" @click="submit">Salvar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createAtendimento } from "../services/atendimentoService";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  nome_paciente: "",
  cpf_paciente: "",
  data_nascimento: "",
  sexo: "",
  empresa_nome: "",
  empresa_cnpj: "",
  cargo: "",
  setor: "",
  tipo_aso: "",
  tipo_exame: "",
  data_atendimento: "",
  data_validade: "",
  data_retorno: "",
  resultado: "APTO",
  medico_nome: "",
  crm_medico: "",
  status: "ATIVO",
  observacoes: "",
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