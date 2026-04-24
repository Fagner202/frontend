import { createRouter, createWebHistory } from "vue-router";
import AtendimentosList from "../views/AtendimentosList.vue";
import AtendimentoForm from "../views/AtendimentoForm.vue";
import AtendimentoDetalhe from "../views/AtendimentoDetalhe.vue";

const routes = [
  { path: "/", component: AtendimentosList },
  { path: "/novo", component: AtendimentoForm },
  { path: "/:id", component: AtendimentoDetalhe }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});