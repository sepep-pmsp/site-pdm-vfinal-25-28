import React from 'react'
import bgCell from "@/assets/svg/Free-Hand-Holding.svg";
import bgDetalhes1 from "@/assets/svg/img_fundo1.svg";
import bgDetalhes2 from "@/assets/svg/img_fundo2.svg";


export default function SectionIndicadores({ sobre }) {
  return (
    <div className="my-16">
      <div className="bg-[var(--color-navy)] h-1 w-[86rem] mb-8"></div>
      <img className='absolute w-[38rem] left-[81.09rem] top-[154rem]' src={bgCell} alt="" />
      <img className='absolute z-[-1] top-[191rem] left-4 w-56' src={bgDetalhes1} alt="" />
      <img className='absolute z-[-1] top-[207rem] left-4 w-56' src={bgDetalhes2} alt="" />
      <div className="flex flex-col items-start justify-center gap-40 w-[60rem] relative left-24">
        {sobre.indicadores.map((item, index) => (
          <div key={index} className="mb-10">
            <div className="flex flex-col flex-nowrap items-start justify-center w-[61rem]">
              <h2 className="text-8xl font-bold mb-4 text-[var(--color-navy)]">
                {item.titulo_1}
              </h2>
              {item.texto_1 && <p className="text-xl">{item.texto_1}</p>}
            </div>
            {item.texto_2 && item.texto_2.length > 0 && (
              <div className="flex flex-col flex-nowrap items-start justify-center w-[61rem]">
                <h2 className="text-4xl font-bold mb-4 text-[var(--color-navy)] border-y py-2">
                  {item.titulo_2}
                </h2>
                {item.texto_2.map((paragrafo, i) => (
                  <p key={i} className="text-xl mb-3">
                    {paragrafo}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}