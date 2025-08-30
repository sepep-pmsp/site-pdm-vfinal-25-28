// src/components/FiltroParticipacao/FiltroParticipacao.jsx
import { useState } from "react";

export default function FiltroParticipacao({ filtros, onFiltrar }) {
  const [search, setSearch] = useState("");
  const [canal, setCanal] = useState("");
  const [orgao, setOrgao] = useState("");
  const [subprefeitura, setSubprefeitura] = useState("");
  const [tema, setTema] = useState("");

  const [openOrgao, setOpenOrgao] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [openTema, setOpenTema] = useState(false);

  const {
    canais = [],
    orgaos = [],
    subprefeituras = [],
    tema: temas = []
  } = filtros ?? {};

  const aplicar = () => {
    onFiltrar({ search, canal, orgao, subprefeitura, tema });
  };

  const limpar = () => {
    setSearch("");
    setCanal("");
    setOrgao("");
    setSubprefeitura("");
    setTema("");
  };

  const algumFiltroAtivo =
    search.trim() !== "" || canal || orgao || subprefeitura || tema;

  const toggleSelecionado = (tipo, valor) => {
    const setState =
      tipo === "orgao"
        ? setOrgao
        : tipo === "subprefeitura"
        ? setSubprefeitura
        : setTema;

    const state =
      tipo === "orgao"
        ? orgao
        : tipo === "subprefeitura"
        ? subprefeitura
        : tema;

    if (state.includes(valor)) {
      setState(state.filter((item) => item !== valor));
    } else {
      setState([...state, valor]);
    }
  };

  const renderDropdownFiltro = (
    tipo,
    label,
    lista,
    open,
    setOpen,
    selecionados
  ) => (
    <div className="w-65 relative">
      {/* botão dropdown */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-xl px-3 py-2 flex justify-between items-center font-semibold cursor-pointer"
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

      {/* opções dentro do dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg p-2 space-y-1 max-h-50 overflow-y-auto">
          {lista.length === 0 ? (
            <div className="text-sm text-gray-500 p-2">
              Nenhum item disponível
            </div>
          ) : (
            lista.map((option) => (
              <label
                key={option}
                className="flex flex-row-reverse items-center justify-between py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded input-centro-option"
                  checked={selecionados.includes(option)}
                  onChange={() => toggleSelecionado(tipo, option)}
                />
                <span className="custom-checkbox--selected"></span>
                <div className="w-40 text-sm">
                  <span className="capitalize font-bold">{option}</span>
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

      {/* opções selecionadas aparecendo embaixo */}
      {selecionados.length > 0 && (
        <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
          {selecionados.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
  return (
    <div className="w-[90rem] h-[36rem] z-10 relative left-[17rem] bottom-[10rem] bg-white p-8 rounded-4xl shadow-md">
      <div className="flex flex-row flex-nowrap items-center justify-between mb-8 px-8 py-4">
        <img src={filtros.imagem_filtro} alt="" />
        <div className="flex flex-row-reverse justify-around w-[30rem] items-center relative">
          <button
            onClick={aplicar}
            className="h-20 w-50 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-8 rounded-2xl roboto-black uppercase text-2xl hover:-translate-y-2.5"
          >
            pesquisar
          </button>
          {algumFiltroAtivo && (
            <button onClick={limpar} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 cursor-pointer">
              Limpar
            </button>
          )}
        </div>
      </div>
      <div className="flex items-start justify-center flex-col flex-nowrap gap-4 mx-4 my-2">
        <p className="roboto-semibold uppercase text-lg">
          digite o que deseja encontrar
        </p>
        <input
          type="text"
          placeholder="Pesquisar por tema, nome do contribuinte, subprefeitura e conteúdo."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-2 mb-4 h-16 roboto-semibold italic text-center text-lg"
        />
      </div>

      <div className="flex flex-row justify-evenly items-start md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Canal de participação (fixo com checkbox) */}
        <div>
          <div
            className="rounded-xl mb-2"
            style={{ border: "1px solid", padding: ".5rem .5rem" }}
          >
            <p className="font-bold uppercase">canal de participação</p>
          </div>
          {canais.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="canal"
                value={c}
                checked={canal.includes(c)}
                onChange={() =>
                  setCanal((prev) =>
                    prev.includes(c)
                      ? prev.filter((x) => x !== c)
                      : [...prev, c]
                  )
                }
                className="hidden"
              />
              <div>
                <div className="flex flex-row-reverse gap-2 justify-between items-center w-50">
                  <span
                    className={`custom-checkbox ${
                      canal.includes(c) ? "custom-checkbox--selected" : ""
                    }`}
                  ></span>
                  <span className="capitalize roboto-regular">{c}</span>
                </div>
                <div
                  style={{
                    backgroundColor: "black",
                    height: "1px",
                    marginTop: "5px"
                  }}
                ></div>
              </div>
            </label>
          ))}
        </div>
        {renderDropdownFiltro(
          "orgao",
          "Órgão",
          orgaos,
          openOrgao,
          setOpenOrgao,
          orgao
        )}
        {renderDropdownFiltro(
          "subprefeitura",
          "Subprefeitura",
          subprefeituras,
          openSub,
          setOpenSub,
          subprefeitura
        )}
        {renderDropdownFiltro(
          "tema",
          "Tema",
          temas,
          openTema,
          setOpenTema,
          tema
        )}
      </div>
    </div>
  );
}
