import React from "react";

export default function Grid_menu_navbar({ onClose }) {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center h-full w-full gap-4 p-4">
      {/* Grid lateral (coluna esquerda) */}
      <div className="flex flex-col flex-nowrap items-start gap-4 ml-4">
        <div>
          <button className="slide-bottom-in text-white w-80 bg-[var(--color-navy)] h-[25rem] flex flex-col items-start justify-start flex-nowrap text-2xl m-4 p-4 rounded-tr-[3rem] cursor-pointer">
            <h2 className="z-2 slide-bottom-in-item">sobre o pdm</h2>
            <img
              className="relative left-6 top-[2.8rem]"
              src="/svg/Vector-sobre.svg"
            />
          </button>
        </div>
        <div>
          <button className="slide-top-in text-white w-80 bg-[var(--color-navy)] h-60 flex flex-col items-start justify-end flex-nowrap text-2xl m-4 p-4 rounded-bl-[3rem] pb-4 cursor-pointer">
            <h2 className="z-2 slide-top-in-item">pdms anteriores</h2>
            <img
              className="absolute w-[16.5rem] left-20 top-[28rem]"
              src="/svg/Vector.svg"
            />
          </button>
        </div>
        <div>
          <button className="slide-right-in text-white w-80 bg-[var(--color-cyan-medium)] h-20 flex items-start flex-row text-2xl m-4 p-4 rounded-tr-[2rem] cursor-pointer ">
            <h2 className="slide-right-in-item">início</h2>
          </button>
        </div>
        <div>
          <button
            className="slide-right-in text-white h-20 w-80 bg-[var(--color-cyan-medium)] flex items-center justify-start flex-row flex-nowrap p-4 text-2xl rounded-bl-[2rem] cursor-pointer"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <h2 className="slide-right-in-item">sair</h2>
          </button>
        </div>
      </div>
      {/* Grid Central (coluna central) */}
      <div>
        <div className="w-full h-screen flex items-center justify-center relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-8 content-center justify-center p-2 w-[75rem] h-[54rem]">
            <div className="slide-right-in-img flex items-start justify-start flex-row p-6 col-span-2 row-span-1 bg-[var(--color-green)] cursor-pointer rounded-tl-[2rem]">
              <img
                className="w-48 slide-right-in-item-img"
                src="/svg/universo_sp.svg"
                alt=""
              />
            </div>

            <div className="slide-bottom-in-img flex flex-col justify-start items-end p-6 col-span-1 row-span-2 bg-[var(--color-orange-red)] cursor-pointer rounded-tr-[2rem]">
              <img
                className="w-48 slide-bottom-in-item-img"
                src="/svg/viver_sao_paulo.svg"
                alt=""
              />
            </div>

            <div className="slide-top-in-img flex items-end justify-start p-6 col-span-1 row-span-2 bg-[var(--color-purple-red)] cursor-pointer rounded-bl-[2rem]">
              <img
                className="w-48 slide-top-in-item-img"
                src="/svg/capital_do_futuro.svg"
                alt=""
              />
            </div>

            <div className="slide-right-in-logo bg-[var(--color-indigo-950)] cursor-pointer flex flex-col flex-nowrap justify-between items-start">
              <button>
                <div>
                  <img
                    className="w-36 p-4 invert-[1] slide-right-in-item-logo"
                    src="/svg/logo-pdm-black.svg"
                    alt=""
                  />
                </div>

                <div>
                  <h2 className="text-2xl text-white w-32 relative pb-4 left-61">
                    conheça as metas
                  </h2>
                </div>
              </button>
            </div>

            <div className="slide-left-in-img flex justify-end items-end p-6 col-span-2 bg-[var(--color-blue)] cursor-pointer rounded-br-[2rem]">
              <img
                className="w-48 slide-left-in-item-img"
                src="/svg/cidade_empreendedora.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid lateral (coluna direita) */}
      <div className="flex flex-col flex-nowrap items-start gap-4">
        <div className="slide-top-in-2 h-[27rem] w-[19rem] bg-[var(--color-cyan-dark)] text-white p-4 flex items-end justify-center cursor-pointer rounded-tl-[2rem]">
          <button className="text-start w-full cursor-pointer text-2xl">
            <h2 className="slide-top-in-item-2">regionalização</h2>
          </button>
        </div>

        <div className="slide-top-in-3 w-[19rem] bg-[var(--color-cyan-dark)] text-white h-[11.5rem] p-4 flex items-end cursor-pointer">
          <button className="text-start w-full cursor-pointer text-2xl">
            <h2 className="slide-top-in-item-3">
              transparência e monitoramento
            </h2>
          </button>
        </div>

        <div className="slide-top-in-3 w-full z-0">
          <button className="text-white h-[12.6rem] w-[19rem] text-start bg-[var(--color-cyan-dark)] p-4 cursor-pointer text-2xl rounded-br-[2rem] flex justify-start items-end">
            <h2 className="w-8 slide-top-in-item-3">participação social</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
