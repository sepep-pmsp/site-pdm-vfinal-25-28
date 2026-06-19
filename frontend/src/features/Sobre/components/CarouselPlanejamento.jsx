import React, { useState } from "react";
import LogoPdm from "@/shared/assets/svg/LogoPdm.svg"

export default function CarouselPlanejamento({ como_feito }) {
  const slides = como_feito;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) return slides.length - 1;
      return prev - 1;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === slides.length - 1) return 0;
      return prev + 1;
    });
  };

  return (
    <div className="max-xl: lg:relative w-[90rem] max-h-xl flex flex-col items-center">
      <button onClick={prevSlide} className="absolute right-[86rem] top-50 z-20 bg-white h-16 w-16 rounded-full">
        <i className="fa-solid fa-arrow-left text-lg text-[var(--color-navy)]"></i>
      </button>
      <button onClick={nextSlide} className="absolute left-[86rem] top-50 z-20 bg-white h-16 w-16 rounded-full">
        <i className="fa-solid fa-arrow-right text-lg text-[var(--color-navy)]"></i>
      </button>
      <div className="relative flex justify-center items-center gap-6 h-[30rem] w-full overflow-hidden">
        {slides.map((slide, index) => {
          let position = index - currentIndex;
          if (position < -1) position += slides.length;
          if (position > 1) position -= slides.length;
          let style = { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 10 };
          if (position === 0) { style = { transform: "translateX(0) scale(1.1)", opacity: 1, zIndex: 20, backgroundColor: slide.numero ? "var(--color-cyan-dark)" : "var(--color-cyan-dark)", color: "white", };
          } else if (position === -1) {
            style = { transform: "translateX(-98%) scale(0.9)", zIndex: 5, backgroundColor: "var(--color-navy)", borderTopLeftRadius: "2.5rem", borderBottomLeftRadius: "2.5rem", color: "#6ACADB",};
          } else if (position === 1) {
            style = { transform: "translateX(98%) scale(0.9)", borderTopRightRadius: "2.5rem", borderBottomRightRadius: "2.5rem", zIndex: 5, backgroundColor: "var(--color-navy)", color: "#6ACADB",};
          } else {style = {  opacity: 0,  zIndex: 0,  transform: "scale(0.8)",  pointerEvents: "none",};
          }
          return (
            <div key={slide.id ?? `slide-${index}`} className="card carousel-card absolute transition-all duration-500 ease-in-out shadow-lg flex items-start justify-center flex-col flex-nowrap p-6 w-[30rem] h-[30rem]" style={{ ...style }} >
              {!slide.numero ? (
                <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
                    <div className="flex items-center justify-center rounded-b-3xl bg-white p-6 relative bottom-14.5">
                        <img src={LogoPdm} alt="Logo Do Programa de Metas" draggable={false} onDragStart={(event) => event.preventDefault()} className="w-30 pointer-events-none select-none [-webkit-user-drag:none] [-webkit-touch-callout:none]"/>
                    </div>
                    <h5 className="text-white px-10 text-3xl text-center relative bottom-10">Veja o passo a passo para a construção do Programa de Metas</h5>
                    <span className="bg-white rounded-xl px-5 py-3">
                        <p className="text-[#1281AA] text-2xl">2025 - 2028</p>
                    </span>
                </div>
              ) :  position === -1 || position === 1 ? (
                <div className="flex flex-col flex-nowrap items-start justify-center gap-5 px-16">
                    <h3 className="text-9xl font-bold text-start">
                        {slide.numero}
                    </h3>
                    <h3 className="text-5xl font-semibold">
                        {slide.titulo}
                    </h3>
                    <p className="text-start w-85 text-xs">
                        {slide.conteudo}
                    </p>
                </div>
                ) : (
                <div className="flex flex-col flex-nowrap items-start justify-center gap-10 px-16">
                    <div className="flex flex-col flex-nowrap items-start justify-center gap-3">
                    <h3 className="text-7xl font-bold text-start">
                        {slide.numero}
                    </h3>
                    <h3 className="text-3xl font-semibold">
                        {slide.titulo}
                    </h3>
                    </div>
                    <p className="text-start w-85 text-sm">
                        {slide.conteudo}
                    </p>
                </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}