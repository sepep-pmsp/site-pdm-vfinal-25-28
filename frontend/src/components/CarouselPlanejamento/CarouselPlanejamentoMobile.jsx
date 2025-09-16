import React, { useState } from "react";

export default function CarouselPlanejamentoMobile({ como_feito = [] }) {
  // 👉 se o primeiro card for o de detalhe, já começa nele
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
        {/* Botão esquerda */}
        <button
          onClick={prev}
          className="absolute left-2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:scale-105 transition"
        >
          <i className="fa-solid fa-arrow-left text-[var(--color-navy)]"></i>
        </button>

        {/* Cards */}
        {como_feito.map((slide, idx) => {
          let position = idx - currentIndex;
          if (position < -1) position += length;
          if (position > 1) position -= length;

          let baseClasses =
            "absolute w-52 h-64 flex items-center justify-center text-center rounded-xl shadow-lg transition-all duration-500 ease-in-out p-4";

          if (position === 0) {
            // card central
            return (
              <div
                key={idx}
                className={`${baseClasses} z-20 scale-100`}
                style={{ backgroundColor: "var(--color-cyan-dark)" }}
              >
                <div className="flex flex-col gap-2 text-white">
                  {/* Se for o card de detalhe, só mostra o conteudo */}
                  {slide.numero ? (
                    <span className="text-5xl font-bold">{slide.numero}</span>
                  ) : null}

                  {slide.titulo && (
                    <h3 className="text-lg font-semibold">{slide.titulo}</h3>
                  )}
                  {slide.conteudo && (
                    <p className="text-sm leading-snug">{slide.conteudo}</p>
                  )}
                  {slide.descricao && (
                    <p className="text-sm leading-snug">{slide.descricao}</p>
                  )}
                </div>
              </div>
            );
          }

          if (position === -1) {
            // card à esquerda
            return (
              <div
                key={idx}
                className={`${baseClasses} -translate-x-36 scale-90 opacity-60 z-10`}
                style={{ backgroundColor: "var(--color-navy)", color: "#6ACADB" }}
              >
                <p className="text-sm">{slide.titulo || slide.descricao}</p>
              </div>
            );
          }

          if (position === 1) {
            // card à direita
            return (
              <div
                key={idx}
                className={`${baseClasses} translate-x-36 scale-90 opacity-60 z-10`}
                style={{ backgroundColor: "var(--color-navy)", color: "#6ACADB" }}
              >
                <p className="text-sm">{slide.titulo || slide.descricao}</p>
              </div>
            );
          }

          return null;
        })}

        {/* Botão direita */}
        <button
          onClick={next}
          className="absolute right-2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:scale-105 transition"
        >
          <i className="fa-solid fa-arrow-right text-[var(--color-navy)]"></i>
        </button>
      </div>

      {/* detalhe opcional abaixo do card */}
      {como_feito[currentIndex]?.detalhe?.trim() && (
        <div className="mt-4 text-center">
          <h4 className="text-base font-bold uppercase text-[var(--color-navy)]">
            {como_feito[currentIndex].detalhe}
          </h4>
        </div>
      )}
    </div>
  );
}