const USE_API = false;

export async function getAboutData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/about");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do About");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/about.json");
    return data.default;
  }
}