import { API_BASE_URL, USE_API } from "../config";

export async function getFiltroParticipacaoData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/devolutivas/filtro`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do filtro de participação.");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/participacaoSocial.json");
    return data.default[0]?.filtro || {};
  }
}