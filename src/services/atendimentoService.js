import { api } from "./api";

export const getAtendimentos = () => api.get("/atendimentos");

getAtendimentos().then((response) => {
  console.log(response);
});

console.log("API URL:", import.meta.env.VITE_API_URL);

export const getAtendimentoById = (id) =>
  api.get(`/atendimentos/${id}`);

export const createAtendimento = (data) =>
  api.post("/atendimentos", data);