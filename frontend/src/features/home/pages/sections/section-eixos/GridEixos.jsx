import React from "react";
import CardEixos from "./CardEixos";
import { useEixos } from "@/features/home/hooks/useEixos";
import { EixoCard } from "@/features/home/components/EixoCard";

export default function GridEixos({ eixoSelecionadoDoMenu }) {
  const { refs, selected, setSelected, handleSelect, getTitulo } = useEixos(eixoSelecionadoDoMenu);

  const cards = [
    { nome: "universo", cor: "green", canto: "rounded-tl-[2.5rem]", order: "order-1 md:order-1", },
    { nome: "cidade", cor: "blue", canto: "rounded-tr-[2.5rem]", order: "order-3 md:order-2", },
    { nome: "viver", cor: "orange-red", canto: "rounded-bl-[2.5rem]", order: "order-2 md:order-3", },
    { nome: "capital", cor: "purple-red", canto: "rounded-br-[2.5rem]", order: "order-4 md:order-4", },
  ];

  return (
    <div id="eixos" className="flex items-start justify-center px-6">
      {!selected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {cards.map(({ nome, cor, canto, order }) => (
            <EixoCard
              key={nome}
              nome={nome}
              cor={cor}
              canto={canto}
              refProp={refs[nome]}
              titulo={getTitulo(nome)}
              onClick={handleSelect}
              className={order}
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
