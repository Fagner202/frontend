import { api } from "./api";

export const getAtendimentos = () => api.get("/atendimentos");

getAtendimentos().then((response) => {
  console.log(response.data);
});

export const getAtendimentoById = (id) =>
  api.get(`/atendimentos/${id}`);

export const createAtendimento = (data) =>
  api.post("/atendimentos", data);