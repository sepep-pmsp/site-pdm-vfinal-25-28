import React from "react";
import NoteBook from "@/assets/svg/Free_MacBook_Pro.svg";

export default function SectionParticipacaoSocial({ sobre }) {
  return (
    <div className="mt-45 bg-[#F0EFEE] h-[120vh] py-10 px-24 z-[-3]">
      <div className="bg-[var(--color-navy)] h-1 w-full mt-8"></div>
      <div>
        {sobre.participacaoSocial.map((item, index) => (
          <div key={index} className="mb-10">
            <div className="flex flex-col flex-nowrap items-start justify-center">
              <h2 className="text-8xl font-bold pt-10 mb-4 text-[var(--color-navy)]">
                {item.titulo}
              </h2>
              <p className="text-xl">{item.descricao}</p>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-start">
              <img className="relative right-24 z-10" src={NoteBook} alt="" />
              {item.card.map((card, i) => (
                <div
                  key={i}
                  className={`relative z-2 block p-8  flex-col justify-between shadow-[0px_0px_2px_gray]
                      ${
                        i === 0
                          ? "right-[45rem] top-8 pl-16 bg-white rounded-r-4xl min-w-[32rem] h-[30rem]"
                          : ""
                      }
                      ${
                        i === 1
                          ? "right-[40rem] top-8 pl-16 bg-white rounded-4xl min-w-[32rem] h-[30rem]"
                          : ""
                      }
                    `}
                >
                  <div className="flex flex-col flex-nowrap items-center justify-start pt-10 h-full gap-12 w-[25rem]">
                    <h3 className="text-4xl font-bold mb-2 p-2 text-[var(--color-navy)] border-y">
                      {card.titulo}
                    </h3>
                    <p className="text-xl mb-3 w-80 text-center">
                      {card.descricao}
                    </p>

                    {card.link_youtube ? (
                      <a
                        href={card.link_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-7xl shadow-[0px_0px_2px_gray] p-4 rounded-[2.5rem] cursor-pointer"
                      >
                        <i className="fa-brands fa-youtube text-red-600"></i>
                      </a>
                    ) : (
                      <button
                        onClick={() => (window.location.href = "/outra-pagina")}
                        className="w-50 h-full relative bottom-8 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-2 py-6  rounded-2xl hover:-translate-y-2.5"
                      >
                        <p className="text-3xl">SAIBA +</p>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
