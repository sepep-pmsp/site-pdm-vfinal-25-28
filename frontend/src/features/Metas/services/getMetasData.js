import { API_BASE_URL } from "@/services/api/config";
/**
 * GET padrão (lista inicial)
 * Simula um GET inicial através de uma chamada POST com corpo vazio.
 */
export async function getMetasIniciais() {
  const filtrosVazios = {
    ods: [],
    planos_setoriais: [],
    orgaos: [],
    eixos: [],
    temas: [],
    subprefeituras: [],
    zonas: [],
    termo_busca: ""
  };
  const response = await fetch(`${API_BASE_URL}/filtro_metas/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filtrosVazios)
  });
  
  if (!response.ok) throw new Error("Erro ao buscar metas");
  return await response.json();
}