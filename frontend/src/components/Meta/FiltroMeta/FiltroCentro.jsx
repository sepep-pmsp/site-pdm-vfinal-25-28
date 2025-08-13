import React, { useEffect, useState } from "react";
import { getFiltroMetasData } from "@/services/Metas/getFiltroMetasData";

export default function FiltroCentro() {
  const [data, setData] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
    regioes: [],
    subprefeituras: [],
    planos_vinculados: [],
    orgaos: []
  });

  const [openSub, setOpenSub] = useState(false);
  const [openOrgao, setOpenOrgao] = useState(false);
  const [openPlanos, setOpenPlanos] = useState(false);

  useEffect(() => {
    getFiltroMetasData().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Carregando filtros...</p>;

  const subprefeituras = filtrosSelecionados.regioes.length
    ? data.filtros.regioes
        .filter((regiao) => filtrosSelecionados.regioes.includes(regiao.nome))
        .flatMap((r) => r.subprefeituras)
    : data.filtros.regioes.flatMap((r) => r.subprefeituras);

  const toggleSelecionado = (tipo, valor) => {
    setFiltrosSelecionados((prev) => {
      const jaSelecionado = prev[tipo].includes(valor);
      return {
        ...prev,
        [tipo]: jaSelecionado
          ? prev[tipo].filter((item) => item !== valor)
          : [...prev[tipo], valor]
      };
    });
  };

  const selecionarTudo = (tipo, lista) => {
    setFiltrosSelecionados((prev) => {
      const allSelected = lista.every((item) => prev[tipo].includes(item));
      return {
        ...prev,
        [tipo]: allSelected ? [] : [...lista]
      };
    });
  };
  const limparFiltros = () => {
    setFiltrosSelecionados({
      regioes: [],
      subprefeituras: [],
      planos_vinculados: [],
      orgaos: []
    });
    // setSelecionados([]);
  };

  const renderDropdownFiltro = (
    tipo,
    label,
    lista,
    open,
    setOpen,
    dropdownClass = "",
    selecionadosClass = ""
  ) => (
    <div className="w-72 relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-md px-3 py-2 flex justify-between items-center font-semibold"
      >
        <b>{label.toUpperCase()}</b>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10 p-2 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows ${dropdownClass}`}
        >
          <button
            className="w-full border rounded-md px-2 py-1 text-sm font-semibold mb-2"
            onClick={() => selecionarTudo(tipo, lista)}
          >
            SELECIONAR TUDO
          </button>

          {lista.length === 0 ? (
            <div className="text-sm text-gray-500 p-2">
              Nenhum item disponível
            </div>
          ) : (
            lista.map((option) => (
              <label
                key={option}
                className="flex items-center justify-between border-b last:border-0 py-1 cursor-pointer"
              >
                <span>{option}</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded bg-indigo-900 checked:bg-indigo-900 checked:border-indigo-900"
                  checked={filtrosSelecionados[tipo].includes(option)}
                  onChange={() => toggleSelecionado(tipo, option)}
                />
              </label>
            ))
          )}
        </div>
      )}

      {filtrosSelecionados[tipo].length > 0 && (
        <div
          className={`mt-2 space-y-1 max-h-70 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows ${selecionadosClass}`}
        >
          {filtrosSelecionados[tipo].map((item) => (
            <label
              key={item}
              className="flex items-center justify-between border-b pb-1 "
            >
              <span>{item}</span>
              <input
                type="checkbox"
                className="form-checkbox  h-4 w-4 rounded bg-indigo-900 checked:bg-indigo-900 checked:border-indigo-900"
                checked
                onChange={() => toggleSelecionado(tipo, item)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-[80rem] relative bottom-12">
      <div className="bg-white w-[32rem] h-full rounded-[2rem] shadow-[0px_0px_11px_#00000085] p-8">
        <span>
          <p className="text-xl pb-8">
            Nas abas a direita filtre por <b>Eixos do Programa</b> e na esquerda
            de acordo com as <b>17 ODS</b>.
          </p>
          <div className="w-[28rem] h-px bg-black" />
        </span>

        {/* Zonas */}
        <div>
          <p className="text-xl p-2 font-bold">
            Filtre a região e suas subprefeituras correspondentes
          </p>
          <div className="flex items-start justify-center flex-row flex-nowrap gap-4">
            <div>
              {data.filtros.regioes.map(({ nome }) => {
                const zonaTemNome = nome.includes("Zona");
                const nomeCurto = zonaTemNome
                  ? nome.replace("Zona ", "")
                  : null;

                return (
                  <div className="w-40" key={nome}>
                    <div className="customCheckBoxHolder">
                      <input
                        className="customCheckBoxInput"
                        id={`cCB1-${nome}`}
                        type="checkbox"
                        checked={filtrosSelecionados.regioes.includes(nome)}
                        onChange={() => toggleSelecionado("regioes", nome)}
                      />
                      <label
                        className="customCheckBoxWrapper"
                        htmlFor={`cCB1-${nome}`}
                      >
                        <div className="customCheckBox">
                          <div
                            className={`inner border rounded text-xs transition-colors duration-200 ${
                              filtrosSelecionados.regioes.includes(nome)}`}>
                            {zonaTemNome ? (
                              <>
                                Zona
                                <br />
                                <b>{nomeCurto}</b>
                              </>
                            ) : (
                              nome.toUpperCase()
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dropdown Subprefeitura */}
            {renderDropdownFiltro(
              "subprefeituras",
              "Subprefeitura",
              subprefeituras,
              openSub,
              setOpenSub
            )}
          </div>

          <div className="w-[28rem] h-px bg-black mt-6" />
        </div>

        {/* Dropdown Órgãos */}
        <div className="mt-6">
          <div className="flex flex-col items-start justify-start flex-nowrap gap-8 h-70">
            <p className="text-xl p-2 font-bold">Filtre por órgão responsável</p>
            <div className="flex items-center justify-center w-[25rem]">
              {renderDropdownFiltro(
                "orgaos",
                "Órgão",
                data.filtros.orgaos,
                openOrgao,
                setOpenOrgao,
                "h-45 w-30",
                "h-45"
              )}
            </div>
          </div>
          <div className="w-[28rem] h-px bg-black mt-6" />
        </div>

        {/* Dropdown Planos Vinculados */}
        <div className="mt-6">
          <div className="flex flex-col items-start justify-start flex-nowrap gap-8 h-55">
            <p className="text-xl p-2 font-bold">Filtre de acordo com articulações com outros planos</p>
            <div className="flex items-center justify-center w-[25rem]">
              {renderDropdownFiltro(
                "planos_vinculados",
                "Planos Vinculados",
                data.filtros.planos_vinculados,
                openPlanos,
                setOpenPlanos,
                "max-h-45 w-80",
                "h-30"
              )}
            </div>
          </div>
          <div className="w-[28rem] h-px bg-black mt-6" />
        </div>

        <div className="flex items-center justify-center flex-col flex-nowrap mt-4">
          <button
            onClick={limparFiltros}
            className="mt-4 w-40 text-center font-bold border-2 rounded-md px-3 py-2 flex justify-center items-center"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
