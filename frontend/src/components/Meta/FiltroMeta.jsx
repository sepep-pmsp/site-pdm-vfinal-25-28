import React, { useEffect, useState } from "react";
import {
  getFiltroMetasData,
  postFiltrosSelecionados
} from "@/services/Metas/getFiltroMetasData";
import FiltroODS from "./FiltroMeta/FiltroODS";
import FiltroCentro from "./FiltroMeta/FiltroCentro";
import FiltroEixos from "./FiltroMeta/FiltroEixos";
import { useMediaQuery } from "react-responsive";
import FiltroMetaMobile from "./FiltroMetaMobile";

export default function FiltroMeta({ onCardsUpdate }) {
  const [data, setData] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
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
    postFiltrosSelecionados(estadoInicial)
      .then((res) => {
        onCardsUpdate(res);
      })
      .catch(console.error);
  }

  return (
    <div className="flex items-start">
      {isMobile ? (
        <FiltroMetaMobile onCardsUpdate={onCardsUpdate} />
      ) : (
        <div className="flex flex-row">
          {/* Coluna esquerda - ODS */}
          <FiltroODS
            ods={data.ods}
            filtrosSelecionados={filtrosSelecionados}
            toggleSelecionado={toggleSelecionado}
          />

          {/* Painel central */}
          <FiltroCentro
            filtrosSelecionados={filtrosSelecionados}
            regioes={data.regionalizacao}
            orgaos={data.orgaos}
            planosVinculados={data.planos_setoriais}
            toggleSelecionado={toggleSelecionado}
            onLimparFiltros={limparFiltros}
          />

          {/* Coluna direita - Eixos */}
          <FiltroEixos
            eixos={data.eixos}
            filtrosSelecionados={filtrosSelecionados}
            toggleSelecionado={toggleSelecionado}
          />
        </div>
      )}
    </div>
  );
}