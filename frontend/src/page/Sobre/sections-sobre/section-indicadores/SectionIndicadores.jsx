import React from 'react'
import bgCell from "@/assets/svg/Free-Hand-Holding.svg";
import bgDetalhes1 from "@/assets/svg/img_fundo1.svg";
import bgDetalhes2 from "@/assets/svg/img_fundo2.svg";

export default function SectionIndicadores({ sobre }) {
  const { indicadores } = sobre;

  return (
    <div className="my-16 mx-24">
      <div className="bg-[var(--color-navy)] h-1 w-[86rem] mb-8"></div>
      <img className='absolute w-[38rem] left-[81.09rem] top-[159rem]' src={bgCell} alt="" />
      <img className='absolute z-[-1] top-[192rem] left-4 w-56' src={bgDetalhes1} alt="" />
      <img className='absolute z-[-1] top-[209rem] left-4 w-56' src={bgDetalhes2} alt="" />
      <div className="flex flex-col items-start justify-center gap-40 w-[60rem] relative left-24">
        {/* Removendo o map e acessando os dados diretamente */}
        <div className="mb-10 flex flex-col items-start justify-center flex-nowrap gap-60">
          <div className="flex flex-col flex-nowrap items-start justify-center w-[61rem] mt-10">
            {/* O novo JSON não tem titulo_1, então use um valor fixo */}
            <h2 className="text-8xl font-bold mb-4 text-[var(--color-navy)]">indicadores</h2>
            <p className="text-xl">{indicadores.texto}</p>
          </div>
          <div className="flex flex-col flex-nowrap items-start justify-center w-[61rem] mt-10">
            <h2 className="text-4xl font-bold mb-4 text-[var(--color-navy)] border-y py-2">
              {indicadores.subtitulo}
            </h2>
            <p className="text-xl mb-3">{indicadores.chamada_subsecao}</p>
            <p className="text-xl mb-3">{indicadores.conteudo_subsecao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}