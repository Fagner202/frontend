<template>
  <div class="page">
    <div class="topbar">
      <div>
        <p class="eyebrow">Clínica Ocupacional</p>
        <h1 class="page-title">Novo Atendimento</h1>
      </div>
      <router-link to="/" class="back-btn">← Voltar</router-link>
    </div>

    <!-- Dados do Paciente -->
    <div class="section">
      <div class="section-eyebrow">Dados do Paciente</div>
      <div class="grid g2">
        <div class="field">
          <label>Nome completo</label>
          <input v-model="form.nome_paciente" placeholder="Nome do paciente" />
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
    <div class="section">
      <div class="section-eyebrow">Empresa</div>
      <div class="grid g2">
        <div class="field">
          <label>Nome da empresa</label>
          <input v-model="form.empresa_nome" placeholder="Razão social" />
        </div>
        <div class="field">
          <label>CNPJ</label>
          <input v-model="form.empresa_cnpj" placeholder="00.000.000/0000-00" />
        </div>
        <div class="field">
          <label>Cargo</label>
          <input v-model="form.cargo" placeholder="Ex: Operador de máquinas" />
        </div>
        <div class="field">
          <label>Setor</label>
          <input v-model="form.setor" placeholder="Ex: Produção" />
        </div>
      </div>
    </div>

    <!-- Exame / ASO -->
    <div class="section">
      <div class="section-eyebrow">Exame / ASO</div>
      <div class="grid g3">
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
          <input v-model="form.tipo_exame" placeholder="Ex: Clínico geral" />
        </div>
        <div class="field">
          <label>Resultado</label>
          <select v-model="form.resultado">
            <option value="APTO">APTO</option>
            <option value="INAPTO">INAPTO</option>
          </select>
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
      </div>
    </div>

    <!-- Médico -->
    <div class="section">
      <div class="section-eyebrow">Médico Responsável</div>
      <div class="grid g2">
        <div class="field">
          <label>Nome do médico</label>
          <input v-model="form.medico_nome" placeholder="Dr(a). Nome" />
        </div>
        <div class="field">
          <label>CRM</label>
          <input v-model="form.crm_medico" placeholder="CRM/UF 000000" />
        </div>
      </div>
    </div>

    <!-- Controle -->
    <div class="section">
      <div class="section-eyebrow">Controle</div>
      <div class="grid g2" style="margin-bottom: 14px">
        <div class="field">
          <label>Status</label>
          <select v-model="form.status">
            <option value="ATIVO">Ativo</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="ARQUIVADO">Arquivado</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Observações</label>
        <textarea v-model="form.observacoes" placeholder="Observações adicionais..."></textarea>
      </div>
    </div>

    <div class="btn-wrap">
      <router-link to="/" class="btn-cancel">Cancelar</router-link>
      <button class="btn-save" @click="submit">Salvar atendimento</button>
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@600;700&display=swap');

:root {
  --bg: #0d0f14;
  --surface: #161920;
  --surface2: #1d2029;
  --border: #2a2d38;
  --border-focus: #4f8ef7;
  --text: #e8eaf0;
  --muted: #6b7080;
  --placeholder: #454857;
  --accent: #4f8ef7;
  --accent-dim: #1a2d52;
}

.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  background: var(--bg);
  min-height: 100vh;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 5px;
}

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -.5px;
}

.back-btn {
  font-size: 12px;
  color: var(--muted);
  text-decoration: none;
  border: 0.5px solid var(--border);
  padding: 7px 12px;
  border-radius: 7px;
  transition: color .15s;
}

.back-btn:hover {
  color: var(--text);
}

.section {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 14px;
  padding: 1.4rem 1.5rem;
  margin-bottom: 1rem;
}

.section-eyebrow {
  font-size: 10px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
  padding-bottom: .75rem;
  border-bottom: 0.5px solid var(--border);
}

.grid {
  display: grid;
  gap: 14px;
}

.g2 {
  grid-template-columns: 1fr 1fr;
}

.g3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: .02em;
}

input,
select,
textarea {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  padding: 9px 12px;
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  outline: none;
  transition: border-color .15s;
  width: 100%;
}

input::placeholder {
  color: var(--placeholder);
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--border-focus);
}

select option {
  background: var(--surface2);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.btn-wrap {
  margin-top: 1.5rem;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity .15s;
}

.btn-save:hover {
  opacity: .85;
}

.btn-cancel {
  background: transparent;
  color: var(--muted);
  border: 0.5px solid var(--border);
  border-radius: 8px;
  padding: 11px 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color .15s;
}

.btn-cancel:hover {
  color: var(--text);
}
</style>