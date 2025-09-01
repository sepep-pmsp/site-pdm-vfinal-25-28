import React, { useState } from "react";
//import { getFiltroMetasData } from "@/services/Metas/getFiltroMetasData";

export default function FiltroEixos({
  eixos,
  filtrosSelecionados,
  toggleSelecionado,
}) {
  const [eixosAbertos, setEixosAbertos] = useState([]);
  if (!eixos) {
    return <p>Carregando eixos...</p>;
  }

  const toggleEixoAberto = (id) => {
    const isAberto = eixosAbertos.includes(id);

    setEixosAbertos((prev) =>
      isAberto ? prev.filter((e) => e !== id) : [...prev, id]
    );

    if (!isAberto && !filtrosSelecionados.eixos.includes(id)) {
      toggleSelecionado("eixos", id);
    }
  };

  return (
    <div className="h-full flex flex-col items-start w-[19rem] relative bottom-10">
      {eixos.map(({ nome,id, cor, temas }) => {
        const isAberto = eixosAbertos.includes(id);

        return (
          <div key={id}>
            {/* Botão do eixo */}
            <div
              onClick={() => toggleEixoAberto(id)}
              className="flex flex-col items-start justify-between flex-nowrap rounded-r-3xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: cor,
                width: isAberto ? "24rem" : "6rem",
                height: "21rem",
                marginBottom: "-20px"
              }}
            >
              <div className="flex justify-between items-center flex-row flex-nowrap">
                <div
                  className={`text-white transition-all duration-300 p-2 ${
                    isAberto
                      ? "rotate-0 text-4xl flex flex-col"
                      : "rotate-270 text-4xl w-60 relative right-20 top-35"
                  }`}
                >
                  <h2 className="w-80 pt-4">{nome.toUpperCase()}</h2>
                </div>
                {isAberto && (
                  <button
                    className="text-white absolute left-85"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEixoAberto(id);
                    }}
                  >
                    <i
                      className="fa-solid fa-xmark"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </button>
                )}
              </div>

              {/* Lista de subeixos */}
              {isAberto && (
                <div className="mt-2 ml-4 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows h-60 w-[20rem]">
                  {temas.map((sub) => (
                    <label
                      key={sub.id}
                      className="mb-1 text-white text-xl flex flex-row-reverse justify-between items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="mr-2 bg-white m-0 custom-checkbox"
                        checked={filtrosSelecionados.subeixos.includes(sub.id)}
                        onChange={() => toggleSelecionado("subeixos", sub.id)}
                      />
                      <span className="custom-checkbox-eixos"></span>
                      <div className="w-full py-1">
                        <span className="w-70 capitalize">{sub.nome}</span>
                        <div style={{ backgroundColor: "white", height: "1px", width: "90%" }}></div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}