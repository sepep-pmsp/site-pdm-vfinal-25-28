import React, { useEffect, useState } from "react";
import { getFiltroMetasData } from "@/services/Metas/getFiltroMetasData";

export default function FiltroEixos() {
  const [data, setData] = useState(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
    eixos: [],
    subeixos: []
  });
  const [eixosAbertos, setEixosAbertos] = useState([]); // agora é um array

  useEffect(() => {
    getFiltroMetasData().then(setData).catch(console.error);
  }, []);

  const toggleSelecionado = (tipo, valor) => {
    setFiltrosSelecionados((prev) => {
      const selecionados = prev[tipo] || [];
      const jaSelecionado = selecionados.includes(valor);
      return {
        ...prev,
        [tipo]: jaSelecionado
          ? selecionados.filter((item) => item !== valor)
          : [...selecionados, valor]
      };
    });
  };

  const toggleEixoAberto = (titulo) => {
    setEixosAbertos((prev) =>
      prev.includes(titulo)
        ? prev.filter((e) => e !== titulo)
        : [...prev, titulo]
    );
  };

  if (!data) return <p>Carregando filtros...</p>;

  return (
    <div className="h-full flex flex-col items-start w-[19rem]">
      {data.eixos.map(({ titulo, cor, subeixos }) => {
        const isAberto = eixosAbertos.includes(titulo);

        return (
          <div key={titulo}>
            {/* Botão do eixo */}
            <div
              onClick={() => toggleEixoAberto(titulo)}
              className="flex flex-col items-start justify-start flex-nowrap rounded-r-3xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: cor,
                width: isAberto ? "24rem" : "6rem",
                height: isAberto ? "20rem" : "19.7rem",
                marginBottom: "-20px"
              }}
            >
              <div className="flex justify-between items-center flex-row flex-nowrap gap-20">
                <div
                  className={`text-white transition-all duration-300 p-2 ${
                    isAberto
                      ? "rotate-0 text-5xl flex flex-col"
                      : "rotate-270 text-5xl w-60 relative right-17 top-30"
                  }`}
                >
                  <h2>{titulo.toUpperCase()}</h2>
                </div>
                {isAberto && (
                  <button
                    className="text-white ml-auto mr-2 font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEixoAberto(titulo);
                    }}
                  >
                    X
                  </button>
                )}
              </div>

              {/* Lista de subeixos */}
              {isAberto && (
                <div className="mt-2 ml-4">
                  {subeixos.map((sub) => (
                    <label
                      key={sub}
                      className="flex items-center mb-1 text-sm text-white"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filtrosSelecionados.subeixos.includes(sub)}
                        onChange={() => toggleSelecionado("subeixos", sub)}
                      />
                      {sub}
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
