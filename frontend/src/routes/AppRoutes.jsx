import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/page/Home/Home";
import TransparenciaMonitoramento from "@/page/transparencia/TransparenciaMonitoramento";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transparencia" element={<TransparenciaMonitoramento />} />
    </Routes>
  );
}