import { USE_API, API_BASE_URL } from "./config";

/**
 * Expande regiões selecionadas para suas subprefeituras correspondentes
 */
async function expandirRegioesParaSubprefeituras(filtros) {
  try {
    const filtrosJson = (await import("@/mock/json/filtroEixos.json")).default;

    const subprefeiturasDasRegioes = filtros.regioes.flatMap((regiao) => {
      const regiaoObj = filtrosJson.filtros.regioes.find((r) => r.nome === regiao);
      return regiaoObj ? regiaoObj.subprefeituras : [];
    });

    const subprefeiturasFinal = Array.from(
      new Set([...filtros.subprefeituras, ...subprefeiturasDasRegioes])
    );

    return {
      ...filtros,
      subprefeituras: subprefeiturasFinal
    };
  } catch (err) {
    console.error("Erro ao expandir regiões:", err);
    return filtros;
  }
}

/**
 * Extrai só a sigla do órgão (ex: "SGM - Secretaria..." → "SGM")
 */
function extrairSiglaOrgao(nomeCompleto) {
  return nomeCompleto.split(" - ")[0].trim();
}

/**
 * GET inicial - retorna opções de filtros
 */
export async function getFiltroMetasData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/FiltroMetas`);
    if (!response.ok) throw new Error("Erro ao carregar dados do Filtro Metas");
    return await response.json();
  } else {
    const data = await import("@/mock/json/filtroEixos.json");
    return data.default;
  }
}

/**
 * POST filtros selecionados - retorna lista de cards filtrados
 */
export async function postFiltrosSelecionados(filtros) {
  const filtrosExpandido = await expandirRegioesParaSubprefeituras(filtros);

  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/Filtros`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtrosExpandido)
    });
    if (!response.ok) throw new Error("Erro ao enviar filtros");
    return await response.json();
  } else {
    const metas = (await import("@/mock/json/metas_card.json")).default;

    return metas.filter((meta) => {
      // Eixo
      if (filtrosExpandido.eixos?.length && !filtrosExpandido.eixos.includes(meta.eixo)) return false;

      // Subeixo
      if (filtrosExpandido.subeixos?.length && !filtrosExpandido.subeixos.includes(meta.subeixo)) return false;

      // ODS
      if (filtrosExpandido.ods?.length &&
          !meta.temaODS.some((ods) => filtrosExpandido.ods.includes(ods))) return false;

      // Subprefeituras (já incluindo derivadas de regiões)
      if (filtrosExpandido.subprefeituras?.length &&
          !filtrosExpandido.subprefeituras.includes(meta.subprefeitura_responsavel)) return false;

      // Órgãos (normaliza para sigla)
      if (filtrosExpandido.orgaos?.length) {
        const siglasSelecionadas = filtrosExpandido.orgaos.map(extrairSiglaOrgao);
        if (!meta.orgaosResponsaveis.some((org) => siglasSelecionadas.includes(org))) return false;
      }

      // Planos vinculados
      if (filtrosExpandido.planos_vinculados?.length &&
          !filtrosExpandido.planos_vinculados.includes(meta.planos_vinculados)) return false;

      return true;
    });
  }
}
