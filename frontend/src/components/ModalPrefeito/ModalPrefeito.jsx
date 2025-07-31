import React, { useEffect, useState } from "react";

export default function ModalPrefeito({ isOpen, onClose, carta }) {
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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300
        ${closing ? "opacity-0" : "opacity-100"} bg-black/40`}
      onClick={onClose}
    >
      <div
        className={`bg-[var(--color-navy)] rounded-4xl p-8 w-[99rem] h-[48rem] relative shadow-lg transition-all duration-400
          ${closing ? "slide-out-bottom" : "animate-slide-up"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X */}
        <button
          className="absolute top-5 right-20 cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-white"></i>
        </button>

        <div className="flex flex-col flex-nowrap items-start gap-8 p-10">
          <div>
            <h2 className="text-6xl font-bold text-white">
              {carta?.titulo || "Título não disponível"}
            </h2>
          </div>
          <div>
            <p className="text-white text-2xl"> {carta?.nome || "Nome não disponível"} </p>
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-start gap-8">
            {carta?.paragrafo?.map((par, index) => (
              <p className="text-white text-lg font-light" key={index}>{par}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
