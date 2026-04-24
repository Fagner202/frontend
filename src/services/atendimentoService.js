import { api } from "./api";

export const getAtendimentos = () => api.get("/atendimentos");

export const getAtendimentoById = (id) =>
    api.get(`/atendimentos/${id}`);

export const createAtendimento = (data) =>
    api.post("/atendimentos", data);