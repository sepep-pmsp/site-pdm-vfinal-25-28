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
        className={`bg-[var(--color-navy)] w-full max-h-full overflow-y-auto hide-scroll max-xl:left-0 max-xl:top-0 max-xl:rounded-4xl xl:p-8 xl:w-full xl:relative xl:shadow-lg xl:transition-all xl:duration-400 xl:max-h-[50rem] xl:max-w-[90rem] xl:rounded-4xl 
          ${closing ? "slide-out-bottom" : "animate-slide-up"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X */}
        <button
          className="max-md:absolute max-md:right-10 lg:absolute top-5 right-20 cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-white text-4xl lg:text-6xl"></i>
        </button>

        <div className="flex flex-col flex-nowrap items-start gap-8 p-10">
          <div>
            <h2 className="text-6xl font-bold text-white">
              {carta?.titulo || "Título não disponível"}
            </h2>
          </div>
          <div>
            <p className="text-white text-2xl"> {carta?.nome_prefeito || "Nome não disponível"} </p>
          </div>
          <div className="w-96 max-h-full max-xl:overflow-y-auto left-0 top-0 xl:h-auto xl:w-auto xl:flex xl:flex-row xl:flex-nowrap xl:items-center xl:justify-start xl:gap-8 ">
            {carta?.paragrafos?.map((par, index) => (
              <p className="text-white text-sm w-80 xl:text-lg xl:font-light xl:w-full" key={index} dangerouslySetInnerHTML={{ __html: par}}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
