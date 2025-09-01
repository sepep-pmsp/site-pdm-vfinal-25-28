import { API_BASE_URL, USE_API } from "../config";

export async function getNewsData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/secoes_pagina_inicial/noticias`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do News");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/news.json");
    return data.default;
  }
}