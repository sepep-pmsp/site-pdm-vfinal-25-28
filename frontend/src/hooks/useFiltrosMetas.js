import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { getFiltroMetasData, postFiltrosSelecionados } from "@/services/Metas/getFiltroMetasData";

export function useFiltrosMetas(onCardsUpdate) {
  const [data, setData] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState(() => {
    const salvo = localStorage.getItem("filtrosSelecionados");
    return salvo
      ? JSON.parse(salvo)
      : {
          ods: [],
          zonas: [],
          subprefeituras: [],
          planos_vinculados: [],
          orgaos: [],
          eixos: [],
          subeixos: [],
          termo_busca: "",
        };
  });

  const [filtrosDebounced] = useDebounce(filtrosSelecionados, 400);
  const ultimoPayload = useRef(null);

  // GET inicial (com cache localStorage)
  useEffect(() => {
    const cache = localStorage.getItem("filtroMetaData");
    if (cache) {
      setData(JSON.parse(cache));
    } else {
      getFiltroMetasData()
        .then((res) => {
          setData(res);
          localStorage.setItem("filtroMetaData", JSON.stringify(res));
        })
        .catch(console.error);
    }
  }, []);

  // POST só quando filtros mudam e dados já carregaram
  useEffect(() => {
    if (!data) return;
    const payload = JSON.stringify(filtrosDebounced);
    if (payload === ultimoPayload.current) return;

    ultimoPayload.current = payload;
    localStorage.setItem("filtrosSelecionados", payload);

    postFiltrosSelecionados(filtrosDebounced, data.regionalizacao)
      .then((res) => onCardsUpdate?.(res))
      .catch(console.error);
  }, [filtrosDebounced, data, onCardsUpdate]);
  // ---- helpers ----
  function toggleSelecionado(tipo, valor) {
    const key = tipo === "regioes" ? "zonas" : tipo;
    setFiltrosSelecionados((prev) => {
      const arr = prev[key] || [];
      const jaSelecionado = arr.includes(valor);

      return {
        ...prev,
        [key]: jaSelecionado ? arr.filter((v) => v !== valor) : [...arr, valor],
      };
    });
  }
  function limparFiltros() {
    const estadoInicial = {
      ods: [],
      zonas: [],
      subprefeituras: [],
      planos_vinculados: [],
      orgaos: [],
      eixos: [],
      subeixos: [],
      termo_busca: "",
    };
    setFiltrosSelecionados(estadoInicial);
    localStorage.removeItem("filtrosSelecionados");
    ultimoPayload.current = JSON.stringify(estadoInicial);
    if (data) {
      postFiltrosSelecionados(estadoInicial, data.regionalizacao)
        .then((res) => onCardsUpdate?.(res))
        .catch(console.error);
    }
  }
  return {
    data,
    filtrosSelecionados,
    toggleSelecionado,
    limparFiltros,
  };
}
