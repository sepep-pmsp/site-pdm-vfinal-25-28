import React, { useEffect, useState } from "react";
import { getSobreData } from "@/services/Sobre/getSobreData";
import SectionIntroSobre from "./sections-sobre/Section-Intro/SectionIntroSobre";
import SectionObjetivos from "./sections-sobre/section-objetivos/SectionObjetivos";
import SectionPlanejamento from "./sections-sobre/section-planejamento/SectionPlanejamento";
import SectionIndicadores from "./sections-sobre/section-indicadores/SectionIndicadores";
import SectionParticipacaoSocial from "./sections-sobre/section-participacao/SectionParticipacaoSocial";

export default function Sobre() {
  const [sobre, setSobre] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    getSobreData().then(setSobre).catch(console.error);
  }, []);

  if (!sobre) return <div>Carregando...</div>;

  return (
    <div className="pt-20">
      <div>
        <SectionIntroSobre
          sobre={sobre}
          setSelectedButton={setSelectedButton}
          selectedButton={selectedButton}
        />
      </div>
      <div >
        <SectionObjetivos sobre={sobre}/>
        <SectionPlanejamento sobre={sobre}/>
        <SectionIndicadores sobre={sobre}/>
        <SectionParticipacaoSocial sobre={sobre}/>
      </div>
    </div>
  );
}
