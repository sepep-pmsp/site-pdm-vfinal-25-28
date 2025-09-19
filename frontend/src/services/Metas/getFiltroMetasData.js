import { API_BASE_URL } from "../config";

/**
 * Expande regiões selecionadas para suas subprefeituras correspondentes.
 */
async function expandirRegioesParaSubprefeituras(filtros) {
  try {
    const response = await fetch(`${API_BASE_URL}/filtro_metas/parametros_regionalizacao`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar regionalização: ${response.status}`);
    }
    const regioes = await response.json();
    
    const subprefeiturasDasZonas =
      filtros.zonas?.flatMap((zonaId) => {
        const regiaoObj = regioes.find((r) => r.id === zonaId);
        return regiaoObj ? regiaoObj.subprefeituras.map((sub) => sub.id) : [];
      }) ?? [];

    const subprefeiturasFinal = Array.from(
      new Set([...(filtros.subprefeituras ?? []), ...subprefeiturasDasZonas])
    );

    return {
      ...filtros,
      subprefeituras: subprefeiturasFinal,
    };
  } catch (err) {
    console.error("expandirRegioesParaSubprefeituras: erro", err);
    return filtros;
  }
}

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
  // CORREÇÃO: Mapeia as chaves do estado para o formato da API.
  const filtrosPayload = {
    ...filtros,
    temas: filtros.subeixos,
    zonas: filtros.zonas,
    planos_setoriais: filtros.planos_vinculados,
  };

  const filtrosExpandido = await expandirRegioesParaSubprefeituras(filtrosPayload);

  const response = await fetch(`${API_BASE_URL}/filtro_metas/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filtrosExpandido),
  });

  if (!response.ok) throw new Error("Erro ao enviar filtros");

  const retornoAPI = await response.json();
  const metasArray = Array.isArray(retornoAPI) ? retornoAPI : retornoAPI.metas || [];
  
  return {
    metas: metasArray.map((meta) => ({
      ...meta,
      zona_responsavel: null,
    })),
  };
}