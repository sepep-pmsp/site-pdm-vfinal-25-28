import React from "react";

export default function ListaMetas({ metas, onSelectMeta }) {
  if (!Array.isArray(metas) || metas.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <p className="text-center p-8 text-lg font-semibold text-gray-600">
          Não há resultados para esta pesquisa.
        </p>
      </div>
    );
  }
  const metasOrdenadas = [...metas].sort(
    (a, b) => Number(a.listing.numero) - Number(b.listing.numero)
  );

  return (
    <div className="w-full flex justify-end">
      <div className="flex flex-col flex-nowrap justify-center items-stretch max-w-lg md:ml-auto">
        {metasOrdenadas.map((meta) => (
          <div key={meta.id} className="cursor-pointer px-2 py-4 flex flex-row items-center gap-4 hover:scale-105 transition-transform lista-metas-item" onClick={() => onSelectMeta && onSelectMeta(meta)}>
            <div className="w-full">
              <div className="h-[0.5px] bg-[black] w-full lista-metas-separador" />
              <div className="flex items-center justify-start flex-row flex-nowrap gap-12 max-w-lg">
                <span className="text-7xl font-bebas-regular lista-metas-numero" style={{ color: meta?.listing?.eixo_cor_principal }}>
                  {meta?.listing?.numero}
                </span>
                <p className="text-base leading-snug lista-metas-titulo max-w-sm [&_strong]:block"dangerouslySetInnerHTML={{ __html: meta?.listing?.titulo }}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
