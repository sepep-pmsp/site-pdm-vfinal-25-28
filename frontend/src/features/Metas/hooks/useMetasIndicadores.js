import { useMemo } from "react";

const MOCK_INDICADORES = [
  {
    id: "atingidas",
    valor: "12",
    label: "Metas atingidas",
    ordem: 1,
  },
  {
    id: "mais50",
    valor: "126",
    label: "Metas com 50% ou mais de execução",
    ordem: 2,
  },
  {
    id: "andamento",
    valor: "82%",
    label: "112 metas em progresso e/ou atingidas",
    ordem: 3,
  },
  {
    id: "execucaoTotal",
    valor: "26%",
    label: "Execução total do PdM",
    ordem: 4,
  },
];

const normalize = (text) =>
  (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const makeIdFromNome = (nome, ordem) => {
  const base = normalize(nome).replace(/[^a-z0-9]+/g, "-");
  return `${base || "item"}-${ordem ?? "sem-ordem"}`;
};

export function useEixosMetas({
  indicadoresBackend = null,
  usarBackend = true,
}) {
  return useMemo(() => {
    if (!usarBackend) {
      return MOCK_INDICADORES;
    }

    const lista = Array.isArray(indicadoresBackend?.list_conheca_metas)
      ? indicadoresBackend.list_conheca_metas
      : [];

    if (!lista.length) return [];

    return lista
      .filter((item) => normalize(item?.nome) !== "recursos empenhados")
      .sort((a, b) => (a?.ordem ?? 999) - (b?.ordem ?? 999))
      .map((item) => ({
        id: makeIdFromNome(item?.nome, item?.ordem),
        valor: item?.valor ?? "Item não informado",
        label: item?.nome ?? "Item não informado",
        ordem: item?.ordem ?? null,
      }));
  }, [indicadoresBackend, usarBackend]);
}