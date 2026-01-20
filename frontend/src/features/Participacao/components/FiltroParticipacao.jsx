import { useState } from "react";
import ImgFiltro from "@/shared/assets/svg/Logo-pdm-letras-colorido.svg";

export default function FiltroParticipacao({ filtros, onFiltrar }) {
  const [search, setSearch] = useState("");
  const [canaisSelecionados, setCanaisSelecionados] = useState([]);
  const [orgaosSelecionados, setOrgaosSelecionados] = useState([]);
  const [subprefeiturasSelecionadas, setSubprefeiturasSelecionadas] = useState(
    []
  );
  const [temasSelecionados, setTemasSelecionados] = useState([]);

  const [openOrgao, setOpenOrgao] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [openTema, setOpenTema] = useState(false);
  const [openCanal, setOpenCanal] = useState(false);

  const {
    canais = [],
    orgaos = [],
    subprefeituras = [],
    tema: temas = [],
  } = filtros ?? {};

  const aplicar = () => {
    const filtrosAplicados = {
      termo_busca: search.trim().toLowerCase(),
      canais: canaisSelecionados,
      orgaos: orgaosSelecionados,
      subprefeituras: subprefeiturasSelecionadas,
      temas: temasSelecionados
    };
    onFiltrar(filtrosAplicados);
  };

  const limpar = () => {
    setSearch("");
    setCanaisSelecionados([]);
    setOrgaosSelecionados([]);
    setSubprefeiturasSelecionadas([]);
    setTemasSelecionados([]);
  };

  const toggleSelecionado = (tipo, valor) => {
    let state, setState;
    switch (tipo) {
      case "canais":
        state = canaisSelecionados;
        setState = setCanaisSelecionados;
        break;
      case "orgaos":
        state = orgaosSelecionados;
        setState = setOrgaosSelecionados;
        break;
      case "subprefeituras":
        state = subprefeiturasSelecionadas;
        setState = setSubprefeiturasSelecionadas;
        break;
      case "temas":
        state = temasSelecionados;
        setState = setTemasSelecionados;
        break;
      default:
        return;
    }

    if (state.includes(valor)) {
      setState(state.filter((item) => item !== valor));
    } else {
      setState([...state, valor]);
    }
  };
 

  const algumFiltroAtivo =
    search.trim() !== "" ||
    canaisSelecionados.length > 0 ||
    orgaosSelecionados.length > 0 ||
    subprefeiturasSelecionadas.length > 0 ||
    temasSelecionados.length > 0;

  const renderDropdownFiltro = (
    tipo,
    label,
    lista,
    open,
    setOpen,
    selecionados
  ) => (
    <div className="w-65 relative">
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

      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg p-2 space-y-1 max-h-50 overflow-y-auto z-10">
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
    <div className="flex flex-col items-start justify-center flex-nowrap w-full max-xl:h-auto relative left-0 p-6 gap-12 max-xl:bg-[#f7f7f7] max-lg:top-0 max-md:-top-30 max-xl:top-0 xl:max-w-[90rem] xl:h-[40rem] max-xl:overflow-y-auto xl:z-10 xl:relative xl:justify-start xl:bottom-[10rem] xl:bg-white xl:p-8 xl:rounded-4xl xl:shadow-md" style={{ maxWidth: "1427px", margin: "0 auto" }}>
      <div className="flex flex-col flex-nowrap items-start justify-center gap-8 md:flex md:flex-row md:flex-nowrap md:items-center md:justify-between md:w-full xl:flex xl:flex-row xl:flex-nowrap xl:items-center xl:justify-between xl:mb-8 xl:px-8 xl:py-4">
        <img src={ImgFiltro} />
        <div className="flex flex-col items-start gap-8 w-72 pt-8 xl:flex xl:flex-row-reverse xl:justify-around xl:w-[30rem] xl:items-center xl:relative">
          <button
            onClick={aplicar}
            className="h-20 w-50 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-8 rounded-2xl roboto-black uppercase text-2xl hover:-translate-y-2.5"
          >
            pesquisar
          </button>
          {algumFiltroAtivo && (
            <button
              onClick={limpar}
              className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
      <div className="flex items-start justify-center flex-col flex-nowrap gap-4 mx-4 my-2 xl:w-[97%]">
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

      <div className="flex flex-wrap flex-col items-start justify-center py-8 max-md:flex md:flex-row md:justify-evenly xl:flex xl:flex-row xl:justify-evenly xl:items-start xl:w-full max-lg:grid max-lg:grid-cols-2 max-xl:grid max-xl:grid-cols-2 max-xl:w-full gap-4">
        {renderDropdownFiltro(
          "canais",
          "Canal de participação",
          canais,
          openCanal,
          setOpenCanal,
          canaisSelecionados
        )}
        {renderDropdownFiltro(
          "orgaos",
          "Órgão",
          orgaos,
          openOrgao,
          setOpenOrgao,
          orgaosSelecionados
        )}
        {renderDropdownFiltro(
          "subprefeituras",
          "Subprefeitura",
          subprefeituras,
          openSub,
          setOpenSub,
          subprefeiturasSelecionadas
        )}
        {renderDropdownFiltro(
          "temas",
          "Tema",
          temas,
          openTema,
          setOpenTema,
          temasSelecionados
        )}
      </div>
    </div>
  );
}
