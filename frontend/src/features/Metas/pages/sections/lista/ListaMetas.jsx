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
  const corrigirPontuacao = (htmlStr) => {
    if (!htmlStr) return "";
    return htmlStr.replace(/<\/strong>\s*([,.;:])/gi, '$1</strong>');
  };

  return (
    <div className="w-full flex px-10">
      <div className="flex flex-col flex-nowrap justify-center items-stretch w-full">
        {metasOrdenadas.map((meta) => (
          <div key={meta.id} className="cursor-pointer flex flex-row items-center gap-4 lista-metas-item" onClick={() => onSelectMeta && onSelectMeta(meta)}>
            <div className="w-full">
              <div className="h-px bg-[black] w-full lista-metas-separador" />
              <div className="flex items-center justify-start flex-row flex-nowrap gap-12 w-full hover:scale-105 transition-transform">
                <h1 className="text-7xl lista-metas-numero py-5 px-2" style={{ color: meta?.listing?.eixo_cor_principal }}>
                  {meta?.listing?.numero}
                </h1>
                <p className="text-base leading-snug lista-metas-titulo w-full [&_strong]:block" dangerouslySetInnerHTML={{ __html: corrigirPontuacao(meta?.listing?.titulo) }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}