import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/page/Home/Home";
import TransparenciaMonitoramento from "@/page/transparencia/TransparenciaMonitoramento";
import Historico from "@/page/Historico/Historico";
import Regionalizacao from "../page/Regionalizacao/Regionalizacao";
import Metas from "../page/Metas/Metas";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transparencia" element={<TransparenciaMonitoramento />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/regionalizacao" element={<Regionalizacao />} />
      <Route path="/metas" element={<Metas/>} />
    </Routes>
  );
}