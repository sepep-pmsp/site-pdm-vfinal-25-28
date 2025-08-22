import { API_BASE_URL, USE_API } from "../config";

export async function getTransparenciaData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/transparencia_pagina_inicial`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Transparencia");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/transparencia.json");
    return data.default;
  }
}