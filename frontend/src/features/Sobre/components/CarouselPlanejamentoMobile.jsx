import React, { useState } from "react";
import LogoPdm from "@/shared/assets/svg/LogoPdm.svg";

export default function CarouselPlanejamentoMobile({ como_feito = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = como_feito.length;

  if (length === 0) return null;

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="relative w-full h-64 flex items-center justify-center">
        <button onClick={prev} className="absolute left-0 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:scale-105 transition">
          <i className="fa-solid fa-arrow-left text-[var(--color-navy)]"></i>
        </button>

        {como_feito.map((slide, idx) => {
          let position = idx - currentIndex;

          if (position < -1) position += length;
          if (position > 1) position -= length;

          let baseClasses = "absolute w-85 h-94 flex items-center justify-center text-center rounded-xl shadow-lg transition-all duration-500 ease-in-out p-4";

          if (position === 0) {
            return (
              <div key={idx} className={`${baseClasses} z-20 scale-100`} style={{ backgroundColor: slide.numero ? "var(--color-cyan-dark)":"var(--color-navy)",}}>
                {!slide.numero ? (
                  <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
                    <div className="flex items-center justify-center rounded-b-3xl bg-white p-6 relative bottom-8">
                      <img src={LogoPdm} alt="Logo Do Programa de Metas" draggable={false} onDragStart={(event) => event.preventDefault()} className="w-15 pointer-events-none select-none [-webkit-user-drag:none] [-webkit-touch-callout:none]"/>
                    </div>
                    <h5 className="text-white px-10 text-xl text-center relative bottom-4">
                      Veja o passo a passo para a construção do Programa de Metas
                    </h5>
                    <span className="bg-white rounded-xl px-5 py-3">
                      <p className="text-[#1281AA] text-2xl">2025 - 2028</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 text-white">
                    <span className="text-6xl font-bold">
                      {slide.numero}
                    </span>
                    {slide.titulo && (
                      <h3 className="text-lg font-semibold max-md:text-xl">
                        {slide.titulo}
                      </h3>
                    )}
                    {slide.conteudo && (
                      <p className="text-lg leading-snug max-md:text-sm text-left px-10">
                        {slide.conteudo}
                      </p>
                    )}
                    {slide.descricao && (
                      <p className="text-lg leading-snug max-md:text-sm">
                        {slide.descricao}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          }
          if (position === -1) {
            return (
              <div key={idx} className={`${baseClasses} -translate-x-36 scale-90 opacity-60 z-10`} style={{ backgroundColor: "var(--color-navy)", color: "#6ACADB",}}>
                <p className="text-sm"> {slide.titulo || slide.descricao || "Programa de Metas"} </p>
              </div>
            );
          }
          if (position === 1) {
            return (
              <div key={idx} className={`${baseClasses} translate-x-36 scale-90 opacity-60 z-10`} style={{ backgroundColor: "var(--color-navy)", color: "#6ACADB",}}>
                <p className="text-sm"> {slide.titulo || slide.descricao || "Programa de Metas"} </p>
              </div>
            );
          }
          return null;
        })}
        <button onClick={next} className="absolute right-0 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:scale-105 transition">
          <i className="fa-solid fa-arrow-right text-[var(--color-navy)]"></i>
        </button>
      </div>
    </div>
  );
}