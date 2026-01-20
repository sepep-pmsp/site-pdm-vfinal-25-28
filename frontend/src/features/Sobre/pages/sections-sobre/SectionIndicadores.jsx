import React from 'react'
import bgDetalhes1 from "@/shared/assets/svg/img_fundo1.svg";
import bgDetalhes2 from "@/shared/assets/svg/img_fundo2.svg";

export default function SectionIndicadores({ sobre }) {
  const { indicadores } = sobre;

  return (
    <div className='mb-4'>
      <div className="max-md:w-full h-1 max-md:left-0 max-2xl:left-2 max-2xl:hidden lg:h-1 w-[89rem] left-60 relative bg-[var(--color-navy)]"></div>
      <img className='max-lg:hidden absolute z-[-1] top-[150rem] left-20 w-60' src={bgDetalhes1} alt="" />
      <img className='max-lg:hidden absolute z-[-1] top-[165rem] left-20 w-56' src={bgDetalhes2} alt="" />
      <div className="max-lg:w-80 max-lg:relative max-lg:left-0 lg:flex flex-col items-start justify-center gap-40 w-[60rem] relative left-24">
        <div className="max-lg:w-80 max-lg:relative max-lg:left-0 max-md:left-6 max-md:gap-8 lg:mb-10 flex flex-col items-start justify-center flex-nowrap gap-15 relative left-40">
          <div className="max-lg:w-80 max-2xl:max-w-3xl lg:flex flex-col flex-nowrap items-start justify-center w-[61rem] mt-10 div-titulo-ind-mobile">
            <h2 className="text-7xl font-bold mb-4 text-[var(--color-navy)] titulo-ind-mobile">indicadores</h2>
            <p className="max-lg:w-80 lg:text-xl">{indicadores.texto}</p>
          </div>
          <div className="max-md:w-80 max-lg:w-80 max-2xl:max-w-lg max-xl:w-80 lg:flex flex-col flex-nowrap items-start justify-center max-w-5xl mt-10">
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