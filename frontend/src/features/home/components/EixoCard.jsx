import React from "react";

export function EixoCard({ nome, cor, canto, refProp, titulo, onClick, className = "", }) {
  return (
    <div ref={refProp} onClick={() => onClick(nome)} className={`relative card card-hover card-hover-${cor} flex items-center justify-start bg-[var(--color-${cor})] h-70 p-8 ${canto} ${className}`}>
      <div className={`logo-mask logo-${nome}`} role="img" aria-label={nome} />
      <p className="eixo-title absolute top-4 right-6 text-right uppercase text-white text-base md:text-3xl leading-tight">
        {titulo}
      </p>
    </div>
  );
}