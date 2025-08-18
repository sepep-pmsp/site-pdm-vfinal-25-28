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
 * Extrai só a sigla do órgão
 */
function extrairSiglaOrgao(nomeCompleto) {
  return nomeCompleto.split(" - ")[0].trim();
}

/**
 * GET padrão (lista inicial)
 */
export async function getMetasData() {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/Metas`);
    if (!response.ok) throw new Error("Erro ao carregar dados das metas");
    return await response.json();
  } else {
    const data = await import("@/mock/json/metas_card.json");
    return data.default;
  }
}

/**
 * POST com filtros selecionados
 */
export async function postFiltrosSelecionados(filtros) {
  const filtrosExpandido = await expandirRegioesParaSubprefeituras(filtros);

  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/Metas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtrosExpandido)
    });
    if (!response.ok) throw new Error("Erro ao buscar metas filtradas");
    return await response.json();
  } else {
    const data = await import("@/mock/json/metas_card.json");
    const metas = data.default;

    return metas.filter((meta) => {
      const matchODS =
        filtrosExpandido.ods.length > 0
          ? filtrosExpandido.ods.includes(meta.odsId) ||
            meta.temaODS?.some((ods) => filtrosExpandido.ods.includes(ods))
          : true;

      const matchSubprefeituras =
        filtrosExpandido.subprefeituras.length > 0
          ? filtrosExpandido.subprefeituras.includes(meta.subprefeitura_responsavel)
          : true;

      const matchOrgaos =
        filtrosExpandido.orgaos.length > 0
          ? meta.orgaosResponsaveis?.some((org) =>
              filtrosExpandido.orgaos.map(extrairSiglaOrgao).includes(org)
            )
          : true;

      const matchPlanos =
        filtrosExpandido.planos_vinculados.length > 0
          ? filtrosExpandido.planos_vinculados.includes(meta.planos_vinculados)
          : true;

      const matchEixos =
        filtrosExpandido.eixos.length > 0
          ? filtrosExpandido.eixos.includes(meta.eixo)
          : true;

      const matchSubeixos =
        filtrosExpandido.subeixos.length > 0
          ? filtrosExpandido.subeixos.includes(meta.subeixo)
          : true;

      return (
        matchODS &&
        matchSubprefeituras &&
        matchOrgaos &&
        matchPlanos &&
        matchEixos &&
        matchSubeixos
      );
    });
  }
}