const USE_API = false;

export async function getSobreData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/Sobre");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Sobre");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/sobre.json");
    return data.default;
  }
}