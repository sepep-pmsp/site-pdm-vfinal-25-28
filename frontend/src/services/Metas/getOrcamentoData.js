const USE_API = false;

export async function getOrcamentoData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/getOrcamentoData");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do getOrcamentoData");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/orcamento_eixo.json");
    return data.default;
  }
}