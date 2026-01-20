import { API_BASE_URL, USE_API } from "@/services/api/config";

export async function getSobreData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/secoes_pagina_inicial/sobre`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Sobre");
    }
    return await response.json();
  }
}