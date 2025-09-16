// CarrosselHistoricoMobile.jsx
import React, { useEffect, useState } from "react";
import { getHistoricoData } from "@/services/Historico/getHistoricoData";
import CardItemMobile from "./CardItemMobile";

export default function CarrosselHistoricoMobile() {
  const [historico, setHistorico] = useState([]);
  const [openedCardId, setOpenedCardId] = useState(null);

  useEffect(() => {
    getHistoricoData()
      .then((data) => setHistorico(data.cards || []))
      .catch(console.error);
  }, []);

  if (!historico || historico.length === 0) return <div>Carregando...</div>;

  return (
    <div
      className="w-full max-w-screen overflow-x-auto overflow-y-hidden px-4 py-4"
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-x",
      }}
    >
      <div className="flex gap-8 items-start snap-x snap-mandatory">
        {historico.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 snap-center"
            style={{ width: "20rem" }} 
          >
            <CardItemMobile
              card={card}
              openedCardId={openedCardId}
              setOpenedCardId={setOpenedCardId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
