import React from "react";
import CarouselPlanejamento from "@/components/CarouselPlanejamento/CarouselPlanejamento";
import bgImageCarousel from "/svg/bg-fundo-sobre.svg"

export default function SectionPlanejamento({ sobre }) {
  if (!sobre || !sobre.como_feito) {
    return null;
  }
  const { como_feito } = sobre;
  const descricaoCard = {
    conteudo: "Veja o passo a passo para construção do Programa de Metas 2025 - 2028."
  };
  const combinedCards = [descricaoCard, ...como_feito.cards];

  return (
    <div className="relative pt-20 mx-24 container-section-intro-mobile">
      <div className="h-1 w-[100rem] relative left-12 bg-[var(--color-navy)]"></div>
      <div className="bg-[color:var(--color-cyan-dark)] h-35 rotate-[270deg] relative flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl w-[30rem] right-[17rem] top-[11rem] shadow-[-4px_2px_20px_0px_gray] z-10 container-planejamento-mobile">
        <h1 className="text-white text-7xl px-6">como é feito</h1>
      </div>
      <div>
        <div className="w-[100rem] flex justify-center items-start relative bottom-25 div-planejamento-mobile">
          <p className="px-60 text-4xl text-[var(--color-navy)] text-planejamento-mobile">{como_feito.texto}</p>
        </div>
        <section className="relative w-[119rem] right-24 h-[45rem] overflow-hidden">
          <div className="image-mobile-planejamento ">
            <img className="z-[-2]" src={bgImageCarousel} alt="" />
            <div className="absolute top-0 left-0 w-full h-full bg-[#6ACADB] opacity-40 pointer-events-none z-[-2]"></div>
          </div>
          <div className="absolute inset-0 flex flex-row flex-nowrap justify-evenly items-center z-10">
            <CarouselPlanejamento como_feito={combinedCards} />
          </div>
        </section>
      </div>
    </div>
  );
}