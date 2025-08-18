import React, { useState } from "react";

export default function FiltroCentro({
  filtrosSelecionados,
  regioes,
  orgaos,
  planosVinculados,
  toggleSelecionado,
  onLimparFiltros
}) {
  const [openSub, setOpenSub] = useState(false);
  const [openOrgao, setOpenOrgao] = useState(false);
  const [openPlanos, setOpenPlanos] = useState(false);

  const subprefeituras = filtrosSelecionados.regioes.length
    ? regioes
        .filter((regiao) => filtrosSelecionados.regioes.includes(regiao.nome))
        .flatMap((r) => r.subprefeituras)
    : regioes.flatMap((r) => r.subprefeituras);

  const selecionarTudo = (tipo, lista) => {
    const allSelected = lista.every((item) =>
      filtrosSelecionados[tipo].includes(item)
    );
    lista.forEach((item) => {
      const jaSelecionado = filtrosSelecionados[tipo].includes(item);
      if (allSelected && jaSelecionado) {
        toggleSelecionado(tipo, item);
      } else if (!allSelected && !jaSelecionado) {
        toggleSelecionado(tipo, item);
      }
    });
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
        className="w-full border rounded-md px-3 py-2 flex justify-between items-center font-semibold cursor-pointer"
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
          className={`absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10 p-2 space-y-1 max-h-60 overflow-y-auto ${dropdownClass}`}
        >
          <button
            className="w-full border rounded-md px-2 py-1 text-sm font-semibold mb-2"
            onClick={() => selecionarTudo(tipo, lista)}
          >
            SELECIONAR TUDO
          </button>

          {lista.length === 0 ? (
            <div className="text-sm text-white p-2">Nenhum item disponível</div>
          ) : (
            lista.map((option) => (
              <label
                key={option}
                className="flex flex-row-reverse items-center justify-between py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded input-centro-option"
                  checked={filtrosSelecionados[tipo].includes(option)}
                  onChange={() => toggleSelecionado(tipo, option)}
                />
                <span className="custom-checkbox--selected"></span>
                <div className="w-40 text-sm">
                  <span className="capitalize font-bold">{option}</span>
                  <div style={{ backgroundColor: "black", height: "1px", width: "15rem", marginTop:"5px" }}></div>
                </div>
              </label>
            ))
          )}
        </div>
      )}

      {filtrosSelecionados[tipo].length > 0 && (
        <div
          className={`mt-2 space-y-1 max-h-70 overflow-y-auto ${selecionadosClass}`}
        >
          {filtrosSelecionados[tipo].map((item) => (
            <label
              key={item}
              className="flex flex-row-reverse flex-nowrap items-center justify-between w-[90%] border-b pb-1"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded input-centro"
                checked
                onChange={() => toggleSelecionado(tipo, item)}
              />
              <span className="custom-checkbox"></span>
              <div className="w-40 text-sm">
                <span className="capitalize">{item}</span>
                <div style={{ backgroundColor: "black", height: "1px", width: "15rem", marginTop:"5px" }}></div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-[85rem] relative bottom-20">
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
          <div className="flex items-start justify-center gap-4">
            <div>
              {regioes.map(({ nome }) => {
                const zonaTemNome = nome.includes("zona");
                const nomeCurto = zonaTemNome
                  ? nome.replace("zona ", "")
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
                            className={`inner border rounded text-xs transition-colors duration-200 capitalize ${filtrosSelecionados.regioes.includes(
                              nome
                            )}`}
                          >
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
        <div className="mt-3">
          <div className="flex flex-col gap-4 h-75">
            <p className="text-xl p-2 font-bold">
              Filtre por órgão responsável
            </p>
            <div className="flex items-center justify-center w-[25rem]">
              {renderDropdownFiltro(
                "orgaos",
                "Órgão",
                orgaos,
                openOrgao,
                setOpenOrgao,
                "h-50 w-40",
                "h-45"
              )}
            </div>
          </div>
          <div className="w-[28rem] h-px bg-black mt-6" />
        </div>

        {/* Dropdown Planos Vinculados */}
        <div className="mt-3">
          <div className="flex flex-col gap-8 h-80">
            <p className="text-xl p-2 font-bold">
              Filtre de acordo com articulações com outros planos
            </p>
            <div className="flex items-center justify-center w-[25rem]">
              {renderDropdownFiltro(
                "planos_vinculados",
                "Planos Vinculados",
                planosVinculados,
                openPlanos,
                setOpenPlanos,
                "h-48 w-80 ",
                "h-40"
              )}
            </div>
          </div>
          <div className="w-[28rem] h-px bg-black mt-6" />
        </div>

        {/* Botão limpar */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={onLimparFiltros}
            className="mt-4 w-40 text-center font-bold border-2 rounded-md px-3 py-2 cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
