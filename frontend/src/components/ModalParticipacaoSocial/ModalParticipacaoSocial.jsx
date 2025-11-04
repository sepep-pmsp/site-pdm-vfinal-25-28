import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import bg_fundo from "@/assets/svg/isolamento_pag_participação.svg";
import apresentacao_logo_pdm from "@/assets/svg/logo_pdm_fundo_branco.svg";

export default function ModalParticipacaoSocial({ isOpen, onClose, apresentacao }) {
  const [visible, setVisible] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    } else if (visible) {
      setClosing(true);
      document.body.style.overflow = "";
      timer = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 400);
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen, visible]);

  if (!visible) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[9999] transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[10000]">
        <div
          className={`bg-[#1281AA] rounded-4xl p-8 max-w-screen max-lg:max-h-screen relative shadow-lg transition-all duration-400 xl:max-w-[1427px] xl:h-[50rem] ${
            closing ? "slide-out-bottom" : "animate-slide-up"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-10 right-20 cursor-pointer z-[10100] max-lg:right-0 pr-8"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark text-white text-6xl"></i>
          </button>

          <div className="lg:flex items-center justify-center flex-row h-full gap-30">
            <div className="max-sm:max-w-full  lg:flex flex-col items-start justify-center gap-3 p-8 w-180 z-[10101]">
              <div className="modal-header-mobile pb-10 relative z-20">
                <h2 className="max-md:text-4xl lg:text-8xl text-white font-bebas-regular z-50">{apresentacao?.titulo}</h2>
                <p className="max-md:pt-0 max-md:text-lg text-white lg:text-white text-2xl pt-8 roboto-medium">{apresentacao?.subtitulo}</p>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto pr-4 hide-scroll xl:max-h-[25rem] lg:max-h-[20rem] md:max-h-[15rem] max-h-[25rem]">
                {apresentacao?.paragrafos?.map((par, index) => (
                  <p className="max-sm:text-white max-sm:z-[10100] max-sm:text-sm lg:text-white text-xl roboto-light" key={index}>
                    {par}
                  </p>
                ))}
              </div>
              <p className="max-sm:text-lg text-white max-sm:z-[10100] lg:text-white text-2xl pt-8 roboto-medium">{apresentacao?.texto}</p>
            </div>
            <div>
              <img className="max-md:w-36 max-md:relative max-md:left-1/4 lg:w-150 relative z-[10100]" src={apresentacao_logo_pdm} alt="" />
              <img className="w-full h-full max-sm:absolute max-sm:left-30 max-sm:top-0 max-sm:max-w-screen max-sm:h-full lg:absolute right-8 top-0  max-lg:w-full  max-lg:h-auto max-w-[43.9rem] z-10" src={bg_fundo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}