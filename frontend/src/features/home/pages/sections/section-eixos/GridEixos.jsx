// GridEixos.jsx
import React from "react";
import CardEixos from "./CardEixos";
import { useEixos } from "@/features/home/hooks/useEixos";
import { EixoCard } from "@/features/home/components/EixoCard";

export default function GridEixos({ eixoSelecionadoDoMenu }) {
  const { refs, selected, setSelected, handleSelect, getTitulo } = useEixos(eixoSelecionadoDoMenu);

  const cards = [
    { nome: "universo", cor: "green", canto: "rounded-tl-[2.5rem]" },
    { nome: "cidade", cor: "blue", canto: "rounded-tr-[2.5rem]" },
    { nome: "viver", cor: "orange-red", canto: "rounded-bl-[2.5rem]" },
    { nome: "capital", cor: "purple-red", canto: "rounded-br-[2.5rem]" },
  ];

  return (
    <div id="eixos" className="flex items-start justify-center px-6">
      {!selected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {cards.map(({ nome, cor, canto }) => (
            <EixoCard
              key={nome}
              nome={nome}
              cor={cor}
              canto={canto}
              refProp={refs[nome]}
              titulo={getTitulo(nome)}
              onClick={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="cardeixos-overlay">
          <div className="cardeixos-animator spinZ-from-vertical">
            <div className="card-eixos">
              <CardEixos eixo={selected} onClose={() => setSelected(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
