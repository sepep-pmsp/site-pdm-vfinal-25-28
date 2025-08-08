import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/page/home/Home";
import TransparenciaMonitoramento from "@/page/Transparencia/TransparenciaMonitoramento";
import Historico from "@/page/Historico/Historico";
import Regionalizacao from "../page/Regionalizacao/Regionalizacao";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transparencia" element={<TransparenciaMonitoramento />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/regionalizacao" element={<Regionalizacao />} />
    </Routes>
  );
}