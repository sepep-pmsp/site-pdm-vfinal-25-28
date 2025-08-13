const USE_API = false;

export async function getFiltroMetasData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/FiltroMetas");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Filtro Metas");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/filtroEixos.json");
    return data.default;
  }
}