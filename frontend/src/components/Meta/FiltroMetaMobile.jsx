import React, { useEffect, useState } from "react";
import { getFiltroMetasData, postFiltrosSelecionados } from "@/services/Metas/getFiltroMetasData";
import { corrigirUrlImagem } from "@/utils/imageUtils";

export default function FiltroMetaMobile({ onCardsUpdate }) {
  const [data, setData] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
    ods: [],
    regioes: [],
    subprefeituras: [],
    planos_vinculados: [],
    orgaos: [],
    eixos: [],
    subeixos: [],
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
    postFiltrosSelecionados(estadoInicial)
      .then((res) => {
        onCardsUpdate(res);
      })
      .catch(console.error);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Accordion: ODS */}
      <details className="bg-white rounded-lg shadow p-3">
        <summary className="font-bold cursor-pointer">ODS</summary>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.ods.map((odsItem) => {
            const isSelected = filtrosSelecionados.ods.includes(odsItem.id);
            return (
              <button
                key={odsItem.id}
                onClick={() => toggleSelecionado("ods", odsItem.id)}
                className={`flex items-center p-2 rounded-lg transition ${
                  isSelected ? "ring-2 ring-black" : ""
                }`}
                style={{ backgroundColor: odsItem.cor }}
              >
                <img
                  src={corrigirUrlImagem(odsItem.icone)}
                  alt={odsItem.nome}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-white text-xs font-semibold">
                  {odsItem.nome}
                </span>
              </button>
            );
          })}
        </div>
      </details>

      {/* Accordion: Regiões/Subprefeituras */}
      <details className="bg-white rounded-lg shadow p-3">
        <summary className="font-bold cursor-pointer">
          Regiões & Subprefeituras
        </summary>
        <div className="flex flex-col gap-2 mt-2">
          {data.regionalizacao.map((regiao) => (
            <label key={regiao.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filtrosSelecionados.regioes.includes(regiao.id)}
                onChange={() => toggleSelecionado("regioes", regiao.id)}
              />
              <span>{regiao.nome}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Accordion: Órgãos */}
      <details className="bg-white rounded-lg shadow p-3">
        <summary className="font-bold cursor-pointer">Órgãos</summary>
        <div className="flex flex-col gap-2 mt-2 max-h-40 overflow-y-auto">
          {data.orgaos.map((org) => (
            <label key={org.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filtrosSelecionados.orgaos.includes(org.id)}
                onChange={() => toggleSelecionado("orgaos", org.id)}
              />
              <span>{org.nome}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Accordion: Planos Vinculados */}
      <details className="bg-white rounded-lg shadow p-3">
        <summary className="font-bold cursor-pointer">Planos Vinculados</summary>
        <div className="flex flex-col gap-2 mt-2 max-h-40 overflow-y-auto">
          {data.planos_setoriais.map((plano) => (
            <label key={plano.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filtrosSelecionados.planos_vinculados.includes(plano.id)}
                onChange={() => toggleSelecionado("planos_vinculados", plano.id)}
              />
              <span>{plano.nome}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Accordion: Eixos */}
      <details className="bg-white rounded-lg shadow p-3">
        <summary className="font-bold cursor-pointer">Eixos</summary>
        <div className="flex flex-col gap-2 mt-2">
          {data.eixos.map((eixo) => (
            <div key={eixo.id} className="border-b pb-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filtrosSelecionados.eixos.includes(eixo.id)}
                  onChange={() => toggleSelecionado("eixos", eixo.id)}
                />
                <span style={{ color: eixo.cor }}>{eixo.nome}</span>
              </label>
              <div className="ml-6 flex flex-col gap-1">
                {eixo.temas.map((sub) => (
                  <label key={sub.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filtrosSelecionados.subeixos.includes(sub.id)}
                      onChange={() => toggleSelecionado("subeixos", sub.id)}
                    />
                    <span>{sub.nome}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>

      {/* Botão limpar */}
      <button
        onClick={limparFiltros}
        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-lg"
      >
        Limpar filtros
      </button>
    </div>
  );
}