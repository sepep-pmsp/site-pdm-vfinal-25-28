import React, { useEffect, useState } from "react";
import { getHistoricoData } from "@/services/Historico/getHistoricoData";
import CardItem from "./CardItem";
import NextButton from "./NextButton";

export default function CarrosselHistorico() {
  const [historico, setHistorico] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [openedCardId, setOpenedCardId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1025);

  useEffect(() => {
    getHistoricoData()
      .then((data) => setHistorico(data.cards))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1025);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (historico.length === 0) return <div>Carregando...</div>;
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
      {isMobile ? (
        <div className="carrossel-touch flex flex-col items-start justify-center flex-nowrap gap-12">
          {historico.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-start justify-center flex-nowrap gap-12"
            >
              <CardItem
                card={card}
                animating={false}
                openedCardId={openedCardId}
                setOpenedCardId={setOpenedCardId}
              />
            </div>
          ))}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
