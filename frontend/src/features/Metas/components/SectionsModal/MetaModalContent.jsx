import React from "react";

export default function MetaModalContent({ meta }) {
  if (!meta || !meta.card) return null;

  const { card } = meta;
  const corPrincipal = card.eixo_cor_principal;

  return (
    <div className="flex flex-col align-start px-2 gap-8 py-8">
      {/* 1. Projeção */}
        {card.projecao && (
            <div className="flex flex-col gap-2 xl:flex-row xl:gap-55">
              <h3 style={{ color: corPrincipal }} className="text-2xl xl:text-end xl:text-5xl">
                {card.projecao.titulo}
              </h3>
              <p className="text-sm roboto-regular w-full break-words xl:text-2xl">
                {card.projecao.valor}
              </p>
            </div>
        )}
        {/* 2. Ações Estratégicas */}
        {card.acoes_estrategicas &&
            card.acoes_estrategicas.valor &&
            card.acoes_estrategicas.valor.length > 0 && (
            <div className="flex flex-col gap-2 xl:flex-row xl:gap-18">
                <h3 style={{ color: corPrincipal }} className="text-2xl xl:text-5xl">
                  {card.acoes_estrategicas.titulo}
                </h3>
                <ul className="list-disc list-inside listCard roboto-regular">
                  {card.acoes_estrategicas.valor.map((acao, idx) => (
                    <li className="text-sm itemListCard xl:text-2xl" key={idx}>
                      {acao}
                    </li>
                  ))}
                </ul>
            </div>
        )}
        {/* 3. Indicador */}
        {card.indicador && (
            <div className="flex flex-col gap-2 xl:flex-row xl:gap-54 items-center">
              <h3 style={{ color: corPrincipal }} className="text-2xl font-semibold xl:text-end xl:text-5xl">
                {card.indicador.titulo}
              </h3>
              <p className="text-sm roboto-regular xl:text-2xl">
                {card.indicador.valor}
              </p>
            </div>
        )}
        {/* 4. Órgãos Responsáveis */}
        {card.orgaos_responsaveis && (
            <div className="flex flex-col gap-2 xl:flex-row xl:gap-8 items-center">
              <h3 style={{ color: corPrincipal }} className="text-xl font-bebas-bold xl:text-5xl xl:text-end">
                Órgãos Responsáveis
              </h3>
              <p style={{ color: corPrincipal }} className="text-[32px] xl:text-8xl font-bebas-book flex flex-row gap-8">
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
    </div>
  );
}