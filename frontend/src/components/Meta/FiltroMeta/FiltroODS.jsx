import React from "react";

export default function FiltroODS({
  ods,
  filtrosSelecionados,
  toggleSelecionado
}) {
  return (
    <div className="flex flex-col items-center relative">
      {ods.map((odsItem) => {
        const isSelected = filtrosSelecionados.ods.includes(odsItem.id);

        return (
          <div
            key={odsItem.id}
            className={"w-70 flex justify-end"}
            style={{ marginTop: "-9px" }}
          >
            <button
              onClick={() => toggleSelecionado("ods", odsItem.id)}
              className={`flex items-center justify-start gap-2 h-20 rounded-l-3xl overflow-hidden cursor-pointer transition-all duration-300
            ${isSelected ? "w-55" : "w-16"}`}
              style={{ backgroundColor: odsItem.color }}
              title={odsItem.temaODS}
            >
              <div className="px-3 py-10 flex-shrink-0">
                <img
                  className="w-10"
                  src={`${odsItem.icone}`}
                  alt={odsItem.temaODS}
                />
              </div>
              <div
                className={`w-44 text-white font-semibold break-words transition-opacity duration-300
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
