import { API_BASE_URL, USE_API } from "../config";

export async function getAboutData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/secoes_pagina_inicial/about_pdm`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do About");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/about.json");
    return data.default;
  }
}