import React, { useState, useEffect, useRef } from "react";

import CardEixos from "./CardEixos";
import { getEixosData } from "@/services/home/getEixosData";



export default function GridEixos({ eixoSelecionadoDoMenu }) {
  const universoRef = useRef(null);
  const cidadeRef = useRef(null);
  const viverRef = useRef(null);
  const capitalRef = useRef(null);
  const sectionRef = useRef(null);

  const [selectedEixo, setSelectedEixo] = useState(null);
  const [hovered, setHovered] = useState("");
  const [eixosTematicos, setEixosTematicos] = useState([]);

  const tituloVisivel = selectedEixo ? "hidden" : "";

  useEffect(() => {
    getEixosData().then((data) => setEixosTematicos(data || []));
  }, []);

  useEffect(() => {
    if (!eixoSelecionadoDoMenu || eixosTematicos.length === 0) return;
    const eixoEncontrado = eixosTematicos.find((e) =>
      e.nome.toLowerCase().includes(eixoSelecionadoDoMenu.toLowerCase())
    );
    if (!eixoEncontrado) return;
    setSelectedEixo({
      ...eixoEncontrado,
      origin: { x: 0, y: 0, width: 0, height: 0 },
    });
  }, [eixoSelecionadoDoMenu, eixosTematicos]);

  const handleClick = (nomeChave, event) => {
    const eixo = eixosTematicos.find((e) =>
      e.nome.toLowerCase().includes(nomeChave)
    );
    if (!eixo) return;
    setSelectedEixo({ ...eixo, origin: { x: 0, y: 0, width: 0, height: 0 } });
  };

  const titulo = (key) =>
    eixosTematicos.find((e) => e.nome.toLowerCase().includes(key))?.titulo ?? "";

  
  const tituloQuebrado = (key) => {
    const t = titulo(key);
    if (!t) return "";
    const parts = t.split(/\s[eE]\s/);
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}{" "}E<br />{parts.slice(1).join(" e ")}
        </>
      );
    }
    return t;
  };

 return (
  <div ref={sectionRef} id="eixos" className="flex items-center justify-center px-6 min-h-[42rem]">
    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch content-center justify-center gap-8 w-full max-w-[85rem] grid-mobile-eixos">

      {/* UNIVERSO */}
      <div
        ref={universoRef}
        className="relative card card-hover card-hover-green flex items-center justify-start bg-[var(--color-green)] h-70 rounded-tl-[2.5rem] p-8"
        onMouseEnter={() => setHovered("universo")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => handleClick("universo", e)}
      >
        <div className="logo-mask logo-universo" role="img" aria-label="Universo SP" />
        {!selectedEixo && (
          <p className={`eixo-title absolute top-4 right-6 text-right uppercase text-white text-2xl md:text-3xl leading-tight ${tituloVisivel}`}>
            {tituloQuebrado("universo")}
          </p>
        )}
      </div>

      {/* CIDADE */}
      <div
        ref={cidadeRef}
        className="relative card card-hover card-hover-blue flex items-center justify-start bg-[var(--color-blue)] h-70 rounded-tr-[2.5rem] p-8"
        onMouseEnter={() => setHovered("cidade")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => handleClick("cidade", e)}
      >
        <div className="logo-mask logo-cidade" role="img" aria-label="Cidade Empreendedora" />
        {!selectedEixo && (
          <p className={`eixo-title absolute top-4 right-6 text-right uppercase text-white text-2xl md:text-3xl leading-tight ${tituloVisivel}`}>
            {tituloQuebrado("cidade")}
          </p>
        )}
      </div>

      {/* VIVER */}
      <div
        ref={viverRef}
        className="relative card card-hover card-hover-orange flex items-center justify-start bg-[var(--color-orange-red)] h-70 rounded-bl-[2.5rem] p-8"
        onMouseEnter={() => setHovered("viver")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => handleClick("viver", e)}
      >
        <div className="logo-mask logo-viver" role="img" aria-label="Viver São Paulo" />
        {!selectedEixo && (
          <p className={`eixo-title absolute top-4 right-6 text-right uppercase text-white text-2xl md:text-3xl leading-tight ${tituloVisivel}`}>
            {tituloQuebrado("viver")}
          </p>
        )}
      </div>

      {/* CAPITAL */}
      <div
        ref={capitalRef}
        className="relative card card-hover card-hover-purple flex items-center justify-start bg-[var(--color-purple-red)] h-70 rounded-br-[2.5rem] p-8"
        onMouseEnter={() => setHovered("capital")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => handleClick("capital", e)}
      >
        <div className="logo-mask logo-capital" role="img" aria-label="Capital do Futuro" />
        {!selectedEixo && (
          <p className={`eixo-title absolute top-4 right-6 text-right uppercase text-white text-2xl md:text-3xl leading-tight ${tituloVisivel}`}>
            {tituloQuebrado("capital")}
          </p>
        )}
      </div>

      {selectedEixo && (
        <div className="cardeixos-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30">
          <div
            key={selectedEixo?.id || selectedEixo?.nome || "cardeixos"}
            className="cardeixos-animator spinZ-in"
          >
            <div className="card-eixos">
              <CardEixos eixo={selectedEixo} onClose={() => setSelectedEixo(null)} />
            </div>
          </div>
        </div>
      )}

    </div>
  </div>
);
}