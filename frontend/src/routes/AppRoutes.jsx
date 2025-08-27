import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/page/home/Home";
import TransparenciaMonitoramento from "@/page/Transparencia/TransparenciaMonitoramento";
import Historico from "@/page/Historico/Historico";
import Regionalizacao from "@/page/Regionalizacao/Regionalizacao";
import Metas from "@/page/Metas/Metas";
import Sobre from "@/page/Sobre/Sobre";
import ParticipacaoSocial from "@/page/Participacao/ParticipacaoSocial";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transparencia" element={<TransparenciaMonitoramento />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/regionalizacao" element={<Regionalizacao />} />
      <Route path="/metas" element={<Metas/>} />
      <Route path="/sobre" element={<Sobre/>} />
      <Route path="/participacao-social" element={<ParticipacaoSocial/>} />
    </Routes>
  );
}