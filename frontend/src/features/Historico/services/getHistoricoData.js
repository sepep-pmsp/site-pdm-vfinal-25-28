import { API_BASE_URL, USE_API } from "@/services/api/config";

export async function getHistoricoData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/secoes_pagina_inicial/historico`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Historico");
    }
    return await response.json();
  }
}