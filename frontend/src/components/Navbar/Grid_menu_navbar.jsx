import React from "react";

export default function Grid_menu_navbar({ onClose }) {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center h-full w-full gap-4 p-4">
      {/* Grid lateral (coluna esquerda) */}
      <div className="flex flex-col flex-nowrap items-start gap-4 ml-4">
        <div>
          <button className="text-white w-80 bg-[var(--color-navy)] h-[25rem] flex flex-col items-start justify-start flex-nowrap text-4xl m-4 p-4 rounded-tr-[3rem] cursor-pointer">
            <h2 className="hover:slide-down">sobre o pdm</h2>
            <img className="relative left-6 top-[2.8rem]" src="/svg/Vector-sobre.svg" alt="" />
          </button>
        </div>
        <div>
          <button className="text-white w-80 bg-[var(--color-navy)] h-60 flex flex-col items-start justify-end flex-nowrap text-4xl m-4 p-4 rounded-bl-[3rem] pb-4 cursor-pointer">
            <h2 className="z-2">pdms anteriores</h2>
            <img className="absolute w-[19rem] left-4 top-[27rem]" src="/svg/Vector.svg" alt="" />
          </button>
        </div>
        <div>
          <button className=" text-white w-80 bg-[var(--color-cyan-medium)] h-20 flex items-start flex-row text-4xl m-4 p-4 rounded-tr-[2rem] cursor-pointer ">
            <h2>início</h2>
          </button>
        </div>
        <div>
          <button
            className="text-white h-20 w-80 bg-[var(--color-cyan-medium)] flex items-center justify-start flex-row flex-nowrap p-4 text-4xl rounded-bl-[2rem] cursor-pointer"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <h2>sair</h2>
          </button>
        </div>
      </div>
      {/* Grid Central (coluna central) */}
      <div>
        <div className="w-full h-screen flex items-center justify-center relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-8 content-center justify-center p-2 w-[75rem] h-[54rem]">
            <div
              className="flex items-start justify-start flex-row p-6 col-span-2 row-span-1 bg-[var(--color-green)] cursor-pointer rounded-tl-[2rem]"
            >
              <img
                className="w-48"
                src="/svg/universo_sp.svg"
                alt=""
              />
            </div>
            <div
              className="flex flex-col justify-start items-end p-6 col-span-1 row-span-2 bg-[var(--color-orange-red)] cursor-pointer rounded-tr-[2rem]"
            >
              <img
                className="w-48"
                src="/svg/viver_sao_paulo.svg"
                alt=""
              />
            </div>
            <div
              className="flex items-end justify-start p-6 col-span-1 row-span-2 bg-[var(--color-purple-red)] cursor-pointer rounded-bl-[2rem]"
            >
              <img
                className="w-48"
                src="/svg/capital_do_futuro.svg"
                alt=""
              />
            </div>

            <div className="bg-[var(--color-indigo-950)] cursor-pointer flex flex-col flex-nowrap justify-between items-start">
              <div>
                <img className="w-36 p-4 invert-[1]" src="/svg/logo-pdm-black.svg" alt="" />
              </div>
              <div>
                <h2 className="text-4xl text-white w-32 relative pb-4 left-64">conheça as metas</h2>
                </div>
            </div>

            <div
              className="flex justify-end items-end p-6 col-span-2 bg-[var(--color-blue)] cursor-pointer rounded-br-[2rem]"
            >
              <img
                className="w-48"
                src="/svg/cidade_empreendedora.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid lateral (coluna direita) */}
      <div className="flex flex-col flex-nowrap items-start gap-4">
        <div className="h-[30rem] w-[19rem] bg-[var(--color-cyan-dark)] text-white p-4 flex items-end justify-center cursor-pointer rounded-tl-[2rem]">
          <button className="text-start w-full cursor-pointer text-4xl">
            <h2>regionalização</h2>
          </button>
        </div>

        <div className="w-[19rem] bg-[var(--color-cyan-dark)] text-white h-[11.5rem] p-4 flex items-end cursor-pointer">
          <button className="text-start w-full cursor-pointer text-4xl">
            <h2>transparência e monitoramento</h2>
          </button>
        </div>

        <div className="w-full z-0">
          <button className="text-white h-[9.5rem] w-[19rem] text-start bg-[var(--color-cyan-dark)] p-4 cursor-pointer text-3xl rounded-br-[2rem] flex justify-start items-end">
            <h2 className="w-8">participação social</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
