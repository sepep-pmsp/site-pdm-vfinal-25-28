import { API_BASE_URL, USE_API } from "../config";

export async function getEixosData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/secoes_pagina_inicial/eixos`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Eixos");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/eixos.json");
    return data.default;
  }
}