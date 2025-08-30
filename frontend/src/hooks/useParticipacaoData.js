// src/hooks/useParticipacaoData.js
import { useEffect, useMemo, useState } from "react";
import { getParticipacaoData } from "@/services/Participacao/getParticipacaoData";

// util: compara ignorando acentos/caixa
const norm = (s) =>
  (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const getCanalTipo = (canalStr) => {
  const c = norm(canalStr);
  // qualquer coisa com "online" conta como Online; o resto vira Presencial
  return c.includes("online") ? "Online" : "Presencial";
};

export function useParticipacaoData() {
  const [data, setData] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // carrega (API ou JSON) via service já existente
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await getParticipacaoData();
        if (!mounted) return;
        setData(resp);
        // resp é um array com 1 item no seu JSON
        const base = Array.isArray(resp) ? resp[0]?.results ?? [] : resp?.results ?? [];
        setResultados(base);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const baseResults = useMemo(
    () => (Array.isArray(data) ? data[0]?.results ?? [] : data?.results ?? []),
    [data]
  );

  function aplicarFiltros({ search = "", canal = "", orgao = "", subprefeitura = "", tema = "" }) {
    let filtered = baseResults;

    // Canal (Online/Presencial mapeado a partir do texto do item)
    if (canal) {
      filtered = filtered.filter((r) => getCanalTipo(r.canal) === canal);
    }

    // Órgão (vem dentro de detalhe.respostas[].orgao)
    if (orgao) {
      const alvo = norm(orgao);
      filtered = filtered.filter((r) =>
        (r.detalhe?.respostas ?? []).some((resp) => norm(resp.orgao) === alvo)
      );
    }

    // Subprefeitura (array em r.subprefeituras)
    if (subprefeitura) {
      const alvo = norm(subprefeitura);
      filtered = filtered.filter((r) =>
        (r.subprefeituras ?? []).some((sp) => norm(sp) === alvo)
      );
    }

    // Tema (array em r.temas)
    if (tema) {
      const alvo = norm(tema);
      filtered = filtered.filter((r) =>
        (r.temas ?? []).some((t) => norm(t) === alvo)
      );
    }

    // Busca livre (nome, canal, subprefeituras, temas e campos de detalhe)
    if (search) {
      const q = norm(search);
      filtered = filtered.filter((r) => {
        const campos = [
          r.nome,
          r.canal,
          ...(r.subprefeituras ?? []),
          ...(r.temas ?? []),
          r.detalhe?.titulo,
          r.detalhe?.resumo,
          r.detalhe?.descricao,
          r.detalhe?.transcricao,
          ...(r.detalhe?.respostas ?? []).map((x) => x.orgao)
        ];
        return campos.some((c) => norm(c).includes(q));
      });
    }

    setResultados(filtered);
  }

  return { data, loading, error, resultados, aplicarFiltros };
}
