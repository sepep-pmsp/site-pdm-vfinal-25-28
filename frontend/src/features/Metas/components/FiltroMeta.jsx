import React from "react";
import FiltroODS from "./FiltroODS";
import FiltroCentro from "./FiltroCentro";
import FiltroEixos from "./FiltroEixos";
import { useMediaQuery } from "react-responsive";
import FiltroMetaMobile from "./FiltroMetaMobile";
import { useFiltrosMetas } from "../hooks/useFiltrosMetas";

export default function FiltroMeta({ onCardsUpdate, eixoIdFromNav }) {
  const isMobile = useMediaQuery({ maxWidth: 1281 });

  const {
    data,
    filtrosSelecionados,
    toggleSelecionado,
    limparFiltros,
  } = useFiltrosMetas(onCardsUpdate, eixoIdFromNav);

  

  if (!data) return <p>Carregando filtros...</p>;

  return (
    <div className="flex items-start">
      {isMobile ? (
        <FiltroMetaMobile
          onCardsUpdate={onCardsUpdate}
          // === dados (iguais ao desktop) ===
          regionalizacao={data.regionalizacao}
          zonas={data.zonas || data.regioes_zona}
          orgaos={data.orgaos}
          planosSetoriais={data.planos_setoriais}
          eixos={data.eixos}
          ods={data.ods}
          eixoIdFromNav={eixoIdFromNav}
          // === estado/ações compartilhados ===
          filtrosSelecionados={filtrosSelecionados}
          toggleSelecionado={toggleSelecionado}
          limparFiltros={limparFiltros}
        />
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
            selecionados={filtrosSelecionados.zonas}
            planosVinculados={data.planos_setoriais}
            toggleSelecionado={toggleSelecionado}
            onLimparFiltros={limparFiltros}
          />

          {/* Coluna direita - Eixos */}
          <FiltroEixos 
            eixos={data.eixos}
            filtrosSelecionados={filtrosSelecionados}
            toggleSelecionado={toggleSelecionado}
            eixoIdFromNav={eixoIdFromNav}
            onLimparFiltros={limparFiltros}
          />
        </div>
      )}
    </div>
  );
}
