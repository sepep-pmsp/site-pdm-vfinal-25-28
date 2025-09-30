import React from "react";
import NoteBook from "@/assets/svg/Free_MacBook_Pro.svg";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function SectionParticipacaoSocial({ sobre }) {
  const { participacao } = sobre;
  const isMobile = useIsMobile(1441);

  return (
    <div className="max-lg:h-full lg:mt-45 bg-[#F0EFEE] h-[120vh] py-10 px-24 z-[-3] tirar-padding">
      <div className="max-md:w-full h-1 max-md:left-0 max-2xl:left-2 max-2xl:hidden lg:h-1 w-[89rem] left-35 relative bg-[var(--color-navy)]"></div>
      <div>
        <div className="mb-10">
          <div className="max-2xl:relative max-2xl:w-70 max-2xl:left-15 lg:flex flex-col flex-nowrap items-start justify-center max-w-4xl relative left-40">
            <h2 className="max-lg:text-5xl lg:text-8xl font-bold pt-10 mb-4 text-[var(--color-navy)]">
              participação social
            </h2>
            <p className="max-md:w-80 lg:text-xl ">{participacao.texto}</p>
          </div>
          {isMobile ? (
            <div className="flex flex-col items-center justify-center gap-8 mt-8">
              <div className="w-full max-w-[30rem] bg-white shadow p-6 rounded-2xl flex flex-col items-center gap-6">
                <h3 className="text-2xl font-bold text-[var(--color-navy)] border-y">
                  AUDIÊNCIAS PÚBLICAS
                </h3>
                <p className="text-lg text-center">
                  {participacao.conteudo_audiencias}
                </p>
                <a
                  href={participacao.link_video_audiencias}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-6xl p-4 rounded-2xl shadow cursor-pointer"
                >
                  <i className="fa-brands fa-youtube text-red-600"></i>
                </a>
              </div>

              <div className="w-full max-w-[30rem] bg-white shadow p-6 rounded-2xl flex flex-col items-center gap-6">
                <h3 className="text-2xl font-bold text-[var(--color-navy)] border-y">
                  DEVOLUTIVAS
                </h3>
                <p className="text-lg text-center">
                  {participacao.conteudo_devolutivas}
                </p>
                <Link
                    to="/participacao-social"
                    rel="noopener noreferrer"
                    className="bg-[var(--color-cyan-medium)] text-white px-6 py-3 rounded-xl text-lg font-bold shadow hover:-translate-y-1 transition"
                  >
                    <p className="text-3xl">SAIBA +</p>
                  </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-row flex-nowrap items-center justify-start">
              <img
                className="relative right-24 z-10 pointer-events-none"
                src={NoteBook}
                alt=""
              />
              <div
                className={
                  "relative z-2 block p-8 flex-col justify-between shadow-[0px_0px_2px_gray] right-[45rem] top-8 pl-1 bg-white rounded-r-4xl min-w-[28rem] h-[30rem]"
                }
              >
                <div className="flex flex-col flex-nowrap items-start justify-start pt-10 h-full gap-12 w-[25rem] relative left-20">
                  <h3 className="text-4xl font-bold mb-2 p-2 text-[var(--color-navy)] border-y">
                    AUDIÊNCIAS PÚBLICAS
                  </h3>
                  <p className="text-xl mb-3 w-80 text-start">
                    {participacao.conteudo_audiencias}
                  </p>
                  <a
                    href={participacao.link_video_audiencias}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-30 text-7xl shadow-[0px_0px_2px_gray] p-4 rounded-[2.5rem] cursor-pointer left-15"
                  >
                    <i className="fa-brands fa-youtube text-red-600"></i>
                  </a>
                </div>
              </div>
              <div
                className={
                  "relative z-2 block p-8 flex-col justify-between shadow-[0px_0px_2px_gray] right-[40rem] top-8 pl-12 bg-white rounded-4xl min-w-[30rem] h-[30rem]"
                }
              >
                <div className="flex flex-col flex-nowrap items-center justify-start pt-10 h-full gap-12 w-[25rem]">
                  <h3 className="text-4xl font-bold mb-2 p-2 text-[var(--color-navy)] border-y">
                    DEVOLUTIVAS
                  </h3>
                  <p className="text-xl mb-3 w-80 text-center">
                    {participacao.conteudo_devolutivas}
                  </p>
                  <Link
                    to="/participacao-social"
                    className="w-50 h-full relative bottom-8 shadow-[0px_9px_20px_1px_#00000052] 
             flex items-center justify-center flex-nowrap flex-col 
             transition-all duration-[0.3s] ease-[ease-in-out] 
             text-[var(--color-white)] cursor-pointer 
             bg-[var(--color-cyan-medium)] p-2 py-6 rounded-2xl 
             hover:-translate-y-2.5"
                  >
                    <p className="text-3xl">SAIBA +</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
