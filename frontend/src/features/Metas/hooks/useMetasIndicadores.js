import { useMemo } from "react";

export function useEixosMetas({ metas = [], indicadoresBackend = null, usarBackend = true,}) {
  return useMemo(() => {

    // 🔹 DADOS MOCKADOS (quando API ainda não estiver pronta)
    if (!usarBackend) {
      return [
        {
          id: "atingidas",
          valor: 12,
          label: "Metas atingidas",
        },
        {
          id: "mais50",
          valor: 126,
          label: "Metas com mais de 50% de execução",
        },
        {
          id: "andamento",
          valor: "82%",
          label: "Em andamento e/ou atingidas",
        },
        {
          id: "execucaoTotal",
          valor: "26%",
          label: "Execução total do PDM",
        },
      ];
    }

    // 🔹 Se for usar backend mas ainda não tiver metas
    if (!metas.length) return [];

    const totalMetas = metas.length;

    const metasAtingidas = metas.filter(
      (m) => m.monitoramento === "atingida"
    ).length;

    const metasAndamentoOuAtingidas = metas.filter(
      (m) =>
        m.monitoramento === "progresso" ||
        m.monitoramento === "atingida"
    ).length;

    const percentualAndamento =
      totalMetas > 0
        ? Math.round((metasAndamentoOuAtingidas / totalMetas) * 100)
        : 0;

    return [
      {
        id: "atingidas",
        valor: metasAtingidas,
        label: "Metas atingidas",
      },
      {
        id: "mais50",
        valor: indicadoresBackend?.metas_50_execucao ?? 0,
        label: "Metas com mais de 50% de execução",
      },
      {
        id: "andamento",
        valor: `${percentualAndamento}%`,
        label: "Em andamento e/ou atingidas",
      },
      {
        id: "execucaoTotal",
        valor: `${indicadoresBackend?.percentual_execucao_total ?? 0}%`,
        label: "Execução total do PDM",
      },
    ];
  }, [metas, indicadoresBackend, usarBackend]);
}