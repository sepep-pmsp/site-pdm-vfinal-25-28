import { API_BASE_URL, USE_API } from "../config";

export async function getOrcamentoData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/orcamento_geral`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do getOrcamentoData");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/orcamento_eixo.json");
    return data.default;
  }
}