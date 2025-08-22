import { API_BASE_URL, USE_API } from "../config";

export async function getRegionalizacaoData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/FiltroMetas`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Regionalizacao");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/regionalizacao.json");
    return data.default;
  }
}