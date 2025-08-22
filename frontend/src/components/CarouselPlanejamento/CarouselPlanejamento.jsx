import React, { useState } from "react";

export default function CarouselPlanejamento({ planejamento }) {
  const slides = planejamento;
  const [currentIndex, setCurrentIndex] = useState(1);

  const prevSlide = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 1) newIndex = slides.length - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) newIndex = 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-[90rem] h-[38rem] flex flex-col items-center">
      <button
        onClick={prevSlide}
        className="absolute right-[86rem] top-50 z-20 bg-white h-16 w-16 rounded-full "
      >
        <i className="fa-solid fa-arrow-left text-lg text-[var(--color-navy)]"></i>
      </button>

      <button
        onClick={nextSlide}
        className="absolute left-[86rem] top-50 z-20 bg-white h-16 w-16 rounded-full"
      >
        <i className="fa-solid fa-arrow-right text-lg text-[var(--color-navy)]"></i>
      </button>
      <div className="relative flex justify-center items-center gap-6 h-[30rem] w-full overflow-hidden">
        {slides.map((slide, index) => {
          let position = index - currentIndex;
          if (position < -1) position += slides.length;
          if (position > 1) position -= slides.length;
          let style = {
            transform: "translateX(0) scale(1)",
            opacity: 1,
            zIndex: 10
          };
          if (position === 0) {
            if (slide.id) {
              style = {
                transform: "translateX(0) scale(1.1)",
                opacity: 1,
                zIndex: 20,
                backgroundColor: "var(--color-cyan-dark)",
                color: "white"
              };
            } else {
              style = {
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none",
                backgroundColor: "var(--color-navy)"
              };
            }
          } else if (position === -1) {
            style = {
              transform: "translateX(-98%) scale(0.9)",
              zIndex: 5,
              backgroundColor: "var(--color-navy)",
              borderTopLeftRadius: "2.5rem",
              borderBottomLeftRadius: "2.5rem",
              color: "#6ACADB"
            };
          } else if (position === 1) {
            style = {
              transform: "translateX(98%) scale(0.9)",
              borderTopRightRadius: "2.5rem",
              borderBottomRightRadius: "2.5rem",
              zIndex: 5,
              backgroundColor: "var(--color-navy)",
              color: "#6ACADB"
            };
          } else {
            style = { opacity: 0, zIndex: 0 };
          }
          return (
            <div
              key={slide.id || "mensagem"}
              className="card absolute transition-all duration-500 ease-in-out shadow-lg flex items-start justify-center flex-col flex-nowrap p-6 w-[30rem] h-[30rem]"
              style={{
                ...style
              }}
            >
              {!slide.id ? (
                <div className="flex flex-col items-start px-12 h-80 w-[27rem]">
                  <div className="h-0.5 w-full bg-white"></div>
                  <p className="text-3xl text-start pl-8 w-80 pt-2 text-white">
                    {slide.descricao}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col flex-nowrap items-start justify-center gap-20 px-16">
                    <div className="flex flex-col flex-nowrap items-start justify-center gap-8">
                      <span className="text-9xl font-bold text-start">
                        {slide.numero}
                      </span>
                      <h3 className="text-3xl font-semibold">{slide.titulo}</h3>
                    </div>
                    <div>
                      <p className="text-start w-85 text-xl">
                        {slide.descricao}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {slides[currentIndex]?.etapa?.trim() !== "" && (
        <div className="mt-6">
          <div className="rotate-90 w-8">
            <i className="fa-solid fa-play"></i>
          </div>
          <div className="w-50">
            <h4 className="text-4xl font-bold uppercase text-[var(--color-navy)]">
              {slides[currentIndex].etapa}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}
