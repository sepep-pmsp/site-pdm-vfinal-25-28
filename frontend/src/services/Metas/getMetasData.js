const USE_API = false;

export async function getMetasData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/Metas");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Metas");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/metas_card.json");
    return data.default;
  }
}