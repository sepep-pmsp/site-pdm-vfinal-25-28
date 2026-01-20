import { API_BASE_URL, USE_API } from "@/services/api/config";

export async function getFiltroParticipacaoData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/devolutivas/filtro`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do filtro de participação.");
    }
    return await response.json();
  }
}