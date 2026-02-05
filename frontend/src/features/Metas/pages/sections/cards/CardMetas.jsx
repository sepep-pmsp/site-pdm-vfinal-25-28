import React from "react";
import { useCardMetasModal } from "../../../hooks/useCardMetasModal";
import MetaModalHeader from "../../../components/SectionsModal/MetaModalHeader"
import MetaModalTitle from "../../../components/SectionsModal/MetaModalTitle";
import MetaModalContent from "../../../components/SectionsModal/MetaModalContent";
import Regionalizacao from "../../../components/SectionsModal/MetaModalRegionalizacao";
import MetaModalFooter from "../../../components/SectionsModal/MetaModalFooter";

export default function CardMetas({ meta, onClose }) {
  const { closing, contentRef, needsScroll, handleClose, hexToRgba, parsedTitle } = useCardMetasModal(meta, onClose);

  if (!meta) return null;

  return (
    <div className="bg-black/50 fixed inset-0 flex items-start justify-center z-50 overflow-hidden" onClick={handleClose}>
      <div ref={contentRef} onClick={(e) => e.stopPropagation()} className={`relative flex flex-col bg-white h-full w-full shadow-lg transition-all duration-400 
          ${closing ? "slide-out-bottom" : "animate-slide-up"} 
          ${needsScroll ? "overflow-y-auto" : "overflow-hidden"}`}
        style={{ scrollbarColor: `${meta.card.eixo_cor_principal} transparent` }}>
        {/* Número de Fundo */}
        <div className="absolute font-bebas-bold select-none pointer-events-none opacity-20"
             style={{ fontSize: "clamp(20rem, 50vw, 60rem)", bottom: "-1.5rem", left: 0, zIndex: 0, color: hexToRgba(meta.card.eixo_cor_principal, 0.25), lineHeight: 1 }}>
          {meta.card.numero}
        </div>
        
        <div className="relative z-10 flex flex-col h-full w-full" >
          <MetaModalHeader meta={meta} onClose={handleClose} />
          
          <div className="flex-grow" style={{ maxWidth: "1427px", height:"auto", margin: "0 auto" }}>
             <MetaModalTitle title={parsedTitle} color={meta.listing.eixo_cor_principal} />
             <MetaModalContent meta={meta} color={meta.card.eixo_cor_principal} />
             <Regionalizacao meta={meta} />
          </div>

          <MetaModalFooter card={meta.card} />
        </div>
      </div>
    </div>
  );
}