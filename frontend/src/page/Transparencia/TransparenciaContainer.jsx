import React, { useEffect, useState } from "react";
import { getTransparenciaData } from "@/services/Transparencia/getTransparenciaData";
import TransparenciaMobile from "./TransparenciaMobile";
import TransparenciaMonitoramento from "./TransparenciaMonitoramento";

export default function TransparenciaContainer() {
  const [transparencia, setTransparencia] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1026);

  useEffect(() => {
    getTransparenciaData().then(setTransparencia).catch(console.error);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 550);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!transparencia) return <div>Carregando...</div>;

  return isMobile ? (
    <TransparenciaMobile transparencia={transparencia} />
  ) : (
    <TransparenciaMonitoramento transparencia={transparencia} />
  );
}
