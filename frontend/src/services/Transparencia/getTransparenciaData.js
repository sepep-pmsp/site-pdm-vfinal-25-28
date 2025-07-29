const USE_API = false;

export async function getTransparenciaData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/about");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Transparencia");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/transparencia.json");
    return data.default;
  }
}