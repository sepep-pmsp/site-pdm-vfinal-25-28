import { useState, useEffect } from "react";
import { getConhecaMetasData } from "../services/getOrcamentoData"; 

export function useEixosMetas({ usarBackend = true } = {}) {
    const [indicadores, setIndicadores] = useState([]);

    useEffect(() => {
        if (!usarBackend) {
            setIndicadores([
                { id: "atingidas", valor: 12, label: "Metas atingidas" },
                { id: "mais50", valor: 126, label: "Metas com mais de 50% de execução" },
                { id: "andamento", valor: "82%", label: "Em andamento e/ou atingidas" },
                { id: "execucaoTotal", valor: "26%", label: "Execução total do PDM" },
            ]);
            return;
        }
        async function fetchDadosDaApi() {
            try {
                const data = await getConhecaMetasData();
                if (data && Array.isArray(data.list_conheca_metas)) {
                    const listaOrdenada = [...data.list_conheca_metas].sort(
                        (a, b) => a.ordem - b.ordem
                    );
                    const indicadoresFormatados = listaOrdenada.map((item, index) => ({
                        id: `ind-${index}`,
                        valor: item.valor,
                        label: item.nome
                    }));

                    setIndicadores(indicadoresFormatados);
                }
            } catch (error) {
                console.error("Erro ao carregar os dados das metas:", error);
            }
        }
        fetchDadosDaApi();
    }, [usarBackend]);

    return indicadores;
}