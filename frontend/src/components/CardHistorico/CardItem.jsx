import React from "react";
import DocumentPanel from "./DocumentPanel";
import { corrigirUrlImagem } from "@/utils/imageUtils";
import SafeSVG from "@/components/SafeSVG/SafeSVG";

export default function CardItem({
  card,
  animating,
  type = "current",
  openedCardId,
  setOpenedCardId,
  direction
}) {
  const showDocs = openedCardId === card.id;

  const animationClass =
  type === "current"
    ? animating
      ? "fade-in-animation"
      : ""
    : animating
    ? direction === "next"
      ? "slide-left-card-animation"
      : "slide-right-card-animation"
    : "";

  const layerClass = (visible) =>
    `absolute inset-0 transition-opacity duration-500 ${
      visible
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`;

  return (
    <div
      key={`card-${card.id}`}
      className={`relative w-96 h-[35rem] rounded-bl-[2rem] text-white p-4 flex flex-col justify-between card-historico-mobile ${animationClass}`}
      style={{ backgroundColor: card.cor_principal }}
    >
      <div className={`${layerClass(!showDocs)} flex flex-col justify-between`}>
        <div className="flex flex-col items-center pt-12">
          <SafeSVG src={corrigirUrlImagem(card.imagem)} className="w-80 h-32 safe-image-mobile" />
        </div>
        <div className="flex flex-row-reverse items-center justify-center pb-4 gap-12">
          <h2 className="text-2xl font-bold">{card.id}</h2>
          <button
            className="px-4 py-5 text-white rounded-lg text-lg font-bold cursor-pointer"
            style={{ backgroundColor: card.cor_botao }}
            onClick={() => setOpenedCardId(card.id)}
          >
            VER DOCUMENTOS
          </button>
        </div>
      </div>
      <div className={layerClass(showDocs)}>
        {showDocs && (
          <DocumentPanel
            itens={card.documentos}
            onClose={() => setOpenedCardId(null)}
          />
        )}
      </div>
    </div>
  );
}
