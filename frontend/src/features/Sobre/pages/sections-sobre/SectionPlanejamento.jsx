import React from "react";
import CarouselPlanejamento from "../../components/CarouselPlanejamento";
import bgImageCarousel from "/svg/bg-fundo-sobre.svg"
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import CarouselPlanejamentoMobile from "../../components/CarouselPlanejamentoMobile";

export default function SectionPlanejamento({ sobre }) {
  const isMobile = useIsMobile(1439);
  if (!sobre || !sobre.como_feito) {
    return null;
  }
  const { como_feito } = sobre;
  const descricaoCard = {
    conteudo: "Veja o passo a passo para construção do Programa de Metas 2025 - 2028."
  };
  const combinedCards = [descricaoCard, ...como_feito.cards];  
  return (
    <div className="relative max-lg:top-16">
      <div className="max-md:w-full h-1 max-md:left-0 max-2xl:left-2 max-2xl:hidden lg:h-1 w-[89rem] left-60 relative bg-[var(--color-navy)]"></div>
      <div className="max-md:rotate-0 max-2xl:rotate-0 max-2xl:left-0 max-2xl:w-80 max-2xl:h-auto max-2xl:rounded-tr-[3rem] max-2xl:rounded-br-[3rem] max-2xl:rounded-bl-none max-2xl:bg-[color:var(--color-cyan-dark)] max-2xl:relative max-2xl:top-5 bg-[color:var(--color-cyan-dark)] h-35 rotate-[270deg] absolute flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl w-[30rem] right-[100rem] top-80 shadow-[-4px_2px_20px_0px_gray] z-10">
        <h1 className="text-white text-7xl px-6">como é feito</h1>
      </div>
      <div className="flex flex-col items-center justify-center flex-nowrap w-full gap-8 py-8">
        <div className="max-md:w-80 max-xl:w-180 max-2xl:max-w-7xl lg:w-[100rem] flex justify-center items-start max-w-container">
          <p className="max-md:max-w-80 max-md:text-lg max-lg:w-full max-xl:w-180 max-2xl:w-[60rem] lg:w-auto text-2xl text-[var(--color-navy)] tirar-padding roboto-regular texto-como-e-feito-mobile">{como_feito.texto}</p>
        </div>
        <section className="max-lg:w-[45rem] max-lg:h-80 max-md:w-80 max-md:h-[40rem] max-md:left-0 lg:relative min-w-min h-[40rem] overflow-hidden">
          <div className="max-lg:hidden min-w-min">
            <img className="z-[-2] min-w-min" src={bgImageCarousel} alt="" />
            <div className="absolute top-0 left-0 w-full h-full bg-[#6ACADB] opacity-40 pointer-events-none z-[-2] min-w-min"></div>
          </div>
          <div className="max-md:relative max-md:top-16 lg:absolute inset-0 flex flex-row flex-nowrap justify-evenly items-center z-10">
            {isMobile ? (
              <CarouselPlanejamentoMobile como_feito={combinedCards} />
            ) : (
              <CarouselPlanejamento como_feito={combinedCards} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}