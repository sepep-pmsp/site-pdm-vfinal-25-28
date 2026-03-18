import { API_BASE_URL, USE_API } from "@/services/api/config";

export async function getOrcamentoData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/visao_geral/orcamento_geral`);
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do getOrcamentoData");
    }
    return await response.json();
  }
}

export async function getConhecaMetasData() {
  if (!USE_API) return null;

  const response = await fetch(`${API_BASE_URL}/visao_geral/conheca_metas`);

  if (!response.ok) {
    throw new Error("Erro ao carregar dados do conheca_metas");
  }

  return await response.json();
}