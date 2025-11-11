import React from "react";
import GridEixos from "./GridEixos";
import { useLocation } from "react-router-dom";

export default function Eixos() {
  const location = useLocation();
  const eixoSelecionadoDoMenu = location.state?.eixo || null;
  return (
    <div className="h-full max-lg:h-[145vh] max-xl:h-[145vh] flex flex-col justify-center gap-8" style={{ padding: "3rem 0" }}>
      <div
        className="flex items-start flex-col max-md:flex max-md:items-center max-md:justify-center max-md:text-center md:items-center"
        style={{ maxWidth: "1458px", margin: "0 auto" }}
      >
        <div className="flex items-start flex-col justify-start text-5xl w-full xl:bg-[color:var(--color-navy)] md:items-center xl:h-40 xl:rotate-[270deg] xl:absolute xl:flex xl:items-end xl:flex-col xl:justify-end xl:p-4 xl:rounded-br-3xl xl:rounded-bl-3xl xl:w-[54rem] xl:-left-96 xl:top-[126rem] xl:shadow-[-4px_2px_20px_0px_gray] max-xl:items-center">
          <h1 className="mt-4 relative xl:text-white xl:text-7xl xl:relative xl:right-15 xl:bottom-4">eixos estratégicos</h1>
        </div>
        <section className="w-80 flex flex-col items-start justify-start gap-4 mt-4 mb-4 md:items-center xl:w-full textos-eixos-mobile-content">
          <div className="w-80 h-full text-[var(--color-navy)] mt-6 md:w-full xl:w-full xl:flex xl:flex-row xl:items-center xl:justify-center xl:gap-8">
            <h2 className="w-80 text-2xl mb-4 xl:text-5xl">
              a estrutura do programa de metas
            </h2>
            <p className="w-full text-start xl:w-4xl xl:text-3xl">
              Os compromissos do PdM 2025-2028 estão agrupados em quatro eixos
              estratégicos que facilitam a compreensão do impacto de cada
              política pública na vida da cidade.
            </p>
          </div>
        </section>
      </div>
      <section className="max-lg:h-[145vh] max-xl:h-[145vh] 2xl:h-[40rem] 2xl:relative 2xl:top-16 grid-eixos-mobile-content" >
        <GridEixos eixoSelecionadoDoMenu={eixoSelecionadoDoMenu} />
      </section>
    </div>
  );
}