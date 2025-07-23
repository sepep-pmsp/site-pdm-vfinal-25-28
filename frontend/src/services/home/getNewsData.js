const USE_API = false;

export async function getNewsData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/about");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do News");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/news.json");
    return data.default;
  }
}