import React, { useEffect, useState } from "react";
import { getSobreData } from "@/features/Sobre/services/getSobreData";
import SectionIntroSobre from "./sections-sobre/SectionIntroSobre";
import SectionObjetivos from "./sections-sobre/SectionObjetivos";
import SectionPlanejamento from "./sections-sobre/SectionPlanejamento";
import SectionIndicadores from "./sections-sobre/SectionIndicadores";
import SectionParticipacaoSocial from "./sections-sobre/SectionParticipacaoSocial";

export default function Sobre() {
  const [sobre, setSobre] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    getSobreData().then(setSobre).catch(console.error);
  }, []);

  if (!sobre) return <div>Carregando...</div>;

  return (
    <div className="pt-20">
      <SectionIntroSobre
        sobre={sobre}
        setSelectedButton={setSelectedButton}
        selectedButton={selectedButton}
      />
      <SectionObjetivos sobre={sobre} />
      <SectionPlanejamento sobre={sobre} />
      <SectionIndicadores sobre={sobre} />
      <SectionParticipacaoSocial sobre={sobre} />
    </div>
  );
}
