import React, { useEffect, useState } from "react";
import { getHistoricoData } from "@/services/Historico/getHistoricoData";
import CardItem from "./CardItem";
import NextButton from "./NextButton";

export default function CarrosselHistorico() {
  const [historico, setHistorico] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [openedCardId, setOpenedCardId] = useState(null);

  useEffect(() => {
    // CORREÇÃO: Acessa a propriedade 'cards' diretamente dos dados da API
    getHistoricoData()
      .then((data) => setHistorico(data.cards))
      .catch(console.error);
  }, []);

  if (historico.length === 0) return <div>Carregando...</div>;

  // CORREÇÃO: 'historico' já é o array de cards, não é necessário 'historico.cards'
  const total = historico.length;
  const card1 = historico[currentIndex];
  const card2 = historico[(currentIndex + 1) % total];

  const next = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setOpenedCardId(null);
      setAnimating(false);
    }, 500);
  };

  return (
    <div className="relative pt-8 flex flex-col items-center gap-4">
      <div className="relative w-[60rem] h-[35rem] flex justify-center items-start gap-8 overflow-hidden">
        <CardItem
          card={card1}
          animating={animating}
          type="current"
          openedCardId={openedCardId}
          setOpenedCardId={setOpenedCardId}
        />
        <CardItem
          card={card2}
          animating={animating}
          type="next"
          openedCardId={openedCardId}
          setOpenedCardId={setOpenedCardId}
        />
      </div>
      <NextButton onClick={next} />
      <div className="relative left-8 top-4">
        <div className="transform -translate-x-1/2 flex space-x-3">
          {historico.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-colors ${
                index === currentIndex ? "bg-[var(--color-navy)]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                if (!animating) {
                  setOpenedCardId(null);
                  setCurrentIndex(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}