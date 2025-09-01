import { API_BASE_URL, USE_API } from "../config";

/**
 * Envia os filtros selecionados para a API e retorna os resultados filtrados.
 */
export async function postFiltroParticipacaoData(filtros) {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/devolutivas/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtros),
    });
    if (!response.ok) {
      throw new Error("Erro ao aplicar os filtros de participação.");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/participacaoSocial.json");
    return data.default;
  }
}