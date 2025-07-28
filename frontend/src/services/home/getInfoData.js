const USE_API = false;

export async function getInfoData() {
  if (USE_API) {
    const response = await fetch("https://sua-api.com/api/home/info");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados do Info");
    }
    return await response.json();
  } else {
    const data = await import("@/mock/json/info.json");
    return data.default;
  }
}