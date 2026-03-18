import { useState, useEffect } from "react";
// Importe a função que consome a nova API (ajuste o caminho de acordo com seu projeto)
import { getConhecaMetasData } from "../services/getOrcamentoData"; 

export function useEixosMetas({ usarBackend = true } = {}) {
  // Estado que vai guardar os nossos cards formatados
  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    // 🔹 DADOS MOCKADOS (quando a API estiver desligada)
    if (!usarBackend) {
      setIndicadores([
        { id: "atingidas", valor: 12, label: "Metas atingidas" },
        { id: "mais50", valor: 126, label: "Metas com mais de 50% de execução" },
        { id: "andamento", valor: "82%", label: "Em andamento e/ou atingidas" },
        { id: "execucaoTotal", valor: "26%", label: "Execução total do PDM" },
      ]);
      return; // Para a execução do useEffect aqui
    }

    // 🔹 DADOS REAIS DA API
    async function fetchDadosDaApi() {
      try {
        const data = await getConhecaMetasData();
        
        // Montamos o array exatamente como o seu JSX espera,
        // usando as chaves que vêm direto do backend!
        setIndicadores([
          {
            id: "atingidas",
            valor: data.metas_atingidas ?? 0,
            label: "Metas atingidas",
          },
          {
            id: "mais50",
            valor: data.metas_mais_50 ?? 0,
            label: "Metas com mais de 50% de execução",
          },
          {
            id: "andamento",
            valor: `${data.metas_andamento_atingida ?? 0}%`, // Adicionamos o %
            label: "Em andamento e/ou atingidas",
          },
          {
            id: "execucaoTotal",
            valor: `${data.execucao_total ?? 0}%`, // Adicionamos o %
            label: "Execução total do PDM",
          },
        ]);
      } catch (error) {
        console.error("Erro ao carregar os dados das metas:", error);
      }
    }

    fetchDadosDaApi();
  }, [usarBackend]);

  return indicadores;
}