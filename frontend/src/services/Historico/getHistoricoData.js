const USE_API = true;

export async function getHistoricoData() {
  if (USE_API) {
    const response = await fetch("https://projetos.codata.prefeitura.sp.gov.br/backend/api/secoes_pagina_inicial/historico");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Historico");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/historico.json");
    return data.default;
  }
}