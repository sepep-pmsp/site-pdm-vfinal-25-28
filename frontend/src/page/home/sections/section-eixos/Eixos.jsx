import React from "react";
import GridEixos from "./GridEixos";
import { useLocation } from "react-router-dom";

export default function Eixos() {
  const location = useLocation();
  const eixoSelecionadoDoMenu = location.state?.eixo || null;
  return (
    <div className="header-eixos-mobile xl:max-h-[55rem]">
      <div className="bg-[color:var(--color-navy)] h-40 rotate-[270deg] relative flex items-end flex-col justify-end p-4 rounded-br-3xl rounded-bl-3xl w-[54rem] right-[22rem] top-[20rem] shadow-[-4px_2px_20px_0px_gray] eixos-mobile-header">
        <h1 className="max-md:text-black  md:text-white text-7xl px-6">eixos estratégicos</h1>
      </div>
      <section className="conatiner-textos-eixos-mobile" style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div className="gap-24 flex items-center justify-center relative bottom-45 section-eixos-texts-mobile">
          <h2 className="text-5xl text-[var(--color-navy)] eixos-texts-mobile">
            a estrutura do programa de metas
          </h2>
          <p className="text-3xl text-[var(--color-navy)] eixos-text-p-mobile">
            Os compromissos do PdM 2025-2028 estão agrupados em quatro eixos
            estratégicos que facilitam a compreensão do impacto de cada política
            pública na vida da cidade.
          </p>
        </div>
      </section>
      <section className="relative bottom-45 max-md:relative max-md:bottom-16">
        <GridEixos eixoSelecionadoDoMenu={eixoSelecionadoDoMenu}/>
      </section>
    </div>
  );
}
