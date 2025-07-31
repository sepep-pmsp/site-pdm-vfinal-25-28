const USE_API = false;

export async function getHistoricoData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/historico");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Historico");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/historico.json");
    return data.default;
  }
}