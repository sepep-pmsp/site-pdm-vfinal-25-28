import React, { useEffect, useState } from "react";
import { getFiltroMetasData, postFiltrosSelecionados } from "@/services/Metas/getFiltroMetasData";
import FiltroODS from "./FiltroMeta/FiltroODS";
import FiltroCentro from "./FiltroMeta/FiltroCentro";
import FiltroEixos from "./FiltroMeta/FiltroEixos";
import { getMetasData } from "@/services/Metas/getMetasData";

export default function FiltroMeta({ onCardsUpdate }) {
  const [data, setData] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
    ods: [],
    regioes: [],
    subprefeituras: [],
    planos_vinculados: [],
    orgaos: [],
    eixos: [],
    subeixos: []
  });

  useEffect(() => {
    getFiltroMetasData().then(setData).catch(console.error);
  }, []);

  useEffect(() => {
    if (data) {
      postFiltrosSelecionados(filtrosSelecionados)
        .then((res) => {
          onCardsUpdate(res);
        })
        .catch(console.error);
    }
  }, [filtrosSelecionados, data, onCardsUpdate]);

  if (!data) return <p>Carregando filtros...</p>;

  // Alterna seleção de filtros (genérico para todos os componentes)
  function toggleSelecionado(tipo, valor) {
    setFiltrosSelecionados((prev) => {
      const jaSelecionado = prev[tipo]?.includes(valor);
      return {
        ...prev,
        [tipo]: jaSelecionado
          ? prev[tipo].filter((v) => v !== valor)
          : [...prev[tipo], valor]
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
      subeixos: []
    };
    setFiltrosSelecionados(estadoInicial);
    getMetasData().then(onCardsUpdate).catch(console.error);
  }

  return (
    <div className="flex items-start">
      {/* Coluna esquerda - ODS */}
      <FiltroODS
        ods={data.ods}
        filtrosSelecionados={filtrosSelecionados}
        toggleSelecionado={toggleSelecionado}
      />

      {/* Painel central */}
      <FiltroCentro
        filtrosSelecionados={filtrosSelecionados}
        regioes={data.filtros.regioes}
        orgaos={data.filtros.orgaos}
        planosVinculados={data.filtros.planos_vinculados}
        toggleSelecionado={toggleSelecionado}
        onLimparFiltros={limparFiltros}
      />

      {/* Coluna direita - Eixos */}
      <FiltroEixos
        eixos={data.eixos}
        filtrosSelecionados={filtrosSelecionados}
        toggleSelecionado={toggleSelecionado}
        onLimparFiltros={limparFiltros}
      />
    </div>
  );
}
