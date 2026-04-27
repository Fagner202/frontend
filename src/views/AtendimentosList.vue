<template>
  <div class="page">
    <div class="topbar">
      <div class="topbar-left">
        <p class="eyebrow">Clínica Ocupacional</p>
        <h1 class="page-title">Atendimentos</h1>
      </div>
      <router-link to="/novo" class="btn-new">
        <span class="plus">+</span> Novo Atendimento
      </router-link>
    </div>

    <!-- Cards de métricas -->
    <div class="stats">
      <div class="stat">
        <div class="stat-label">Total</div>
        <div class="stat-value">{{ atendimentos.length }}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Aptos</div>
        <div class="stat-value green">{{ totalAptos }}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Inaptos</div>
        <div class="stat-value red">{{ totalInaptos }}</div>
      </div>
    </div>

    <!-- Tabela -->
    <div class="table-wrap">
      <div class="table-head">
        <span>Paciente</span>
        <span>Data</span>
        <span>Tipo</span>
        <span>Resultado</span>
        <span></span>
      </div>
      <div class="table-row" v-for="a in atendimentos" :key="a.id">
        <div>
          <div class="name">{{ a.nome_paciente }}</div>
          <div class="sub" v-if="a.cargo || a.setor">
            {{ [a.cargo, a.setor].filter(Boolean).join(' · ') }}
          </div>
        </div>
        <div class="cell">{{ formatarData(a.data_atendimento) }}</div>
        <div class="cell">{{ a.tipo_exame }}</div>
        <div>
          <span class="badge" :class="a.resultado === 'APTO' ? 'apto' : 'inapto'">
            <span class="dot"></span>{{ a.resultado }}
          </span>
        </div>
        <div>
          <router-link :to="`/${a.id}`" class="ver-link">Ver</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { getAtendimentos } from "../services/atendimentoService";

const atendimentos = ref([]);

const totalAptos = computed(
  () => atendimentos.value.filter((a) => a.resultado === "APTO").length
);
const totalInaptos = computed(
  () => atendimentos.value.filter((a) => a.resultado === "INAPTO").length
);

const formatarData = (data) =>
  new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });

onMounted(async () => {
  const response = await getAtendimentos();
  atendimentos.value = response.data;
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
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  padding: 2.5rem 2rem 4rem;
  max-width: 960px;
  margin: 0 auto;
}

/* Topbar */
.topbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -.5px;
}

.btn-new {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity .15s;
}

.btn-new:hover {
  opacity: .85;
}

.btn-new .plus {
  font-size: 18px;
  line-height: 1;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 2rem;
}

.stat {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
}

.stat-label {
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 8px;
}

.stat-value {
  font-family: 'Syne', sans-serif;
  font-size: 26px;
  font-weight: 700;
}

.stat-value.green {
  color: var(--green);
}

.stat-value.red {
  color: var(--red);
}

/* Tabela */
.table-wrap {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}

.table-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1fr .6fr;
  padding: .75rem 1.25rem;
  border-bottom: 0.5px solid var(--border);
}

.table-head span {
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1fr .6fr;
  padding: .85rem 1.25rem;
  border-bottom: 0.5px solid var(--border);
  align-items: center;
  transition: background .12s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--surface2);
}

.name {
  font-weight: 500;
  font-size: 14px;
}

.sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.cell {
  font-size: 13px;
  color: var(--muted);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: .04em;
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
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

/* Link ver */
.ver-link {
  font-size: 12px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border: 0.5px solid var(--accent-dim);
  border-radius: 6px;
  transition: background .12s;
}

.ver-link:hover {
  background: var(--accent-dim);
}
</style>