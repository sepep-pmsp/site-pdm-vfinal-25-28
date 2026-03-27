export const normalizarOrgaos = (lista) => {
  const REMOVIDOS = new Set([
    "Casa Civil",
    "Secretaria Especial de Comunicação",
    "Secretaria Executiva de Limpeza Urbana",
    "Secretaria Executiva do Programa Mananciais",
    "Secretaria Especial de Relações Institucionais",
    "Secretaria Executiva de Segurança Alimentar e Nutricional",
    "Secretaria Executiva de Informações e Monitoramento Estratégico",
    "Secretaria Municipal de Justiça"
  ]);

  return (lista || [])
    .filter((item) => !REMOVIDOS.has(item.nome))
    .map((item) => ({
      ...item,
      nome: item?.sigla
        ? `${item.sigla} - ${item.nome}`
        : item.nome
    }));
};