import React from "react";
import DocumentPanel from "./DocumentPanel";
import { corrigirUrlImagem } from "@/shared/utils/imageUtils";
import SafeSVG from "@/shared/components/ui/SafeSVG";

export default function CardItemMobile({ card, openedCardId, setOpenedCardId }) {
  const showDocs = openedCardId === card.id;

  return (
    <div
      key={`card-mobile-${card.id}`}
      className="relative w-[21rem] h-[26rem] rounded-xl text-white p-4 flex flex-col justify-between"
      style={{ backgroundColor: card.cor_principal }}
    >
      {/* Conteúdo normal */}
      {!showDocs && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center pt-6">
            <SafeSVG src={corrigirUrlImagem(card.imagem)} className="w-full flex justify-center items-center" />
          </div>
          <div className="flex flex-row-reverse items-center justify-center pb-4 gap-4">
            <h2 className="text-xl font-bold">{card.id}</h2>
            <button
              className="px-3 py-2 text-white rounded-lg text-sm font-bold cursor-pointer"
              style={{ backgroundColor: card.cor_botao }}
              onClick={() => setOpenedCardId(card.id)}
            >
              VER DOCUMENTOS
            </button>
          </div>
        </div>
      )}
      {showDocs && (
        <DocumentPanel
          itens={card.documentos}
          onClose={() => setOpenedCardId(null)}
        />
      )}
    </div>
  );
}