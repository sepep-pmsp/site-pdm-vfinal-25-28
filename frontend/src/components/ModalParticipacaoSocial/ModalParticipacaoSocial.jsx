import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import bg_fundo from "@/assets/svg/isolamento_pag_participação.svg";

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
          className={`bg-[#1281AA] rounded-4xl p-8 w-[99rem] h-[48rem] relative shadow-lg transition-all duration-400 ${
            closing ? "slide-out-bottom" : "animate-slide-up"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-10 right-20 cursor-pointer z-[10100]"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark text-white text-6xl"></i>
          </button>

          <div className="flex items-center justify-center flex-row h-full gap-30">
            <div className="flex flex-col items-start justify-center gap-3 p-8 w-180 z-[10100]">
              <div className="pb-10">
                <h2 className="text-8xl text-white">{apresentacao?.titulo}</h2>
                <p className="text-white text-2xl pt-8 roboto-semibold">{apresentacao?.subtitulo}</p>
              </div>
              <div className="flex flex-col gap-3">
                {apresentacao?.paragrafos?.map((par, index) => (
                  <p className="text-white text-xl roboto-light" key={index}>
                    {par}
                  </p>
                ))}
                <p className="text-white text-2xl pt-8 roboto-medium">{apresentacao?.texto}</p>
              </div>
            </div>
            <div>
              <img className="w-150 relative z-[10100]" src={apresentacao?.imagem} alt="" />
              <img className="absolute right-8 top-0 w-[42.2rem]" src={bg_fundo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
