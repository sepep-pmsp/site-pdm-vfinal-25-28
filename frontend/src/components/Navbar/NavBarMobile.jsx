import React from "react";
import { useNavigate } from "react-router-dom";
import Vector_Sobre from "@/assets/svg/Vector-sobre.svg";
import Vector from "@/assets/svg/Vector.svg";
import Universo_SP from "@/assets/svg/universo_sp.svg";
import Viver_SP from "@/assets/svg/viver_sao_paulo.svg";
import Capital_Futuro from "@/assets/svg/capital_do_futuro.svg";
import Logo_PDM_fPreto from "@/assets/svg/logo-pdm-black.svg";
import Cidade_Empreendedora from "@/assets/svg/cidade_empreendedora.svg";

export default function NavBarMobile({ onClose }) {
  const navigate = useNavigate();
  const goToEixo = (nomeEixo) => {
    navigate("/", { state: { eixo: nomeEixo } });
    onClose();
  };
  const goTo = (path) => {
    navigate(path);
    onClose();
  };
  return (
    <div className="flex flex-col items-center flex-nowrap overflow-y-auto">
      {/* Grid Central (coluna central) */}
      <div className="w-full flex items-start justify-start flex-nowrap relative navbar-mobile">
        <div className="grid grid-cols-3 grid-rows-3 gap-4 content-center justify-center p-2 h-[40rem] w-[66rem] navbar_grid">
          <div
            onClick={() => goToEixo("universo")}
            className="mobile-right-in-img flex items-start justify-start flex-row p-6 col-span-2 row-span-1 bg-[var(--color-green)] cursor-pointer rounded-tl-[2rem]"
          >
            <img
              className="w-48 mobile-right-in-item-img mobile-right-item-img"
              src={Universo_SP}
              alt=""
            />
          </div>

          <div
            onClick={() => goToEixo("viver")}
            className="mobile-bottom-in-img flex flex-col justify-start items-end p-6 col-span-1 row-span-2 bg-[var(--color-orange-red)] cursor-pointer rounded-tr-[2rem]"
          >
            <img
              className="w-48 mobile-bottom-in-item-img mobile-bottom-item-img"
              src={Viver_SP}
              alt=""
            />
          </div>

          <div
            onClick={() => goToEixo("capital")}
            className="mobile-top-in-img flex items-end justify-start p-6 col-span-1 row-span-2 bg-[var(--color-purple-red)] cursor-pointer rounded-bl-[2rem]"
          >
            <img
              className="w-48 mobile-top-in-item-img mobile-top-initem-img"
              src={Capital_Futuro}
              alt=""
            />
          </div>

          <div
            onClick={() => goTo("/metas")}
            className="mobile-right-in-logo bg-[var(--color-indigo-950)] cursor-pointer flex flex-col flex-nowrap justify-between items-start"
          >
            <button>
              <div>
                <img
                  className="w-20 p-4 invert-[1] mobile-right-in-item-logo mobile-right-initem-logo"
                  src={Logo_PDM_fPreto}
                  alt=""
                />
              </div>

              <div>
                <h2 className="text-2xl text-white w-32 relative pb-4 left-36 top-8 h2_centro_mobile">
                  conheça as metas
                </h2>
              </div>
            </button>
          </div>

          <div
            onClick={() => goToEixo("cidade")}
            className="mobile-left-in-img flex justify-end items-end p-6 col-span-2 bg-[var(--color-blue)] cursor-pointer rounded-br-[2rem]"
          >
            <img
              className="w-48 mobile-left-in-item-img mobile-left-item-img"
              src={Cidade_Empreendedora}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 items-center">
        <div className="flex flex-row justify-start flex-nowrap items-start gap-4 navbar-mobile-tablets relative right-44">
          <div className="div-mobile-tablets-imgs flex items-start justify-start gap-8">
            <div onClick={() => goTo("/sobre")}>
              <button className="mobile-bottom-in text-white w-80 bg-[var(--color-navy)] h-60 flex flex-col items-start justify-start flex-nowrap text-2xl p-4 rounded-tr-[3rem] cursor-pointer">
                <h2 className="z-2 mobile-bottom-in-item">sobre o pdm</h2>
                <img
                  className="relative left-6 top-[2.8rem] mobile-img-in-item"
                  src={Vector_Sobre}
                />
              </button>
            </div>
            <div>
              <button
                onClick={() => goTo("/historico")}
                className="mobile-top-in text-white w-80 bg-[var(--color-navy)] h-60 flex flex-col-reverse items-start justify-center flex-nowrap px-6 py-4 text-2xl p-4 rounded-bl-[3rem] pb-4 cursor-pointer"
              >
                <h2 className="z-2 mobile-top-in-item">pdms anteriores</h2>
                <img
                  className="relative w-[16.5rem] left-8 top-[-0.5rem] mobile-img-item"
                  src={Vector}
                />
              </button>
            </div>
          </div>
          <div className="div-mobile-tablets-noimgs flex flex-col gap-12">
            <div>
              <button
                onClick={() => goTo("/")}
                className="mobile-right-in text-white w-80 bg-[var(--color-cyan-medium)] h-20 flex items-start flex-row text-2xl p-4 rounded-tr-[2rem] cursor-pointer btn-mobile-inicio"
              >
                <h2 className="mobile-right-in-item">início</h2>
              </button>
            </div>
            <div>
              <button
                className="mobile-right-in text-white h-20 w-80 bg-[var(--color-cyan-medium)] flex items-center justify-start flex-row flex-nowrap p-4 text-2xl rounded-bl-[2rem] cursor-pointer btn-mobile-sair"
                onClick={onClose}
                aria-label="Fechar menu"
              >
                <h2 className="mobile-right-in-item">sair</h2>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-start gap-4 div-mobile-tablets-3itens absolute left-[67rem] top-2">
          <div
            onClick={() => goTo("/regionalizacao")}
            className="mobile-top-in-2 h-[27rem] w-[19rem] bg-[var(--color-cyan-dark)] text-white p-4 flex items-end justify-center cursor-pointer rounded-tl-[2rem]"
          >
            <button
              onClick={() => goTo("/regionalizacao")}
              className="text-start w-full cursor-pointer text-2xl"
            >
              <h2 className="mobile-top-in-item-2">regionalização</h2>
            </button>
          </div>

          <div
            onClick={() => goTo("/transparencia")}
            className="mobile-top-in-3 mobile-top-3 w-[19rem] bg-[var(--color-cyan-dark)] text-white h-[11.5rem] p-4 flex items-end cursor-pointer"
          >
            <button className="text-start w-full cursor-pointer text-2xl">
              <h2 className="mobile-top-in-item-3 mobile-h2-item">
                transparência e monitoramento
              </h2>
            </button>
          </div>

          <div
            onClick={() => goTo("/participacao-social")}
            className="mobile-top-in-3 w-full z-0"
          >
            <button className="text-white h-[12.6rem] w-[19rem] text-start bg-[var(--color-cyan-dark)] p-4 cursor-pointer text-2xl rounded-br-[2rem] flex justify-start items-end  mobile-top-in-mobile">
              <h2 className="w-8 mobile-top-in-item-3 mobile-top-h2-item">participação social</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
