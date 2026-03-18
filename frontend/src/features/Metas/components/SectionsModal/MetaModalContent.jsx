import React from "react";

export default function MetaModalContent({ meta }) {
  if (!meta || !meta.card) return null;

  const { card } = meta;
  const corPrincipal = card.eixo_cor_principal;

  return (
    <div className="flex flex-col align-start px-4 gap-8 py-8">
        <span className="w-full h-0.5" style={{ background: corPrincipal }}></span>
        {card.projecao && (
            <div className="flex flex-col gap-2 pl-3 lg:flex-row lg:gap-15">
              <h3 style={{ color: corPrincipal }} className="text-base lg:text-4xl">
                {card.projecao.titulo}
              </h3>
              <p className="lg:text-2xl text-xs roboto-regular w-full break-words">
                {card.projecao.valor}
              </p>
            </div>
        )}
        <span className="w-full h-0.5" style={{ background: corPrincipal }}></span>
        {card.orgaos_responsaveis && (
            <div className="flex flex-row gap-2 items-center justify-start pl-3 lg:gap-20">
              <h3 style={{ color: corPrincipal }} className="text-base lg:text-4xl font-bebas-bold">
                Órgão
              </h3>
              <p style={{ color: corPrincipal }} className="lg:text-5xl text-xs font-bebas-book flex flex-row ">
                {card.orgaos_responsaveis.valor.map((sigla, index) => (
                    <>
                        <span key={index}>
                            {sigla}
                        </span>
                        <span>•</span>
                    </>
                ))}
              </p>
            </div>
        )}
        <span className="w-full h-1 lg:hidden" style={{ background: corPrincipal }}></span>
    </div>
  );
}