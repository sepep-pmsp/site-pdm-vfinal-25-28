import React, { useEffect, useState } from "react";
import { getFiltroMetasData } from "@/services/Metas/getFiltroMetasData";
import FiltroODS from "./FiltroMeta/FiltroODS";
import FiltroCentro from "./FiltroMeta/FiltroCentro";
import FiltroEixos from "./FiltroMeta/FiltroEixos";

export default function FiltroMeta({ onFilterChange }) {
  const [data, setData] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
    ods: [],
    regioes: [],
    orgaos: [],
    planos: [],
    eixos: []
  });

  useEffect(() => {
    async function fetchData() {
      const filtroData = await getFiltroMetasData();
      setData(filtroData);
    }
    fetchData();
  }, []);

  if (!data) return <p>Carregando filtros...</p>;

  function toggleSelecionado(categoria, valor) {
    setFiltrosSelecionados((prev) => {
      const atual = prev[categoria];
      const novoArray = atual.includes(valor)
        ? atual.filter((v) => v !== valor)
        : [...atual, valor];
      const novoEstado = { ...prev, [categoria]: novoArray };
      onFilterChange && onFilterChange(novoEstado);
      return novoEstado;
    });
  }

  function setFiltroSimples(categoria, valorArray) {
    setFiltrosSelecionados((prev) => {
      const novoEstado = { ...prev, [categoria]: valorArray };
      onFilterChange && onFilterChange(novoEstado);
      return novoEstado;
    });
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
        setFiltroSimples={setFiltroSimples}
      />


      {/* Coluna direita - Eixos */}
      <FiltroEixos
        eixos={data.eixos}
        filtrosSelecionados={filtrosSelecionados}
        toggleSelecionado={toggleSelecionado}
      />
    </div>
  );
}
