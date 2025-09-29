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
  const selecionarTudo = (tipo, lista) => {
    const allSelected = lista.every((item) =>
      filtrosSelecionados[tipo].includes(item.id)
    );
    lista.forEach((item) => {
      const jaSelecionado = filtrosSelecionados[tipo].includes(item.id);
      if (allSelected && jaSelecionado) {
        toggleSelecionado(tipo, item.id);
      } else if (!allSelected && !jaSelecionado) {
        toggleSelecionado(tipo, item.id);
      }
    });
  };
  const subprefeiturasFiltradas = filtrosSelecionados.zonas?.length > 0
    ? regioes
        .filter((r) => filtrosSelecionados.zonas.includes(r.id))
        .flatMap((r) => r.subprefeituras || [])
    : regioes.flatMap((r) => r.subprefeituras || []);

  const renderDropdownFiltro = (
    tipo,
    label,
    lista,
    open,
    setOpen,
    dropdownClass = "",
    selecionadosClass = ""
  ) => (
    <div className="w-80 relative">
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
                key={option.id}
                className="flex flex-row-reverse items-center justify-between py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded input-centro-option"
                  checked={
                    filtrosSelecionados[tipo]?.includes(option.id) ?? false
                  }
                  onChange={() => toggleSelecionado(tipo, option.id)}
                />
                <span className="custom-checkbox--selected"></span>
                <div className="w-40 text-sm">
                  <span className="capitalize font-bold">{option.nome}</span>
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "1px",
                      width: "15rem",
                      marginTop: "5px"
                    }}
                  ></div>
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
          {(filtrosSelecionados[tipo] ?? []).map((itemId) => {
            const itemObj = lista.find((item) => item.id === itemId);
            if (!itemObj) return null;
            return (
              <label
                key={itemObj.id}
                className="flex flex-row-reverse flex-nowrap items-center justify-between w-[90%] border-b pb-1"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded input-centro"
                  checked
                  onChange={() => toggleSelecionado(tipo, itemObj.id)}
                />
                <span className="custom-checkbox"></span>
                <div className="w-40 text-sm">
                  <span className="capitalize">{itemObj.nome}</span>
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "1px",
                      width: "15rem",
                      marginTop: "5px"
                    }}
                  ></div>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-[87rem] relative bottom-20">
      <div className="bg-white max-w-sm h-full rounded-[2rem] shadow-[0px_0px_11px_#00000085] p-8">
        <span>
          <p className="text-xl pb-8">
            Nas abas à direita filtre por eixos e na esquerda de acordo com os <b>17 ODS</b>s.
          </p>
          <div className="w-80 h-px bg-black" />
        </span>
        <div>
          <p className="text-lg p-2 font-bold">
            Selecione a região desejada e as subprefeituras que fazem parte dela.
          </p>
          <div className="flex items-start justify-center gap-4">
            <div className="w-24">
              {regioes.map(({ nome, id}) => {
                const zonaTemNome = nome.includes("zona");
                const nomeCurto = zonaTemNome
                  ? nome.replace("zona ", "")
                  : null;
                return (
                  <div className="w-40" key={id}>
                    <div className="customCheckBoxHolder">
                      <input
                        className="customCheckBoxInput"
                        id={`cCB1-${id}`}
                        type="checkbox"
                        checked={
                          filtrosSelecionados.zonas?.includes(id) ?? false
                        }
                        onChange={() => {toggleSelecionado("zonas", id)}}
                      />
                      <label
                        className="customCheckBoxWrapper"
                        htmlFor={`cCB1-${id}`}
                        onClick={() => toggleSelecionado("zonas", id)}
                      >
                        <div className="customCheckBox">
                          <div
                            className={`inner border rounded text-xs transition-colors duration-200 capitalize ${
                              filtrosSelecionados.zonas?.includes(id)} whitespace-pre-line`}
                          >
                            {zonaTemNome ? (
                              <span
                                className="break-keep"
                                dangerouslySetInnerHTML={{
                                  __html: `Zona<br/><b>${nomeCurto}</b>`
                                }}
                              />
                            ) : (
                              <span
                                className="break-keep"
                                dangerouslySetInnerHTML={{
                                  __html: nome.toUpperCase()
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {renderDropdownFiltro(
              "subprefeituras",
              "Subprefeitura",
              subprefeiturasFiltradas,
              openSub,
              setOpenSub
            )}
          </div>
          <div className="w-80 h-px bg-black mt-6" />
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-4 h-75">
            <p className="text-xl p-2 font-bold">
              Pesquise por órgão responsável!
            </p>
            <div className="flex items-center justify-start w-[25rem]">
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
          <div className="w-80 h-px bg-black mt-6" />
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-8 h-80">
            <p className="text-xl p-2 font-bold">
              Pesquise pela relação com outros planos municipais!
            </p>
            <div className="flex items-center justify-start w-[25rem]">
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
          <div className="w-80 h-px bg-black mt-6" />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={onLimparFiltros}
            className="w-40 text-center font-bold border-2 rounded-md px-3 py-2 cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
}