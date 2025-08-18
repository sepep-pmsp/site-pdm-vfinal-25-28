import React from "react";

export default function FiltroODS({
  ods,
  filtrosSelecionados,
  toggleSelecionado
}) {
  return (
    <div className="flex flex-col items-center relative bottom-10">
      {ods.map((odsItem) => {
        const valor = odsItem.temaODS; // envia o texto do tema, não o id
        const isSelected = filtrosSelecionados.ods.includes(valor);

        return (
          <div
            key={odsItem.id}
            className="w-70 flex justify-end"
            style={{ marginTop: "-9px" }}
          >
            <button
              onClick={() => toggleSelecionado("ods", valor)}
              className={`flex items-center h-21 rounded-l-3xl overflow-hidden cursor-pointer transition-all duration-300
                ${isSelected ? "w-45" : "w-16"}`}
              style={{ backgroundColor: odsItem.color }}
              title={odsItem.temaODS}
            >
              <div className="px-3 flex-shrink-0">
                <img className="w-10" src={odsItem.icone} alt={odsItem.temaODS} />
              </div>
              <div
                className={`w-30 text-white capitalize text-xs font-semibold break-words transition-opacity duration-300
                  ${isSelected ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                {odsItem.temaODS}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
