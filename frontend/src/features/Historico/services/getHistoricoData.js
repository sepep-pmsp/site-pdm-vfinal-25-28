import { API_BASE_URL, USE_API } from "@/services/api/config";

export async function getHistoricoData() {
  if (USE_API) {
    const response = await fetch(
      `${API_BASE_URL}/secoes_pagina_inicial/historico`
    );

    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Historico");
    }

    const data = await response.json();

    data.cards = data.cards.map((card) => ({
      ...card,
      id: card.id === "pdm-2008-2011"
        ? "pdm-2025-2028"
        : card.id,
    }));

    return data;
  }
}