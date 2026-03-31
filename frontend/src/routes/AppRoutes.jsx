import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/features/home/pages/Home";
import Historico from "@/features/Historico/pages/Historico";
import Regionalizacao from "@/features/Regionalizacao/pages/Regionalizacao";
import Metas from "@/features/Metas/pages/Metas";
import Sobre from "@/features/Sobre/pages/Sobre";
import ParticipacaoSocial from "@/features/Participacao/pages/ParticipacaoSocial";
import TransparenciaContainer from "@/features/Transparencia/pages/TransparenciaContainer";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transparencia" element={<TransparenciaContainer />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/regionalizacao" element={<Regionalizacao />} />
      <Route path="/metas" element={<Metas />}>
        <Route path=":slug" element={<Metas />} /> 
      </Route>
      <Route path="/sobre" element={<Sobre/>} />
      <Route path="/participacao-social" element={<ParticipacaoSocial/>} />
    </Routes>
  );
}