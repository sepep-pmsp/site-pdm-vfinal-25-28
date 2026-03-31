import { API_BASE_URL } from "@/services/api/config";

/**
 * GET inicial - retorna opções de filtros.
 */
export async function getFiltroMetasData() {
  const response = await fetch(`${API_BASE_URL}/filtro_metas/parametros_geral`);
  if (!response.ok) throw new Error("Erro ao carregar dados do Filtro Metas");
  return await response.json();
}

/**
 * POST filtros selecionados - retorna lista de cards filtrados.
 */
export async function postFiltrosSelecionados(filtros) {
  // Mapeia as chaves do estado para o formato da API de forma direta
  const filtrosPayload = {
    ...filtros,
    temas: filtros.subeixos,
    zonas: filtros.zonas,
    subprefeituras: filtros.subprefeituras,
    planos_setoriais: filtros.planos_vinculados,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/filtro_metas/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtrosPayload), // Enviamos o payload direto, sem "expandir"
    });

    if (!response.ok) {
      console.warn("Aviso: Falha ao enviar filtros (Erro no Backend). Retornando vazio.");
      return { metas: [] }; 
    }

    const retornoAPI = await response.json();
    const metasArray = Array.isArray(retornoAPI) ? retornoAPI : retornoAPI.metas || [];
    
    return {
      metas: metasArray.map((meta) => ({
        ...meta,
        zona_responsavel: null,
      })),
    };
    
  } catch (error) {
    console.error("Erro de conexão ao enviar filtros:", error);
    return { metas: [] };
  }
}