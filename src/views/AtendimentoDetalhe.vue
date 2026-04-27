<template>
  <div v-if="atendimento" class="page">
    <div class="topbar">
      <div>
        <p class="eyebrow">Clínica Ocupacional</p>
        <h1 class="page-title">Detalhe do Atendimento</h1>
      </div>
      <router-link to="/" class="back-btn">← Voltar</router-link>
    </div>

    <!-- Hero -->
    <div class="hero">
      <div class="hero-left">
        <div class="patient-name">{{ atendimento.nome_paciente }}</div>
        <div class="patient-sub">
          {{ [atendimento.cargo, atendimento.setor, atendimento.empresa_nome].filter(Boolean).join(' · ') }}
        </div>
      </div>
      <span class="badge" :class="atendimento.resultado === 'APTO' ? 'apto' : 'inapto'">
        <span class="dot"></span>{{ atendimento.resultado }}
      </span>
    </div>

    <!-- Dados do Paciente -->
    <div class="section">
      <div class="section-eyebrow">Dados do Paciente</div>
      <div class="grid g3">
        <div class="info-item">
          <div class="info-label">CPF</div>
          <div class="info-value">{{ atendimento.cpf_paciente || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Data de nascimento</div>
          <div class="info-value">{{ formatarData(atendimento.data_nascimento) || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Sexo</div>
          <div class="info-value">{{ sexoLabel(atendimento.sexo) || '—' }}</div>
        </div>
      </div>
    </div>

    <!-- Empresa -->
    <div class="section">
      <div class="section-eyebrow">Empresa</div>
      <div class="grid g2">
        <div class="info-item">
          <div class="info-label">Empresa</div>
          <div class="info-value">{{ atendimento.empresa_nome || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">CNPJ</div>
          <div class="info-value">{{ atendimento.empresa_cnpj || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Cargo</div>
          <div class="info-value">{{ atendimento.cargo || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Setor</div>
          <div class="info-value">{{ atendimento.setor || '—' }}</div>
        </div>
      </div>
    </div>

    <!-- Exame / ASO -->
    <div class="section">
      <div class="section-eyebrow">Exame / ASO</div>
      <div class="grid g3">
        <div class="info-item">
          <div class="info-label">Tipo de ASO</div>
          <div class="info-value">{{ asoLabel(atendimento.tipo_aso) || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Tipo de exame</div>
          <div class="info-value">{{ atendimento.tipo_exame }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Data do atendimento</div>
          <div class="info-value">{{ formatarData(atendimento.data_atendimento) }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Data de validade</div>
          <div class="info-value">{{ formatarData(atendimento.data_validade) || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Data de retorno</div>
          <div class="info-value" :class="{ empty: !atendimento.data_retorno }">
            {{ formatarData(atendimento.data_retorno) || '—' }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">Status</div>
          <div class="info-value">{{ atendimento.status || '—' }}</div>
        </div>
      </div>
    </div>

    <!-- Médico -->
    <div class="section">
      <div class="section-eyebrow">Médico Responsável</div>
      <div class="grid g2">
        <div class="info-item">
          <div class="info-label">Nome</div>
          <div class="info-value">{{ atendimento.medico_nome || '—' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">CRM</div>
          <div class="info-value">{{ atendimento.crm_medico || '—' }}</div>
        </div>
      </div>
    </div>

    <!-- Observações -->
    <div class="section">
      <div class="section-eyebrow">Observações</div>
      <div class="obs-box" :class="{ empty: !atendimento.observacoes }">
        {{ atendimento.observacoes || 'Nenhuma observação registrada.' }}
      </div>
    </div>

    <div class="actions">
      <router-link to="/" class="btn-back">← Voltar</router-link>
      <button class="btn-pdf" @click="baixarASO(atendimento.id)">⬇ Baixar ASO (PDF)</button>
    </div>
  </div>

  <div v-else class="loading">
    <p>Carregando...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getAtendimentoById } from "../services/atendimentoService";

const route = useRoute();
const atendimento = ref(null);

const formatarData = (data) =>
  data ? new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" }) : null;

const sexoLabel = (s) => ({ M: "Masculino", F: "Feminino", Outro: "Outro" }[s] ?? null);

const asoLabel = (t) =>
({
  ADMISSIONAL: "Admissional",
  PERIODICO: "Periódico",
  DEMISSIONAL: "Demissional",
  RETORNO: "Retorno",
  MUDANCA_FUNCAO: "Mudança de Função",
}[t] ?? null);

const baixarASO = (id) => {
  window.open(`${import.meta.env.VITE_API_URL}/atendimentos/${id}/aso`);
};

onMounted(async () => {
  const response = await getAtendimentoById(route.params.id);
  atendimento.value = response.data;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@600;700&display=swap');

:root {
  --bg: #0d0f14;
  --surface: #161920;
  --surface2: #1d2029;
  --border: #2a2d38;
  --text: #e8eaf0;
  --muted: #6b7080;
  --accent: #4f8ef7;
  --accent-dim: #1a2d52;
  --green: #22c97a;
  --green-dim: #0d3324;
  --red: #f75f5f;
  --red-dim: #3d1515;
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

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg);
  color: var(--muted);
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

.hero {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.patient-name {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.patient-sub {
  font-size: 13px;
  color: var(--muted);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 8px;
  letter-spacing: .05em;
}

.badge.apto {
  background: var(--green-dim);
  color: var(--green);
}

.badge.inapto {
  background: var(--red-dim);
  color: var(--red);
}

.badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.section {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
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
  gap: 12px;
}

.g2 {
  grid-template-columns: 1fr 1fr;
}

.g3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.info-label {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 3px;
  letter-spacing: .03em;
}

.info-value {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

.info-value.empty {
  color: var(--muted);
  font-weight: 400;
}

.obs-box {
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  font-size: 13px;
  color: var(--text);
  line-height: 1.6;
}

.obs-box.empty {
  color: var(--muted);
  font-style: italic;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-pdf {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity .15s;
}

.btn-pdf:hover {
  opacity: .85;
}

.btn-back {
  background: transparent;
  color: var(--muted);
  border: 0.5px solid var(--border);
  border-radius: 8px;
  padding: 11px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color .15s;
}

.btn-back:hover {
  color: var(--text);
}
</style>