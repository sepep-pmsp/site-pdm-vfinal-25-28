import React from "react";

export default function ListaMetas({ metas, onSelectMeta }) {
  // CORREÇÃO: Verifica se 'metas' é válido antes de tentar usá-lo
  if (!Array.isArray(metas)) {
    return (
      <div className="text-center p-8 text-lg font-semibold text-gray-600">
        Carregando metas...
      </div>
    );
  }
  const metasOrdenadas = [...metas].sort(
    (a, b) => Number(a.listing.numero) - Number(b.listing.numero)
  );

  return (
    <div>
      <div className="flex flex-col flex-nowrap justify-center items-stretch w-[35rem]">
        {metasOrdenadas.length === 0 ? (
          <div className="text-center p-8 text-lg font-semibold text-gray-600">
            Não houve resultado para os filtros selecionados.
          </div>
        ) : (
          metasOrdenadas.map((meta) => (
            <div
              key={meta.id}
              className="cursor-pointer p-6 flex flex-row items-center gap-4 hover:scale-105 transition-transform"
              onClick={() => onSelectMeta(meta)}
            >
              <div>
                <div className="h-[0.5px] bg-[black] w-full"></div>
                <div className="flex items-center justify-start flex-row flex-nowrap gap-12">
                  <span
                    className="text-8xl font-bebas-regular"
                    style={{
                      color: meta.listing.eixo_cor_principal 
                    }}
                  >
                    {meta.listing.numero}
                  </span>
                  <p
                    className="text-xl leading-snug"
                    dangerouslySetInnerHTML={{ __html: meta.listing.titulo }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}