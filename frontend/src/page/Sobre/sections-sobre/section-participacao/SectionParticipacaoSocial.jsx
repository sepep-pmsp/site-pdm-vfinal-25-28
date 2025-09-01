import React from "react";
import NoteBook from "@/assets/svg/Free_MacBook_Pro.svg";

export default function SectionParticipacaoSocial({ sobre }) {
  const { participacao } = sobre;

  return (
    <div className="mt-45 bg-[#F0EFEE] h-[120vh] py-10 px-24 z-[-3]">
      <div className="bg-[var(--color-navy)] h-1 w-full mt-8"></div>
      <div>
        <div className="mb-10">
          <div className="flex flex-col flex-nowrap items-start justify-center">
            {/* O novo JSON não tem 'titulo' */}
            <h2 className="text-8xl font-bold pt-10 mb-4 text-[var(--color-navy)]">participação social</h2>
            <p className="text-xl">{participacao.texto}</p>
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-start">
            <img className="relative right-24 z-10 pointer-events-none" src={NoteBook} alt="" />

            {/* Card para Audiências Públicas */}
            <div
              className={`relative z-2 block p-8 flex-col justify-between shadow-[0px_0px_2px_gray] right-[45rem] top-8 pl-16 bg-white rounded-r-4xl min-w-[32rem] h-[30rem]`}
            >
              <div className="flex flex-col flex-nowrap items-center justify-start pt-10 h-full gap-12 w-[25rem]">
                <h3 className="text-4xl font-bold mb-2 p-2 text-[var(--color-navy)] border-y">
                  AUDIÊNCIAS PÚBLICAS
                </h3>
                <p className="text-xl mb-3 w-80 text-center">
                  {participacao.conteudo_audiencias}
                </p>
                <a
                  href={participacao.link_video_audiencias}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-30 text-7xl shadow-[0px_0px_2px_gray] p-4 rounded-[2.5rem] cursor-pointer"
                >
                  <i className="fa-brands fa-youtube text-red-600"></i>
                </a>
              </div>
            </div>

            {/* Card para Devolutivas */}
            <div
              className={`relative z-2 block p-8 flex-col justify-between shadow-[0px_0px_2px_gray] right-[40rem] top-8 pl-16 bg-white rounded-4xl min-w-[32rem] h-[30rem]`}
            >
              <div className="flex flex-col flex-nowrap items-center justify-start pt-10 h-full gap-12 w-[25rem]">
                <h3 className="text-4xl font-bold mb-2 p-2 text-[var(--color-navy)] border-y">
                  DEVOLUTIVAS
                </h3>
                <p className="text-xl mb-3 w-80 text-center">
                  {participacao.conteudo_devolutivas}
                </p>
                <a
                  href="https://devolutiva.pdm.prefeitura.sp.gov.br/" // O JSON não tem link, usando um link fixo
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-50 h-full relative bottom-8 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-2 py-6  rounded-2xl hover:-translate-y-2.5"
                >
                  <p className="text-3xl">SAIBA +</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}