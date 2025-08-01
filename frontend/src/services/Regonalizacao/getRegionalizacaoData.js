const USE_API = false;

export async function getRegionalizacaoData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/Regionalizacao");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Regionalizacao");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/regionalizacao.json");
    return data.default;
  }
}