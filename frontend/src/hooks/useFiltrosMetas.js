// src/hooks/useFiltrosMetas.js
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { getFiltroMetasData, postFiltrosSelecionados, } from "@/services/Metas/getFiltroMetasData";

export function useFiltrosMetas(onCardsUpdate) {
  const [data, setData] = useState(null);

  // estado inicial vindo do localStorage
  const [filtrosSelecionados, setFiltrosSelecionados] = useState(() => {
    const salvo = localStorage.getItem("filtrosSelecionados");
    return salvo
      ? JSON.parse(salvo)
      : {
          ods: [],
          regioes: [],
          subprefeituras: [],
          planos_vinculados: [],
          orgaos: [],
          eixos: [],
          subeixos: [],
        };
  });

  // debounce (400ms)
  const [filtrosDebounced] = useDebounce(filtrosSelecionados, 400);

  // cache para evitar flood
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

  // POST só quando filtros mudam de verdade
  useEffect(() => {
    if (!data) return;

    const payload = JSON.stringify(filtrosDebounced);

    // evita envio duplicado
    if (payload === ultimoPayload.current) return;
    ultimoPayload.current = payload;

    localStorage.setItem("filtrosSelecionados", payload);

    postFiltrosSelecionados(filtrosDebounced)
      .then((res) => {
        onCardsUpdate?.(res);
      })
      .catch(console.error);
  }, [filtrosDebounced, data, onCardsUpdate]);

  // ---- helpers ----
  function toggleSelecionado(tipo, valor) {
    setFiltrosSelecionados((prev) => {
      const jaSelecionado = prev[tipo]?.includes(valor);
      return {
        ...prev,
        [tipo]: jaSelecionado
          ? prev[tipo].filter((v) => v !== valor)
          : [...prev[tipo], valor],
      };
    });
  }

  function limparFiltros() {
    const estadoInicial = {
      ods: [],
      regioes: [],
      subprefeituras: [],
      planos_vinculados: [],
      orgaos: [],
      eixos: [],
      subeixos: [],
    };
    setFiltrosSelecionados(estadoInicial);
    localStorage.removeItem("filtrosSelecionados");

    ultimoPayload.current = JSON.stringify(estadoInicial);

    postFiltrosSelecionados(estadoInicial)
      .then((res) => onCardsUpdate?.(res))
      .catch(console.error);
  }

  return {
    data,
    filtrosSelecionados,
    toggleSelecionado,
    limparFiltros,
  };
}
