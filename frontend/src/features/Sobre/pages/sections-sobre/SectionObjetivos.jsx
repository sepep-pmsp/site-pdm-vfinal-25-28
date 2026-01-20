import React from "react";
import bgFundo1 from "@/shared/assets/svg/agrupar_2.svg";
import Iconlupa from "@/shared/assets/svg/Iconlupa.svg";
import Iconengrenagem from "@/shared/assets/svg/Iconengrenagem.svg";
import Icongrafico from "@/shared/assets/svg/Icongrafico.svg";
import Iconconexao from "@/shared/assets/svg/Iconconexao.svg";

export default function SectionObjetivos({ sobre }) {
  const objetivosData = sobre.objetivos;
  
  const objetivosArray = [
    {
      titulo: "transparência",
      descricao: objetivosData.transparencia,
      icon: Iconlupa,
    },
    {
      titulo: "visão sistêmica",
      descricao: objetivosData.visao_sistemica,
      icon: Iconengrenagem,
    },
    {
      titulo: "otimização de recursos",
      descricao: objetivosData.otimizacao,
      icon: Icongrafico,
    },
    {
      titulo: "execução em conjunto",
      descricao: objetivosData.execucao,
      icon: Iconconexao,
    },
  ];

  return (
    <div className="lg:mx-24">
      <div className="absolute z-[-1] rotate-180 left-0">
        <img src={bgFundo1} alt="" />
      </div>
      <div className="max-2xl:min-h-full xl:h-150 div-conteudo-objetivos-mobile h-auto">
        <div className="max-2xl:rotate-0 max-2xl:left-[-1rem] max-2xl:w-80 max-2xl:h-auto max-2xl:rounded-tr-[3rem] max-2xl:rounded-br-[3rem] max-2xl:rounded-bl-none max-2xl:bg-[color:var(--color-cyan-dark)] max-2xl:relative max-2xl:top-12 xl:bg-[color:var(--color-cyan-dark)] h-35 rotate-[270deg] relative flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl w-[25rem] right-[9rem] top-[17rem] shadow-[-4px_2px_20px_0px_gray] container-objetivos-mobile">
          <h1 className="text-white text-7xl px-6">objetivos</h1>
        </div>
        <div className="max-2xl:relative max-2xl:top-15 max-lg:flex max-lg:gap-8 max-lg:relative max-lg:top-12 lg:flex flex-wrap justify-center gap-8 py-8">
          {objetivosArray.map((obj, index) => (
            <div
              key={index}
              className="w-80 h-[25rem] flex flex-col items-center justify-evenly flex-nowrap text-center shadow-[0_0_4px_#8080804d] p-6 rounded-3xl transition-all duration-[0.3s] ease-[ease-in-out] hover:-translate-y-2.5"
            >
              <img src={obj.icon} alt={obj.titulo} className="w-20 h-20 mb-4" />
              <div className="bg-[#0E7BA8] w-[17rem] h-0.5"></div>
              <h2 className="text-2xl font-bold text-[#0E7BA8] mb-2">
                {obj.titulo}
              </h2>
              <div className="bg-[#0E7BA8] w-[17rem] h-0.5"></div>
              <p className="text-lg text-[#0E7BA8]">{obj.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}