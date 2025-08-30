import React, { useEffect, useState } from "react";
import CustomButton from "@/components/Button/Button";
import SafeSVG from "@/components/SafeSVG/SafeSVG";

export default function CardEixos({ eixo, onClose }) {
  const animations = {
    "viver são paulo": { in: "tilt-in-bl", out: "tilt-out-tr" },
    "universo sp": { in: "tilt-in-tl", out: "tilt-out-bl" },
    "cidade empreendedora": { in: "tilt-in-tr", out: "tilt-out-tl" },
    "capital do futuro": { in: "tilt-in-br", out: "tilt-out-br" }
  };
  const [isExiting, setIsExiting] = useState(false);
  const [style, setStyle] = useState({});
  const animationSet = animations[eixo.nome.toLowerCase()] || {
    in: "",
    out: ""
  };

  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isExiting, onClose]);

  useEffect(() => {
    if (!eixo.origin) return;

    const initial = {
      position: "absolute",
      left: eixo.origin.x,
      top: eixo.origin.y,
      width: eixo.origin.width,
      height: eixo.origin.height,
      transform: "rotate(90deg) scale(0.7)",
      opacity: 0,
      borderRadius: "3rem"
    };

    setStyle(initial);

    requestAnimationFrame(() => {
      setStyle({
        position: "absolute",
        left: "22rem",
        top: "136rem",
        width: "84.2rem",
        height: "38.5rem",
        transform: "rotate(0deg) scale(1)",
        opacity: 1,
        transition: "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.075)",
        borderRadius: "3rem"
      });
    });
  }, [eixo]);

  return (
    <div
      className={`p-8 text-white ${
        isExiting ? animationSet.out : animationSet.in
      }`}
      style={{ backgroundColor: eixo.cor_principal, height: "38.5rem", borderRadius: "3rem", ...style }}
    >
      <button
        onClick={() => setIsExiting(true)}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        <i className="fa-solid fa-xmark text-6xl"></i>
      </button>

      <div className="grid items-center grid-cols-[repeat(2,1fr)] justify-items-stretch p-4">
        <div className="p-4 w-[25rem] flex flex-col gap-4">
          <section>
            <SafeSVG src={eixo.imagem} className="w-32 h-32" />
          </section>
          <section className="p-4">
            <ul className="listCard">
              {eixo.lista.map((item, i) => (
                <li key={i} className="itemListCard py-1">
                  <p className="text-xl capitalize">{item}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <CustomButton
              type="link"
              style={{ color: eixo.cor_principal }}
              className="buttons_metas bg-[var(--color-white)] h-28 text-3xl uppercase font-family cursor-pointer"
            >
              veja as metas
            </CustomButton>
          </section>
        </div>
        <div>
          <section className="flex flex-col items-center relative right-8">
            {eixo.texto.map((paragrafo, i) => (
              <p className="py-2 " key={i}>
                {paragrafo}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
