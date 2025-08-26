import React from "react";
import GridEixos from "./GridEixos";
import { useLocation } from "react-router-dom";

export default function Eixos() {
  const location = useLocation();
  const eixoSelecionadoDoMenu = location.state?.eixo || null;
  return (
    <div>
      <div className="bg-[color:var(--color-navy)] h-40 rotate-[270deg] relative flex items-end flex-col justify-end p-4 rounded-br-3xl rounded-bl-3xl w-[54rem] right-[22rem] top-[29rem] shadow-[-4px_2px_20px_0px_gray]">
        <h1 className="text-white text-7xl px-6">eixos estratégicos</h1>
      </div>
      <section className="my-34">
        <div className="gap-24 flex items-center justify-center pl-28 relative bottom-12">
          <h2 className="text-5xl text-[var(--color-navy)] w-60">
            a estrutura do programa de metas
          </h2>
          <p className="text-3xl text-[var(--color-navy)] w-[60rem]">
            Os compromissos do PdM 2025-2028 estão agrupados em quatro eixos
            estratégicos que facilitam a compreensão do impacto de cada política
            pública na vida da cidade.
          </p>
        </div>
      </section>
      <section>
        <GridEixos eixoSelecionadoDoMenu={eixoSelecionadoDoMenu}/>
      </section>
    </div>
  );
}
