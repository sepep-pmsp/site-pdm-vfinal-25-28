const USE_API = false;

export async function getEixosData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/eixos");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Eixos");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/eixos.json");
    return data.default;
  }
}